import type { NextApiRequest, NextApiResponse } from 'next';

export default async function authenticationHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { clientId, clientSecret } = req.body;

  try {
    const { accessToken } = await fetchToken(clientId, clientSecret);
    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch token' });
  }
}

async function fetchToken(clientId: string, clientSecret: string) {
  const tokenPostData = new URLSearchParams({
    grant_type: process.env.NEXT_PUBLIC_GRANT_TYPE!,
    client_id: clientId,
    client_secret: clientSecret,
    scope: process.env.NEXT_PUBLIC_AUTHENTICATION_SCOPE!,
  });

  const response = await fetch(
    process.env.NEXT_PUBLIC_AUTHENTICATION_TOKEN_URL!,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: tokenPostData.toString(),
    }
  );

  if (!response.ok) {
    throw new Error(`Error fetching authentication token: ${response.status}`);
  }

  const parsedToken = await response.json();
  return { accessToken: parsedToken.access_token };
}
