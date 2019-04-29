import formidable from 'formidable';
import { IncomingMessage, ServerResponse } from 'http';
import { inspect } from 'util';

import { s3Client } from '../s3';
import { lambdaJsonResponseHandler } from '../utils';

const promiseParser = (req): Promise<{ fields: any; files: any }> =>
  new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) {
        throw new Error(err);
      }
      resolve({ fields, files });
    });
  });
export default lambdaJsonResponseHandler(
  async (req: IncomingMessage, res: ServerResponse) => {
    const { fields, files } = await promiseParser(req);
    console.log(fields);
    console.log(files);

    return {};
  }
);
