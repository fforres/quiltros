import { IncomingMessage, ServerResponse } from 'http'
import { lambdaJsonResponseHandler } from '../utils';

export default async (req: IncomingMessage, res: ServerResponse) => {
  lambdaJsonResponseHandler(req, res, async () => {
    return {}
  })
};