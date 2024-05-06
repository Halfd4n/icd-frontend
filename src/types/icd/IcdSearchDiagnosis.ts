import { JsonLd } from '../api/JsonLdType';

export type SearchDiagnosisResponse = {
  searchText: string;
  matchingText: string;
  theCode: string;
  foundationURI: string;
  linearizationURI: string;
  matchLevel: number;
  matchScore: number;
  matchType: number;
  definition?: JsonLd;
};
