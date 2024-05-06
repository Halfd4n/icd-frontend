import { SearchDiagnosisResponse } from '@/types/icd/IcdSearchDiagnosis';
import { objectToBase64Converter } from '@/utils/base64Converter/base64Converter';
import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { json } from 'stream/consumers';

type LeadEstimateProps = {
  diagnosis: SearchDiagnosisResponse;
};

interface ScoreCounts {
  perfect: number;
  intermediate: number;
  low: number;
  total: number;
}

const LeadEstimateComponent = ({ diagnosis }: LeadEstimateProps) => {
  const [leads, setLeads] = useState<ScoreCounts>();

  useEffect(() => {
    if (diagnosis) {
      matchLeads();
    }
  }, [diagnosis]);

  const matchLeads = async () => {
    const base64Diagnosis = objectToBase64Converter(diagnosis);

    try {
      const response = await fetch(
        `/api/lead/match-leads?diagnosis=${encodeURIComponent(base64Diagnosis)}`
      );
      const data = await response.json();

      setLeads(data);
    } catch (error) {
      console.log('Failed to match leads: ', error);
    }
  };

  return leads ? (
    <Typography>
      {leads.perfect === leads.total
        ? leads.perfect
        : `${leads.perfect} - ${leads.total}`}
    </Typography>
  ) : null;
};

export default LeadEstimateComponent;
