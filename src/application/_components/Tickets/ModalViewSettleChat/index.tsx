import { ButtonCustom } from "@/components/ui/ButtonCustom";
import CustomModal from "@/components/ui/CustomModal";
import { X } from "@phosphor-icons/react";

import Text from "@/components/ui/Text";
import { Avatar, ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import clsx from "clsx";
import dayjs from "dayjs";
import Image from "next/image";
import ItemSettleChat from "./ItemSettleChat";

interface IModalViewSettleChat {
  reloadList?: VoidFunction;
}

const DataChatSettle = [
  {
    id: 1,
    address: "fes123..hi453",
    user: "Seller",
    avatar: "/icons/avatar-seller.svg",
    text: "Oh, I'm sorry to hear that. Let me double-check the code on our end to ensure there were no errors.",
  },
  {
    id: 2,
    address: "fes123..hi453",
    user: "Buyer",
    avatar: "/icons/avatar-buyer.svg",
    text: "Oh, I'm sorry to hear that. Let me double-check the code on our end to ensure there were no errors.",
  },
  {
    id: 3,
    address: "fes123..hi453",
    user: "Seller",
    avatar: "/icons/avatar-seller.svg",
    text: "Oh, I'm sorry to hear that. Let me double-check the code on our end to ensure there were no errors.",
  },
  {
    id: 4,
    address: "fes123..hi453",
    user: "Buyer",
    avatar: "/icons/avatar-buyer.svg",
    text: "Alright, I'll check that right away. It seems there might have been a mistake in generating the code",
  },
  {
    id: 5,
    address: "fes123..hi453",
    user: "Seller",
    avatar: "/icons/avatar-seller.svg",
    text: "No problem, I understand mistakes happen. I just hope we can resolve this quickly as I need to access the product soon",
  },
  {
    id: 6,
    address: "fes123..hi453",
    user: "Buyer",
    avatar: "/icons/avatar-buyer.svg",
    text: "I completely understand. I've escalated the issue to our technical team, and they are working on generating a new code for you. Once it's ready, I'll send it to your email immediately.",
  },
  {
    id: 6,
    address: "fes123..hi453",
    user: "Buyer",
    avatar: "/icons/avatar-buyer.svg",
    text: "I completely understand. I've escalated the issue to our technical team, and they are working on generating a new code for you. Once it's ready, I'll send it to your email immediately.",
  },
  {
    id: 6,
    address: "fes123..hi453",
    user: "Buyer",
    avatar: "/icons/avatar-buyer.svg",
    text: "I completely understand. I've escalated the issue to our technical team, and they are working on generating a new code for you. Once it's ready, I'll send it to your email immediately.",
  },
];

const ModalViewSettleChat = (props: IModalViewSettleChat, ref?: any) => {
  const {} = props;
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      onOpen: (id: string) => {
        setVisible(true);
      },
      onClose: () => setVisible(false),
    };
  });
  const onVisible = () => {
    setVisible(!visible);
  };

  return (
    <>
      <CustomModal placementMoblie="bottom" className="rounded-3xl" size="4xl" isOpen={visible} onClose={onVisible}>
        <ModalBody className="p-0">
          <div className="grid grid-cols-6">
            <div className="col-span-4 flex flex-col gap-6 py-6 pl-6">
              <div className="flex flex-col gap-6 max-h-[640px] overflow-auto pr-6 scroll-custom">
                {DataChatSettle?.map((item) => {
                  return (
                    <div className="flex gap-3" key={item?.id}>
                      <div>
                        <Avatar src={item?.avatar} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <Text
                            type="font-12-400"
                            className={clsx("text-brand-500", {
                              ["text-info-500"]: item?.user === "Buyer",
                            })}
                          >
                            {`(${item?.user})`}{" "}
                            <Text type="font-12-400" element="span" className="text-neutral-600">
                              {item?.address}
                            </Text>
                          </Text>
                          <div className="w-[1px] h-2 bg-neutral-200" />
                          <Text type="font-12-400" className="text-neutral-600">
                            {`Today ${dayjs().format("h:mm A")}`}
                          </Text>
                        </div>
                        <div className="p-2 bg-neutral-50 border border-neutral-100 rounded-[4px_16px_16px_16px]">
                          <Text type="font-14-400" className="text-primary">
                            {item?.text}
                          </Text>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-span-2 flex flex-col gap-6 bg-neutral-50 p-6">
              <div className="flex flex-col gap-6">
                <div className="flex justify-between">
                  <div className="flex items-center gap-4">
                    <Image src="/icons/icAI.svg" width={40} height={40} alt="ic-ai" />
                    <Text className="text-primary" type="font-24-600">
                      wase.ai
                    </Text>
                  </div>
                  <div onClick={onVisible} className="cursor-pointer">
                    <X className="text-secondary" size={20} />
                  </div>
                </div>
                <ItemSettleChat
                  label="Sale Price"
                  suffix={
                    <div className="flex items-center gap-3">
                      <Image
                        alt="ic-solana"
                        width={16}
                        className="w-5 md:w-5 aspect-square"
                        height={16}
                        src={"/images/ic-toncoi-logo.png"}
                      />
                      <div className="flex items-center gap-1">
                        <Text type="font-16-600" className="text-primary">
                          3.23456
                        </Text>
                        <Text type="font-12-400" className="text-neutral-600">
                          ~$12,43
                        </Text>
                      </div>
                    </div>
                  }
                />
                <ItemSettleChat
                  label="Filled Order At"
                  suffix={
                    <div className="flex items-center gap-2">
                      <Text type="font-16-400" className="text-primary">
                        {dayjs().format("DD MMM YYYY")}
                      </Text>
                      <div className="w-[1px] h-2 bg-neutral-200" />
                      <Text className="text-secondary" type="font-12-400">
                        {dayjs().format("h:mm A")}
                      </Text>
                    </div>
                  }
                />
                <ItemSettleChat
                  label="Reported At"
                  suffix={
                    <div className="flex items-center gap-2">
                      <Text type="font-16-400" className="text-primary">
                        {dayjs().format("DD MMM YYYY")}
                      </Text>
                      <div className="w-[1px] h-2 bg-neutral-200" />
                      <Text className="text-secondary" type="font-12-400">
                        {dayjs().format("h:mm A")}
                      </Text>
                    </div>
                  }
                />
                <ItemSettleChat
                  label="Description"
                  suffix={
                    <Text type="font-14-400" className="text-primary">
                      Can’t claim domain with authorization code from seller dasdasdasd
                    </Text>
                  }
                />
              </div>
            </div>
          </div>
        </ModalBody>
      </CustomModal>
    </>
  );
};
export default forwardRef(ModalViewSettleChat);
