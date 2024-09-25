"use client";
import useTranslation from '@/hooks/useTranslation';
import axios from 'axios';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

interface EmailVerificationFormProps {
    email: string;
}

const EmailVerificationForm = ({ email }: EmailVerificationFormProps) => {

    const { t } = useTranslation('Auth')

    const router = useRouter();

    const local = useLocale()

    const [code, setCode] = useState<string>("");

    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async () => {

        setLoading(true);

        try {
            const response = await axios.post('/api/auth/verifyEmail', { email, code });
            toast.success(response.data)
            router.push(`/${local}/login`)
        } catch (error: any) {
            setMessage(error?.response?.data);
            toast.error(error?.response?.data)
            console.log('error while sending email', error);
        } finally {
            setLoading(false);
        }

    }


    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="border border-border p-8 rounded shadow-md w-96">
                <h1 className="text-4xl text-center font-semibold mb-8">{t('verifyEmail')}</h1>
                <input
                    className="w-full border border-border rounded px-3 py-2 mb-4 focus:outline-none focus:border-primary"
                    type="text"
                    placeholder={t('code')}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
                <button className='mt-5 w-full bg-primary text-white py-2 rounded hover:bg-primary/80 disabled:bg-primary/80' disabled={loading} onClick={handleSubmit}>
                    {t('verifyEmail')}
                </button>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default EmailVerificationForm