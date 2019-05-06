import { IncomingMessage, ServerResponse } from 'http';
import { lambdaJsonResponseHandler } from '../../utils';

const envLambdaHandler = async (req: IncomingMessage, res: ServerResponse) => {
  console.log(process.env);
  return {};
};

export default lambdaJsonResponseHandler(envLambdaHandler);
