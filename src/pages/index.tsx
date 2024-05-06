import BrowseFoundation from '@/components/BrowseFoundationComponent';
import SearchResultComponent from '@/components/SearchResultComponent';
import ButtonComponent from '@/components/button/ButtonComponent';
import {
  primaryButtonStyle,
  secondaryButtonStyle,
} from '@/components/button/ButtonStyles';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';

export default function Home() {
  const [inputData, setInputData] = useState('');
  const [selectedSearchType, setSelectedSearchType] = useState<
    | 'freeText'
    | 'icdCode'
    | 'foundationId'
    | 'browseFoundation'
    | 'searchDiagnosis'
  >('freeText');
  const [icdData, setIcdData] = useState(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchQuery = event.target.value;
    setInputData(newSearchQuery);

    if (selectedSearchType === 'freeText' && newSearchQuery.length > 0) {
      freeTextSearch(newSearchQuery);
    }
  };

  const handleSearchSelectionClick = (
    searchType:
      | 'freeText'
      | 'icdCode'
      | 'foundationId'
      | 'browseFoundation'
      | 'searchDiagnosis'
  ) => {
    setIcdData(null);
    setInputData('');

    setSelectedSearchType(searchType);
  };

  const freeTextSearch = async (searchQuery: string) => {
    const response = await fetch(
      `http://localhost:5000/api/icd/search/${searchQuery}`
    );

    if (!response.ok) {
      console.log('Error fetching data');
    }

    const data = await response.json();

    setIcdData(data);
  };

  const icdCodeSearch = async (icdCode: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/icd/enriched/${icdCode}`
      );

      const data = await response.json();
      setIcdData(data);
    } catch (err) {
      console.log('Error fetching data: ', err);
    }
  };

  const foundationIdSearch = async (foundationId: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/icd/entity/${foundationId}`
      );

      const data = await response.json();
      setIcdData(data);
    } catch (err) {
      console.log('Error fetching data: ', err);
    }
  };

  const searchDiagnosis = async (diagnosisText: string) => {
    try {
      const uriEncodedDiagnosis = encodeURIComponent(diagnosisText);

      const response = await fetch(
        `http://localhost:5000/api/icd/diagnosis?searchText=${uriEncodedDiagnosis}`
      );

      const data = await response.json();
      setIcdData(data);
    } catch (err) {
      console.log('Error fetching data: ', err);
    }
  };

  const handleSubmit = async () => {
    const searchQuery = inputData;

    if (selectedSearchType === 'freeText') {
      freeTextSearch(searchQuery);
    } else if (selectedSearchType === 'icdCode') {
      icdCodeSearch(searchQuery);
    } else if (selectedSearchType === 'foundationId') {
      foundationIdSearch(searchQuery);
    } else {
      searchDiagnosis(searchQuery);
    }
  };

  return (
    <Box sx={{ p: 10 }}>
      <Stack>
        <Typography
          variant="h3"
          textAlign="center"
        >
          ICD-11 Service
        </Typography>
      </Stack>
      <Stack direction="column">
        <Stack
          direction="row"
          sx={{ p: 2, m: 1, justifyContent: 'center' }}
        >
          <ButtonComponent
            innerText={'Dynamic Text Search'}
            style={
              selectedSearchType === 'freeText'
                ? primaryButtonStyle
                : secondaryButtonStyle
            }
            onClick={() => handleSearchSelectionClick('freeText')}
          />
          <ButtonComponent
            innerText={'ICD Code Search'}
            style={
              selectedSearchType === 'icdCode'
                ? primaryButtonStyle
                : secondaryButtonStyle
            }
            onClick={() => handleSearchSelectionClick('icdCode')}
          />
          <ButtonComponent
            innerText={'Foundation ID Search'}
            style={
              selectedSearchType === 'foundationId'
                ? primaryButtonStyle
                : secondaryButtonStyle
            }
            onClick={() => handleSearchSelectionClick('foundationId')}
          />
          <ButtonComponent
            innerText={'Search diagnosis'}
            style={
              selectedSearchType === 'searchDiagnosis'
                ? primaryButtonStyle
                : secondaryButtonStyle
            }
            onClick={() => handleSearchSelectionClick('searchDiagnosis')}
          />
          <ButtonComponent
            innerText={'Browse foundation entities'}
            style={
              selectedSearchType === 'browseFoundation'
                ? primaryButtonStyle
                : secondaryButtonStyle
            }
            onClick={() => handleSearchSelectionClick('browseFoundation')}
          />
        </Stack>

        {selectedSearchType !== 'browseFoundation' ? (
          <Stack
            direction="row"
            sx={{ p: 2, marginLeft: 5 }}
          >
            <TextField
              sx={{ marginTop: 2, marginRight: 1, width: 400 }}
              label={
                selectedSearchType === 'freeText'
                  ? 'Free text'
                  : selectedSearchType === 'icdCode'
                  ? 'ICD Code'
                  : selectedSearchType === 'foundationId'
                  ? 'Foundation Id'
                  : 'Search diagnosis'
              }
              variant="filled"
              value={inputData}
              onChange={handleInputChange}
            />

            <ButtonComponent
              innerText="Search"
              style={primaryButtonStyle}
              onClick={handleSubmit}
            />
          </Stack>
        ) : (
          <></>
        )}
        {selectedSearchType !== 'browseFoundation' ? (
          <>
            {icdData && (
              <SearchResultComponent
                searchResultData={icdData}
                searchType={selectedSearchType}
              />
            )}
          </>
        ) : (
          <BrowseFoundation />
        )}
      </Stack>
    </Box>
  );
}
