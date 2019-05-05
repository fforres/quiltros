import { IncomingMessage, ServerResponse } from 'http';
import { lambdaJsonResponseHandler } from '../../utils';

const envLambdaHandler = async (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ hello: ':)' }));
};

export default envLambdaHandler;
