import { IncomingMessage, ServerResponse } from 'http';
import { lambdaJsonResponseHandler } from '../utils';

export default lambdaJsonResponseHandler(
  async (req: IncomingMessage, res: ServerResponse) => {
    return {};
  }
);
