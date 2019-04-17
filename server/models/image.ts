import { pgConnection } from '../clients/postgres'

export const createImage = async () => {
  const data = await pgConnection('images').returning('hash')
  console.log({ data })
  return data
}

export const updateImageUrl = async (id: string, url: string) => {
  const data = await pgConnection('images').where('hash', id).update('url', url)
  console.log({ data })
  return data
}
