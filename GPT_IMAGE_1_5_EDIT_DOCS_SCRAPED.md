# GPT-Image-1.5 Edit Docs - Consolidated Scrape

Generated: 2026-04-30 16:01:22 +07:00

## Scope
- Official sources only: `developers.openai.com` docs + OpenAI Cookbook.
- Focus: edit-image flow (`/images/edits`, mask, `input_fidelity`, Responses `action=edit`).
- Date note: as of 2026-04-30, docs position `gpt-image-2` as newer; this file harvests `gpt-image-1.5`-relevant material.
- Coverage lock: Responses tool supports forcing edit mode via `action: "edit"` (alongside `auto` and `generate`), and this file includes that behavior in the tools guide section.

## Source Manifest
1. Create image edit
   - Canonical: https://developers.openai.com/api/reference/resources/images/methods/edit
   - Fetch URL: https://developers.openai.com/api/reference/resources/images/methods/edit/index.md
   - Mode: markdown
2. Image generation guide
   - Canonical: https://developers.openai.com/api/docs/guides/image-generation
   - Fetch URL: https://developers.openai.com/api/docs/guides/image-generation.md
   - Mode: markdown
3. Tools image generation guide
   - Canonical: https://developers.openai.com/api/docs/guides/tools-image-generation
   - Fetch URL: https://developers.openai.com/api/docs/guides/tools-image-generation.md
   - Mode: markdown
4. GPT Image 1.5 model page
   - Canonical: https://developers.openai.com/api/docs/models/gpt-image-1.5
   - Fetch URL: https://developers.openai.com/api/docs/models/gpt-image-1.5.md
   - Mode: model-extract
5. Gpt-image-1.5 Prompting Guide
   - Canonical: https://developers.openai.com/cookbook/examples/multimodal/image-gen-1.5-prompting_guide
   - Fetch URL: https://developers.openai.com/cookbook/examples/multimodal/image-gen-1.5-prompting_guide.md
   - Mode: markdown
6. Generate and edit images with GPT Image
   - Canonical: https://developers.openai.com/cookbook/examples/generate_images_with_gpt_image
   - Fetch URL: https://developers.openai.com/cookbook/examples/generate_images_with_gpt_image.md
   - Mode: markdown
7. Generate images with high input fidelity
   - Canonical: https://developers.openai.com/cookbook/examples/generate_images_with_high_input_fidelity
   - Fetch URL: https://developers.openai.com/cookbook/examples/generate_images_with_high_input_fidelity.md
   - Mode: markdown

---

## Create image edit

- Canonical URL: https://developers.openai.com/api/reference/resources/images/methods/edit
- Fetch URL: https://developers.openai.com/api/reference/resources/images/methods/edit/index.md
- Fetch mode: markdown

### Scraped content

## Create image edit

**post** `/images/edits`

Creates an edited or extended image given one or more source images and a prompt. This endpoint supports GPT Image models (`gpt-image-1.5`, `gpt-image-1`, `gpt-image-1-mini`, and `chatgpt-image-latest`) and `dall-e-2`.

### Body Parameters

- `images: array of object { file_id, image_url }`

  Input image references to edit.
  For GPT image models, you can provide up to 16 images.

  - `file_id: optional string`

    The File API ID of an uploaded image to use as input.

  - `image_url: optional string`

    A fully qualified URL or base64-encoded data URL.

- `prompt: string`

  A text description of the desired image edit.

- `background: optional "transparent" or "opaque" or "auto"`

  Background behavior for generated image output.

  - `"transparent"`

  - `"opaque"`

  - `"auto"`

- `input_fidelity: optional "high" or "low"`

  Controls fidelity to the original input image(s).

  - `"high"`

  - `"low"`

- `mask: optional object { file_id, image_url }`

  Reference an input image by either URL or uploaded file ID.
  Provide exactly one of `image_url` or `file_id`.

  - `file_id: optional string`

    The File API ID of an uploaded image to use as input.

  - `image_url: optional string`

    A fully qualified URL or base64-encoded data URL.

- `model: optional string or "gpt-image-1.5" or "gpt-image-1" or "gpt-image-1-mini" or "chatgpt-image-latest"`

  The model to use for image editing.

  - `string`

  - `"gpt-image-1.5" or "gpt-image-1" or "gpt-image-1-mini" or "chatgpt-image-latest"`

    The model to use for image editing.

    - `"gpt-image-1.5"`

    - `"gpt-image-1"`

    - `"gpt-image-1-mini"`

    - `"chatgpt-image-latest"`

- `moderation: optional "low" or "auto"`

  Moderation level for GPT image models.

  - `"low"`

  - `"auto"`

- `n: optional number`

  The number of edited images to generate.

- `output_compression: optional number`

  Compression level for `jpeg` or `webp` output.

- `output_format: optional "png" or "jpeg" or "webp"`

  Output image format. Supported for GPT image models.

  - `"png"`

  - `"jpeg"`

  - `"webp"`

- `partial_images: optional number`

  The number of partial images to generate. This parameter is used for
  streaming responses that return partial images. Value must be between 0 and 3.
  When set to 0, the response will be a single image sent in one streaming event.

  Note that the final image may be sent before the full number of partial images
  are generated if the full image is generated more quickly.

- `quality: optional "low" or "medium" or "high" or "auto"`

  Output quality for GPT image models.

  - `"low"`

  - `"medium"`

  - `"high"`

  - `"auto"`

- `size: optional "auto" or "1024x1024" or "1536x1024" or "1024x1536"`

  Requested output image size.

  - `"auto"`

  - `"1024x1024"`

  - `"1536x1024"`

  - `"1024x1536"`

- `stream: optional boolean`

  Stream partial image results as events.

- `user: optional string`

  A unique identifier representing your end-user, which can help OpenAI
  monitor and detect abuse.

### Returns

- `ImagesResponse object { created, background, data, 4 more }`

  The response from the image generation endpoint.

  - `created: number`

    The Unix timestamp (in seconds) of when the image was created.

  - `background: optional "transparent" or "opaque"`

    The background parameter used for the image generation. Either `transparent` or `opaque`.

    - `"transparent"`

    - `"opaque"`

  - `data: optional array of Image`

    The list of generated images.

    - `b64_json: optional string`

      The base64-encoded JSON of the generated image. Returned by default for the GPT image models, and only present if `response_format` is set to `b64_json` for `dall-e-2` and `dall-e-3`.

    - `revised_prompt: optional string`

      For `dall-e-3` only, the revised prompt that was used to generate the image.

    - `url: optional string`

      When using `dall-e-2` or `dall-e-3`, the URL of the generated image if `response_format` is set to `url` (default value). Unsupported for the GPT image models.

  - `output_format: optional "png" or "webp" or "jpeg"`

    The output format of the image generation. Either `png`, `webp`, or `jpeg`.

    - `"png"`

    - `"webp"`

    - `"jpeg"`

  - `quality: optional "low" or "medium" or "high"`

    The quality of the image generated. Either `low`, `medium`, or `high`.

    - `"low"`

    - `"medium"`

    - `"high"`

  - `size: optional "1024x1024" or "1024x1536" or "1536x1024"`

    The size of the image generated. Either `1024x1024`, `1024x1536`, or `1536x1024`.

    - `"1024x1024"`

    - `"1024x1536"`

    - `"1536x1024"`

  - `usage: optional object { input_tokens, input_tokens_details, output_tokens, 2 more }`

    For `gpt-image-1` only, the token usage information for the image generation.

    - `input_tokens: number`

      The number of tokens (images and text) in the input prompt.

    - `input_tokens_details: object { image_tokens, text_tokens }`

      The input tokens detailed information for the image generation.

      - `image_tokens: number`

        The number of image tokens in the input prompt.

      - `text_tokens: number`

        The number of text tokens in the input prompt.

    - `output_tokens: number`

      The number of output tokens generated by the model.

    - `total_tokens: number`

      The total number of tokens (images and text) used for the image generation.

    - `output_tokens_details: optional object { image_tokens, text_tokens }`

      The output token details for the image generation.

      - `image_tokens: number`

        The number of image output tokens generated by the model.

      - `text_tokens: number`

        The number of text output tokens generated by the model.

### Example

```http
curl https://api.openai.com/v1/images/edits \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "images": [
            {
              "image_url": "https://example.com/source-image.png"
            }
          ],
          "prompt": "Add a watercolor effect to this image",
          "background": "transparent",
          "model": "gpt-image-1.5",
          "moderation": "auto",
          "n": 1,
          "output_compression": 100,
          "output_format": "png",
          "partial_images": 1,
          "quality": "high",
          "size": "1024x1024",
          "user": "user-1234"
        }'
```

#### Response

```json
{
  "created": 0,
  "background": "transparent",
  "data": [
    {
      "b64_json": "b64_json",
      "revised_prompt": "revised_prompt",
      "url": "https://example.com"
    }
  ],
  "output_format": "png",
  "quality": "low",
  "size": "1024x1024",
  "usage": {
    "input_tokens": 0,
    "input_tokens_details": {
      "image_tokens": 0,
      "text_tokens": 0
    },
    "output_tokens": 0,
    "total_tokens": 0,
    "output_tokens_details": {
      "image_tokens": 0,
      "text_tokens": 0
    }
  }
}
```

### Edit image

```http
curl -s -D >(grep -i x-request-id >&2) \
  -o >(jq -r '.data[0].b64_json' | base64 --decode > gift-basket.png) \
  -X POST "https://api.openai.com/v1/images/edits" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F "model=gpt-image-1.5" \
  -F "image[]=@body-lotion.png" \
  -F "image[]=@bath-bomb.png" \
  -F "image[]=@incense-kit.png" \
  -F "image[]=@soap.png" \
  -F 'prompt=Create a lovely gift basket with these four items in it'
```

### Streaming

```http
curl -s -N -X POST "https://api.openai.com/v1/images/edits" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F "model=gpt-image-1.5" \
  -F "image[]=@body-lotion.png" \
  -F "image[]=@bath-bomb.png" \
  -F "image[]=@incense-kit.png" \
  -F "image[]=@soap.png" \
  -F 'prompt=Create a lovely gift basket with these four items in it' \
  -F "stream=true"
```

#### Response

```json
event: image_edit.partial_image
data: {"type":"image_edit.partial_image","b64_json":"...","partial_image_index":0}

event: image_edit.completed
data: {"type":"image_edit.completed","b64_json":"...","usage":{"total_tokens":100,"input_tokens":50,"output_tokens":50,"input_tokens_details":{"text_tokens":10,"image_tokens":40}}}
```

---

## Image generation guide

- Canonical URL: https://developers.openai.com/api/docs/guides/image-generation
- Fetch URL: https://developers.openai.com/api/docs/guides/image-generation.md
- Fetch mode: markdown

### Scraped content

# Image generation

## Overview

The OpenAI API lets you generate and edit images from text prompts using GPT Image models, including our latest, `gpt-image-2`. You can access image generation capabilities through two APIs:

### Image API

