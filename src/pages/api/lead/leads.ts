import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

export default async function leadHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const filePath = path.join(process.cwd(), 'data', 'db.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error reading data' });
    }

    const jsonData = JSON.parse(data);
    res.status(200).send(jsonData);
  });
}
