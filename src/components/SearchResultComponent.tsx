import { Stack, Typography } from '@mui/material';
import { FoundationEntity } from '@/types/icd/IcdFoundationType';
import { LinearizationResponse } from '@/types/icd/IcdLinearizationFreeTextSearchType';
import LinearizationComponent from './icd/LinearizationComponent';
import FoundationComponent from './icd/FoundationComponent';
import { IcdCodeResponse } from '@/types/icd/IcdCodeSearchType';
import IcdDataComponent from './icd/IcdComponent';
import { SearchDiagnosisResponse } from '@/types/icd/IcdSearchDiagnosis';
import DiagnosisComponent from './icd/DiagnosisComponent';

interface SearchResultComponentsProps {
  searchResultData:
    | LinearizationResponse
    | IcdCodeResponse[]
    | FoundationEntity
    | SearchDiagnosisResponse
    | null;
  searchType: 'freeText' | 'icdCode' | 'foundationId' | 'searchDiagnosis';
}

function isLinearizationResponse(
  data: any,
  searchType: string
): data is LinearizationResponse {
  return searchType === 'freeText';
}

function isIcdCodeResponseArray(
  data: any,
  searchType: string
): data is IcdCodeResponse[] {
  return searchType === 'icdCode';
}

function isFoundationEntity(
  data: any,
  searchType: string
): data is FoundationEntity {
  return searchType === 'foundationId';
}

function isSearchDiagnosisResponse(
  data: any,
  searchType: string
): data is SearchDiagnosisResponse {
  return searchType === 'searchDiagnosis';
}

const SearchResultComponent = ({
  searchResultData,
  searchType,
}: SearchResultComponentsProps) => {
  return (
    <Stack direction="column">
      {isLinearizationResponse(searchResultData, searchType) ? (
        searchResultData?.destinationEntities?.map((entity) => (
          <LinearizationComponent
            key={entity.id}
            linearizationEntity={entity}
          />
        ))
      ) : isIcdCodeResponseArray(searchResultData, searchType) ? (
        <IcdDataComponent icdEntity={searchResultData[0]} />
      ) : isFoundationEntity(searchResultData, searchType) ? (
        <FoundationComponent foundationEntity={searchResultData} />
      ) : isSearchDiagnosisResponse(searchResultData, searchType) ? (
        <DiagnosisComponent diagnosisEntity={searchResultData} />
      ) : (
        <Typography>No data available</Typography>
      )}
    </Stack>
  );
};

export default SearchResultComponent;
