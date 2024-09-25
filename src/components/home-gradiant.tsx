import React from "react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import Container from "@/components/container";
import { useTranslations } from "next-intl";

export default function HomeGradiant() {
  const t= useTranslations('IndexPage')

  return (
    <div className="relative ">
      <div className="-mt-[10%] absolute transform -skew-y-[11deg]">
        <BackgroundGradientAnimation>
          <div />
        </BackgroundGradientAnimation>
      </div>
      <Container>
        <div className="h-[80vh] flex items-center">
          <div className="absolute z-50 flex items-center justify-center text-white font-bold pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
            <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-primary/80 to-primary/40">
              {t('title')}
            </p>
          </div>
        </div>
      </Container>

    </div>
  );
}