Starting with `gpt-image-1` and later models, the [Image API](https://developers.openai.com/api/docs/api-reference/images) provides two endpoints, each with distinct capabilities:

- **Generations**: [Generate images](#generate-images) from scratch based on a text prompt
- **Edits**: [Modify existing images](#edit-images) using a new prompt, either partially or entirely

The Image API also includes a variations endpoint for models that support it, such as DALL·E 2.

### Responses API

The [Responses API](https://developers.openai.com/api/docs/api-reference/responses/create#responses-create-tools) allows you to generate images as part of conversations or multi-step flows. It supports image generation as a [built-in tool](https://developers.openai.com/api/docs/guides/tools?api-mode=responses), and accepts image inputs and outputs within context.

Compared to the Image API, it adds:

- **Multi-turn editing**: Iteratively make high fidelity edits to images with prompting
- **Flexible inputs**: Accept image [File](https://developers.openai.com/api/docs/api-reference/files) IDs as input images, not just bytes

The Responses API image generation tool uses its own GPT Image model selection. For details on mainline models that support calling this tool, refer to the [supported models](#supported-models) below.

### Choosing the right API

- If you only need to generate or edit a single image from one prompt, the Image API is your best choice.
- If you want to build conversational, editable image experiences with GPT Image, go with the Responses API.

Both APIs let you [customize output](#customize-image-output) by adjusting quality, size, format, and compression. Transparent backgrounds depend on model support.

This guide focuses on GPT Image.

To ensure these models are used responsibly, you may need to complete the [API
  Organization
  Verification](https://help.openai.com/en/articles/10910291-api-organization-verification)
  from your [developer
  console](https://platform.openai.com/settings/organization/general) before
  using GPT Image models, including `gpt-image-2`, `gpt-image-1.5`,
  `gpt-image-1`, and `gpt-image-1-mini`.

<div
  className="not-prose"
  style={{ float: "right", margin: "10px 0 10px 10px" }}
>
  <img src="https://cdn.openai.com/API/docs/images/mug.png"
    alt="A beige coffee mug on a wooden table"
    style={{ height: "180px", width: "auto", borderRadius: "8px" }}
  />
</div>

## Generate Images

You can use the [image generation endpoint](https://developers.openai.com/api/docs/api-reference/images/create) to create images based on text prompts, or the [image generation tool](https://developers.openai.com/api/docs/guides/tools?api-mode=responses) in the Responses API to generate images as part of a conversation.

To learn more about customizing the output (size, quality, format, compression), refer to the [customize image output](#customize-image-output) section below.

You can set the `n` parameter to generate multiple images at once in a single request (by default, the API returns a single image).



<div data-content-switcher-pane data-value="responses">
    <div class="hidden">Responses API</div>
    Generate an image

```javascript
import OpenAI from "openai";
const openai = new OpenAI();

const response = await openai.responses.create({
    model: "gpt-5.5",
    input: "Generate an image of gray tabby cat hugging an otter with an orange scarf",
    tools: [{type: "image_generation"}],
});

// Save the image to a file
const imageData = response.output
  .filter((output) => output.type === "image_generation_call")
  .map((output) => output.result);

if (imageData.length > 0) {
  const imageBase64 = imageData[0];
  const fs = await import("fs");
  fs.writeFileSync("otter.png", Buffer.from(imageBase64, "base64"));
}
```

```python
from openai import OpenAI
import base64

client = OpenAI() 

response = client.responses.create(
    model="gpt-5.5",
    input="Generate an image of gray tabby cat hugging an otter with an orange scarf",
    tools=[{"type": "image_generation"}],
)

# Save the image to a file
image_data = [
    output.result
    for output in response.output
    if output.type == "image_generation_call"
]
    
if image_data:
    image_base64 = image_data[0]
    with open("otter.png", "wb") as f:
        f.write(base64.b64decode(image_base64))
```

  </div>
  <div data-content-switcher-pane data-value="image" hidden>
    <div class="hidden">Image API</div>
    Generate an image

```javascript
import OpenAI from "openai";
import fs from "fs";
const openai = new OpenAI();

const prompt = \`
A children's book drawing of a veterinarian using a stethoscope to 
listen to the heartbeat of a baby otter.
\`;

const result = await openai.images.generate({
    model: "gpt-image-2",
    prompt,
});

// Save the image to a file
const image_base64 = result.data[0].b64_json;
const image_bytes = Buffer.from(image_base64, "base64");
fs.writeFileSync("otter.png", image_bytes);
```

```python
from openai import OpenAI
import base64
client = OpenAI()

prompt = """
A children's book drawing of a veterinarian using a stethoscope to 
listen to the heartbeat of a baby otter.
"""

result = client.images.generate(
    model="gpt-image-2",
    prompt=prompt
)

image_base64 = result.data[0].b64_json
image_bytes = base64.b64decode(image_base64)

# Save the image to a file
with open("otter.png", "wb") as f:
    f.write(image_bytes)
```

```bash
curl -X POST "https://api.openai.com/v1/images/generations" \\
    -H "Authorization: Bearer $OPENAI_API_KEY" \\
    -H "Content-type: application/json" \\
    -d '{
        "model": "gpt-image-2",
        "prompt": "A childrens book drawing of a veterinarian using a stethoscope to listen to the heartbeat of a baby otter."
    }' | jq -r '.data[0].b64_json' | base64 --decode > otter.png
```

  </div>



### Multi-turn image generation

With the Responses API, you can build multi-turn conversations involving image generation either by providing image generation calls outputs within context (you can also just use the image ID), or by using the [`previous_response_id` parameter](https://developers.openai.com/api/docs/guides/conversation-state?api-mode=responses#openai-apis-for-conversation-state).
This lets you iterate on images across multiple turns—refining prompts, applying new instructions, and evolving the visual output as the conversation progresses.

With the Responses API image generation tool, supported tool models can choose whether to generate a new image or edit one already in the conversation. The optional `action` parameter controls this behavior: keep `action: "auto"` to let the model decide, set `action: "generate"` to always create a new image, or set `action: "edit"` to force editing when an image is in context.

Force image creation with action

```javascript
import OpenAI from "openai";
const openai = new OpenAI();

const response = await openai.responses.create({
    model: "gpt-5.5",
    input: "Generate an image of gray tabby cat hugging an otter with an orange scarf",
    tools: [{type: "image_generation", action: "generate"}],
});

// Save the image to a file
const imageData = response.output
  .filter((output) => output.type === "image_generation_call")
  .map((output) => output.result);

if (imageData.length > 0) {
  const imageBase64 = imageData[0];
  const fs = await import("fs");
  fs.writeFileSync("otter.png", Buffer.from(imageBase64, "base64"));
}
```

```python
from openai import OpenAI
import base64

client = OpenAI() 

response = client.responses.create(
    model="gpt-5.5",
    input="Generate an image of gray tabby cat hugging an otter with an orange scarf",
    tools=[{"type": "image_generation", "action": "generate"}],
)

# Save the image to a file
image_data = [
    output.result
    for output in response.output
    if output.type == "image_generation_call"
]
    
if image_data:
    image_base64 = image_data[0]
    with open("otter.png", "wb") as f:
        f.write(base64.b64decode(image_base64))
```


If you force `edit` without providing an image in context, the call will return an error. Leave `action` at `auto` to have the model decide when to generate or edit.



<div data-content-switcher-pane data-value="responseid">
    <div class="hidden">Using previous response ID</div>
    Multi-turn image generation

```javascript
import OpenAI from "openai";
const openai = new OpenAI();

const response = await openai.responses.create({
  model: "gpt-5.5",
  input:
    "Generate an image of gray tabby cat hugging an otter with an orange scarf",
  tools: [{ type: "image_generation" }],
});

const imageData = response.output
  .filter((output) => output.type === "image_generation_call")
  .map((output) => output.result);

if (imageData.length > 0) {
  const imageBase64 = imageData[0];
  const fs = await import("fs");
  fs.writeFileSync("cat_and_otter.png", Buffer.from(imageBase64, "base64"));
}

// Follow up

const response_fwup = await openai.responses.create({
  model: "gpt-5.5",
  previous_response_id: response.id,
  input: "Now make it look realistic",
  tools: [{ type: "image_generation" }],
});

const imageData_fwup = response_fwup.output
  .filter((output) => output.type === "image_generation_call")
  .map((output) => output.result);

if (imageData_fwup.length > 0) {
  const imageBase64 = imageData_fwup[0];
  const fs = await import("fs");
  fs.writeFileSync(
    "cat_and_otter_realistic.png",
    Buffer.from(imageBase64, "base64")
  );
}
```

```python
from openai import OpenAI
import base64

client = OpenAI()

response = client.responses.create(
    model="gpt-5.5",
    input="Generate an image of gray tabby cat hugging an otter with an orange scarf",
    tools=[{"type": "image_generation"}],
)

image_data = [
    output.result
    for output in response.output
    if output.type == "image_generation_call"
]

if image_data:
    image_base64 = image_data[0]

    with open("cat_and_otter.png", "wb") as f:
        f.write(base64.b64decode(image_base64))


# Follow up

response_fwup = client.responses.create(
    model="gpt-5.5",
    previous_response_id=response.id,
    input="Now make it look realistic",
    tools=[{"type": "image_generation"}],
)

image_data_fwup = [
    output.result
    for output in response_fwup.output
    if output.type == "image_generation_call"
]

if image_data_fwup:
    image_base64 = image_data_fwup[0]
    with open("cat_and_otter_realistic.png", "wb") as f:
        f.write(base64.b64decode(image_base64))
```

  </div>
  <div data-content-switcher-pane data-value="imageid" hidden>
    <div class="hidden">Using image ID</div>
    Multi-turn image generation

```javascript
import OpenAI from "openai";
const openai = new OpenAI();

const response = await openai.responses.create({
  model: "gpt-5.5",
  input:
    "Generate an image of gray tabby cat hugging an otter with an orange scarf",
  tools: [{ type: "image_generation" }],
});

const imageGenerationCalls = response.output.filter(
  (output) => output.type === "image_generation_call"
);

const imageData = imageGenerationCalls.map((output) => output.result);

if (imageData.length > 0) {
  const imageBase64 = imageData[0];
  const fs = await import("fs");
  fs.writeFileSync("cat_and_otter.png", Buffer.from(imageBase64, "base64"));
}

// Follow up

const response_fwup = await openai.responses.create({
  model: "gpt-5.5",
  input: [
    {
      role: "user",
      content: [{ type: "input_text", text: "Now make it look realistic" }],
    },
    {
      type: "image_generation_call",
      id: imageGenerationCalls[0].id,
    },
  ],
  tools: [{ type: "image_generation" }],
});

const imageData_fwup = response_fwup.output
  .filter((output) => output.type === "image_generation_call")
  .map((output) => output.result);

if (imageData_fwup.length > 0) {
  const imageBase64 = imageData_fwup[0];
  const fs = await import("fs");
  fs.writeFileSync(
    "cat_and_otter_realistic.png",
    Buffer.from(imageBase64, "base64")
  );
}
```

```python
import openai
import base64

response = openai.responses.create(
    model="gpt-5.5",
    input="Generate an image of gray tabby cat hugging an otter with an orange scarf",
    tools=[{"type": "image_generation"}],
)

image_generation_calls = [
    output
    for output in response.output
    if output.type == "image_generation_call"
]

image_data = [output.result for output in image_generation_calls]

if image_data:
    image_base64 = image_data[0]

    with open("cat_and_otter.png", "wb") as f:
        f.write(base64.b64decode(image_base64))


# Follow up

response_fwup = openai.responses.create(
    model="gpt-5.5",
    input=[
        {
            "role": "user",
            "content": [{"type": "input_text", "text": "Now make it look realistic"}],
        },
        {
            "type": "image_generation_call",
            "id": image_generation_calls[0].id,
        },
    ],
    tools=[{"type": "image_generation"}],
)

image_data_fwup = [
    output.result
    for output in response_fwup.output
    if output.type == "image_generation_call"
]

if image_data_fwup:
    image_base64 = image_data_fwup[0]
    with open("cat_and_otter_realistic.png", "wb") as f:
        f.write(base64.b64decode(image_base64))
```

  </div>



#### Result

<div className="not-prose">
  <table style={{ width: "100%" }}>
    <tbody>
      <tr>
        <td style={{ verticalAlign: "top", padding: "0 16px 16px 0" }}>
          "Generate an image of gray tabby cat hugging an otter with an orange
          scarf"
        </td>
        <td
          style={{
            textAlign: "right",
            verticalAlign: "top",
            paddingBottom: "16px",
          }}
        >
          <img src="https://cdn.openai.com/API/docs/images/cat_and_otter.png"
            alt="A cat and an otter"
            style={{ width: "200px", borderRadius: "8px" }}
          />
        </td>
      </tr>
      <tr>
        <td style={{ verticalAlign: "top", padding: "0 16px 0 0" }}>
          "Now make it look realistic"
        </td>
        <td style={{ textAlign: "right", verticalAlign: "top" }}>
          <img src="https://cdn.openai.com/API/docs/images/cat_and_otter_realistic.png"
            alt="A cat and an otter"
            style={{ width: "200px", borderRadius: "8px" }}
          />
        </td>
      </tr>
    </tbody>
  </table>
</div>

### Streaming

The Responses API and Image API support streaming image generation. You can stream partial images as the APIs generate them, providing a more interactive experience.

You can adjust the `partial_images` parameter to receive 0-3 partial images.

- If you set `partial_images` to 0, you will only receive the final image.
- For values larger than zero, you may not receive the full number of partial images you requested if the full image is generated more quickly.



<div data-content-switcher-pane data-value="responses">
    <div class="hidden">Responses API</div>
    Stream an image

```javascript
import OpenAI from "openai";
import fs from "fs";
const openai = new OpenAI();

const stream = await openai.responses.create({
  model: "gpt-5.5",
  input:
    "Draw a gorgeous image of a river made of white owl feathers, snaking its way through a serene winter landscape",
  stream: true,
  tools: [{ type: "image_generation", partial_images: 2 }],
});

for await (const event of stream) {
  if (event.type === "response.image_generation_call.partial_image") {
    const idx = event.partial_image_index;
    const imageBase64 = event.partial_image_b64;
    const imageBuffer = Buffer.from(imageBase64, "base64");
    fs.writeFileSync(\`river\${idx}.png\`, imageBuffer);
  }
}
```

```python
from openai import OpenAI
import base64

client = OpenAI()

stream = client.responses.create(
    model="gpt-5.5",
    input="Draw a gorgeous image of a river made of white owl feathers, snaking its way through a serene winter landscape",
    stream=True,
    tools=[{"type": "image_generation", "partial_images": 2}],
)

for event in stream:
    if event.type == "response.image_generation_call.partial_image":
        idx = event.partial_image_index
        image_base64 = event.partial_image_b64
        image_bytes = base64.b64decode(image_base64)
        with open(f"river{idx}.png", "wb") as f:
            f.write(image_bytes)
```

  </div>
  <div data-content-switcher-pane data-value="image" hidden>
    <div class="hidden">Image API</div>
    Stream an image

```javascript
import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI();

const prompt =
  "Draw a gorgeous image of a river made of white owl feathers, snaking its way through a serene winter landscape";
const stream = await openai.images.generate({
  prompt: prompt,
  model: "gpt-image-2",
  stream: true,
  partial_images: 2,
});

for await (const event of stream) {
  if (event.type === "image_generation.partial_image") {
    const idx = event.partial_image_index;
    const imageBase64 = event.b64_json;
    const imageBuffer = Buffer.from(imageBase64, "base64");
    fs.writeFileSync(\`river\${idx}.png\`, imageBuffer);
  }
}
```

```python
from openai import OpenAI
import base64

client = OpenAI()

stream = client.images.generate(
    prompt="Draw a gorgeous image of a river made of white owl feathers, snaking its way through a serene winter landscape",
    model="gpt-image-2",
    stream=True,
    partial_images=2,
)

for event in stream:
    if event.type == "image_generation.partial_image":
        idx = event.partial_image_index
        image_base64 = event.b64_json
        image_bytes = base64.b64decode(image_base64)
        with open(f"river{idx}.png", "wb") as f:
            f.write(image_bytes)
```

  </div>



#### Result

<div className="images-examples">

| Partial 1                                                                                                                       | Partial 2                                                                                                                       | Final image                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| <img className="images-example-image" src="https://cdn.openai.com/API/docs/images/imgen1p5-streaming1.png" alt="1st partial" /> | <img className="images-example-image" src="https://cdn.openai.com/API/docs/images/imgen1p5-streaming2.png" alt="2nd partial" /> | <img className="images-example-image" src="https://cdn.openai.com/API/docs/images/imgen1p5-streaming3.png" alt="3rd partial" /> |

</div>

<div className="images-edit-prompt body-small">
  Prompt: Draw a gorgeous image of a river made of white owl feathers, snaking
  its way through a serene winter landscape
</div>

### Revised prompt

When using the image generation tool in the Responses API, the mainline model (for example, `gpt-5.5`) will automatically revise your prompt for improved performance.

You can access the revised prompt in the `revised_prompt` field of the image generation call:

Revised prompt response

```json
{
  "id": "ig_123",
  "type": "image_generation_call",
  "status": "completed",
  "revised_prompt": "A gray tabby cat hugging an otter. The otter is wearing an orange scarf. Both animals are cute and friendly, depicted in a warm, heartwarming style.",
  "result": "..."
}
```


## Edit Images

The [image edits](https://developers.openai.com/api/docs/api-reference/images/createEdit) endpoint lets you:

- Edit existing images
- Generate new images using other images as a reference
- Edit parts of an image by uploading an image and mask that identifies the areas to replace

### Create a new image using image references

You can use one or more images as a reference to generate a new image.

In this example, we'll use 4 input images to generate a new image of a gift basket containing the items in the reference images.

<div data-content-switcher-pane data-value="responses">
    <div class="hidden">Responses API</div>
    </div>
  <div data-content-switcher-pane data-value="image" hidden>
    <div class="hidden">Image API</div>
    Edit an image

```python
import base64
from openai import OpenAI
client = OpenAI()

prompt = """
Generate a photorealistic image of a gift basket on a white background 
labeled 'Relax & Unwind' with a ribbon and handwriting-like font, 
containing all the items in the reference pictures.
"""

result = client.images.edit(
    model="gpt-image-2",
    image=[
        open("body-lotion.png", "rb"),
        open("bath-bomb.png", "rb"),
        open("incense-kit.png", "rb"),
        open("soap.png", "rb"),
    ],
    prompt=prompt
)

image_base64 = result.data[0].b64_json
image_bytes = base64.b64decode(image_base64)

# Save the image to a file
with open("gift-basket.png", "wb") as f:
    f.write(image_bytes)
```

```javascript
import fs from "fs";
import OpenAI, { toFile } from "openai";

const client = new OpenAI();

const prompt = \`
Generate a photorealistic image of a gift basket on a white background 
labeled 'Relax & Unwind' with a ribbon and handwriting-like font, 
containing all the items in the reference pictures.
\`;

const imageFiles = [
    "bath-bomb.png",
    "body-lotion.png",
    "incense-kit.png",
    "soap.png",
];

const images = await Promise.all(
    imageFiles.map(async (file) =>
        await toFile(fs.createReadStream(file), null, {
            type: "image/png",
        })
    ),
);

const response = await client.images.edit({
    model: "gpt-image-2",
    image: images,
    prompt,
});

// Save the image to a file
const image_base64 = response.data[0].b64_json;
const image_bytes = Buffer.from(image_base64, "base64");
fs.writeFileSync("basket.png", image_bytes);
```

```bash
curl -s -D >(grep -i x-request-id >&2) \\
  -o >(jq -r '.data[0].b64_json' | base64 --decode > gift-basket.png) \\
  -X POST "https://api.openai.com/v1/images/edits" \\
  -H "Authorization: Bearer $OPENAI_API_KEY" \\
  -F "model=gpt-image-2" \\
  -F "image[]=@body-lotion.png" \\
  -F "image[]=@bath-bomb.png" \\
  -F "image[]=@incense-kit.png" \\
  -F "image[]=@soap.png" \\
  -F 'prompt=Generate a photorealistic image of a gift basket on a white background labeled "Relax & Unwind" with a ribbon and handwriting-like font, containing all the items in the reference pictures'
```

  </div>



### Edit an image using a mask

You can provide a mask to indicate which part of the image should be edited.

When using a mask with GPT Image, additional instructions are sent to the model to help guide the editing process accordingly.

Masking with GPT Image is entirely prompt-based. The model uses the mask as
  guidance, but may not follow its exact shape with complete precision.

If you provide multiple input images, the mask will be applied to the first image.



<div data-content-switcher-pane data-value="responses">
    <div class="hidden">Responses API</div>
    Edit an image with a mask

```python
from openai import OpenAI
client = OpenAI()

fileId = create_file("sunlit_lounge.png")
maskId = create_file("mask.png")

response = client.responses.create(
    model="gpt-5.5",
    input=[
        {
            "role": "user",
            "content": [
                {
                    "type": "input_text",
                    "text": "generate an image of the same sunlit indoor lounge area with a pool but the pool should contain a flamingo",
                },
                {
                    "type": "input_image",
                    "file_id": fileId,
                }
            ],
        },
    ],
    tools=[
        {
            "type": "image_generation",
            "quality": "high",
            "input_image_mask": {
                "file_id": maskId,
            }
        },
    ],
)

image_data = [
    output.result
    for output in response.output
    if output.type == "image_generation_call"
]

if image_data:
    image_base64 = image_data[0]
    with open("lounge.png", "wb") as f:
        f.write(base64.b64decode(image_base64))
```

```javascript
import OpenAI from "openai";
const openai = new OpenAI();

const fileId = await createFile("sunlit_lounge.png");
const maskId = await createFile("mask.png");

const response = await openai.responses.create({
  model: "gpt-5.5",
  input: [
    {
      role: "user",
      content: [
        {
          type: "input_text",
          text: "generate an image of the same sunlit indoor lounge area with a pool but the pool should contain a flamingo",
        },
        {
          type: "input_image",
          file_id: fileId,
        }
      ],
    },
  ],
  tools: [
    {
      type: "image_generation",
      quality: "high",
      input_image_mask: {
        file_id: maskId,
      }
    },
  ],
});

const imageData = response.output
  .filter((output) => output.type === "image_generation_call")
  .map((output) => output.result);

if (imageData.length > 0) {
  const imageBase64 = imageData[0];
  const fs = await import("fs");
  fs.writeFileSync("lounge.png", Buffer.from(imageBase64, "base64"));
}
```

  </div>
  <div data-content-switcher-pane data-value="image" hidden>
    <div class="hidden">Image API</div>
    Edit an image with a mask

```python
from openai import OpenAI
client = OpenAI()

result = client.images.edit(
    model="gpt-image-2",
    image=open("sunlit_lounge.png", "rb"),
    mask=open("mask.png", "rb"),
    prompt="A sunlit indoor lounge area with a pool containing a flamingo"
)

image_base64 = result.data[0].b64_json
image_bytes = base64.b64decode(image_base64)

# Save the image to a file
with open("composition.png", "wb") as f:
    f.write(image_bytes)
```

```javascript
import fs from "fs";
import OpenAI, { toFile } from "openai";

const client = new OpenAI();

const rsp = await client.images.edit({
    model: "gpt-image-2",
    image: await toFile(fs.createReadStream("sunlit_lounge.png"), null, {
        type: "image/png",
    }),
    mask: await toFile(fs.createReadStream("mask.png"), null, {
        type: "image/png",
    }),
    prompt: "A sunlit indoor lounge area with a pool containing a flamingo",
});

// Save the image to a file
const image_base64 = rsp.data[0].b64_json;
const image_bytes = Buffer.from(image_base64, "base64");
fs.writeFileSync("lounge.png", image_bytes);
```

```bash
curl -s -D >(grep -i x-request-id >&2) \\
  -o >(jq -r '.data[0].b64_json' | base64 --decode > lounge.png) \\
  -X POST "https://api.openai.com/v1/images/edits" \\
  -H "Authorization: Bearer $OPENAI_API_KEY" \\
  -F "model=gpt-image-2" \\
  -F "mask=@mask.png" \\
  -F "image[]=@sunlit_lounge.png" \\
  -F 'prompt=A sunlit indoor lounge area with a pool containing a flamingo'
```

  </div>



<div className="images-examples">

| Image                                                                                                                                 | Mask                                                                                                                            | Output                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <img className="images-example-image" src="https://cdn.openai.com/API/docs/images/sunlit_lounge.png" alt="A pink room with a pool" /> | <img className="images-example-image" src="https://cdn.openai.com/API/docs/images/mask.png" alt="A mask in part of the pool" /> | <img className="images-example-image" src="https://cdn.openai.com/API/docs/images/sunlit_lounge_result.png" alt="The original pool with an inflatable flamigo replacing the mask" /> |

</div>

<div className="images-edit-prompt body-small">
  Prompt: a sunlit indoor lounge area with a pool containing a flamingo
</div>

#### Mask requirements

The image to edit and mask must be of the same format and size (less than 50MB in size).

The mask image must also contain an alpha channel. If you're using an image editing tool to create the mask, make sure to save the mask with an alpha channel.

You can modify a black and white image programmatically to add an alpha channel.

Add an alpha channel to a black and white mask

```python
from PIL import Image
from io import BytesIO

# 1. Load your black & white mask as a grayscale image
mask = Image.open(img_path_mask).convert("L")

# 2. Convert it to RGBA so it has space for an alpha channel
mask_rgba = mask.convert("RGBA")

# 3. Then use the mask itself to fill that alpha channel
mask_rgba.putalpha(mask)

# 4. Convert the mask into bytes
buf = BytesIO()
mask_rgba.save(buf, format="PNG")
mask_bytes = buf.getvalue()

# 5. Save the resulting file
img_path_mask_alpha = "mask_alpha.png"
with open(img_path_mask_alpha, "wb") as f:
    f.write(mask_bytes)
```


### Image input fidelity

The `input_fidelity` parameter controls how strongly a model preserves details from input images during edits and reference-image workflows. For `gpt-image-2`, omit this parameter; the API doesn't allow changing it because the model processes every image input at high fidelity automatically.

Because `gpt-image-2` always processes image inputs at high fidelity, image
  input tokens can be higher for edit requests that include reference images. To
  understand the cost implications, refer to the [vision
  costs](https://developers.openai.com/api/docs/guides/images-vision?api-mode=responses#calculating-costs)
  section.

## Customize Image Output

You can configure the following output options:

- **Size**: Image dimensions (for example, `1024x1024`, `1024x1536`)
- **Quality**: Rendering quality (for example, `low`, `medium`, `high`)
- **Format**: File output format
- **Compression**: Compression level (0-100%) for JPEG and WebP formats
- **Background**: Opaque or automatic

`size`, `quality`, and `background` support the `auto` option, where the model will automatically select the best option based on the prompt.

`gpt-image-2` doesn't currently support transparent backgrounds. Requests with
  `background: "transparent"` aren't supported for this model.

### Size and quality options

`gpt-image-2` accepts any resolution in the `size` parameter when it satisfies the constraints below. Square images are typically fastest to generate.

<table>
  <tbody>
    <tr>
      <td>Popular sizes</td>
      <td>
        <ul>
          <li>
            <code>1024x1024</code> (square)
          </li>
          <li>
            <code>1536x1024</code> (landscape)
          </li>
          <li>
            <code>1024x1536</code> (portrait)
          </li>
          <li>
            <code>2048x2048</code> (2K square)
          </li>
          <li>
            <code>2048x1152</code> (2K landscape)
          </li>
          <li>
            <code>3840x2160</code> (4K landscape)
          </li>
          <li>
            <code>2160x3840</code> (4K portrait)
          </li>
          <li>
            <code>auto</code> (default)
          </li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Size constraints</td>
      <td>
        <ul>
          <li>
            Maximum edge length must be less than or equal to{" "}
            <code>3840px</code>
          </li>
          <li>
            Both edges must be multiples of <code>16px</code>
          </li>
          <li>
            Long edge to short edge ratio must not exceed <code>3:1</code>
          </li>
          <li>
            Total pixels must be at least <code>655,360</code> and no more than{" "}
            <code>8,294,400</code>
          </li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Quality options</td>
      <td>
        <ul>
          <li>
            <code>low</code>
          </li>
          <li>
            <code>medium</code>
          </li>
          <li>
            <code>high</code>
          </li>
          <li>
            <code>auto</code> (default)
          </li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

Use `quality: "low"` for fast drafts, thumbnails, and quick iterations. It is
  the fastest option and works well for many common use cases before you move to
  `medium` or `high` for final assets.

Outputs that contain more than `2560x1440` (`3,686,400`) total pixels,
  typically referred to as 2K, are considered experimental.

### Output format

The Image API returns base64-encoded image data.
The default format is `png`, but you can also request `jpeg` or `webp`.

If using `jpeg` or `webp`, you can also specify the `output_compression` parameter to control the compression level (0-100%). For example, `output_compression=50` will compress the image by 50%.

Using `jpeg` is faster than `png`, so you should prioritize this format if
  latency is a concern.

## Limitations

GPT Image models (`gpt-image-2`, `gpt-image-1.5`, `gpt-image-1`, and `gpt-image-1-mini`) are powerful and versatile image generation models, but they still have some limitations to be aware of:

- **Latency:** Complex prompts may take up to 2 minutes to process.
- **Text Rendering:** Although significantly improved, the model can still struggle with precise text placement and clarity.
- **Consistency:** While capable of producing consistent imagery, the model may occasionally struggle to maintain visual consistency for recurring characters or brand elements across multiple generations.
- **Composition Control:** Despite improved instruction following, the model may have difficulty placing elements precisely in structured or layout-sensitive compositions.

### Content Moderation

All prompts and generated images are filtered in accordance with our [content policy](https://openai.com/policies/usage-policies/).

For image generation using GPT Image models (`gpt-image-2`, `gpt-image-1.5`, `gpt-image-1`, and `gpt-image-1-mini`), you can control moderation strictness with the `moderation` parameter. This parameter supports two values:

- `auto` (default): Standard filtering that seeks to limit creating certain categories of potentially age-inappropriate content.
- `low`: Less restrictive filtering.

### Supported models

When using image generation in the Responses API, `gpt-5` and newer models should support the image generation tool. [Check the model detail page for your model](https://developers.openai.com/api/docs/models) to confirm if your desired model can use the image generation tool.

## Cost and latency

### `gpt-image-2` output tokens

For `gpt-image-2`, use the calculator to estimate output tokens from the requested `quality` and `size`:

### Models prior to `gpt-image-2`

GPT Image models prior to `gpt-image-2` generate images by first producing specialized image tokens. Both latency and eventual cost are proportional to the number of tokens required to render an image—larger image sizes and higher quality settings result in more tokens.

The number of tokens generated depends on image dimensions and quality:

| Quality | Square (1024×1024) | Portrait (1024×1536) | Landscape (1536×1024) |
| ------- | ------------------ | -------------------- | --------------------- |
| Low     | 272 tokens         | 408 tokens           | 400 tokens            |
| Medium  | 1056 tokens        | 1584 tokens          | 1568 tokens           |
| High    | 4160 tokens        | 6240 tokens          | 6208 tokens           |

Note that you will also need to account for [input tokens](https://developers.openai.com/api/docs/guides/images-vision?api-mode=responses#calculating-costs): text tokens for the prompt and image tokens for the input images if editing images.
Because `gpt-image-2` always processes image inputs at high fidelity, edit requests that include reference images can use more input tokens.

Refer to the [pricing page](https://developers.openai.com/api/docs/pricing#image-generation) for current
text and image token prices, and use the [Calculating costs](#calculating-costs)
section below to estimate request costs.

The final cost is the sum of:

- input text tokens
- input image tokens if using the edits endpoint
- image output tokens

### Calculating costs

Use the pricing calculator below to estimate request costs for GPT Image models.
`gpt-image-2` supports thousands of valid resolutions; the table below lists the
same sizes used for previous GPT Image models for comparison. For GPT Image 1.5,
GPT Image 1, and GPT Image 1 Mini, the legacy per-image output pricing table is
also listed below. You should still account for text and image input tokens when
estimating the total cost of a request.

A larger non-square resolution can sometimes produce fewer output tokens than
  a smaller or square resolution at the same quality setting.

<table
  style={{ borderCollapse: "collapse", tableLayout: "fixed", width: "100%" }}
>
  <thead>
    <tr>
      <th style={{ textAlign: "left", padding: "8px", width: "28%" }}>Model</th>
      <th style={{ textAlign: "left", padding: "8px", width: "14%" }}>
        Quality
      </th>
      <th style={{ padding: "8px", width: "19.33%" }}>1024 x 1024</th>
      <th style={{ padding: "8px", width: "19.33%" }}>1024 x 1536</th>
      <th style={{ padding: "8px", width: "19.34%" }}>1536 x 1024</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowSpan="3" style={{ padding: "8px", width: "28%" }}>
        GPT Image 2
        <br />
        <span style={{ fontSize: "0.875em" }}>Additional sizes available</span>
      </td>
      <td style={{ padding: "8px" }}>Low</td>
      <td style={{ padding: "8px" }}>$0.006</td>
      <td style={{ padding: "8px" }}>$0.005</td>
      <td style={{ padding: "8px" }}>$0.005</td>
    </tr>
    <tr>
      <td style={{ padding: "8px" }}>Medium</td>
      <td style={{ padding: "8px" }}>$0.053</td>
      <td style={{ padding: "8px" }}>$0.041</td>
      <td style={{ padding: "8px" }}>$0.041</td>
    </tr>
    <tr>
      <td style={{ padding: "8px" }}>High</td>
      <td style={{ padding: "8px" }}>$0.211</td>
      <td style={{ padding: "8px" }}>$0.165</td>
      <td style={{ padding: "8px" }}>$0.165</td>
    </tr>

    <tr>
      <td rowSpan="3" style={{ padding: "8px", width: "28%" }}>
        GPT Image 1.5
      </td>
      <td style={{ padding: "8px" }}>Low</td>
      <td style={{ padding: "8px" }}>$0.009</td>
      <td style={{ padding: "8px" }}>$0.013</td>
      <td style={{ padding: "8px" }}>$0.013</td>
    </tr>
    <tr>
      <td style={{ padding: "8px" }}>Medium</td>
      <td style={{ padding: "8px" }}>$0.034</td>
      <td style={{ padding: "8px" }}>$0.05</td>
      <td style={{ padding: "8px" }}>$0.05</td>
    </tr>
    <tr>
      <td style={{ padding: "8px" }}>High</td>
      <td style={{ padding: "8px" }}>$0.133</td>
      <td style={{ padding: "8px" }}>$0.2</td>
      <td style={{ padding: "8px" }}>$0.2</td>
    </tr>

    <tr>
      <td rowSpan="3" style={{ padding: "8px", width: "28%" }}>
        GPT Image 1
      </td>
      <td style={{ padding: "8px" }}>Low</td>
      <td style={{ padding: "8px" }}>$0.011</td>
      <td style={{ padding: "8px" }}>$0.016</td>
      <td style={{ padding: "8px" }}>$0.016</td>
    </tr>
    <tr>
      <td style={{ padding: "8px" }}>Medium</td>
      <td style={{ padding: "8px" }}>$0.042</td>
      <td style={{ padding: "8px" }}>$0.063</td>
      <td style={{ padding: "8px" }}>$0.063</td>
    </tr>
    <tr>
      <td style={{ padding: "8px" }}>High</td>
      <td style={{ padding: "8px" }}>$0.167</td>
      <td style={{ padding: "8px" }}>$0.25</td>
      <td style={{ padding: "8px" }}>$0.25</td>
    </tr>

    <tr>
      <td rowSpan="3" style={{ padding: "8px", width: "28%" }}>
        GPT Image 1 Mini
      </td>
      <td style={{ padding: "8px" }}>Low</td>
      <td style={{ padding: "8px" }}>$0.005</td>
      <td style={{ padding: "8px" }}>$0.006</td>
      <td style={{ padding: "8px" }}>$0.006</td>
    </tr>
    <tr>
      <td style={{ padding: "8px" }}>Medium</td>
      <td style={{ padding: "8px" }}>$0.011</td>
      <td style={{ padding: "8px" }}>$0.015</td>
      <td style={{ padding: "8px" }}>$0.015</td>
    </tr>
    <tr>
      <td style={{ padding: "8px" }}>High</td>
      <td style={{ padding: "8px" }}>$0.036</td>
      <td style={{ padding: "8px" }}>$0.052</td>
      <td style={{ padding: "8px" }}>$0.052</td>
    </tr>

  </tbody>
</table>

### Partial images cost

If you want to [stream image generation](#streaming) using the `partial_images` parameter, each partial image will incur an additional 100 image output tokens.

---

## Tools image generation guide

- Canonical URL: https://developers.openai.com/api/docs/guides/tools-image-generation
- Fetch URL: https://developers.openai.com/api/docs/guides/tools-image-generation.md
- Fetch mode: markdown

### Scraped content

# Image generation

The image generation tool allows you to generate images using a text prompt, and optionally image inputs. It uses GPT Image models, including `gpt-image-2`, `gpt-image-1.5`, `gpt-image-1`, and `gpt-image-1-mini`, and automatically optimizes text inputs for improved performance.

To learn more about image generation, refer to our dedicated [image generation
  guide](https://developers.openai.com/api/docs/guides/image-generation?api=responses).

## Usage

When you include the `image_generation` tool in your request, the model can decide when and how to generate images as part of the conversation, using your prompt and any provided image inputs.

The `image_generation_call` tool call result will include a base64-encoded image.

Generate an image

```javascript
import OpenAI from "openai";
const openai = new OpenAI();

const response = await openai.responses.create({
    model: "gpt-5.5",
    input: "Generate an image of gray tabby cat hugging an otter with an orange scarf",
    tools: [{type: "image_generation"}],
});

// Save the image to a file
const imageData = response.output
  .filter((output) => output.type === "image_generation_call")
  .map((output) => output.result);

if (imageData.length > 0) {
  const imageBase64 = imageData[0];
  const fs = await import("fs");
  fs.writeFileSync("otter.png", Buffer.from(imageBase64, "base64"));
}
```

```python
from openai import OpenAI
import base64

client = OpenAI() 

response = client.responses.create(
    model="gpt-5.5",
    input="Generate an image of gray tabby cat hugging an otter with an orange scarf",
    tools=[{"type": "image_generation"}],
)

# Save the image to a file
image_data = [
    output.result
    for output in response.output
    if output.type == "image_generation_call"
]
    
if image_data:
    image_base64 = image_data[0]
    with open("otter.png", "wb") as f:
        f.write(base64.b64decode(image_base64))
```


You can [provide input images](https://developers.openai.com/api/docs/guides/image-generation?image-generation-model=gpt-image#edit-images) using file IDs or base64 data.

To force the image generation tool call, you can set the parameter `tool_choice` to `{"type": "image_generation"}`.

### Tool options

You can configure the following output options as parameters for the [image generation tool](https://developers.openai.com/api/docs/api-reference/responses/create#responses-create-tools):

- Size: Image dimensions, for example, 1024 × 1024 or 1024 × 1536
- Quality: Rendering quality, for example, low, medium, or high
- Format: File output format
- Compression: Compression level (0-100%) for JPEG and WebP formats
- Background: Transparent or opaque
- Action: Whether the request should automatically choose, generate, or edit an image

`size`, `quality`, and `background` support the `auto` option, where the model will automatically select the best option based on the prompt.

`gpt-image-2` supports flexible `size` values that meet its [resolution constraints](https://developers.openai.com/api/docs/guides/image-generation#size-and-quality-options). It doesn't currently support transparent backgrounds, so requests with `background: "transparent"` fail.

For more details on available options, refer to the [image generation guide](https://developers.openai.com/api/docs/guides/image-generation#customize-image-output).

When using the Responses API image generation tool, supported GPT Image models can choose whether to generate a new image or edit one already in the conversation. The optional `action` parameter controls this behavior: keep `action` set to `auto` so the model chooses whether to generate or edit, or set it to `generate` or `edit` to force that behavior. If not specified, the default is `auto`.

### Revised prompt

When using the image generation tool, the mainline model, for example, `gpt-5.5`, will automatically revise your prompt for improved performance.

You can access the revised prompt in the `revised_prompt` field of the image generation call:

```json
{
  "id": "ig_123",
  "type": "image_generation_call",
  "status": "completed",
  "revised_prompt": "A gray tabby cat hugging an otter. The otter is wearing an orange scarf. Both animals are cute and friendly, depicted in a warm, heartwarming style.",
  "result": "..."
}
```

### Prompting tips

Image generation works best when you use terms like `draw` or `edit` in your prompt.

For example, if you want to combine images, instead of saying `combine` or `merge`, you can say something like "edit the first image by adding this element from the second image."

## Multi-turn editing

You can iteratively edit images by referencing previous response or image IDs. This allows you to refine images across conversation turns.
## Streaming

The image generation tool supports streaming partial images while it generates the final result. This provides faster visual feedback for users and improves perceived latency.

You can set the number of partial images (1-3) with the `partial_images` parameter.

Stream an image

```javascript
import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI();

const prompt =
  "Draw a gorgeous image of a river made of white owl feathers, snaking its way through a serene winter landscape";
const stream = await openai.images.generate({
  prompt: prompt,
  model: "gpt-image-2",
  stream: true,
  partial_images: 2,
});

for await (const event of stream) {
  if (event.type === "image_generation.partial_image") {
    const idx = event.partial_image_index;
    const imageBase64 = event.b64_json;
    const imageBuffer = Buffer.from(imageBase64, "base64");
    fs.writeFileSync(\`river\${idx}.png\`, imageBuffer);
  }
}
```

```python
from openai import OpenAI
import base64

client = OpenAI()

stream = client.images.generate(
    prompt="Draw a gorgeous image of a river made of white owl feathers, snaking its way through a serene winter landscape",
    model="gpt-image-2",
    stream=True,
    partial_images=2,
)

for event in stream:
    if event.type == "image_generation.partial_image":
        idx = event.partial_image_index
        image_base64 = event.b64_json
        image_bytes = base64.b64decode(image_base64)
        with open(f"river{idx}.png", "wb") as f:
            f.write(image_bytes)
```


## Supported models

The following models support the image generation tool:

- `gpt-4o`
- `gpt-4o-mini`
- `gpt-4.1`
- `gpt-4.1-mini`
- `gpt-4.1-nano`
- `o3`
- `gpt-5`
- `gpt-5.4-mini`
- `gpt-5.4-nano`
- `gpt-5-nano`
- `gpt-5.5`
- `gpt-5.2`

The model used for the image generation process is always a GPT Image model, including `gpt-image-2`, `gpt-image-1.5`, `gpt-image-1`, and `gpt-image-1-mini`, but these models aren't valid values for the `model` field in the Responses API. Use a text-capable mainline model (for example, `gpt-5.5` or `gpt-5`) with the hosted `image_generation` tool.

---

## GPT Image 1.5 model page

- Canonical URL: https://developers.openai.com/api/docs/models/gpt-image-1.5
- Fetch URL: https://developers.openai.com/api/docs/models/gpt-image-1.5.md
- Fetch mode: model-extract

### Extracted model highlights
- GPT Image 1.5 is described on the page as a previous image generation model.
- Page text includes: "GPT Image 1.5 is our previous image generation model, with better instruction following and adherence to prompts."
- Snapshots section includes `gpt-image-1.5` and `gpt-image-1.5-2025-12-16`.
- The model page includes Image generation and Image edit endpoint support context.
- The page includes a rate-limits section and model pricing tables (tokens/image pricing).


### Note
The `.md` endpoint for this model page returns HTML shell in this environment, so this section includes cleaned textual highlights extracted from the canonical page.

---

## Gpt-image-1.5 Prompting Guide

- Canonical URL: https://developers.openai.com/cookbook/examples/multimodal/image-gen-1.5-prompting_guide
- Fetch URL: https://developers.openai.com/cookbook/examples/multimodal/image-gen-1.5-prompting_guide.md
- Fetch mode: markdown

### Scraped content


> Normalization note: this cookbook line reflects wording at publication time. Current API docs (2026-04-30) position `gpt-image-2` as the newer model.

# Gpt-image-1.5 Prompting Guide

## 1. Introduction

`gpt-image-1.5` is our latest image generation model, designed for production-quality visuals and highly controllable creative workflows. It delivers major improvements in realism, accuracy, and editability, making it well-suited for both professional design tasks and iterative content creation. It delivers major improvements in realism, accuracy, and editability compared to the previous generation, and supports both high-quality rendering and low-latency use cases.

Key Capabilities include: 

- **High-fidelity photorealism** with natural lighting, accurate materials, and rich color rendering
- **Flexible quality–latency tradeoffs**, allowing faster generation at lower settings while still exceeding the visual quality of prior-generation image models
- **Robust facial and identity preservation** for edits, character consistency, and multi-step workflows
- **Reliable text rendering** with crisp lettering, consistent layout, and strong contrast inside images
- **Complex structured visuals**, including infographics, diagrams, and multi-panel compositions
- **Precise style control and style transfer** with minimal prompting, supporting everything from branded design systems to fine-art styles
- **Strong real-world knowledge and reasoning**, enabling accurate depictions of objects, environments, and scenarios

This guide highlights prompting patterns, best practices, and example prompts drawn from real production use cases.


## 2. Prompting Fundamentals

* **Structure + goal:** Write prompts in a consistent order (background/scene ? subject ? key details ? constraints) and include the intended use (ad, UI mock, infographic) to set the “mode” and level of polish. For complex requests, use short labeled segments or line breaks instead of one long paragraph.

* **Specificity + quality cues:** Be concrete about materials, shapes, textures, and the visual medium (photo, watercolor, 3D render), and add targeted “quality levers” only when needed (e.g., *film grain*, *textured brushstrokes*, *macro detail*). For photorealism, camera/composition terms (lens, aperture feel, lighting) often steer realism more reliably than generic “8K/ultra-detailed.”

* **Latency vs fidelity**: For latency-sensitive or high-volume use cases, start with setting quality="low" and evaluate whether it meets your visual requirements. In many cases, it provides sufficient fidelity with significantly faster generation.

* **Composition:** Specify framing and viewpoint (close-up, wide, top-down), perspective/angle (eye-level, low-angle), and lighting/mood (soft diffuse, golden hour, high-contrast) to control the shot. If layout matters, call out placement (e.g., “logo top-right,” “subject centered with negative space on left”).

* **Constraints (what to change vs preserve):** State exclusions and invariants explicitly (e.g., “no watermark,” “no extra text,” “no logos/trademarks,” “preserve identity/geometry/layout/brand elements”). For edits, use “change only X” + “keep everything else the same,” and repeat the preserve list on each iteration to reduce drift.

* **Text in images:** Put literal text in **quotes** or **ALL CAPS** and specify typography details (font style, size, color, placement) as constraints. For tricky words (brand names, uncommon spellings), spell them out letter-by-letter to improve character accuracy.

* **Multi-image inputs:** Reference each input by **index and description** (“Image 1: product photo… Image 2: style reference…”) and describe how they interact (“apply Image 2’s style to Image 1”). When compositing, be explicit about which elements move where (“put the bird from Image 1 on the elephant in Image 2”).

* **Iterate instead of overloading:** Start with a clean base prompt, then refine with small, single-change follow-ups (“make lighting warmer,” “remove the extra tree,” “restore the original background”). Use references like “same style as before” or “the subject” to leverage context, but re-specify critical details if they start to drift.

## 3. Setup

Run this once. It:
- creates the API client
- creates `output_images/` in the images folder. 
- adds a small helper to save base64 images

Put any reference images used for edits into `input_images/` (or update the paths in the examples).

```python
import os
import base64
from openai import OpenAI

client = OpenAI()

os.makedirs("../../images/input_images", exist_ok=True)
os.makedirs("../../images/output_images", exist_ok=True)

def save_image(result, filename: str) -> None:
    """
    Saves the first returned image to the given filename inside the output_images folder.
    """
    image_base64 = result.data[0].b64_json
    out_path = os.path.join("../../images/output_images", filename)
    with open(out_path, "wb") as f:
        f.write(base64.b64decode(image_base64))
```

## 4. Use Cases — Generate (text ? image)

## 4.1 Infographics
Use infographics to explain structured information for a specific audience: students, executives, customers, or the general public. Examples include explainers, posters, labeled diagrams, timelines, and “visual wiki” assets. For dense layouts or heavy in-image text, it's recommedned to set output generation quality to "high".

```python
prompt = """
Create a detailed Infographic of the functioning and flow of an automatic coffee machine like a Jura. 
From bean basket, to grinding, to scale, water tank, boiler, etc. 
I'd like to understand technically and visually the flow.
"""

result = client.images.generate(
    model="gpt-image-1.5",
    prompt=prompt
)

save_image(result, "infographic_coffee_machine.png")
```

![](https://developers.openai.com/cookbook/assets/images/infographic_coffee_machine.png)

## 4.2 Translation in Images

Used for localizing existing designs (ads, UI screenshots, packaging, infographics) into another language without rebuilding the layout from scratch. The key is to preserve everything except the text—keep typography style, placement, spacing, and hierarchy consistent—while translating verbatim and accurately, with no extra words, no reflow unless necessary, and no unintended edits to logos, icons, or imagery.

```python
prompt = """
Translate the text in the infographic to Spanish. Do not change any other aspect of the image.
"""

result = client.images.edit(
    model="gpt-image-1.5",
    image=[
        open("../../images/output_images/infographic_coffee_machine.png", "rb"),
    ],
    prompt=prompt
)


save_image(result, "infographic_coffee_machine_sp.png")
```

Output Image: 

![](https://developers.openai.com/cookbook/assets/images/infographic_coffee_machine_sp.png)

## 4.3 Photorealistic Images that Feel “natural”

To get believable photorealism, prompt the model as if a real photo is being captured in the moment. Use photography language (lens, lighting, framing) and explicitly ask for real texture (pores, wrinkles, fabric wear, imperfections). Avoid words that imply studio polish or staging. When detail matters, set quality="high".

```python
prompt = """
Create a photorealistic candid photograph of an elderly sailor standing on a small fishing boat. 
He has weathered skin with visible wrinkles, pores, and sun texture, and a few faded traditional sailor tattoos on his arms. 
He is calmly adjusting a net while his dog sits nearby on the deck. Shot like a 35mm film photograph, medium close-up at eye level, using a 50mm lens. 
Soft coastal daylight, shallow depth of field, subtle film grain, natural color balance. 
The image should feel honest and unposed, with real skin texture, worn materials, and everyday detail. No glamorization, no heavy retouching. 
"""

result = client.images.generate(
    model="gpt-image-1.5",
    prompt=prompt,
    quality="high"
)

save_image(result, "photorealism.png")
```

Output Image: 

![](https://developers.openai.com/cookbook/assets/images/photorealism.png)

## 4.4 World knowledge

GPT-image-1.5 has built-in reasoning and strong world knowledge. For example, when asked to generate a scene set in Bethel, New York in August 1969, it can infer Woodstock and produce an accurate, context-appropriate image without being explicitly told about the event. 

```python
prompt = """
Create a realistic outdoor crowd scene in Bethel, New York on August 16, 1969.
Photorealistic, period-accurate clothing, staging, and environment.
"""

result = client.images.generate(
    model="gpt-image-1.5",
    prompt=prompt
)

save_image(result, "world_knowledge.png")
```

Output Image: 

![](https://developers.openai.com/cookbook/assets/images/world_knowledge.png)

## 4.5 Logo Generation

Strong logo generation comes from clear brand constraints and simplicity. Describe the brand’s personality and use case, then ask for a clean, original mark with strong shape, balanced negative space, and scalability across sizes.

You can specify parameter "n" to denote the number of variations you would like to generate. 

```python
prompt = """
Create an original, non-infringing logo for a company called Field & Flour, a local bakery. 
The logo should feel warm, simple, and timeless. Use clean, vector-like shapes, a strong silhouette, and balanced negative space. 
Favor simplicity over detail so it reads clearly at small and large sizes. Flat design, minimal strokes, no gradients unless essential. 
Plain background. Deliver a single centered logo with generous padding. No watermark.
"""

result = client.images.generate(
    model="gpt-image-1.5",
    prompt=prompt,
    n=4     # Generate 4 versions of the logo
)

# Save all 4 images to separate files
for i, item in enumerate(result.data, start=1):
    image_base64 = item.b64_json
    image_bytes = base64.b64decode(image_base64)
    with open(f"../../images/output_images/logo_generation_{i}.png", "wb") as f:
        f.write(image_bytes)
```

Output Images: 

| Option 1 | Option 2 | Option 3 | Option 4 |
|:--------:|:--------:|:--------:|:--------:|
| ![](https://developers.openai.com/cookbook/assets/images/logo_generation_1.png) | ![](https://developers.openai.com/cookbook/assets/images/logo_generation_2.png) | ![](https://developers.openai.com/cookbook/assets/images/logo_generation_3.png) | ![](https://developers.openai.com/cookbook/assets/images/logo_generation_4.png)|

## 4.6 Story-to-Comic Strip

For story-to-comic generation, define the narrative as a sequence of clear visual beats, one per panel. Keep descriptions concrete and action-focused so the model can translate the story into readable, well-paced panels.

```python
prompt = """
Create a short vertical comic-style reel with 4 equal-sized panels.
Panel 1: The owner leaves through the front door. The pet is framed in the window behind them, small against the glass, eyes wide, paws pressed high, the house suddenly quiet.
Panel 2: The door clicks shut. Silence breaks. The pet slowly turns toward the empty house, posture shifting, eyes sharp with possibility.
Panel 3: The house transformed. The pet sprawls across the couch like it owns the place, crumbs nearby, sunlight cutting across the room like a spotlight.
Panel 4: The door opens. The pet is seated perfectly by the entrance, alert and composed, as if nothing happened.
"""

result = client.images.generate(
    model="gpt-image-1.5",
    prompt=prompt
)

save_image(result, "comic_reel.png")
```

Output Image: 

![](https://developers.openai.com/cookbook/assets/images/comic-reel.png)

## 4.7 UI Mockups

UI mockups work best when you describe the product as if it already exists. Focus on layout, hierarchy, spacing, and real interface elements, and avoid concept art language so the result looks like a usable, shipped interface rather than a design sketch.

```python
prompt = """
Create a realistic mobile app UI mockup for a local farmers market. 
Show today’s market with a simple header, a short list of vendors with small photos and categories, a small “Today’s specials” section, and basic information for location and hours. 
Design it to be practical, and easy to use. White background, subtle natural accent colors, clear typography, and minimal decoration. 
It should look like a real, well-designed, beautiful app for a small local market. 
Place the UI mockup in an iPhone frame.
"""

result = client.images.generate(
    model="gpt-image-1.5",
    prompt=prompt
)

save_image(result, "ui_farmers_market.png")
```

Output Image: 

![](https://developers.openai.com/cookbook/assets/images/ui_farmers_market.png)

## 5. Use cases — Edit (text + image ? image)

## 5.1 Style Transfer

Style transfer is useful when you want to keep the *visual language* of a reference image (palette, texture, brushwork, film grain, etc.) while changing the subject or scene. For best results, describe what must stay consistent (style cues) and what must change (new content), and add hard constraints like background, framing, and “no extra elements” to prevent drift.

```python
prompt = """
Use the same style from the input image and generate a man riding a motorcycle on a white background.
"""

result = client.images.edit(
    model="gpt-image-1.5",
    image=[
        open("../../images/input_images/pixels.png", "rb"),
    ],
    prompt=prompt
)

save_image(result, "motorcycle.png")
```

Input Image: 

![](https://developers.openai.com/cookbook/assets/images/pixels.png)

Output Image: 

![](https://developers.openai.com/cookbook/assets/images/motorcycle.png)

## 5.2 Virtual Clothing Try-On


Virtual try-on is ideal for ecommerce previews where identity preservation is critical. The key is to explicitly lock the person (face, body shape, pose, hair, expression) and allow changes *only* to garments, then require realistic fit (draping, folds, occlusion) plus consistent lighting/shadows so the outfit looks naturally worn—not pasted on.

```python
prompt = """
Edit the image to dress the woman using the provided clothing images. Do not change her face, facial features, skin tone, body shape, pose, or identity in any way. Preserve her exact likeness, expression, hairstyle, and proportions. Replace only the clothing, fitting the garments naturally to her existing pose and body geometry with realistic fabric behavior. Match lighting, shadows, and color temperature to the original photo so the outfit integrates photorealistically, without looking pasted on. Do not change the background, camera angle, framing, or image quality, and do not add accessories, text, logos, or watermarks.
"""

result = client.images.edit(
    model="gpt-image-1.5",
    image=[
        open("../../images/input_images/woman_in_museum.png", "rb"),
        open("../../images/input_images/tank_top.png", "rb"),
        open("../../images/input_images/jacket.png", "rb"),
        open("../../images/input_images/tank_top.png", "rb"),
        open("../../images/input_images/boots.png", "rb"),
    ],
    prompt=prompt
)

save_image(result, "outfit.png")
```

Input Images:

| Full Body | Item 1 |
|:------------:|:--------------:|
| ![](https://developers.openai.com/cookbook/assets/images/woman_in_museum.png)  | ![](https://developers.openai.com/cookbook/assets/images/jacket.png) |
| Item 2 | Item 3 |
| ![](https://developers.openai.com/cookbook/assets/images/tank_top.png) | ![](https://developers.openai.com/cookbook/assets/images/boots.png) |

Output Image: 

<img src="https://developers.openai.com/cookbook/assets/images/outfit.png" width="400"/> 

## 5.3 Drawing ? Image (Rendering)


Sketch-to-render workflows are great for turning rough drawings into photorealistic concepts while keeping the original intent. Treat the prompt like a spec: preserve layout and perspective, then *add realism* by specifying plausible materials, lighting, and environment. Include “do not add new elements/text” to avoid creative reinterpretations.

```python
prompt = """
Turn this drawing into a photorealistic image.
Preserve the exact layout, proportions, and perspective.
Choose realistic materials and lighting consistent with the sketch intent.
Do not add new elements or text.
"""

result = client.images.edit(
    model="gpt-image-1.5",
    image=[
        open("../../images/input_images/drawings.png", "rb"),
    ],
    prompt=prompt
)

save_image(result, "realistic_valley.png")
```

Input Image: 

![](https://developers.openai.com/cookbook/assets/images/drawings.png)

Output Image: 

![](https://developers.openai.com/cookbook/assets/images/realistic_valley.png)

## 5.4 Product Mockups (transparent background + label integrity)


Product extraction and mockup prep is commonly used for catalogs, marketplaces, and design systems. Success depends on edge quality (clean silhouette, no fringing/halos) and label integrity (text stays sharp and unchanged). If you want realism without re-styling, ask for only light polishing and optionally a subtle contact shadow that respects the alpha.

```python
prompt = """
Extract the product from the input image.
Output: transparent background (RGBA PNG), crisp silhouette, no halos/fringing.
Preserve product geometry and label legibility exactly.
Optional: subtle, realistic contact shadow in the alpha (no hard cut line).
Do not restyle the product; only remove background and lightly polish.
"""

result = client.images.edit(
    model="gpt-image-1.5",
    image=[
        open("../../images/input_images/shampoo.png", "rb"),
    ],
    prompt=prompt
)

save_image(result, "extract_product.png")
```

Input Image: 

![](https://developers.openai.com/cookbook/assets/images/shampoo.png)

Output Image: 

![](https://developers.openai.com/cookbook/assets/images/extract_product.png)

## 5.5 Marketing Creatives with Real Text In-Image


Marketing creatives with real in-image text are great for rapid ad concepting, but typography needs explicit constraints. Put the exact copy in quotes, demand verbatim rendering (no extra characters), and describe placement and font style. If text fidelity is imperfect, keep the prompt strict and iterate—small wording/layout tweaks usually improve legibility.

```python
prompt = """
Create a realistic billboard mockup of the shampoo on a highway scene during sunset.
Billboard text (EXACT, verbatim, no extra characters):
"Fresh and clean"
Typography: bold sans-serif, high contrast, centered, clean kerning.
Ensure text appears once and is perfectly legible.
No watermarks, no logos.
"""

result = client.images.edit(
    model="gpt-image-1.5",
    image=[
        open("../../images/input_images/shampoo.png", "rb"),
    ],
    prompt=prompt
)

save_image(result, "billboard.png")
```

Input Image: 

![](https://developers.openai.com/cookbook/assets/images/shampoo.png)

Output Image: 

![](https://developers.openai.com/cookbook/assets/images/billboard.png)

## 5.6 Lighting and Weather Transformation


Used to re-stage a photo for different moods, seasons, or time-of-day variants (e.g., sunny ? overcast, daytime ? dusk, clear ? snowy) while keeping the scene composition intact. The key is to change only environmental conditions—lighting direction/quality, shadows, atmosphere, precipitation, and ground wetness—while preserving identity, geometry, camera angle, and object placement so it still reads as the same original photo.

```python
prompt = """
Make it look like a winter evening with snowfall.
"""

result = client.images.edit(
    model="gpt-image-1.5",
    input_fidelity="high", 
    quality="high",
    image=[
        open("../../images/output_images/billboard.png", "rb"),
    ],
    prompt=prompt
)

save_image(result, "billboard_winter.png")
```

Output Image: 

![](https://developers.openai.com/cookbook/assets/images/billboard_winter.png)

## 5.7 Object Removal


Person-in-scene compositing is useful for storyboards, campaigns, and “what if” scenarios where facial/identity preservation matters. Anchor realism by specifying a grounded photographic look (natural lighting, believable detail, no cinematic grading), and lock what must not change about the subject. When available, higher input fidelity helps maintain likeness during larger scene edits.

```python
prompt = """
Remove the tree logo from the white t-shirt of the man. Do not change anything else.
"""

prompt = """
Remove the red stripes from the white t-shirt of the man. Do not change anything else.
"""

prompt = """
Change the color of thered hat to light blue as velvet. Do not change anything else.
"""


result = client.images.edit(
    model="gpt-image-1.5",
    input_fidelity="high", 
    quality="high",
    image=[
        open("../../images/output_images/man_with_blue_hat.png", "rb"),
    ],
    prompt=prompt
)

save_image(result, "man_with_no_flower.png")
```

| Original Input | Remove Red Stripes | Change Hat Color |
|:------------:|:--------------:|:--------------:|
| ![](https://developers.openai.com/cookbook/assets/images/man_with_flower.png)  | ![](https://developers.openai.com/cookbook/assets/images/man_with_flower_no_stripes.png) |  ![](https://developers.openai.com/cookbook/assets/images/man_with_blue_hat.png) |

## 5.8 Insert the Person Into a Scene


Person-in-scene compositing is useful for storyboards, campaigns, and “what if” scenarios where facial/identity preservation matters. Anchor realism by specifying a grounded photographic look (natural lighting, believable detail, no cinematic grading), and lock what must not change about the subject. When available, higher input fidelity helps maintain likeness during larger scene edits.

```python
prompt = """
Generate a highly realistic action scene where this person is running away from a large, realistic brown bear attacking a campsite. The image should look like a real photograph someone could have taken, not an overly enhanced or cinematic movie-poster image.
She is centered in the image but looking away from the camera, wearing outdoorsy camping attire, with dirt on her face and tears in her clothing. She is clearly afraid but focused on escaping, running away from the bear as it destroys the campsite behind her.
The campsite is in Yosemite National Park, with believable natural details. The time of day is dusk, with natural lighting and realistic colors. Everything should feel grounded, authentic, and unstyled, as if captured in a real moment. Avoid cinematic lighting, dramatic color grading, or stylized composition.
"""

result = client.images.edit(
    model="gpt-image-1.5",
    input_fidelity="high", 
    quality="high",
    image=[
        open("../../images/input_images/woman_in_museum.png", "rb"),
    ],
    prompt=prompt
)

save_image(result, "scene.png")
```

Output Image: 

![](https://developers.openai.com/cookbook/assets/images/scene.png)

## 5.9 Multi-Image Referencing and Compositing


Used to combine elements from multiple inputs into a single, believable image—great for “insert this object/person into that scene” workflows without re-generating everything. The key is to clearly specify what to transplant (the dog from image 2), where it should go (right next to the woman in image 1), and what must remain unchanged (scene, background, framing), while matching lighting, perspective, scale, and shadows so the composite looks naturally captured in the original photo.

```python
prompt = """
Place the dog from the second image into the setting of image 1, right next to the woman, use the same style of lighting, composition and background. Do not change anything else.
"""

result = client.images.edit(
    model="gpt-image-1.5",
    input_fidelity="high", 
    quality="high",
    image=[
        open("../../images/output_images/test_woman.png", "rb"),
        open("../../images/output_images/test_woman_2.png", "rb"),
    ],
    prompt=prompt
)


save_image(result, "test_woman_with_dog.png")
```

| Image Input 1 | Image Input 2 | Output |
|:------------:|:--------------:|:--------------:|
| ![](https://developers.openai.com/cookbook/assets/images/test_woman.png)  | ![](https://developers.openai.com/cookbook/assets/images/test_woman_2.png) |  ![](https://developers.openai.com/cookbook/assets/images/test_woman_with_dog.png) |

## 6. Additional High-Value Use Cases

## 6.1 Interior design “swap” (precision edits)
Used for visualizing furniture or decor changes in real spaces without re-rendering the entire scene. The goal is surgical realism: swap a single object while preserving camera angle, lighting, shadows, and surrounding context so the edit looks like a real photograph, not a redesign.

```python
prompt = """
In this room photo, replace ONLY white with chairs made of wood.
Preserve camera angle, room lighting, floor shadows, and surrounding objects.
Keep all other aspects of the image unchanged.
Photorealistic contact shadows and fabric texture.
"""

result = client.images.edit(
    model="gpt-image-1.5",
    image=[
        open("../../images/input_images/kitchen.jpeg", "rb"),
    ],
    prompt=prompt
)

save_image(result, "kitchen-chairs.png")
```

| Input Image | Output Image |
|------------|--------------|
| ![](https://developers.openai.com/cookbook/assets/images/kitchen.jpeg) | ![](https://developers.openai.com/cookbook/assets/images/kitchen-chairs.png) |

## 6.2 3D pop-up holiday card (product-style mock)
Ideal for seasonal marketing concepts and print previews. Emphasizes tactile realism—paper layers, fibers, folds, and soft studio lighting—so the result reads as a photographed physical product rather than a flat illustration.

```python
scene_description = (
    "a cozy Christmas scene with an old teddy bear sitting inside a keepsake box, "
    "slightly worn fur, soft stitching repairs, placed near a window with falling snow outside. "
    "The scene suggests the child has grown up, but the memories remain."
)

short_copy = "Merry Christmas — some memories never fade."

prompt = f"""
Create a Christmas holiday card illustration.

Scene:
{scene_description}

Mood:
Warm, nostalgic, gentle, emotional.

Style:
Premium holiday card photography, soft cinematic lighting,
realistic textures, shallow depth of field,
tasteful bokeh lights, high print-quality composition.

Constraints:
- Original artwork only
- No trademarks
- No watermarks
- No logos

Include ONLY this card text (verbatim):
"{short_copy}"
"""

result = client.images.generate(
    model="gpt-image-1.5",
    prompt=prompt,
)

save_image(result, "christmas_holiday_card_teddy.png")
```

Output Image: 

![](https://developers.openai.com/cookbook/assets/images/christmas_holiday_card_teddy.png)

## 6.3 Collectible Action Figure / Plush Keychain (merch concept)

Used for early merch ideation and pitch visuals. Focuses on premium product photography cues (materials, packaging, print clarity) while keeping designs original and non-infringing. Works well for testing multiple character or packaging variants quickly.


```python
# ---- Inputs ----
character_description = (
    "a vintage-style toy propeller airplane with rounded wings, "
    "a front-mounted spinning propeller, slightly worn paint edges, "
    "classic childhood proportions, designed as a nostalgic holiday collectible"
)

short_copy = "Christmas Memories Edition"

# ---- Prompt ----
prompt = f"""
Create a collectible action figure of {character_description}, in blister packaging.

Concept:
A nostalgic holiday collectible inspired by the simple toy airplanes
children used to play with during winter holidays.
Evokes warmth, imagination, and childhood wonder.

Style:
Premium toy photography, realistic plastic and painted metal textures,
studio lighting, shallow depth of field,
sharp label printing, high-end retail presentation.

Constraints:
- Original design only
- No trademarks
- No watermarks
- No logos

Include ONLY this packaging text (verbatim):
"{short_copy}"
"""

result = client.images.generate(
    model="gpt-image-1.5",
    prompt=prompt,
)

save_image(result, "christmas_collectible_toy_airplane.png")
```

Output Image: 

![](https://developers.openai.com/cookbook/assets/images/christmas_collectible_toy_airplane.png)

## 6.4 Children’s Book Art with Character Consistency (multi-image workflow)
Designed for multi-page illustration pipelines where character drift is unacceptable. A reusable “character anchor” ensures visual continuity across scenes, poses, and pages while allowing environmental and narrative variation.


1?? Character Anchor — establish the reusable main character

Goal: Lock the character’s appearance, proportions, outfit, and tone.

```python
# ---- Inputs ----
prompt = """
Create a children’s book illustration introducing a main character.

Character:
A young, storybook-style hero inspired by a little forest outlaw,
wearing a simple green hooded tunic, soft brown boots, and a small belt pouch.
The character has a kind expression, gentle eyes, and a brave but warm demeanor.
Carries a small wooden bow used only for helping, never harming.

Theme:
The character protects and rescues small forest animals like squirrels, birds, and rabbits.

Style:
Children’s book illustration, hand-painted watercolor look,
soft outlines, warm earthy colors, whimsical and friendly.
Proportions suitable for picture books (slightly oversized head, expressive face).

Constraints:
- Original character (no copyrighted characters)
- No text
- No watermarks
- Plain forest background to clearly showcase the character
"""

# ---- Image generation ----
result = client.images.generate(
    model="gpt-image-1.5",
    prompt=prompt,
)

save_image(result, "childrens_book_illustration_1.png")
```

Output Image: 

![](https://developers.openai.com/cookbook/assets/images/childrens_book_illustration_1.png)

2?? Story continuation — reuse character, advance the narrative

Goal: Same character, new scene + action.
Character appearance must remain unchanged.

```python
# ---- Inputs ----
prompt = """
Continue the children’s book story using the same character.

Scene:
The same young forest hero is gently helping a frightened squirrel
out of a fallen tree after a winter storm.
The character kneels beside the squirrel, offering reassurance.

Character Consistency:
- Same green hooded tunic
- Same facial features, proportions, and color palette
- Same gentle, heroic personality

Style:
Children’s book watercolor illustration,
soft lighting, snowy forest environment,
warm and comforting mood.

Constraints:
- Do not redesign the character
- No text
- No watermarks
"""
# ---- Image generation ----
result = client.images.edit(
    model="gpt-image-1.5",
    image=[
        open("../../images/output_images/childrens_book_illustration_1.png", "rb"),  # ? use image from step 1
    ],
    prompt=prompt,
)

save_image(result, "childrens_book_illustration_2.png")
```

Output Image: 

![](https://developers.openai.com/cookbook/assets/images/childrens_book_illustration_2.png)

## Conclusion 

In this notebook, we demonstrate how to use gpt-image-1.5 to build high-quality, controllable image generation and editing workflows that hold up in real production settings. The cookbook emphasizes prompt structure, explicit constraints, and small iterative changes as the primary tools for controlling realism, layout, text accuracy, and identity preservation. We cover both generation and editing patterns—ranging from infographics, photorealism, UI mockups, and logos to translation, style transfer, virtual try-on, compositing, and lighting changes. Throughout the examples, the cookbook reinforces the importance of clearly separating what should change from what must remain invariant, and of restating those invariants on every iteration to prevent drift. We also highlight how quality and input-fidelity settings enable deliberate tradeoffs between latency and visual precision depending on the use case. Together, these examples form a practical, repeatable playbook for deploying gpt-image-1.5 in production image workflows.

---

## Generate and edit images with GPT Image

- Canonical URL: https://developers.openai.com/cookbook/examples/generate_images_with_gpt_image
- Fetch URL: https://developers.openai.com/cookbook/examples/generate_images_with_gpt_image.md
- Fetch mode: markdown

### Scraped content

# Generate and edit images with GPT Image

In this cookbook, you'll learn how to use GPT Image, our new large language model with image generation capabilities.

This model has world knowledge and can generate images leveraging this broad understanding of the world.
It is also much better at instruction following and producing photorealistic images compared to our previous-generation image models, DallE 2 and 3. 

To learn more about image generation, refer to our [guide](https://platform.openai.com/docs/guides/image-generation?image-generation-model=gpt-image-1).

## Set up

```python
%pip install pillow openai -U
```

```python
import base64
import os
from openai import OpenAI
from PIL import Image
from io import BytesIO
from IPython.display import Image as IPImage, display
```

```python
client = OpenAI()
# Set your API key if not set globally
#client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY", "<your OpenAI API key if not set as env var>"))
```

```python
# Create imgs/ folder
folder_path = "imgs"
os.makedirs(folder_path, exist_ok=True)
```

## Generate an image

GPT Image 1 is great at instruction-following, meaning you can prompt the model to generate images with very detailed instructions.

```python
prompt1 = """
Render a realistic image of this character:
Blobby Alien Character Spec Name: Glorptak (or nickname: "Glorp")
Visual Appearance Body Shape: Amorphous and gelatinous. Overall silhouette resembles a teardrop or melting marshmallow, shifting slightly over time. Can squish and elongate when emotional or startled.
Material Texture: Semi-translucent, bio-luminescent goo with a jelly-like wobble. Surface occasionally ripples when communicating or moving quickly.
Color Palette:
- Base: Iridescent lavender or seafoam green
- Accents: Subsurface glowing veins of neon pink, electric blue, or golden yellow
- Mood-based color shifts (anger = dark red, joy = bright aqua, fear = pale gray)
Facial Features:
- Eyes: 3–5 asymmetrical floating orbs inside the blob that rotate or blink independently
- Mouth: Optional—appears as a rippling crescent on the surface when speaking or emoting
- No visible nose or ears; uses vibration-sensitive receptors embedded in goo
- Limbs: None by default, but can extrude pseudopods (tentacle-like limbs) when needed for interaction or locomotion. Can manifest temporary feet or hands.
Movement & Behavior Locomotion:
- Slides, bounces, and rolls.
- Can stick to walls and ceilings via suction. When scared, may flatten and ooze away quickly.
Mannerisms:
- Constant wiggling or wobbling even at rest
- Leaves harmless glowing slime trails
- Tends to absorb nearby small objects temporarily out of curiosity
"""

img_path1 = "imgs/glorptak.jpg"
```

```python
# Generate the image
result1 = client.images.generate(
    model="gpt-image-1",
    prompt=prompt1,
    size="1024x1024"
)
```

```python
# Save the image to a file and resize/compress for smaller files
image_base64 = result1.data[0].b64_json
image_bytes = base64.b64decode(image_base64)

# Adjust this if you want a high-quality Glorptak
image = Image.open(BytesIO(image_bytes))
image = image.resize((300, 300), Image.LANCZOS)
image.save(img_path1, format="JPEG", quality=80, optimize=True)
```

```python
# Show the result
display(IPImage(img_path1))
```

![](https://developers.openai.com/cookbook/assets/notebook-outputs/examples/generate_images_with_gpt_image/cell-11-output-0.jpg)

### Customize the output

You can customize the following output properties:
- Quality can be `low`, `medium`, `high` or `auto` (default value)
- Size can be `1024x1024` (square), `1536x1024` (portrait), `1024x1536` (landscape) or `auto` (default)
- You can adjust the compression level (from 0-100%) for JPEG and WEBP formats
- You can choose to generate an image with a transparent background (only available for PNG or WEBP)

```python
prompt2 = "generate a portrait, pixel-art style, of a grey tabby cat dressed as a blond woman on a dark background."
img_path2 = "imgs/cat_portrait_pixel.jpg"
```

```python
# Generate the image
result2 = client.images.generate(
    model="gpt-image-1",
    prompt=prompt2,
    quality="low",
    output_compression=50,
    output_format="jpeg",
    size="1024x1536"
)
```

```python
# Save the image to a file and resize/compress for smaller files
image_base64 = result2.data[0].b64_json
image_bytes = base64.b64decode(image_base64)

image = Image.open(BytesIO(image_bytes))
image = image.resize((250, 375), Image.LANCZOS)
image.save(img_path2, format="JPEG", quality=80, optimize=True)
```

```python
# Show the result
display(IPImage(img_path2))
```

![](https://developers.openai.com/cookbook/assets/notebook-outputs/examples/generate_images_with_gpt_image/cell-16-output-0.jpg)

### Transparent background

You can use the `background` property to request a transparent background, but if you include in your prompt that you want a transparent background, it will be set to `transparent` by default. 

```python
prompt3 = "generate a pixel-art style picture of a green bucket hat with a pink quill on a transparent background."
img_path3 = "imgs/hat.png"
```

```python
result3 = client.images.generate(
    model="gpt-image-1",
    prompt=prompt3,
    quality="low",
    output_format="png",
    size="1024x1024"
)
image_base64 = result3.data[0].b64_json
image_bytes = base64.b64decode(image_base64)
```

```python
# Save the image to a file and resize/compress for smaller files
image_base64 = result3.data[0].b64_json
image_bytes = base64.b64decode(image_base64)

image = Image.open(BytesIO(image_bytes))
image = image.resize((250, 250), Image.LANCZOS)
image.save(img_path3, format="PNG")
```

```python
# Show the result
display(IPImage(img_path3))
```

![](https://developers.openai.com/cookbook/assets/notebook-outputs/examples/generate_images_with_gpt_image/cell-21-output-0.png)

## Edit images

GPT Image can also accept image inputs, and use them to create new images. You can also provide a mask if you don't want the model to change a specific part of the input image.

You can use a maximum of 10 input images, and if you use a mask, it will be applied to the first image provided in the `image` array.

```python
prompt_edit = """
Combine the images of the cat and the hat to show the cat wearing the hat while being perched in a tree, still in pixel-art style.
"""
img_path_edit = "imgs/cat_with_hat.jpg"
```

```python
img1 = open(img_path2, "rb")
img2 = open(img_path3, "rb")
```

```python
# Generate the new image
result_edit = client.images.edit(
    model="gpt-image-1",
    image=[img1,img2], 
    prompt=prompt_edit,
    size="1024x1536"
)
```

```python
# Save the image to a file and resize/compress for smaller files
image_base64 = result_edit.data[0].b64_json
image_bytes = base64.b64decode(image_base64)

image = Image.open(BytesIO(image_bytes))
image = image.resize((250, 375), Image.LANCZOS)
image.save(img_path_edit, format="JPEG", quality=80, optimize=True)
```

```python
# Show the result
display(IPImage(img_path_edit))
```

![](https://developers.openai.com/cookbook/assets/notebook-outputs/examples/generate_images_with_gpt_image/cell-27-output-0.jpg)

## Edit an image with a mask

You can also provide a mask along with your input images (if there are several, the mask will be applied on the first one) to edit only the part of the input image that is not covered by the mask. Please note that the model might still edit some parts of the image inside the mask, but it will avoid it. 

Important note: the mask should contain an alpha channel. If you're generating it manually, for example using an image editing software, make sure you include this alpha channel. 

#### Generating the mask

For this example, we'll use our model to generate the mask automatically for us. The mask might not be exact, but it will be enough for our purposes. 
If you need to have an exact mask, feel free to use an image segmentation model.

```python
img_path_mask = "imgs/mask.png"
prompt_mask = "generate a mask delimiting the entire character in the picture, using white where the character is and black for the background. Return an image in the same size as the input image."
```

```python
img_input = open(img_path1, "rb")

# Generate the mask
result_mask = client.images.edit(
    model="gpt-image-1",
    image=img_input, 
    prompt=prompt_mask
)
```

```python
# Save the image to a file and resize/compress for smaller files
image_base64 = result_mask.data[0].b64_json
image_bytes = base64.b64decode(image_base64)

image = Image.open(BytesIO(image_bytes))
image = image.resize((300, 300), Image.LANCZOS)
image.save(img_path_mask, format="PNG")
```

```python
# Show the mask
display(IPImage(img_path_mask))
```

![](https://developers.openai.com/cookbook/assets/notebook-outputs/examples/generate_images_with_gpt_image/cell-33-output-0.png)

#### Creating an alpha channel
This step is optional, if you want to turn a black & white image into a mask with an alpha channel that can be used in the Image Edit API.

```python
# 1. Load your black & white mask as a grayscale image
mask = Image.open(img_path_mask).convert("L")

# 2. Convert it to RGBA so it has space for an alpha channel
mask_rgba = mask.convert("RGBA")

# 3. Then use the mask itself to fill that alpha channel
mask_rgba.putalpha(mask)

# 4. Convert the mask into bytes
buf = BytesIO()
mask_rgba.save(buf, format="PNG")
mask_bytes = buf.getvalue()
```

```python
# Save the resulting file
img_path_mask_alpha = "imgs/mask_alpha.png"
with open(img_path_mask_alpha, "wb") as f:
    f.write(mask_bytes)
```

#### Editing with the mask
When using a mask, we still need the prompt the model describing the entiring resulting image, not just the area that is masked. 

```python
prompt_mask_edit = "A strange character on a colorful galaxy background, with lots of stars and planets."
mask = open(img_path_mask_alpha, "rb")
```

```python
result_mask_edit = client.images.edit(
    model="gpt-image-1",         
    prompt=prompt_mask_edit,
    image=img_input,
    mask=mask,
    size="1024x1024"
)
```

```python
# Display result

img_path_mask_edit = "imgs/mask_edit.png"

image_base64 = result_mask_edit.data[0].b64_json
image_bytes = base64.b64decode(image_base64)

image = Image.open(BytesIO(image_bytes))
image = image.resize((300, 300), Image.LANCZOS)
image.save(img_path_mask_edit, format="JPEG", quality=80, optimize=True)
    
display(IPImage(img_path_mask_edit))
```

![](https://developers.openai.com/cookbook/assets/notebook-outputs/examples/generate_images_with_gpt_image/cell-40-output-0.png)

## Wrapping up

In this cookbook, we've seen how to use our new image generation model, GPT Image, to either generate new images from scratch, or use reference images. We've also covered how to create a mask with an alpha channel to apply it to an input image, to guide the image edition even further. 

Feel free to use this as a starting point to explore other use cases, and if you're looking for some inspiration, check out the [image gallery](https://platform.openai.com/docs/guides/image-generation?image-generation-model=gpt-image-1&gallery=open#generate-images) in our docs. 

Happy building!

---

## Generate images with high input fidelity

- Canonical URL: https://developers.openai.com/cookbook/examples/generate_images_with_high_input_fidelity
- Fetch URL: https://developers.openai.com/cookbook/examples/generate_images_with_high_input_fidelity.md
- Fetch mode: markdown

### Scraped content

# Generate images with high input fidelity

This cookbook shows how you can leverage the `input_fidelity` parameter, available in the Image API and the Responses image generation tool, to preserve distinctive features from the input.

Setting `input_fidelity="high"` is especially useful when editing images with faces, logos, or any other details that require high fidelity in the output.

If you're not already familiar with image generation using the OpenAI API, we recommend starting with our [introductory image generation cookbook](https://developers.openai.com/cookbook/examples/generate_images_with_gpt_image).


## Set-up

```python
%pip install pillow openai -U  # (skip if already installed)
```

```python
import base64, os
from io import BytesIO
from PIL import Image
from IPython.display import display, Image as IPImage
from openai import OpenAI

client = OpenAI()
# Set your API key if not set globally
#client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY", "<your OpenAI API key if not set as env var>"))
```

```python
folder_path = "imgs"
os.makedirs(folder_path, exist_ok=True)
```

```python
def resize_img(image, target_w):
    w, h = image.size
    target_h = int(round(h * (target_w / float(w))))
    resized_image = image.resize((target_w, target_h), Image.LANCZOS)
    return resized_image

def edit_img(input_img, prompt):
    result = client.images.edit(
        model="gpt-image-1",
        image=input_img,
        prompt=prompt,
        input_fidelity="high",
        quality="high",
        output_format="jpeg"
    )

    image_base64 = result.data[0].b64_json
    image_bytes = base64.b64decode(image_base64)
    image = Image.open(BytesIO(image_bytes))
    return image
```

## Precise editing

High input fidelity allows you to make subtle edits to an image without altering unrelated areas. This is ideal for controlled, localized changes.

Example use cases:
- **Item edits:** Change isolated elements (e.g., swap a mug color) while leaving everything else untouched.
- **Element removal:** Cleanly remove an isolated element without changing the rest of the picture.
- **Element addition:** Seamlessly insert new objects into a scene.

```python
edit_input_path = "imgs/desk.png"
edit_input_img = open(edit_input_path, "rb")
display(IPImage(edit_input_path))
```

![](https://developers.openai.com/cookbook/assets/notebook-outputs/examples/generate_images_with_high_input_fidelity/cell-7-output-0.png)

### Item edit

```python
edit_prompt = "Make the mug olive green"
edit_result = edit_img(edit_input_img, edit_prompt)
```

```python
# Display result
edit_resized_result = resize_img(edit_result, 300)
display(edit_resized_result)
```

![](https://developers.openai.com/cookbook/assets/notebook-outputs/examples/generate_images_with_high_input_fidelity/cell-10-output-0.png)

### Remove item

```python
remove_prompt = "Remove the mug from the desk"
remove_result = edit_img(edit_input_img, remove_prompt)
```

```python
# Display result
remove_resized_result = resize_img(remove_result, 300)
display(remove_resized_result)
```

![](https://developers.openai.com/cookbook/assets/notebook-outputs/examples/generate_images_with_high_input_fidelity/cell-13-output-0.png)

### Add item

```python
add_prompt = "Add a post-it note saying 'Be right back!' to the monitor"
add_result = edit_img(edit_input_img, add_prompt)
```

```python
# Display result
add_resized_result = resize_img(add_result, 300)
display(add_resized_result)
```

![](https://developers.openai.com/cookbook/assets/notebook-outputs/examples/generate_images_with_high_input_fidelity/cell-16-output-0.png)

## Face preservation


When using high input fidelity, faces are preserved far more accurately than in standard mode. Use this when you need people to remain recognizable across edits.

Example use cases:
- **Image editing:** Edit your photos while preserving facial features.
- **Personalization:** Create avatars that still look like the original person across different backgrounds or styles.
- **Photo merge:** Combine faces from multiple pictures into one image.

**Note:** Currently, while all input images are preserved with high fidelity, only the first one you provide is preserved with extra richness in texture. When working with multiple faces from different photos, try combining all needed faces into a single composite image before sending the request (see the example below).

```python
face_input_path = "imgs/woman_portrait.png"
face_input_img = open(face_input_path, "rb")
display(IPImage(face_input_path))
```

![](https://developers.openai.com/cookbook/assets/notebook-outputs/examples/generate_images_with_high_input_fidelity/cell-18-output-0.png)

### Image editing

```python
edit_face_prompt = "Add soft neon purple and lime green lighting and glowing backlighting."
edit_face_result = edit_img(face_input_img, edit_face_prompt)
```

```python
# Display result
edit_face_resized_result = resize_img(edit_face_result, 300)
display(edit_face_resized_result)
```

![](https://developers.openai.com/cookbook/assets/notebook-outputs/examples/generate_images_with_high_input_fidelity/cell-21-output-0.png)

### Avatar

```python
avatar_prompt = "Generate an avatar of this person in digital art style, with vivid splash of colors."
avatar_result = edit_img(face_input_img, avatar_prompt)
```

```python
# Display result
avatar_resized_result = resize_img(avatar_result, 300)
display(avatar_resized_result)
```

![](https://developers.openai.com/cookbook/assets/notebook-outputs/examples/generate_images_with_high_input_fidelity/cell-24-output-0.png)

### Combine multiple pictures with faces

```python
second_woman_input_path = "imgs/woman_smiling.jpg"
second_woman_input_img = open(second_woman_input_path, "rb")
display(IPImage(second_woman_input_path))
```

![](https://developers.openai.com/cookbook/assets/notebook-outputs/examples/generate_images_with_high_input_fidelity/cell-26-output-0.jpg)

```python
def combine_imgs(left_path, right_path, bg_color=(255, 255, 255)):
    
    left_img = Image.open(open(left_path, "rb"))
    right_img = Image.open(open(right_path, "rb"))
    
    # Ensure RGBA for safe pasting (handles transparency)
    left = left_img.convert("RGBA")
    right = right_img.convert("RGBA")

    # Resize right to match left height
    target_h = left.height
    scale = target_h / float(right.height)
    target_w = int(round(right.width * scale))
    right = right.resize((target_w, target_h), Image.LANCZOS)

    # New canvas
    total_w = left.width + right.width
    canvas = Image.new("RGBA", (total_w, target_h), bg_color + (255,))

    # Paste
    canvas.paste(left, (0, 0), left)
    canvas.paste(right, (left.width, 0), right)

    return canvas
```

```python
combined_img = combine_imgs(second_woman_input_path, face_input_path)
display(combined_img)
```

![](https://developers.openai.com/cookbook/assets/notebook-outputs/examples/generate_images_with_high_input_fidelity/cell-28-output-0.png)

```python
import io

# utility function to convert to bytes
def pil_to_bytes(img, fmt="PNG"):
    buf = io.BytesIO()
    img.save(buf, format=fmt)
    buf.seek(0)
    return buf

combined_img_bytes = pil_to_bytes(combined_img)
```

```python
combined_prompt = "Put these two women in the same picture, holding shoulders, as if part of the same photo."
combined_result = edit_img(("combined.png", combined_img_bytes, "image/png"), combined_prompt)
```

```python
# Display result
combined_resized_result = resize_img(combined_result, 300)
display(combined_resized_result)
```

![](https://developers.openai.com/cookbook/assets/notebook-outputs/examples/generate_images_with_high_input_fidelity/cell-31-output-0.png)

## Branding consistency

Sometimes, maintaining brand identity in generated images is essential. High input fidelity ensures that logos and other unique design elements remain true to the original assets.

Example use cases:
- **Marketing assets:** Generate banners or social posts that include your brand logo without distortion.
- **Mockups:** Place your logo or other brand assets into templates or lifestyle scenes without unintended changes.
- **Product photography:** Change a product’s background for different campaigns while keeping the product's details crisp.

```python
logo_input_path = "imgs/logo.png"
logo_input_img = open(logo_input_path, "rb")
display(IPImage(logo_input_path))
```

![](https://developers.openai.com/cookbook/assets/notebook-outputs/examples/generate_images_with_high_input_fidelity/cell-33-output-0.png)

### Marketing assets

```python
marketing_prompt = "Generate a beautiful, modern hero banner featuring this logo in the center. It should look futuristic, with blue & violet hues."
marketing_result = edit_img(logo_input_img, marketing_prompt)
```

```python
# Display result
marketing_resized_result = resize_img(marketing_result, 300)
display(marketing_resized_result)
```

![](https://developers.openai.com/cookbook/assets/notebook-outputs/examples/generate_images_with_high_input_fidelity/cell-36-output-0.png)

### Mockups

```python
mockup_prompt = "Generate a highly realistic picture of a hand holding a tilted iphone, with an app on the screen that showcases this logo in the center with a loading animation below"
mockup_result = edit_img(logo_input_img, mockup_prompt)
```

```python
# Display result
mockup_resized_result = resize_img(mockup_result, 300)
display(mockup_resized_result)
```

![](https://developers.openai.com/cookbook/assets/notebook-outputs/examples/generate_images_with_high_input_fidelity/cell-39-output-0.png)

### Product photography

```python
bag_input_path = "imgs/bag.png"
bag_input_img = open(bag_input_path, "rb")
display(IPImage(bag_input_path))
```

![](https://developers.openai.com/cookbook/assets/notebook-outputs/examples/generate_images_with_high_input_fidelity/cell-41-output-0.png)

```python
product_prompt = "Generate a beautiful ad with this bag in the center, on top of a dark background with a glowing halo emanating from the center, behind the bag."
product_result = edit_img(bag_input_img, product_prompt)
```

```python
# Display result
product_resized_result = resize_img(product_result, 300)
display(product_resized_result)
```

![](https://developers.openai.com/cookbook/assets/notebook-outputs/examples/generate_images_with_high_input_fidelity/cell-43-output-0.png)

## Fashion & Product Retouching


E-commerce and fashion often require editing outfits or product details without compromising realism. High input fidelity ensures fabric textures, patterns, and logos remain consistent.

Example use cases:
- **Outfit variations:** Change the color or style of clothing on a model photo.
- **Accessory addition:** Add jewelry, hats, or other accessories to a model photo without altering their pose or face.
- **Product extraction:** Show the same product or outfit in new settings while keeping details intact.

```python
model_input_path = "imgs/model.png"
model_input_img = open(model_input_path, "rb")
display(IPImage(model_input_path))
```

![](https://developers.openai.com/cookbook/assets/notebook-outputs/examples/generate_images_with_high_input_fidelity/cell-45-output-0.png)

### Outfit variations

```python
variation_prompt = "Edit this picture so that the model wears a blue tank top instead of the coat and sweater."
variation_result = edit_img(model_input_img, variation_prompt)
```

```python
# Display result
variation_resized_result = resize_img(variation_result, 300)
display(variation_resized_result)
```

![](https://developers.openai.com/cookbook/assets/notebook-outputs/examples/generate_images_with_high_input_fidelity/cell-48-output-0.png)

### Accessory addition

In this example, we'll combine 2 input images. The image containing the face should be provided as the first input as more details are retained from the first image.

```python
input_imgs = [('model.png',
                 open('imgs/model.png', 'rb'),
                 'image/png'),
    ('bag.png', open('imgs/bag.png', 'rb'),'image/png'),
]
```

```python
accessory_prompt = "Add the crossbody bag to the outfit."
accessory_result = edit_img(input_imgs, accessory_prompt)
```

```python
# Display result
accessory_resized_result = resize_img(accessory_result, 300)
display(accessory_resized_result)
```

![](https://developers.openai.com/cookbook/assets/notebook-outputs/examples/generate_images_with_high_input_fidelity/cell-52-output-0.png)

### Product extraction

```python
extraction_prompt = "Generate a picture of this exact same jacket on a white background"
extraction_result = edit_img(model_input_img, extraction_prompt)
```

```python
# Display result
extraction_resized_result = resize_img(extraction_result, 300)
display(extraction_resized_result)
```

![](https://developers.openai.com/cookbook/assets/notebook-outputs/examples/generate_images_with_high_input_fidelity/cell-55-output-0.png)

## Wrapping up

In this guide, we covered how to enable high input fidelity to better preserve important visual details from input images.

Use the example use cases above as inspiration, and try the parameter with your own images to see where high input fidelity makes the biggest difference.

Keep in mind that high input fidelity consumes more image input tokens than the default. Also, while all input images are processed with high input fidelity, the first image in the list preserves the finest detail and richest texture, which is especially important for faces.

Happy building!

