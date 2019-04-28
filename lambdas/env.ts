const isProduction = process.env.NOW_GITHUB_COMMIT_REF === 'master'

const {
  S3_PROD_ACCESS_KEY_ID = '',
  S3_STAGE_ACCESS_KEY_ID = '',
  S3_STAGE_SECRET_ACCESS_KEY = '',
  S3_PROD_SECRET_ACCESS_KEY = ''
} = process.env

export const accessKeyId = isProduction ? S3_PROD_ACCESS_KEY_ID : S3_STAGE_ACCESS_KEY_ID
export const secretAccessKey = isProduction ? S3_PROD_SECRET_ACCESS_KEY : S3_STAGE_SECRET_ACCESS_KEY