import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import LeadEstimateComponent from '../lead/leadEstimate';

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
    <TableContainer
      component={Paper}
      sx={{ mb: 1 }}
    >
      <Table
        sx={{ minWidth: 800 }}
        aria-label="diagnosis-search-table"
      >
        <TableHead sx={{ bgcolor: '#d4d4d4' }}>
          <TableRow sx={{ color: 'whitesmoke' }}>
            <TableCell>ICD Code</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Definition</TableCell>
            <TableCell>Possible Leads</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell sx={{ width: 75 }}>{icdCode}</TableCell>
            <TableCell sx={{ width: 180 }}>{title['@value']}</TableCell>
            <TableCell sx={{ width: 450 }}>
              {definition ? definition['@value'] : 'No definition available'}
            </TableCell>
            <TableCell sx={{ width: 100 }}>
              <LeadEstimateComponent
                diagnosis={{ icdCode, title, definition }}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AccordionIcdDataComponent;
