**API GPT-image-2 (GPT Image 2 Model | OpenAI API )**

**1. Prerequisites:** Before your first request, you need:
  An OpenAI account with API access. Developer accounts are separate from ChatGPT Plus; a ChatGPT subscription does not include API credits.
  A billable usage tier. gpt-image-2 is available on Tier 1 and above. New accounts start at Free tier and must add payment before image endpoints unlock.
  An API key with the images:write scope. Project-scoped keys are recommended over user-scoped keys for production.
  A testing  tool that previews image responses. Terminal curl works for a first request; after that, use a real API client. More on that below.

Set it as an environment variable:
  Mac/Linux:
    export OPENAI_API_KEY="your_api_key_here"
  Windows (PowerShell):
    setx OPENAI_API_KEY "your_api_key_here"

**2. Endpoint and authentication**
  gpt-image-2 uses the same image generation endpoint as the previous model:
    POST https://api.openai.com/v1/images/generations

  Authentication is a bearer token in the Authorization header. Every request also carries a JSON body with the model ID, prompt, and output parameters.
curl https://api.openai.com/v1/images/generations \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-image-2",
    "prompt": "A sharp product hero image for an API testing platform, dark background",
    "size": "1024x1024",
    "n": 1,
    "quality": "high"
  }'
  
  If the call succeeds you get back a JSON object with a data array of images. Failures return a standard OpenAI error envelope with a code and a human-readable message; the error table later in this guide covers the common ones.

**3. Request parameters**
Every field in the request body changes what you pay and what you get. Here’s the complete parameter map for gpt-image-2.
  model
  prompt
  size
  quality
  n
  thinking
  response_format
  user
  background
  seed

_Important parameters_
  model: "gpt-image-2"
  prompt: description of image
  size: "256x256", "512x512", "1024x1024"
  background: "transparent" (optional)
  mask: for advanced editing

  **Python example**: The official SDK (openai>=1.50.0) adds native support for gpt-image-2:
    import base64
    from pathlib import Path
    from openai import OpenAI
    
    client = OpenAI()
    
    response = client.images.generate(
        model="gpt-image-2",
        prompt=(
            "A minimalist diagram of an OAuth 2.1 authorization code flow with PKCE. "
            "Five boxes labeled in English: User, Client, Auth Server, Resource Server, Token. "
            "Sharp sans-serif text, off-white background, teal accent arrows."
        ),
        size="1536x1024",
        quality="high",
        n=2,
        thinking="medium",
        response_format="b64_json",
    )
    
    out_dir = Path("out")
    out_dir.mkdir(exist_ok=True)
    
    for i, image in enumerate(response.data):
        png_bytes = base64.b64decode(image.b64_json)
        (out_dir / f"oauth_{i}.png").write_bytes(png_bytes)
    
    print(f"Generated {len(response.data)} images into {out_dir.resolve()}")

  _Two things worth flagging:_
  response.data is a list even when n=1. Always iterate.
  b64_json is easier for local scripts; url is better when you forward the image to a CDN or S3 upload, since you skip the decode-then-reencode cycle.

**Node.js / TypeScript example**
    import fs from "node:fs/promises";
    import OpenAI from "openai";
    
    const client = new OpenAI();
    
    const response = await client.images.generate({
      model: "gpt-image-2",
      prompt:
        "Dashboard UI mockup for a REST client, sentence-case labels, latency sparkline in the top-right, cool grey palette.",
      size: "1536x1024",
      quality: "high",
      n: 4,
      thinking: "medium",
      response_format: "b64_json",
    });
    
    await Promise.all(
      response.data.map(async (image, i) => {
        if (!image.b64_json) return;
        await fs.writeFile(`dash_${i}.png`, Buffer.from(image.b64_json, "base64"));
      }),
    );
    
    console.log(`Saved ${response.data.length} images`);

Use the official SDK rather than raw fetch unless you have a reason not to. The SDK handles retry, idempotency headers, and streaming, and it tracks breaking schema changes between model revisions.

_Install SDK_
  Python
    pip install openai
  Node.js
    npm install openai  

