import http, { ServerResponse, IncomingMessage } from "http";
import { router } from "./routes/router.js";
const PORT = 3000;
const server = http.createServer(
  async (req: IncomingMessage, res: ServerResponse) => {
    router(req, res);
  },
);
server.listen(PORT, () => {
  console.log(`Unit Converter TS: http://localhost:${PORT}`);
});
