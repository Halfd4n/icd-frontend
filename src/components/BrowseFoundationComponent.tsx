import { FoundationEntity } from '@/types/icd/IcdFoundationType';
import useFetch from '@/utils/hooks/useFetch';
import { Box, Stack, Tabs, Typography } from '@mui/material';
import FoundationEntityTab from './tab/FoundationTabComponent';
import { useState } from 'react';
import FoundationTabsParent from './tab/FoundationParentTabs';
import { useAuth } from '@/context/authContext';

const FOUNDATION_ICD_TOP_LEVEL_URL = `/api/icd/foundationId?foundationId=455013390`;

const BrowseFoundationComponent = () => {
  const [activeTab, setActiveTab] = useState<number | boolean>(false);
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);
  const { authToken } = useAuth();

  const { data, error, loading } = useFetch<FoundationEntity>({
    url: FOUNDATION_ICD_TOP_LEVEL_URL,
    method: 'GET',
    authToken: authToken!,
    skip: false,
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (activeTab === newValue) {
      setActiveTab(false);
    } else {
      setActiveTab(newValue);
    }
  };

  const foundationIdChange = (foundationId: string) => {
    if (selectedEntityId === foundationId) {
      setSelectedEntityId(null);
    } else {
      setSelectedEntityId(foundationId);
    }
  };

  return (
    <Stack direction="column">
      {error ? (
        <Error />
      ) : loading ? (
        <Loading />
      ) : (
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: 'background.paper',
            display: 'flex',
            height: 500,
          }}
        >
          <Tabs
            value={activeTab}
            orientation="vertical"
            variant="scrollable"
            onChange={handleChange}
            aria-label="foundation-top-level-category-tabs"
            sx={{ borderRight: 1, borderColor: 'divider' }}
            TabIndicatorProps={{ style: { display: 'none' } }}
          >
            {data?.child?.map((value, index) => (
              <FoundationEntityTab
                key={index}
                foundationUri={value}
                index={index}
                activeTabIndex={activeTab}
                onChange={handleChange}
                onFoundationIdChange={foundationIdChange}
              />
            ))}
          </Tabs>
          {selectedEntityId && (
            <FoundationTabsParent selectedEntityId={selectedEntityId} />
          )}
        </Box>
      )}
    </Stack>
  );
};

const Error = () => {
  return <Typography>Error fetching</Typography>;
};

const Loading = () => {
  return <Typography>Loading...</Typography>;
};

export default BrowseFoundationComponent;
