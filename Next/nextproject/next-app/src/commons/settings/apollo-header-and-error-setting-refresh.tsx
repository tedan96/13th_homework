"use client";

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  fromPromise,
  InMemoryCache,
} from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { useAccessTokenStore } from "../stores/access-token-store";
import { useEffect } from "react";
import { onError } from "@apollo/client/link/error";

import { getAccessToken } from "../../app/component/_commons/libraries/get-access-token";
import { useLoadStore } from "../stores/load-store";

const GLOBAL_STATE = new InMemoryCache();

interface IApolloSetting {
  children: React.ReactNode;
}

export default function ApolloHeaderAndErrorSettingRefresh(
  props: IApolloSetting
) {
  const { accessToken, setAccessToken } = useAccessTokenStore();
  const { setIsLoaded } = useLoadStore();

  // 1. 프리렌더링 예제 - process.browser 방법
  // if (process.browser) {
  //   console.log("Browser");
  // } else {
  //   console.log("Server");
  // }

  // 2. 프리렌더링 예쩨 -  typeof window

  // if(typeof window === "undefined") {
  //   console.log("Browser")
  // } else {
  //   console.log("Server")
  // }

  // 3. 프리렌더링 무시 - useEffect

  useEffect(() => {
    // 3-1. 임시방식
    // const localStorageAccessToken = localStorage.getItem("accessToken" ?? "");
    // setAccessToken(localStorageAccessToken);
    // 3-2. refreshToken 방식
    getAccessToken()
      .then((newAccessToken) => {
        if (newAccessToken) setAccessToken(newAccessToken);
        setIsLoaded();
      })
      .finally(setIsLoaded);
  }, []);

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    // 1. 에러 캐치
    if (typeof graphQLErrors !== "undefined") {
      for (const err of graphQLErrors) {
        // 1-2. 해당 에러가 토큰만료에러인지 체크
        if (err.extensions?.code === "UNAUTHENTICATED") {
          // 2. refreshToken으로 accessToken 재발급 받기
          return fromPromise(
            getAccessToken().then((newAccessToken) => {
              // 3. 재발급받은 accessToken을 먼저 저장하고, 실패한 쿼리의 정보를 수정하고 재시도 하기
              setAccessToken(newAccessToken);
              operation.setContext({
                headers: {
                  ...operation.getContext().headers, // Authorization: Bearer 만료된 토큰
                  Authorization: `Bearer ${newAccessToken}`, // 3-2. 토큰만 새로운 것으로 바꿔치기
                },
              });
            })
          ).flatMap(() => forward(operation)); // 3-3. 바꾼 API 재전송하기
        }
      }
    }
  });

  const uploadLink = createUploadLink({
    uri: "https://main-practice.codebootcamp.co.kr/graphql",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, uploadLink]),
    // cache: new InMemoryCache(), // => accessToken이 변경돼서 리랜더되면 새로 만들어짐
    cache: GLOBAL_STATE, // => 컴포넌트는 새로 만들어져도 global state는 유지됨
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
