import { FoundationEntity } from '@/types/icd/IcdFoundationType';
import useFetch from '@/utils/hooks/useFetch';
import { Tab, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React, { useEffect } from 'react';
import { useAuth } from '@/context/authContext';

const ICD_FOUNDATION_ID_REGEX = /\/(\d+)/;
const FOUNDATION_ID_URL = `/api/icd/foundationId?foundationId=`;

type FoundationTabProps = {
  foundationUri: string;
  index: number;
  activeTabIndex: number | boolean;
  onChange: (event: React.SyntheticEvent, index: number) => void;
  onFoundationIdChange: (foundationId: string) => void;
};

const FoundationEntityTab = ({
  foundationUri,
  index,
  activeTabIndex,
  onChange,
  onFoundationIdChange,
}: FoundationTabProps) => {
  const foundationId = extractFoundationId(foundationUri);
  const { authToken } = useAuth();

  const { data, error, loading } = useFetch<FoundationEntity>({
    url: `${FOUNDATION_ID_URL}${foundationId}`,
    method: 'GET',
    authToken: authToken!,
    skip: !foundationId,
  });

  const handleTabChangeClick = (event: React.SyntheticEvent) => {
    if (foundationId) {
      onChange(event, index);
      onFoundationIdChange(foundationId);
    }
  };

  return (
    <Tab
      onChange={handleTabChangeClick}
      label={
        error ? 'Error' : loading ? 'Loading entity' : data?.title['@value']
      }
      icon={activeTabIndex === index ? <ArrowForwardIosIcon /> : ''}
      iconPosition="end"
      sx={{
        backgroundColor: activeTabIndex === index ? '#ff9d00' : '',
        '&:hover': {
          backgroundColor: '#f86700',
          color: 'black',
        },
      }}
    />
  );
};

function extractFoundationId(foundationUri: string) {
  const match = foundationUri.match(ICD_FOUNDATION_ID_REGEX);

  if (match) {
    return match[1];
  }
}

export default FoundationEntityTab;
