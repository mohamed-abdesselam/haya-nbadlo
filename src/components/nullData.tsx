'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import Container from './container';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLocale } from 'next-intl';
import { signOut } from 'next-auth/react';
import useTranslation from '@/hooks/useTranslation';

interface NullDataProps {
  msg: string;
  login?: boolean;
  signout?: boolean;
}

const NullData = ({ msg, login = false, signout = false }: NullDataProps) => {
  const router = useRouter();
  const locale = useLocale();
  const { t } = useTranslation('NullData')

  return (
    <Container>
      <div className="w-full flex flex-col gap-28 mt-10">
        <div className="flex gap-4 justify-between items-center">
          <Button
            variant={"ghost"}
            onClick={() => router.push(`/${locale}`)}
            className="flex items-center gap-2"
          >
            {locale ==='ar'? <ArrowRight size={20} /> : <ArrowLeft size={20} />} {t('goHome')}
          </Button>
          <div className="flex gap-4 items-center">
            {signout && <Button variant={"ghost"} onClick={() => signOut()}>{t('signOut')}</Button>}
            {login && <Button onClick={() => router.push(`/${locale}/login`)}>{t('login')}</Button>}
          </div>
        </div>
        <h2 className="text-center font-bold text-2xl">{msg}</h2>
      </div>
    </Container>
  );
};

export default NullData;
