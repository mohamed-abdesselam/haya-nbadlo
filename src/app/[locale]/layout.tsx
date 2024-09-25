import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/components/footer';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import ThemeDataProvider from "@/context/theme-data-provider";
import SessionProvider from "@/providers/SessionProvider";
import { getServerSession } from 'next-auth';
import { ToasterProvider } from '@/providers/ToasterProvider';
import { Vazirmatn } from 'next/font/google';
import Header from '@/components/nav/header';

const inter = Inter({ subsets: ['latin'] });
const vazirmatn = Vazirmatn({ subsets: ['arabic'] });


export const metadata: Metadata = {
  title: 'Haya Nbdlo',
  description: 'register and search who you exchanged with',
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  const session = await getServerSession();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={locale === 'ar' ? `__rtl_lang text-right ${vazirmatn.className}` : inter.className}>
        <SessionProvider session={session}>
          <NextThemesProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <ThemeDataProvider>
              <ToasterProvider />
              <div className='flex flex-col min-h-screen'>
                <Header />
                <div className='flex-grow'>{children}</div>
                <Footer />
              </div>
            </ThemeDataProvider>
          </NextThemesProvider>
        </SessionProvider>

      </body>
    </html>
  );
}
