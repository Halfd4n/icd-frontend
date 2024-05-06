import { Lead } from '@/types/lead/leadEntity';
import { base64ToObjectConverter } from '@/utils/base64Converter/base64Converter';
import { LeadMatchCalculator } from '@/utils/lead/leadMatcher';
import { NextApiRequest, NextApiResponse } from 'next';

const PERFECT_SCORE = 1;
const HIGH_SCORE = 0.5;
const INTERMEDIATE_SCORE = 0.25;

interface ScoreCounts {
  perfect: number;
  intermediate: number;
  low: number;
  total: number;
}

export default async function matchLeadsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { diagnosis } = req.query;

  const diagnosisBase64String = Array.isArray(diagnosis)
    ? diagnosis[0]
    : diagnosis;

  const diagnosisObject = base64ToObjectConverter(diagnosisBase64String!);

  const leads: Lead[] = await fetchLeads(req);

  const leadMatchScores: ScoreCounts = leads.reduce(
    (acc, lead) => {
      const matchScore = LeadMatchCalculator(lead, diagnosisObject);

      if (matchScore === PERFECT_SCORE) {
        acc.perfect += 1;
        acc.total += 1;
      } else if (matchScore >= HIGH_SCORE) {
        acc.intermediate += 1;
        acc.total += 1;
      } else if (matchScore >= INTERMEDIATE_SCORE) {
        acc.low += 1;
        acc.total += 1;
      }

      return acc;
    },
    { perfect: 0, intermediate: 0, low: 0, total: 0 }
  );

  res.status(200).send(leadMatchScores);
}

async function fetchLeads(req: NextApiRequest) {
  const url = `${req.headers['x-forwarded-proto'] || 'http'}://${
    req.headers.host
  }/api/lead/leads`;

  try {
    const response = await fetch(url);
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
