import Image from "next/image";

type Props = {
  size?: number;
};

const Logo = ({ size = 80 }: Props) => {
  return (
    <div className="flex item-center flex-wrap">
      <div className="relative w-32 aspect-[100/32] cursor-pointer">escrow-market</div>
    </div>
  );
};

export default Logo;
