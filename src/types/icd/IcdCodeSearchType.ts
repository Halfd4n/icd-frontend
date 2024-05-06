import { DetailedError } from '../api/DetailedErrorType';
import { JsonLd } from '../api/JsonLdType';

export type IcdCodeResponse = {
  icdCode: string;
  foundationId: string;
  title: JsonLd;
  definition?: JsonLd;
  isError: boolean;
  error?: DetailedError;
};
