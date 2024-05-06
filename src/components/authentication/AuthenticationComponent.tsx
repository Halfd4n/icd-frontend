import { useState, useEffect } from 'react';
import { useAuth } from '@/context/authContext';
import {
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Stack,
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import ButtonComponent from '@/components/button/ButtonComponent';
import { primaryButtonStyle } from '@/components/button/ButtonStyles';

const AuthenticationComponent = () => {
  const { authToken, setToken, setTokenExpiry } = useAuth();
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [open, setOpen] = useState(true);
  const [error, setError] = useState('');

  const fetchToken = async (clientId: string, clientSecret: string) => {
    try {
      const response = await fetch('/api/authentication/icd-authentication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clientId, clientSecret }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch authentication token');
      }

      const data = await response.json();

      setToken(data.accessToken);
      const expiryTime = new Date();
      expiryTime.setSeconds(expiryTime.getSeconds() + 3600);
      setTokenExpiry(expiryTime);
      setError('');
    } catch (error) {
      console.log('Error fetching token: ', error);
      setError(
        'Failed to authenticate. Check your credentials and please try again.'
      );
    }

    console.log(error);
  };

  useEffect(() => {
    if (!authToken) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [authToken]);

  return (
    <Dialog
      open={open}
      onClose={() => {}}
    >
      <DialogTitle sx={{ p: 3 }}>ICD Service Authentication</DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        <Typography
          variant="subtitle1"
          sx={{ mb: 2 }}
        >
          In order to use the service, create a profile @{' '}
          <a
            target="_blank"
            href="https://icd.who.int/icdapi"
          >
            WHO ICD API
          </a>{' '}
          to retrieve your client id and secret and paste them below. Then you
          will receive an access token that is valid for 1 hour total to allow
          requests using the functionalities of this service. When the token
          expires, you can request a new one using your client id and secret.
        </Typography>
        <Stack
          direction="row"
          sx={{ textAlign: 'center', mb: 2 }}
        >
          {error && (
            <>
              <ErrorIcon
                color="error"
                sx={{ mr: 1 }}
              />
              <Typography color="error">{error}</Typography>
            </>
          )}
        </Stack>
        <TextField
          label="Client ID"
          fullWidth
          margin="normal"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
        />
        <TextField
          label="Client Secret"
          fullWidth
          margin="normal"
          value={clientSecret}
          onChange={(e) => setClientSecret(e.target.value)}
        />
        <ButtonComponent
          innerText="Get Token"
          style={primaryButtonStyle}
          onClick={() => fetchToken(clientId, clientSecret)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AuthenticationComponent;
