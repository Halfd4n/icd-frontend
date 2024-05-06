import { ThemeProvider, createTheme } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import { CssBaseline } from '@mui/material';

const theme = createTheme({
  // No theme atm..
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
