import { IncomingMessage, ServerResponse } from 'http';
// import { captureError, initSentry } from '../../error_handler';
import { lambdaJsonResponseHandler } from '../../utils';

const envErrorHandler = async (req: IncomingMessage, res: ServerResponse) => {
  // initSentry('asd');
  const a = new Error('Dummy error!!');
  // captureError(a);
  throw a;
};

export default lambdaJsonResponseHandler(envErrorHandler);
