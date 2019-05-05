import { IncomingMessage, ServerResponse } from 'http';
import { captureError, initSentry } from './error_handler';

export const lambdaJsonResponseHandler = (
  cb: (req: IncomingMessage, res: ServerResponse) => Promise<object>
) => {
  initSentry(cb.name); // Sets the lambda name
  return async (req: IncomingMessage, res: ServerResponse) => {
    let code = 200;
    let response = {};
    try {
      response = await cb(req, res);
    } catch (e) {
      code = 500;
      response = { msg: 'ERROR' };
      await captureError(e);
      console.error(e);
    }
    res.writeHead(code, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
  };
};
