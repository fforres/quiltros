import { IncomingMessage, ServerResponse } from 'http'
import aws from 'aws-sdk'

import { accessKeyId, secretAccessKey } from '../env'
import { lambdaJsonResponseHandler } from '../utils';

aws.config.region = 'us-west-2'
aws.config.setPromisesDependency(Promise)

export const s3Client = new aws.S3({
  credentials: {
    accessKeyId,
    secretAccessKey,
  }
})

export default async (req: IncomingMessage, res: ServerResponse) => {
  lambdaJsonResponseHandler(req, res, async () => {
    return {}
  })
};