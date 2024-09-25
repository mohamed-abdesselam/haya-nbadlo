import RegisterClient from "./register-client";
import { Metadata } from 'next';
import opengraph from '@/app/opengraph-image.png'

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://kodevz.vercel.app'}/`),
  title: 'Signup',
  description: 'Create a new Kodevz account to enjoy exclusive features and benefits. Signup is easy and secure. Join us today!',
  openGraph: {
    title: 'Signup | Kodevz',
    description: 'Sign up for Kodevz to start shopping and enjoy exclusive offers and benefits. Easy and secure registration.',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://kodevz.vercel.app'}/ar/register`,
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


const Register = () => {
  return <RegisterClient />
};

export default Register;
