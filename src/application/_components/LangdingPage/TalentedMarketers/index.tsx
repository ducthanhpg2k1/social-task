import Text from "@/components/ui/Text";
import Image from "next/image";

const URL_IMAGES = [
  "/images/homepage/img-crypto.png",
  "/images/homepage/img-republic.png",
  "/images/homepage/img-opensea.png",
  "/images/homepage/img-binance.png",
  "/images/homepage/img-coin-base.png",
];

const TalentedMarketers = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <Text type="font-14-600" className="text-white/50 uppercase">
        Trusted by talented marketers at
      </Text>
      <div className="flex items-center justify-center gap-8 py-7">
        {URL_IMAGES?.map((item) => {
          return (
            <div key={item}>
              <Image src={item} alt="" width={150} height={24} className="w-auto h-auto" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default TalentedMarketers;
