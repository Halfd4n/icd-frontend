import { SearchDiagnosisResponse } from '@/types/icd/IcdSearchDiagnosis';
import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import LeadEstimateComponent from '../lead/leadEstimate';

type DiagnosisProps = {
  diagnosisEntity: SearchDiagnosisResponse;
};

const DiagnosisComponent = ({ diagnosisEntity }: DiagnosisProps) => {
  const [diagnosis, setDiagnosis] = useState(diagnosisEntity);

  useEffect(() => {
    if (diagnosisEntity) {
      fetchFoundationDescription();
    }
  }, [diagnosisEntity]);

  const fetchFoundationDescription = async () => {
    try {
      await fetch(
        `/api/foundation-definition?foundationUri=${encodeURIComponent(
          diagnosisEntity.foundationURI
        )}`
      )
        .then((response) => response.json())
        .then((data) => {
          const enrichedDiagnosis = { ...diagnosisEntity, definition: data };
          setDiagnosis(enrichedDiagnosis);
        });
    } catch (error) {
      console.log('Failed to fetch definition: ', error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 800 }}
        aria-label="diagnosis-search-table"
      >
        <TableHead sx={{ bgcolor: '#ff9d00' }}>
          <TableRow sx={{ color: 'whitesmoke' }}>
            <TableCell>ICD Code</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Definition</TableCell>
            <TableCell>Possible Leads</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell sx={{ width: 75 }}>{diagnosis.theCode}</TableCell>
            <TableCell sx={{ width: 180 }}>{diagnosis.matchingText}</TableCell>
            <TableCell sx={{ width: 450 }}>
              {diagnosis?.definition
                ? diagnosis.definition['@value']
                : 'No definition available'}
            </TableCell>
            <TableCell sx={{ width: 100 }}>
              <LeadEstimateComponent diagnosis={diagnosis} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DiagnosisComponent;