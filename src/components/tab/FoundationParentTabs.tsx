import { Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
import FoundationEntityTab from './FoundationTabComponent';
import useFetch from '@/utils/hooks/useFetch';
import { FoundationEntity } from '@/types/icd/IcdFoundationType';
import { useAuth } from '@/context/authContext';

const FOUNDATION_BASE_URL = `/api/icd/foundationId?foundationId=`;

type TabsProps = {
  selectedEntityId: string;
};

const FoundationTabsParent = ({ selectedEntityId }: TabsProps) => {
  const [activeTab, setActiveTab] = useState<number | boolean>(false);
  const [selectedParentEntityId, setSelectedEntityId] = useState(null);
  const { authToken } = useAuth();

  useEffect(() => {
    if (selectedParentEntityId !== selectedEntityId) {
      setActiveTab(false);
    }
  }, [selectedParentEntityId, selectedEntityId]);

  const { data, error, loading } = useFetch<FoundationEntity>({
    url: `${FOUNDATION_BASE_URL}${selectedEntityId}`,
    method: 'GET',
    authToken: authToken!,
    skip: !selectedEntityId,
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (activeTab === newValue) {
      setActiveTab(false);
    } else {
      setActiveTab(newValue);
    }
  };

  const foundationIdChange = (foundationId: string) => {};

  return (
    <Tabs
      value={activeTab}
      orientation="vertical"
      variant="scrollable"
      onChange={handleChange}
      aria-label="foundation-top-level-tabs"
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
  );
};

export default FoundationTabsParent;
