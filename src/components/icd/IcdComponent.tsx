import { IcdCodeResponse } from '@/types/icd/IcdCodeSearchType';
import { Box, Stack, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import React from 'react';

type IcdProps = {
  icdEntity: IcdCodeResponse;
};

const IcdDataComponent = ({ icdEntity }: IcdProps) => {
  return (
    <Stack
      direction="row"
      sx={{
        border: `solid 1px ${icdEntity?.isError ? 'red' : 'silver'}`,
        borderRadius: 1,
      }}
    >
      {icdEntity?.isError ? (
        <Error />
      ) : (
        <>
          <Box sx={{ p: 1, width: '10%' }}>
            <Typography>{icdEntity.icdCode}</Typography>
          </Box>
          <Box sx={{ p: 1, width: '15%' }}>
            <Typography>{icdEntity.title['@value']}</Typography>
          </Box>
          <Box sx={{ p: 1, width: '75%' }}>
            <Typography>
              {icdEntity.definition
                ? icdEntity.definition['@value']
                : 'No definition available'}
            </Typography>
          </Box>
        </>
      )}
    </Stack>
  );
};

const Error = () => {
  return (
    <Box sx={{ p: 1, width: '100%', display: 'flex', alignItems: 'center' }}>
      <ErrorIcon sx={{ marginRight: 1 }} />
      <Typography>Error fetching data</Typography>
    </Box>
  );
};

export default IcdDataComponent;
