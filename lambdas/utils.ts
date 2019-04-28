import { IncomingMessage, ServerResponse } from 'http'

export const lambdaJsonResponseHandler = async (req: IncomingMessage, res: ServerResponse, cb: () => Promise<Object>) => {
  try {
    const response = await cb()
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(response));
  } catch(e) {
    console.error(e)
  }
}