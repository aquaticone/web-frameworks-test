import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  highlySecretString: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ highlySecretString: process.env.HIGHLY_SECRET_STRING ?? "nope" })
}
