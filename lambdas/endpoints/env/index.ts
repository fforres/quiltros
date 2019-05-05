import { IncomingMessage, ServerResponse } from 'http';
import { lambdaJsonResponseHandler } from '../../utils';

const envLambdaHandler = async (req: IncomingMessage, res: ServerResponse) => {
  return process.env;
};

export default lambdaJsonResponseHandler(envLambdaHandler);
