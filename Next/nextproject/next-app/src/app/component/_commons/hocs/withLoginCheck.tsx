"use client";

import { Modal } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLoadStore } from "../../../../commons/stores/load-store";
import { useAccessTokenStore } from "../../../../commons/stores/access-token-store";
export const withLoginCheck = (Component: any) => (Props: any) => {
  const router = useRouter();
  const { isLoaded } = useLoadStore();
  const { accessToken } = useAccessTokenStore();
  useEffect(() => {
    if (localStorage.getItem("accessToken") === null) {
      Modal.error({
        title: "로그인 후 이용 가능합니다!!!",
      });
      void router.push("../../../login");
    }
  }, []);

  return <Component {...Props} />;
};

// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { getAccessToken } from "../libraries/get-access-token";
// import { useLoadStore } from "../../../../commons/stores/load-store";
// import { useAccessTokenStore } from "../../../../commons/stores/access-token-store";
// import a from "../../../login";
// export const withLoginCheck =
//   (컴포넌트: () => JSX.Element) =>
//   <P extends object>(프롭스: P) => {
//     const router = useRouter();
//     const { isLoaded } = useLoadStore();
//     const { accessToken } = useAccessTokenStore();

//     useEffect(() => {
//       if (!isLoaded) return;

//       if (!accessToken) return;

//       alert("로그인 후 이용 가능합니다!!!");
//       router.push("/section26/26-02-login-refreshtoken-refresh");
//     }, [isLoaded]);

//     return <컴포넌트 {...프롭스} />;
//   };
