import { JsonLd } from '../api/JsonLdType';

export type SearchDiagnosisResponse = {
  searchText: string;
  matchingText: string;
  title: JsonLd;
  theCode: string;
  foundationURI: string;
  linearizationURI: string;
  matchLevel: number;
  matchScore: number;
  matchType: number;
  definition?: JsonLd;
};
