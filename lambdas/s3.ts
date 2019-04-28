import aws from 'aws-sdk'

import { accessKeyId, secretAccessKey } from './env'
import { lambdaJsonResponseHandler } from './utils';

aws.config.region = 'us-west-2'
aws.config.setPromisesDependency(Promise)

export const s3Client = new aws.S3({
  credentials: {
    accessKeyId,
    secretAccessKey,
  }
})
