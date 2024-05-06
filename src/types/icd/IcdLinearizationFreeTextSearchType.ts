export type LinearizationResponse = {
  error: boolean;
  errorMessage: null | string;
  resultChopped: boolean;
  wordSuggestionsChopped: boolean;
  guessType: number;
  uniqueSearchId: string;
  words: null;
  destinationEntities: DestinationEntity[];
};

export type DestinationEntity = {
  id: string;
  title: string;
  stemId: string;
  isLeaf: boolean;
  postcoordinationAvailability: number;
  hasCodingNote: boolean;
  hasMaternalChapterLink: boolean;
  hasPerinatalChapterLink: boolean;
  matchingPVs: MatchingPV[];
  propertiesTruncated: boolean;
  isResidualOther: boolean;
  isResidualUnspecified: boolean;
  chapter: string;
  theCode: string;
  score: number;
  titleIsASearchResult: boolean;
  titleIsTopScore: boolean;
  entityType: number;
  important: boolean;
  descendants: any[];
};

type MatchingPV = {
  propertyId: string;
  label: string;
  score: number;
  important: boolean;
  foundationUri: string;
  propertyValueType: number;
};
