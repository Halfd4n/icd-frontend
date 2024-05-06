import { NextApiRequest, NextApiResponse } from 'next';

export default async function icdHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { searchType } = req.query;
  const authToken = req.headers.authorization?.split(' ')[1];

  if (!authToken) {
    return res.status(401).json({ error: 'No authorization token provided' });
  }

  let url: string;

  try {
    switch (searchType) {
      case 'freeText':
        url = `${process.env.SERVICE_API_URL}/search/${encodeURIComponent(
          req.query.query as string
        )}`;
        break;
      case 'icdCode':
        url = `${process.env.SERVICE_API_URL}/enriched/${encodeURIComponent(
          req.query.icdCode as string
        )}`;
        break;
      case 'foundationId':
        url = `${process.env.SERVICE_API_URL}/entity/${encodeURIComponent(
          req.query.foundationId as string
        )}`;
        break;
      case 'searchDiagnosis':
        url = `${
          process.env.SERVICE_API_URL
        }diagnosis?searchText=${encodeURIComponent(
          req.query.diagnosisText as string
        )}`;
        break;
      default:
        return res.status(400).json({ error: 'Invalid search type' });
    }

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from ICD service: ${response.status}`
      );
    }

    const data = await response.json();

    res.status(200).send(data);
  } catch (error) {
    console.error('Error fetching from external API: ', error);
    res.status(500).json({ error: 'Error fetching from external api' });
  }
}
