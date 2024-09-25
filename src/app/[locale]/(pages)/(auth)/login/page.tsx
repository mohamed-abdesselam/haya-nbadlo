import LoginClient from "./login-client";
import { Metadata } from 'next';
import opengraph from '@/app/opengraph-image.png'

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://kodevz.vercel.app'}/`),
  title: 'Login',
  description: 'Login to your Kodevz account to access exclusive features, manage your orders, and more. Secure and easy access to your account.',
  openGraph: {
    title: 'Login | Kodevz',
    description: 'Access your Kodevz account with ease. Secure login to manage your orders and account settings.',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://kodevz.vercel.app'}/ar/login`,
    siteName: 'Kodevz',
    images: [
      {
        url: opengraph.src,
        width: 1200,
        height: 630,
        alt: 'login ',
      }
    ]
  },
};


const Login = () => {
  return <LoginClient />
};

export default Login;
