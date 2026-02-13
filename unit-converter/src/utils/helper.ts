import fs from "fs/promises";
import { dirname, join } from "path";
import { ServerResponse } from "http";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "../");
export async function renderViews(
  res: ServerResponse,
  template: string,
  data: Record<string, any> = {},
) {
  try {
    const filePath = join(rootDir, "views", template);
    let rendered = await fs.readFile(filePath, "utf-8");

    // Handle simple {{#if result}}
    if (data.result) {
      rendered = rendered.replace(/\{\{#if result\}\}(.*?)\{\{\/if\}\}/s, "$1");
    } else {
      rendered = rendered.replace(/\{\{#if result\}\}(.*?)\{\{\/if\}\}/s, "");
    }

    // Replace variables
    for (const [key, value] of Object.entries(data)) {
      rendered = rendered.replace(
        new RegExp(`\\{\\{${key}\\}\\}`, "g"),
        String(value ?? ""),
      );
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(rendered);
  } catch (err) {
    res.writeHead(500);
    res.end("Server Error");
  }
}
export async function serverStatic(res: ServerResponse, pathname: string) {
  try {
    const filePath = join(rootDir, "static", pathname.startsWith("/static/") ? pathname.slice(8) : pathname);
    const ext = pathname.split(".").pop()?.toLowerCase();
    let contentType = "application/octet-stream";
    switch (ext) {
      case "css": contentType = "text/css"; break;
      case "js": contentType = "application/javascript"; break;
      case "ico": contentType = "image/x-icon"; break;
      case "png": contentType = "image/png"; break;
      case "jpg":
      case "jpeg": contentType = "image/jpeg"; break;
      case "svg": contentType = "image/svg+xml"; break;
    }
    const data = await fs.readFile(filePath);
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  } catch (error) {
    console.log(error);
    res.writeHead(404);
    res.end("Not found");
  }
}