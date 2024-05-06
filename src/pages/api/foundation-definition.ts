import { NextApiRequest, NextApiResponse } from 'next';

const ICD_FOUNDATION_ID_REGEX = /\/(\d+)(?:\/(\d+|[^\/]+))?$/;

export default async function foundationDefinitionHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { foundationUri } = req.query;

  const foundationId = extractFoundationId(foundationUri!.toString());

  try {
    const response = await fetch(
      `http://localhost:5000/api/icd/entity/${foundationId}`
    );

    const data = await response.json();

    if (data.definition) {
      res.status(200).send(data.definition);
    } else {
      res.status(200).send({
        '@language': 'en',
        '@value': 'No definition available',
      });
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
