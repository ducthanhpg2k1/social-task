import { toast as t } from "sonner";

import { CheckCircle, Info, XCircle } from "@phosphor-icons/react";
import clsx from "clsx";
import Text from "./Text";

export const ToastCustom = {
  success: (message: string) => {
    t.custom((id) => (
      <div
        className={clsx(
          "flex gap-2 items-center relative bg-neutral-50 rounded-[8px] p-4 border-l-4 border-l-brand-500"
        )}
      >
        <div className="flex flex-row gap-3 items-center">
          <CheckCircle size={24} className="text-brand-500" />
          <Text type="font-16-400" className={"text-primary"}>
            {message}
          </Text>
        </div>
      </div>
    ));
  },

  error: (message: string) => {
    t.custom((id) => (
      <div
        className={clsx(
          "flex gap-2 items-center relative bg-neutral-50 rounded-[8px] p-4 border-l-4 border-l-error-400"
        )}
      >
        <div className="flex flex-row gap-3 items-center">
          <XCircle size={24} className="text-error-400" />
          <Text type="font-16-400" className={"text-primary"}>
            {message}
          </Text>
        </div>
      </div>
    ));
  },
};
