import { useEffect, useRef, useState } from 'react';

type Props = {
  url: string;
  method: 'GET' | 'POST';
  authToken: string;
  body?: string;
  skip: boolean;
};

const useFetch = <T>({ url, method = 'GET', authToken, body, skip }: Props) => {
  const hasFetchedRef = useRef(false);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (skip) return;

    hasFetchedRef.current = true;

    (async () => {
      try {
        const response = await fetch(url, {
          method,
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          body,
        });

        if (!response.ok) {
          setError(
            new Error(`Fetched failed with status code: ${response.status}`)
          );
        }

        const result = await response.json();

        setData(result);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    })();
  }, [body, method, url, skip]);

  return { data, error, loading };
};

export default useFetch;
