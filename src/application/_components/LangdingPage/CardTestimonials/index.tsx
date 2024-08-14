import Text from "@/components/ui/Text";
import { Button } from "@nextui-org/react";

const CardTestimonials = () => {
  return (
    <div className="w-full bg-testimonials min-h-[560px] p-16 mt-10">
      <div className="w-4/12 flex flex-col gap-8 h-full">
        <div className="flex flex-col gap-4">
          <Button className="bg-white/5 w-max border border-white/10 py-2 px-4 max-h-8">
            <Text className="font-medium text-xs text-white/50">Testimonials</Text>
          </Button>
          <Text className="font-semibold leading-[48px] text-[36px] text-white/90">
            Be Inspired by Real Achievements
          </Text>
        </div>
        <div className="flex flex-col gap-4">
          <IconDoubleQuotes />
          <Text type="font-16-400" className=" text-white/80">
            Since integrating Buzzy’s SDK, my mini app's monthly revenue has increased by 30%! The tasks are easy to
            implement and resonate well with my audience. Buzzy has truly revolutionized how I monetize my community.
          </Text>
          <div className="flex flex-col gap-1">
            <Text type="font-14-600" className=" text-white/90">
              John Doe
            </Text>

            <Text type="font-12-400" className=" text-white/50">
              Web3 Developer
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardTestimonials;

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
