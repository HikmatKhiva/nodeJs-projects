import { IncomingMessage, ServerResponse } from "http";
import { serverStatic } from "../utils/helper.js";
import { convertHandler, homePage } from "../controller/index.js";
export async function router(req: IncomingMessage, res: ServerResponse) {
  try {
    const url = req.url || "/";
    const method = req.method || "GET";
    if (url.startsWith("/static/") || url === "/robots.txt" || url=== "/favicon_io") {
      return serverStatic(res, url);
    }
    if (method === "GET" && url === "/") {
      return homePage(res);
    }
    if (method === "POST" && url === "/convert") {
      return convertHandler(req, res);
    }
    res.writeHead(404);
    res.end("Not found");
  } catch (error) {
    res.writeHead(500);
    res.end("Something went wrong!");
  }
}
