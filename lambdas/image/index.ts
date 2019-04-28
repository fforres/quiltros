import aws from 'aws-sdk'

import { accessKeyId, secretAccessKey } from '../env'

aws.config.region = 'us-west-2'
aws.config.setPromisesDependency(Promise)

export const s3Client = new aws.S3({
  credentials: {
    accessKeyId,
    secretAccessKey,
  }
})

export default async (_: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({}));
};