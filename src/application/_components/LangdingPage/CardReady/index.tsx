import Text from "@/components/ui/Text";
import { Button } from "@nextui-org/react";

const CardReady = () => {
  return (
    <div className="w-full bg-ready min-h-[360px] flex flex-col gap-8 justify-center items-center text-center p-16 mt-10">
      <div className="flex flex-col gap-4 text-center justify-center items-center">
        <Text className="font-semibold leading-[48px] text-[36px] text-white/90">Ready to join us?</Text>
        <Text type="font-16-400" className=" text-white/50 max-w-[70%]">
          Drive precise engagement, manage campaigns efficiently, and optimize your marketing investments.
        </Text>
      </div>
      <div className="flex items-center gap-4">
        <Button className="py-4 px-6 bg-[#A6F] rounded-lg w-full min-h-14">
          <Text className="text-base font-semibold text-white">Start Your Campaign</Text>
        </Button>
        <Button className="py-4 px-6 bg-white/5 rounded-lg w-full min-h-14">
          <Text className="text-base font-semibold text-white">Monetize Your Traffic</Text>
        </Button>
      </div>
    </div>
  );
};
export default CardReady;

const IconDoubleQuotes = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path
        d="M9.16682 34.6422C7.10632 32.4548 6 30 6 26.0206C6 19.0217 10.913 12.7473 18.0612 9.64636L19.8466 12.4016C13.1761 16.0108 11.8724 20.692 11.3513 23.644C12.4253 23.0886 13.8312 22.8932 15.2094 23.021C18.8182 23.3556 21.6624 26.318 21.6624 30C21.6624 33.866 18.5283 37 14.6623 37C12.5162 37 10.4639 36.019 9.16682 34.6422ZM29.1668 34.6422C27.1064 32.4548 26 30 26 26.0206C26 19.0217 30.913 12.7473 38.0612 9.64636L39.8466 12.4016C33.176 16.0108 31.8724 20.692 31.3512 23.644C32.4252 23.0886 33.8312 22.8932 35.2094 23.021C38.8182 23.3556 41.6624 26.318 41.6624 30C41.6624 33.866 38.5284 37 34.6624 37C32.5162 37 30.464 36.019 29.1668 34.6422Z"
        fill="#AA66FF"
      />
    </svg>
  );
};
