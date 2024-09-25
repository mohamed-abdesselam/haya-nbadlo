"use client";
import useTranslation from '@/hooks/useTranslation';
import axios from 'axios';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

interface ChangePasswordFormProps {
    resetPasswordToken: string;
}

const ChangePasswordForm = ({ resetPasswordToken }: ChangePasswordFormProps) => {

    const { t } = useTranslation('Auth')
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const local = useLocale();

    const handleSubmit = async () => {
        setLoading(true);

        if (!password || password.length < 8 || password !== confirmPassword) {
            setMessage("Passwords should be at least 8 characters");
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('/api/auth/changePassword', { resetPasswordToken, password });
            toast.success(response.data);
            router.push(`/${local}/login`)
        } catch (error: any) {
            setMessage(error.response.data);
            console.log('error while sending email', error);
        } finally {
            setLoading(false);
            setMessage("");
            setPassword("");
            setConfirmPassword("");
        }

    }


    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="border border-border p-8 rounded shadow-md w-96">
                <h1 className="text-4xl text-center font-semibold mb-8">{t('changePassword')}</h1>
                <input
                    className="w-full border border-border rounded px-3 py-2 mb-4 focus:outline-none focus:border-primary "
                    type="password"
                    placeholder={t('password')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    className="w-full border border-border rounded px-3 py-2 mb-4 focus:outline-none focus:border-primary"
                    type="password"
                    placeholder={t('comfirmPassword')}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button className="w-full mt-5 bg-primary text-white py-2 rounded hover:bg-primary/80 disabled:bg-primary/80" disabled={loading} onClick={handleSubmit}>
                    {t('changePassword')}
                </button>
                <p className='mt-1'>{message}</p>
            </div>
        </div>
    )
}

export default ChangePasswordForm