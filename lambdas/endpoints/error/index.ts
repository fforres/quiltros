import { IncomingMessage, ServerResponse } from 'http';
import { lambdaJsonResponseHandler } from '../../utils';

const envErrorHandler = async (req: IncomingMessage, res: ServerResponse) => {
  throw new Error('Dummy error!!');
};

export default lambdaJsonResponseHandler(envErrorHandler);
