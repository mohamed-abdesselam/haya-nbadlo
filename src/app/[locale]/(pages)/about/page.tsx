'use client'

import { useState } from "react";
import useTranslation from "@/hooks/useTranslation";
import Container from "@/components/container";

const About = () => {
  const [count, setCount] = useState(0);
  const { t } = useTranslation('About');

  const handleIncrease = () => {
    setCount(prev => prev + 1);
  };

  return (
    <div className="mt-20">
      <Container>
        {/* <h1>{t('title')}</h1> */}
        <p className="text-primary text-xl">{t('description')}</p>
        <p>{t('message', { count })}</p>
        <button className="border px-3 py-1 rounded-md shadow mt-2" onClick={handleIncrease}>+</button>
      </Container>

    </div>
  );
};

export default About;
