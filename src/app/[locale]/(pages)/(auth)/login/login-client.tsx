"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import toast from "react-hot-toast";
import useTranslation from "@/hooks/useTranslation";
import Loader from "@/components/Loader";

const LoginClient = () => {
  const router = useRouter();
  const locale = useLocale();
  const { data: session, status: sessionStatus } = useSession();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Ensure useTranslation is always called
  const { t } = useTranslation('Auth');

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace(`/${locale}`);
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!isValidEmail(email)) {
      setLoading(false);
      setError(t("emailInvalid"));
      return;
    }

    if (!password || password.length < 8) {
      setLoading(false);
      setError(t("passwordInvalid"));
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (res?.error) {
      setError(res.error);
      if (res.error === 'Error: Email not verified') {
        router.replace(`/${locale}/verify-email?email=${email}`);
        toast(t("verifyEmail"));
      }
    } else {
      setError("");
      if (res?.url) {
        router.refresh()
        router.replace(`/${locale}`);
        router.refresh()
      }
    }
  };

  if (sessionStatus === "loading") {
    return <Loader />;
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="border border-border p-8 rounded shadow-md w-96">
          <h1 className="text-4xl text-center font-semibold mb-8">{t('login')}</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-full border border-border rounded px-3 py-2 mb-4 focus:outline-none focus:border-primary "
              placeholder={t('email')}
              required
            />
            <input
              type="password"
              className="w-full border border-border rounded px-3 py-2 mb-4 focus:outline-none focus:border-primary"
              placeholder={t('password')}
              required
            />
            <Link
              className="block text-right text-primary hover:underline mb-6"
              href={`/${locale}/reset-password`}
            >
              {t('resetPassword')}
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-2 rounded hover:bg-primary/80 disabled:bg-primary/80"
            >
              {" "}
              {t('signIn')}
            </button>
            <p className="text-destructive text-[16px] mb-4">{error && error}</p>
          </form>
          <div className="text-center text-gray-500 mt-4">- {t('or')} -</div>
          <Link
            className="block text-center text-primary hover:underline mt-2"
            href={`/${locale}/register`}
          >
            {t('register')}
          </Link>
        </div>
      </div>
    )
  );
};

export default LoginClient;
