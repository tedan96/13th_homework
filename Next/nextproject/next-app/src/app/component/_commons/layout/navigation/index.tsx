"use client";
import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { UseLayout } from "./hook";
import { Dropdown, MenuProps, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Link from "next/link";
export default function NavigationPage() {
  const router = useRouter();
  const onClickMain = () => {
    router.push("../../../../boards");
  };
  const { data, onClickLogin } = UseLayout();

  // console.log(localStorage.getItem("accessToken"));

  const items: MenuProps["items"] = [
    {
      label: <Link href="/component/mypage">마이 페이지</Link>,
      key: "0",
    },

    {
      label: <Link href="/product">상품 등록</Link>,
      key: "1",
    },

    {
      label: <Link href="/login">로그아웃</Link>,
      key: "2",
    },
  ];
  console.log(data?.fetchUserLoggedIn.name);
  return (
    <>
      <div className={styles.css_navbox}>
        <div className={styles.css_nav}>
          <div className={styles.css_navbutton}>
            <div className={styles.css_logo}>
              <Image
                src="/logo192.png"
                alt="logo"
                width={40}
                height={20}
                sizes="100vw"
                onClick={onClickMain}
              />
            </div>
            <div className={styles.css_tap}>
              <div className={styles.css_tap1}>탭 1</div>
              <div className={styles.css_tap2}>탭 2</div>
              <div className={styles.css_tap3}>탭 3</div>
            </div>
          </div>

          <div className={styles.css_user}>
            {localStorage.getItem("accessToken") ? (
              <>
                <Image
                  src="/assets/Profile.png"
                  alt="user"
                  width={30}
                  height={10}
                  sizes="100vw"
                />
                <Dropdown menu={{ items }} trigger={["click"]}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </>
            ) : (
              <>
                <button className={styles.css_loginbtn} onClick={onClickLogin}>
                  로그인
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
