// src/hooks/useLoading.ts
import { useState, useCallback } from 'react';

interface UseLoadingProps<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  load: (fetchFunction: () => Promise<T | null>) => void;
}

export function useLoading<T>(): UseLoadingProps<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (fetchFunction: () => Promise<T | null>) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFunction();
      console.log(result);
      if (result === null) {
        setError('No data available');
      } else {
        setData(result);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, load };
}
