export type EnrichedIcdData = {
  icdCode: string;
  foundationId: string;
  title: {
    '@language': string;
    '@value': string;
  };
  definition?: {
    '@language': string;
    '@value': string;
  };
}[];
