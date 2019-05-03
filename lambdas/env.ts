const isProduction = process.env.NOW_GITHUB_COMMIT_REF === 'master'

const {
  S3_ACCESS_KEY_ID = '',
  S3_SECRET_ACCESS_KEY = ''
} = process.env

export const accessKeyId = S3_ACCESS_KEY_ID
export const secretAccessKey = S3_SECRET_ACCESS_KEY