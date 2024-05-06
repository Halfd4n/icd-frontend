import { SxProps, Theme } from '@mui/material';

export const primaryButtonStyle: SxProps<Theme> = {
  p: 2,
  m: 2,
  backgroundColor: '#ff9d00',
  color: 'black',
  '&:hover': {
    backgroundColor: '#f86700',
    color: 'whitesmoke',
  },
};

export const secondaryButtonStyle: SxProps<Theme> = {
  p: 2,
  m: 2,
  backgroundColor: 'whitesmoke',
  color: 'black',
  '&:hover': {
    backgroundColor: '#f86700',
    color: 'whitesmoke',
  },
};
