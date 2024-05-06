import { JsonLd } from '../api/JsonLdType';

export type Lead = {
  id: string;
  gender: Gender;
  yearOfBirth: number;
  conditions: Condition[];
};

export type Gender = 'female' | 'male' | 'other' | 'unknown';

export type Condition = {
  icdCode: string;
  foundationId: string;
  title: string;
  synonymLabels: JsonLd[];
  definition: JsonLd;
};
