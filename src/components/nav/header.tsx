'use client'

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { ThemeModeToggle } from './theme-mode-toggle';
import LocaleToggle from './local-toggle';
import { Button } from '../ui/button';
import Container from '../container';
import Image from 'next/image';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from '../ui/separator';
import useTranslation from '@/hooks/useTranslation';
import { signIn, signOut, useSession } from 'next-auth/react';
import { ThemeColorToggle } from './theme-color-toggle';

interface HeaderProps {
  logo?: string
  upBar?: string
}

export default function Header({ logo, upBar }: HeaderProps) {
  const locale = useLocale();
  const { t } = useTranslation('Navigation');
  const { data: session } = useSession()

  // State to track header visibility
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Effect to handle scroll events
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY) {
          // If scrolling down, hide the header
          setIsVisible(false);
        } else {
          // If scrolling up, show the header
          setIsVisible(true);
        }

        setLastScrollY(currentScrollY);
      };

      window.addEventListener('scroll', handleScroll);

      // Clean up the event listener on unmount
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [lastScrollY]);


  return (
    <header className={`sticky top-0 z-50 border-b border-border transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      {upBar && <div className="w-full text-center py-2 bg-primary text-primary-foreground">
        {upBar}
      </div>}
      <div className="py-4 bg-muted/60 backdrop-blur-xl">
        <Container>
          <nav className="w-full flex flex-row items-center justify-between">
            <div className="flex items-center gap-4">
              {logo && <Link href="/">
                <Image
                  src={logo}
                  alt='logo'
                  width={120}
                  height={120}
                />
              </Link>}
              {session && (
                <p className='text-xl font-medium capitalize'>{session?.user?.name}</p>
              )}
              <div className="hidden md:flex items-center gap-4">
                <Link href="/" className="text-lg hover:text-primary">{t('home')}</Link>
                <Link href={`/${locale}/about`} className="text-lg hover:text-primary">{t('about')}</Link>
                {/* <Link href={`/${locale}/orders`} className="text-lg hover:text-primary">{t('orders')}</Link> */}
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="max-lg:hidden">
              </div>
              <div className="max-sm:hidden">
                <LocaleToggle />
              </div>
              <div className="max-sm:hidden">
                <ThemeModeToggle />
              </div>
              <div className="max-sm:hidden">
                <ThemeColorToggle />
              </div>

              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center text-foreground hover:text-primary"
                    >
                      <span className="sr-only">{t('open')} {t('menu')}</span>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader></SheetHeader>
                    <SheetTitle className='text-2xl mb-2'>{t('menu')}</SheetTitle>
                    <SheetDescription className="hidden"></SheetDescription>
                    <Separator />
                    <div className="flex flex-col gap-4 pt-8">
                      <Separator className='mt-4' />
                      <Link href="/" className="text-lg font-semibold">{t('home')}</Link>
                      <Link href={`/${locale}/about`} className="text-lg">{t('about')}</Link>
                      <Link href={`/${locale}/orders`} className="text-lg">{t('orders')}</Link>
                      <Separator />
                      <div className="flex items-center gap-4 sm:hidden">
                        <ThemeColorToggle />
                        <LocaleToggle />
                        <ThemeModeToggle />
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              {session ? (
                <>
                  <Button variant={'secondary'} onClick={() => signOut()}>Sign out</Button>
                </>
              ) : (
                <Link href={`/${locale}/register`}>
                  <Button>Sign in</Button>
                </Link>
              )}

            </div>
          </nav>
        </Container>
      </div>
    </header>
  );
}