import { Stack, Typography } from '@mui/material';
import useFetch from '@/utils/hooks/useFetch';
import { useEffect, useState } from 'react';
import AccordionIcdDataComponent from './AccordionIcdDataComponent';
import { EnrichedIcdData } from '@/types/icd/EnrichedIcdData';

type AccordionBodyProps = {
  icdCodes?: string;
};

const AccordionBodyComponent = ({ icdCodes }: AccordionBodyProps) => {
  const [displayData, setDisplayData] = useState<EnrichedIcdData>([]);

  const encodedIcd = icdCodes ? encodeURIComponent(icdCodes) : undefined;

  const {
    data: rawData,
    error,
    loading,
  } = useFetch<EnrichedIcdData>({
    url: `http://localhost:5000/api/icd/enriched/${encodedIcd}`,
    method: 'GET',
    skip: !encodedIcd,
  });

  useEffect(() => {
    if (rawData) {
      const transformedData = rawData.map((data) => ({
        icdCode: data.icdCode,
        foundationId: data.foundationId,
        title: data.title,
        definition: data.definition ? data.definition : undefined,
      }));

      setDisplayData(transformedData);
    }
  }, [rawData]);

  return (
    <Stack direction="column">
      {error ? (
        <Error />
      ) : loading ? (
        <Loading />
      ) : (
        displayData?.map((entity) => (
          <AccordionIcdDataComponent
            key={entity.icdCode}
            icdCode={entity.icdCode}
            title={entity.title}
            definition={entity.definition}
          />
        ))
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
export default AccordionBodyComponent;
