import { IncomingMessage, ServerResponse } from 'http';
import { initSentry } from '../../error_handler';
import { lambdaJsonResponseHandler } from '../../utils';

const envLambdaHandler = async (req: IncomingMessage, res: ServerResponse) => {
  initSentry('env');
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(process.env));
};

export default envLambdaHandler;
