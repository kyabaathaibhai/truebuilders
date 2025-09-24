'use client';
import Loader from '@app/components/Loader';
import { useEffect, useState } from 'react';

export default function AppInit({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      let token = localStorage.getItem('token');

      if (!token) {
        // login first time
        const res = await fetch('/api/auth/login', { method: 'POST' });
        const data = await res.json();

        if (data.token) {
          localStorage.setItem('token', data.token);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    init();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return <>{children}</>;
}
