import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const TelegramLoginButton = ({
  botName,
  dataOnAuth = () => undefined,
  buttonSize = "large",
  cornerRadius,
  requestAccess = "write",
  usePic = false,
  lang = "en",
  widgetVersion = 22,
  className,
  children,
}: any) => {
  const instanceRef = useRef<any>(null);

  useEffect(() => {
    (window as any).TelegramLoginWidget = {
      dataOnauth: (user: any) => dataOnAuth(user),
    };

    const script = document.createElement("script");
    script.src = `https://telegram.org/js/telegram-widget.js?${widgetVersion}`;
    script.setAttribute("data-telegram-login", botName);
    script.setAttribute("data-size", buttonSize);
    if (cornerRadius !== undefined) {
      script.setAttribute("data-radius", cornerRadius);
    }
    script.setAttribute("data-request-access", requestAccess);
    script.setAttribute("data-userpic", usePic);
    script.setAttribute("data-lang", lang);
    script.setAttribute("data-onauth", "TelegramLoginWidget.dataOnauth(user)");
    script.async = true;
    instanceRef.current.appendChild(script);

    return () => {
      // Clean up script on unmount
      instanceRef?.current?.removeChild(script);
    };
  }, []);

  return (
    <div className={clsx("flex justify-center items-center py-6", className)} ref={instanceRef}>
      {children}
    </div>
  );
};
export default TelegramLoginButton;
