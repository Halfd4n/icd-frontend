import { useState } from 'react';
import { useAuth } from '@/context/authContext';
import BrowseFoundation from '@/components/BrowseFoundationComponent';
import SearchResultComponent from '@/components/SearchResultComponent';
import ButtonComponent from '@/components/button/ButtonComponent';
import {
  primaryButtonStyle,
  secondaryButtonStyle,
} from '@/components/button/ButtonStyles';
import { Box, Stack, TextField, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export default function Home() {
  const { authToken } = useAuth();
  const [icdData, setIcdData] = useState(null);
  const [inputData, setInputData] = useState('');
  const [selectedSearchType, setSelectedSearchType] = useState<
    | 'freeText'
    | 'icdCode'
    | 'foundationId'
    | 'browseFoundation'
    | 'searchDiagnosis'
  >('freeText');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchQuery = event.target.value;
    setInputData(newSearchQuery);

    if (selectedSearchType === 'freeText' && newSearchQuery.length > 0) {
      freeTextSearch();
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

  const freeTextSearch = async () => {
    await handleSubmit();
  };

  const handleSubmit = async () => {
    if (!inputData) return;

    let searchParams = {};

    switch (selectedSearchType) {
      case 'freeText':
        searchParams = { query: inputData };
        break;
      case 'icdCode':
        searchParams = { icdCode: inputData };
        break;
      case 'foundationId':
        searchParams = { foundationId: inputData };
        break;
      case 'searchDiagnosis':
        searchParams = { diagnosisText: inputData };
        break;
    }

    handleSearch(selectedSearchType, searchParams);
  };

  const handleSearch = async (searchType: string, searchParams: any) => {
    const data = await performSearch(searchType, searchParams);
    setIcdData(data);
  };

  const performSearch = async (searchType: string, params: any) => {
    const queryString = new URLSearchParams(params).toString();
    const url = `/api/icd/${searchType}?${queryString}`;

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch external data');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching external API: ', error);
      return null;
    }
  };

  return (
    <Box sx={{ p: 5 }}>
      <Stack
        direction="row"
        sx={{ p: 2, alignItems: 'center', width: '100%', position: 'relative' }}
      >
        <Typography variant="h4">ICD-11 Service</Typography>
        <Box sx={{ position: 'absolute', right: 20 }}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
          >
            {authToken !== null ? (
              <>
                <Typography sx={{ mr: 1 }}>Token validated</Typography>
                <CheckCircleIcon sx={{ color: 'green', fontSize: 40 }} />
              </>
            ) : (
              <>
                <Typography sx={{ mr: 1 }}>Token not validated</Typography>
                <CancelIcon sx={{ color: 'red', fontSize: 40 }} />
              </>
            )}
          </Stack>
        </Box>
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
