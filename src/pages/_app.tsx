import { ThemeProvider, createTheme } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import { CssBaseline } from '@mui/material';
import AuthProvider from '@/context/authContext';
import AuthenticationComponent from '@/components/authentication/AuthenticationComponent';

const theme = createTheme({
  // No theme atm..
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthenticationComponent />
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  );
}
