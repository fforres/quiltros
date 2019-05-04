import formidable from 'formidable';
import { IncomingMessage, ServerResponse } from 'http';
import { inspect } from 'util';

import { s3Client } from '../../s3';
import { lambdaJsonResponseHandler } from '../../utils';

const promiseParser = (req): Promise<{ fields: any; files: any }> => {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      }
      resolve({ fields, files });
    });
  });
};

export const handleImageUploadForm = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  const { fields, files } = await promiseParser(req);
  console.log(fields);
  console.log(files);
  // s3Client.upload

  // //get "body" args from header
  // const { id, fn } = JSON.parse(req.get('body'));
  // const Key = id + '/' + fn; //upload to s3 folder "id" with filename === fn
  // const params = {
  //   Key,
  //   Bucket: bucketName, //set somewhere
  //   Body: req, //req is a stream
  // };
  // s3.upload(params, (err, data) => {
  //   if (err) {
  //     res.send('Error Uploading Data: ' + JSON.stringify(err) + '\n' + JSON.stringify(err.stack));
  //   } else {
  //     res.send(Key);
  //   }
  // });

  return {};
};

export default lambdaJsonResponseHandler(handleImageUploadForm);
