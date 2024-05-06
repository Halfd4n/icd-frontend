import { FoundationEntity } from '@/types/icd/IcdFoundationType';
import { Box, Stack, Typography } from '@mui/material';

type FoundationComponentProps = {
  foundationEntity: FoundationEntity;
};

const FoundationComponent = ({
  foundationEntity,
}: FoundationComponentProps) => {
  return (
    <Stack
      direction="row"
      sx={{ p: 2, border: 'solid 1px silver', borderRadius: 1 }}
    >
      <Box sx={{ p: 1, width: '10%' }}>
        <Typography>{foundationEntity.title['@value']}</Typography>
      </Box>
      <Box sx={{ p: 1, width: '90%' }}>
        <Typography>
          {foundationEntity.definition
            ? foundationEntity.definition['@value']
            : 'No definition available'}
        </Typography>
      </Box>
    </Stack>
  );
};

export default FoundationComponent;
