import { Box, Stack, Typography } from '@mui/material';

type AccordionDataProp = {
  icdCode: string;
  title: {
    '@language': string;
    '@value': string;
  };
  definition?: {
    '@language': string;
    '@value': string;
  };
};

const AccordionIcdDataComponent = ({
  icdCode,
  title,
  definition,
}: AccordionDataProp) => {
  return (
    <Stack direction="row">
      <Box sx={{ p: 1, width: '10%' }}>
        <Typography>{icdCode}</Typography>
      </Box>
      <Box sx={{ p: 1, width: '15%' }}>
        <Typography>{title['@value']}</Typography>
      </Box>
      <Box sx={{ p: 1, width: '75%' }}>
        <Typography>
          {definition ? definition['@value'] : 'No definition available'}
        </Typography>
      </Box>
    </Stack>
  );
};

export default AccordionIcdDataComponent;
