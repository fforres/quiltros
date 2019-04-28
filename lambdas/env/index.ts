import { IncomingMessage, ServerResponse } from "http"

export default async (_: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({}));
};