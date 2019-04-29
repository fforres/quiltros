import { IncomingMessage, ServerResponse } from 'http';

export const lambdaJsonResponseHandler = (
  cb: (req: IncomingMessage, res: ServerResponse) => Promise<object>
) => {
  return async (req: IncomingMessage, res: ServerResponse) => {
    try {
      const response = await cb(req, res);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(response));
    } catch (e) {
      console.error(e);
    }
  };
};
