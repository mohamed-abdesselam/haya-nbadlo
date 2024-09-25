"use client";
import useTranslation from '@/hooks/useTranslation';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
// import { changePassword } from '../actions/users/changePassword';

interface EmailVerificationFormProps {
    email: string;
}

const EmailVerificationForm = ({ email }: EmailVerificationFormProps) => {

    const router = useRouter();
    const { t } = useTranslation('Auth')

    const [code, setCode] = useState<string>("");

    const [message, setMessage] = useState<string>("");

    const handleSubmit = async () => {

        try {
            const response = await axios.post('/api/auth/verifyEmail', { email, code });
            setMessage(response.data);
            router.push('/login')
        } catch (error: any) {
            setMessage(error?.response?.data);
            console.log('error while sending email', error);
        }

    }

    return (
        <div>
            <h1 className='mb-4'>{t('verifyEmail')}</h1>
            <input
                className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
                type="text"
                placeholder="Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
            <button className='bg-blue-600 rounded px-4 py-3' onClick={handleSubmit}>
                {t('verifyEmail')}
            </button>
            <p>{message}</p>
        </div>
    )
}

export default EmailVerificationForm