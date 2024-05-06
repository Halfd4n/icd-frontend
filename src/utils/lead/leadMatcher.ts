import { Lead } from '@/types/lead/leadEntity';
import { WordTokenizer } from 'natural';

const tokenizer = new WordTokenizer();

export const LeadMatchCalculator = (lead: Lead, diagnosis: any) => {
  const {
    icdCode: diagnosisIcd,
    title: diagnosisTitle,
    definition: diagnosisDefinition,
  } = diagnosis;
  const {
    icdCode,
    title,
    definition: leadConditionDefinition,
  } = lead.conditions[0];

  let totalSimilarityScore = 0;

  totalSimilarityScore += compareCodeSimilarity(icdCode, diagnosisIcd);

  totalSimilarityScore += compareTextSimilarity(
    title,
    diagnosisTitle['@value']
  );

  if (
    entityHasDefinition(leadConditionDefinition) &&
    entityHasDefinition(diagnosisDefinition)
  ) {
    totalSimilarityScore += compareTextSimilarity(
      leadConditionDefinition['@value'],
      diagnosisDefinition!['@value']
    );

    let calculatedSimilarityScore = totalSimilarityScore / 3;

    return calculatedSimilarityScore;
  }

  let calculatedSimilarityScore = totalSimilarityScore / 2;

  return calculatedSimilarityScore;
};

function compareCodeSimilarity(leadCode: string, diagnosisCode: string) {
  const maxLength = Math.min(leadCode.length, diagnosisCode.length);

  let matchScore = 0;
  for (let i = 0; i < maxLength; i++) {
    leadCode[i] === diagnosisCode[i] ? (matchScore += 1) : (matchScore += 0);
  }

  return matchScore / maxLength;
}

function compareTextSimilarity(
  leadText: string,
  diagnosisText: string
): number {
  const leadWords = new Set(tokenizer.tokenize(leadText));
  const diagnosisWords = new Set(tokenizer.tokenize(diagnosisText));

  const intersection = new Set(
    [...leadWords].filter((x) => diagnosisWords.has(x))
  );
  const union = new Set([...leadWords, ...diagnosisWords]);

  return intersection.size / union.size;
}

function entityHasDefinition(definition: any): boolean {
  if (definition && definition['@value'] !== 'No definition available')
    return true;

  return false;
}
