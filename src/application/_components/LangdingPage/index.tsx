import { useEffect, useRef, useState } from "react";
import Benefits from "./Benefits";
import BuzzyProcess from "./BuzzyProcess";
import CardReady from "./CardReady";
import CardTestimonials from "./CardTestimonials";
import Faqs from "./Faqs";
import Footer from "./Footer";
import HeaderHome from "./HeaderHome";
import StartCampaign from "./StartCampaign";
import TalentedMarketers from "./TalentedMarketers";
import clsx from "clsx";

const LangdingPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const divRef: any = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (divRef.current.scrollTop > 0) {
        setScrollY(divRef.current.scrollTop);
      } else {
        setScrollY(0);
      }
    };

    if (divRef.current) {
      divRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (divRef.current) {
        divRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div
      ref={divRef}
      className="h-[100dvh] overflow-auto bg-[url('/images/layout-langding-page.png')]  bg-no-repeat bg-cover"
    >
      <div
        className={clsx("sticky w-full top-0", {
          ["bg-white/5 shadow-2xl transition-all z-50"]: scrollY > 0,
        })}
      >
        <HeaderHome scrollY={scrollY} />
      </div>
      <div className="md:w-8/12 w-full flex flex-col gap-10 m-auto pt-[137px]">
        <StartCampaign />
        <TalentedMarketers />
        <Benefits />
        <BuzzyProcess />
        <CardTestimonials />
        <Faqs />
        <CardReady />
        <Footer />
      </div>
    </div>
  );
};
export default LangdingPage;
