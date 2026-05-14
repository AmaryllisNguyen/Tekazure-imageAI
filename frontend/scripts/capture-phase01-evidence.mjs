import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const APP_URL = process.env.APP_URL || "http://127.0.0.1:5174";
const OUT_DIR = path.resolve(process.cwd(), "../plans/evidence/phase-01");

async function captureLayoutScreens(browser) {
  const widths = [360, 768, 1280];
  for (const width of widths) {
    const context = await browser.newContext({
      viewport: { width, height: 900 }
    });
    const page = await context.newPage();
    await page.goto(APP_URL, { waitUntil: "networkidle" });
    await page.waitForSelector("textarea", { timeout: 10000 });
    const out = path.join(OUT_DIR, `layout-${width}.png`);
    await page.screenshot({ path: out, fullPage: true });
    await context.close();
  }
}

async function captureE2EVideo(browser) {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    recordVideo: {
      dir: OUT_DIR,
      size: { width: 1280, height: 900 }
    }
  });

  const page = await context.newPage();
  await page.goto(APP_URL, { waitUntil: "networkidle" });
  await page.waitForSelector("textarea", { timeout: 10000 });

  await page.fill("textarea", "A watercolor fox in a forest");
  await page.click("button[type='submit']");
  await page.waitForSelector(".message-assistant img", { timeout: 15000 });
  await page.screenshot({ path: path.join(OUT_DIR, "e2e-success.png"), fullPage: true });

  const recordedPathPromise = page.video().path();
  await context.close();
  const recordedPath = await recordedPathPromise;
  const finalVideo = path.join(OUT_DIR, "e2e-success.webm");
  await fs.copyFile(recordedPath, finalVideo);
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    await captureLayoutScreens(browser);
    await captureE2EVideo(browser);
  } finally {
    await browser.close();
  }
  console.log(`Evidence captured in ${OUT_DIR}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
