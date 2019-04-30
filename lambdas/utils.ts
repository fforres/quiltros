import fs from 'fs';
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

export const createReadStreamPromise = (
  filename: string
): Promise<fs.ReadStream> => {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(filename);
    const onError = err => {
      reject(err);
    };
    const onReadable = () => {
      cleanup();
      resolve(stream);
    };
    const cleanup = () => {
      stream.removeListener('readable', onReadable);
      stream.removeListener('error', onError);
    };
    stream.on('error', onError);
    stream.on('readable', onReadable);
  });
};