**4. Thinking mode: when to use it**
thinking controls how much compute the model spends planning the layout before rendering. Four values, roughly:
off: no reasoning. Fastest, cheapest, best for loose creative prompts where composition does not have to be exact.
low: light planning. A good default for product shots and hero images.
medium: heavier planning. Right choice for diagrams, infographics, slides, and anything with counted elements (“four panels”, “three arrows”).
high: maximum reasoning. Only pays off on complex multilingual layouts or strict technical diagrams; expect noticeably higher latency and cost.
A practical rule: if the prompt contains a number, a label, or a positional constraint, move up one tier. If it just says “a cozy scene”, drop a tier.

**5. Batch generation**
Setting n > 1 returns multiple images in a single response that share composition and style. This is not the same as calling the endpoint n times in parallel; that gives you four unrelated images. Batched output is coherent, which matches how a design team iterates.
  response = client.images.generate(
      model="gpt-image-2",
      prompt="Four different hero illustrations for an API documentation landing page, shared color palette, shared line weight.",
      size="1536x1024",
      quality="high",
      n=4,
      thinking="low",
  )
  
  You pay per image, so n=4 costs roughly 4× n=1. The win is consistency, not throughput.

**6. Response format and storage**
  Two formats, two use cases:
    b64_json: the image is inline in the response. Easy for scripts. Response payloads get large fast; a 2000-wide high-quality PNG can push response size past 3 MB.
    url: the image sits on OpenAI’s CDN for one hour, and you download it yourself. Better for serverless functions with response size limits and for pipelines that forward the image to your own storage.
  For production, download the URL and push it to your own S3, R2, or Cloudflare Images bucket immediately. Do not ship OpenAI URLs to end users; they expire.

**7. Error handling and rate limits**
  Retryable errors in production:
  import time
  from openai import OpenAI, RateLimitError, APIStatusError
  
  client = OpenAI()
  
  def generate_with_retry(prompt: str, tries: int = 3):
      delay = 1.0
      for attempt in range(tries):
          try:
              return client.images.generate(
                  model="gpt-image-2",
                  prompt=prompt,
                  size="1024x1024",
                  quality="high",
                  n=1,
              )
          except RateLimitError:
              time.sleep(delay)
              delay *= 2
          except APIStatusError as e:
              if 500 <= e.status_code < 600 and attempt < tries - 1:
                  time.sleep(delay)
                  delay *= 2
                  continue
              raise
      raise RuntimeError("gpt-image-2 retries exhausted")
  
  Do not retry 400s, 401s, or content-policy 429s; those fail for a reason and retrying wastes credits.

**8. Your FIRST image generation**
  _Python example_
    from openai import OpenAI
    import base64
    
    client = OpenAI()
    
    prompt = "A cute robot reading a book in a cozy library, warm lighting"
    
    result = client.images.generate(
        model="gpt-image-2",
        prompt=prompt,
        size="1024x1024"
    )
    
    # Convert base64 → image file
    image_base64 = result.data[0].b64_json
    image_bytes = base64.b64decode(image_base64)
    
    with open("output.png", "wb") as f:
        f.write(image_bytes)
    
    print("Image saved as output.png")

_JavaScript example_
  import OpenAI from "openai";
  import fs from "fs";
  
  const client = new OpenAI();
  
  const prompt = "A futuristic city at sunset, cyberpunk style";
  
  const result = await client.images.generate({
    model: "gpt-image-2",
    prompt: prompt,
    size: "1024x1024"
  });
  
  const image_base64 = result.data[0].b64_json;
  const image_bytes = Buffer.from(image_base64, "base64");
  
  fs.writeFileSync("output.png", image_bytes);
  
  console.log("Image saved!");
  
**9. Editing an existing image**
You can modify images using a prompt.
_Python example_
  result = client.images.edit(
      model="gpt-image-2",
      image=open("input.png", "rb"),
      prompt="Add a rainbow in the sky"
  )

**10. Text generation (core brain)**
Use the Responses API (GPT models) for:
Generating prompts automatically
Writing captions, stories, UI text
_Example:_
  from openai import OpenAI
  client = OpenAI()
  
  res = client.responses.create(
     model="gpt-4.1",
     input="Write a detailed prompt for a fantasy landscape image"
  )
  
  print(res.output[0].content[0].text)
