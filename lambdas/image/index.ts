import { IncomingMessage, ServerResponse } from 'http'
import { s3Client } from '../s3';
import { lambdaJsonResponseHandler } from '../utils';

export default async (req: IncomingMessage, res: ServerResponse) => {
  lambdaJsonResponseHandler(req, res, async () => {
    debugger
    return {}
  })
};