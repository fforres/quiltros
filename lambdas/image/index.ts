import formidable from 'formidable';
import { IncomingMessage, ServerResponse } from 'http';
import { inspect } from 'util';

import { ReadStream } from 'fs';
import { s3Client } from '../../server/clients/s3';
import { createImageHash } from '../../server/models/image';
import { createReadStreamPromise, lambdaJsonResponseHandler } from '../utils';

const promiseParser = (
  req: IncomingMessage
): Promise<{ fields: any; files: any }> => {
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

// export const uploadXmlStream = async({ stream, key }) => {
//   const ContentType = 'application/xml'
//   const data = await uplo
//   return data
// }

const uploadStream = async (
  Body: ReadStream,
  Key: string,
  ContentType: string
) => {
  // TODO: Test if it helps to pipe the string through require('zlip').createGzip()
  const props = {
    Body,
    Bucket: '_test',
    Key
  };
  const data = await s3Client.upload(props).promise();
  return data;
};

const createImage = async (fileSlug, image) => {
  const readStream = await createReadStreamPromise(image.path);
  await uploadStream(readStream, fileSlug, image.type);
};

const handleImageUploadForm = async (req: IncomingMessage) => {
  const { fields, files } = await promiseParser(req);
  const { image } = files;
  await createImage('test_slug', image);

  return {
    imageId: '',
    imageUrl: ''
  };
};

export default lambdaJsonResponseHandler(handleImageUploadForm);
