import React, { useState } from 'react';
import { DestinationEntity } from '@/types/icd/IcdLinearizationFreeTextSearchType';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionBodyComponent from '../accordion/AccordionBodyComponent';

type LinearizationProps = {
  linearizationEntity: DestinationEntity;
};

const LinearizationComponent = ({
  linearizationEntity,
}: LinearizationProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleAccordionChange = (
    event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    setIsExpanded(isExpanded);
  };

  return (
    <Accordion
      onChange={handleAccordionChange}
      sx={{
        marginBottom: 1,
        width: 'inherit',
        borderRadius: 1,
      }}
    >
      <AccordionSummary
        sx={{
          backgroundColor: '#FFB94A',
          borderRadius: 1,
          '&:hover': {
            backgroundColor: '#f86700',
            color: 'whitesmoke',
          },
          transition: 'background-color 0.3s, box-shadow 0.3s',
          cursor: 'pointer',
        }}
        expandIcon={<ExpandMoreIcon />}
      >
        <Box sx={{ p: 1, width: 150 }}>
          <Typography>{linearizationEntity.theCode}</Typography>
        </Box>
        <Box sx={{ p: 1 }}>
          <Typography>{linearizationEntity.title}</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {isExpanded && (
          <AccordionBodyComponent icdCodes={linearizationEntity.theCode} />
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default LinearizationComponent;
