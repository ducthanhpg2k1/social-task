import Image from "next/image";
import Text from "../ui/Text";
import { localStorageUtils } from "@/utils/local-storage-utils";

const DashboardFooter = () => {
  return (
    <div className="container w-full py-6 px-4 min-h-[64px] flex lg:flex-row flex-col lg:justify-between items-center flex-wrap gap-2 justify-center">
      <Text type="body-4-regular" color="text-primary" className="mb-4 md:mb-0">
        Copyright © 2024 by Escrow.Market. All rights reserved.
      </Text>
      <div className="flex items-center gap-2 md:gap-10">
        <div className="flex flex-col lg:flex-row items-center gap-6 cursor-pointer">
          <Text type="font-14-600" className="text-primary">
            Privacy Policy
          </Text>
          <Text type="font-14-600" className="text-primary">
            Terms of Services
          </Text>
          <Text type="font-14-600" className="text-primary">
            Cookies Policy
          </Text>
          <Text element="a" href="https://twitter.com/escrow_m">
            <Image
              src={localStorageUtils.get("theme") === "dark" ? "/icons/ic-dark-twitter.svg" : "/icons/x-twitter.svg"}
              className="cursor-pointer"
              width={20}
              height={20}
              alt="icon_x"
            />
          </Text>
        </div>
      </div>
    </div>
  );
};
export default DashboardFooter;
