import { ButtonCustom } from "@/components/ui/ButtonCustom";
import InputText from "@/components/ui/InputText";
import Text from "@/components/ui/Text";
import { ToastCustom } from "@/components/ui/Toast";
import useAccessToken from "@/hooks/useAccesToken";
import { API_PATH } from "@/utils/api.utils";
import makeAxiosRequest from "@/utils/makeAxiosRequest";
import { ROUTE_PATH } from "@/utils/route";
import { EyeSlash } from "@phosphor-icons/react";
import { Eye } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { serviceLogin } from "./service";
import { useRequest } from "ahooks";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { setAccessToken } = useAccessToken();

  const { runAsync, loading } = useRequest(serviceLogin, { manual: true });
  const router = useRouter();
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<any>();

  const onSubmit = async (values: { account_name: string; password: string }) => {
    try {
      const response = await runAsync(values);
      if (response?.data?.access_token) {
        setAccessToken(response.data.access_token);
        ToastCustom.success("Login successfully");
        router.push(ROUTE_PATH.DASHBOARD);
      }
    } catch (error: any) {
      ToastCustom.error(error?.response?.data?.code?.message ?? error?.response?.data?.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full h-[100vh] flex items-center justify-center bg-neutral-50">
        <div className="bg-white w-3/12 p-10 rounded-3xl flex flex-col gap-8">
          <div className="flex justify-center ">
            <Image src={"/icons/ic-light-logo.svg"} alt="" height={36} width={130} />
          </div>
          <div className="text-center">
            <Text type="font-24-600" className="text-primary">
              Welcome Back
            </Text>
            <Text type="font-14-400" className="text-secondary mt-2">
              Log in to continue
            </Text>
          </div>
          <div className="flex flex-col gap-6 ">
            <InputText
              required
              name="account_name"
              errors={errors}
              control={control}
              label="Username"
              placeholder="Enter username"
              size="lg"
            />
            <InputText
              required
              name="password"
              errors={errors}
              control={control}
              label="Password"
              placeholder="Enter password"
              size="lg"
              endContent={
                <button className="focus:outline-none" type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Eye size={20} /> : <EyeSlash size={20} />}
                </button>
              }
              type={showPassword ? "text" : "password"}
            />
            <ButtonCustom
              color="green"
              size="lg"
              className="rounded-full"
              type="submit"
              isLoading={loading}
              isDisabled={loading}
            >
              Log In
            </ButtonCustom>
          </div>
        </div>
      </div>
    </form>
  );
};
export default SignIn;
