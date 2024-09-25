"use client";
import useTranslation from '@/hooks/useTranslation';
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const ResetPasswordForm = () => {
    const { t } = useTranslation('Auth')

    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await axios.post('/api/auth/resetPassword', { email });
            toast.success(response.data + ' \nplease check your email', { duration: 6000 });
            setMessage('please check your email');
        } catch (error: any) {
            setMessage(error.response.data);
            console.log('error while sending email', error);
        } finally {
            setLoading(false);
        }

    }


    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="border border-border p-8 rounded shadow-md w-96">
                <h1 className="text-4xl text-center font-semibold mb-8">{t('resetPassword')}</h1>
                <input
                    className="w-full border border-border rounded px-3 py-2 mb-4 focus:outline-none focus:border-primary"
                    type="email"
                    placeholder={t('email')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button className="w-full mt-5 bg-primary text-white py-2 rounded hover:bg-primary/80 disabled:bg-primary/80" disabled={loading} onClick={handleSubmit}>
                    {t('resetPassword')}
                </button>
                <p className='mt-1'>{message}</p>
            </div>
        </div>
    )
}

export default ResetPasswordForm