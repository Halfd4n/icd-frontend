import { NextApiRequest, NextApiResponse } from 'next';

const ICD_FOUNDATION_ID_REGEX = /\/(\d+)(?:\/(\d+|[^\/]+))?$/;

export default async function diagnosisEnrichmentHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { foundationUri } = req.query;
  const authToken = req.headers.authorization?.split(' ')[1];

  const foundationId = extractFoundationId(foundationUri!.toString());

  try {
    const response = await fetch(
      `${process.env.SERVICE_API_URL}/entity/${foundationId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();

    if (data.definition) {
      res.status(200).send(data);
    } else {
      res.status(200).send({});
    }
  } catch (err) {
    console.log('Error fetching data: ', err);
  }
}

const extractFoundationId = (foundationURI: string) => {
  const match = foundationURI.match(ICD_FOUNDATION_ID_REGEX);

  if (match !== null) {
    const foundationId =
      match[2] && /^\d+$/.test(match[2]) ? match[2] : match[1];

    return foundationId;
  }
};
