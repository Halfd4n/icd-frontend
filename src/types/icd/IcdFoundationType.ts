type LocalizedText = {
  '@language': string;
  '@value': string;
};

type Label = {
  label: LocalizedText;
};

export type FoundationEntity = {
  '@context': string;
  '@id': string;
  parent: string[];
  child: string[];
  browserUrl: string;
  title: LocalizedText;
  synonym: Label[];
  definition: LocalizedText;
  inclusion: Label[];
  fullySpecifiedName: LocalizedText;
  relatedEntitiesInPerinatalChapter: string[];
};
