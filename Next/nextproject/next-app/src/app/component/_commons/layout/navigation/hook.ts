"use client";
import { FETCHUSER, LOGOUTUSER } from "@/app/component/queires/queries";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function UseLayout() {
  const router = useRouter();
  const onClickMain = () => {
    router.push("../../../../boards");
  };
  const { data } = useQuery(FETCHUSER);
  const onClickLogin = () => {
    router.push("../../../../login");
  };

  // 로그아웃
  // const [isLogout, setIsLogout] = useState(false);
  // const [logout] = useMutation(LOGOUTUSER);
  // const onClickLogout = () => {
  //   logout({
  //     variables: {
  //       setIsLogout,
  //     },
  //   });
  // };
  return { onClickMain, data, onClickLogin };
}
