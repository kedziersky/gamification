import React from "react";
import { toast, TypeOptions } from "react-toastify";

export const triggerToast = (
  msg: string,
  type: TypeOptions,
  icon: React.ReactNode | false
) => {
  return toast(msg, {
    type: type,
    position: toast.POSITION.TOP_CENTER,
    theme: "dark",
    icon: icon,
  });
};
