'use client'

import Loador from '@/components/Loador';
import { ThemeProvider } from 'next-themes';
import { useEffect, useState } from 'react';

const ThemeProviders = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <Loador />;

  return (
    <ThemeProvider attribute="class">
      {children}
    </ThemeProvider>
  );
};

export default ThemeProviders;
