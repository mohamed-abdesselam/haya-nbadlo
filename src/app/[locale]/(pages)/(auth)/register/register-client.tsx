"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useLocale } from "next-intl";
import toast from "react-hot-toast";
import axios from "axios";
import useTranslation from "@/hooks/useTranslation";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import menIcon from '@/../public/images/menIcon.png'
import womenIcon from '@/../public/images/womenIcon.png'
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const RegisterClient = () => {
  const { t } = useTranslation('Auth')

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState('men');
  const router = useRouter();
  const local = useLocale();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const changeGender = (gender: string) => {
    setGender(gender);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const data = {
      name: e.target[0].value,
      gender: gender,
      email: e.target[3].value,
      phone: e.target[4].value,
      specialty: e.target[6].value,
      class: e.target[7].value,
      password: e.target[8].value,
    }

    if (data.name.length < 3) {
      setError("Name is short");
      setLoading(false);
      return;
    }

    if (!data.specialty) {
      setError("specialty is required");
      setLoading(false);
      return;
    }
    if (!data.class) {
      setError("class is required");
      setLoading(false);
      return;
    }

    if (!isValidEmail(data.email)) {
      setError("Email is invalid");
      setLoading(false);
      return;
    }

    if (!data.password || data.password.length < 8) {
      setError("Password is invalid");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/auth/register', data)
      setError(response.data);
      // router.refresh()
      toast.success('successfully registered')
      // router.push(`/${local}/verify-email?email=${email}`);
      const email = data.email
      const password = data.password

      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid email or password");
        if (res?.url) router.replace("/");
      } else {
        setError("");
      }

    } catch (error: any) {
      setError(error.response.data);
      console.log(error);
    } finally {
      setLoading(false);
    }

  };

  if (sessionStatus === "loading") {
    return <Loader />;
  }


  return (
    sessionStatus !== "authenticated" && (
      <div className="flex min-h-screen flex-col items-center justify-between p-4 sm:p-8 lg:p-16">
        <div className="border border-border p-4 sm:p-8 rounded shadow-md max-w-lg">
          <h1 className="text-4xl text-center font-semibold mb-8">{t('register')}</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-4 mb-4">
              <input
                type="text"
                className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:border-primary/80 focus"
                placeholder={t('name')}
                required
              />
              <button type="button" className={cn('border border-border rounded px-1.5 sm:px-3 py-[5px]', gender === 'men' && 'border-primary/80')} onClick={() => changeGender('men')} >
                <span className="sr-only">men</span>
                <Image
                  src={menIcon}
                  alt="men"
                  width={60}
                  height={60}
                  className={cn(gender === 'women' && 'opacity-40')}
                />
              </button>
              <button type="button" className={cn('border border-border rounded px-1.5 sm:px-3 py-[5px]', gender === 'women' && 'border-primary/80')} onClick={() => changeGender('women')} >
                <span className="sr-only">women</span>
                <Image
                  src={womenIcon}
                  alt="women"
                  width={60}
                  height={60}
                  className={cn(gender === 'men' && 'opacity-40')}
                />
              </button>
            </div>
            <input
              type="text"
              className="w-full border border-border rounded px-3 py-2 mb-4 focus:outline-none focus:border-primary/80 focus"
              placeholder={t('email')}
              required
            />
            <input
              type="text"
              className="w-full border border-border rounded px-3 py-2 mb-4 focus:outline-none focus:border-primary/80 focus:text-black"
              placeholder={t('phone')}
            />
            <div className="flex gap-4 sm:gap-6 items-center mb-4">
              <Select>
                <SelectTrigger className="w-full ring-transparent focus:ring-transparent focus:ring-0">
                  <SelectValue placeholder="Specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Idtw">Idtw</SelectItem>
                  <SelectItem value="Rsd">Rsd</SelectItem>
                  <SelectItem value="F3i">F3i</SelectItem>
                  <SelectItem value="Cs">Cs</SelectItem>
                </SelectContent>
              </Select>
              {/* <input
                type="text"
                className="w-full border border-border rounded px-3 py-2 mb-4 focus:outline-none focus:border-primary/80 focus:text-black"
                placeholder={('Specialty')}
                required
              /> */}
              <input
                type="text"
                className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:border-primary/80 focus:text-black"
                placeholder={('Class')}
                required
              />
            </div>
            <input
              type="password"
              className="w-full border border-border rounded px-3 py-2 mb-4 focus:outline-none focus:border-primary/80 focus"
              placeholder={t('password')}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-2 rounded hover:bg-primary/80 disabled:bg-primary/80"
            >
              {" "}
              {t('register')}
            </button>
            <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
          </form>
          <div className="text-center text-gray-500 mt-4">- {t('or')} -</div>
          <Link
            className="block text-center text-primary hover:underline mt-2"
            href={`/${local}/login`}
          >
            {t('login')}
          </Link>
        </div>
      </div>
    )
  );
};

export default RegisterClient;
