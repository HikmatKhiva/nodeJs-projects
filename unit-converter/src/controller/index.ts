import { IncomingMessage, ServerResponse } from "http";
import { renderViews } from "../utils/helper.js";
import { converter } from "../utils/converter.js";
export async function homePage(res: ServerResponse) {
  return renderViews(res, "index.html", {});
}
export async function convertHandler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    const params = new URLSearchParams(body);
    const value = Number(params.get("value"));
    const from = params.get("from") || "";
    const to = params.get("to") || "";
    const result = converter(value, from, to);
    const units = ["kg", "lb", "C", "F", "m", "ft"];
    const viewData: ViewData = { value, from, to, result };
    for (const unit of units) {
      viewData[`from_${unit}`] = from === unit ? "selected" : "";
      viewData[`to_${unit}`] = to === unit ? "selected" : "";
    }
    renderViews(res, "index.html", viewData);
  });
}