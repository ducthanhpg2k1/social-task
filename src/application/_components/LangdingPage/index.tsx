import Benefits from "./Benefits";
import HeaderHome from "./HeaderHome";
import StartCampaign from "./StartCampaign";
import TalentedMarketers from "./TalentedMarketers";

const LangdingPage = () => {
  return (
    <div className="h-[100dvh] overflow-auto bg-[url('/images/layout-langding-page.png')]  bg-no-repeat bg-cover">
      <div className="fixed w-full top-0">
        <HeaderHome />
      </div>
      <div className="md:w-8/12 w-full flex flex-col gap-10 m-auto pt-[137px] pb-10">
        <StartCampaign />
        <TalentedMarketers />
        <Benefits />
      </div>
    </div>
  );
};
export default LangdingPage;
