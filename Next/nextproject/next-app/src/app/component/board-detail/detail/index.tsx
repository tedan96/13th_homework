import styles from "./style.module.css";
import { UseDetailWrite } from "./hook";
import Image from "next/image";
import React from "react";
import CommnentPage from "../comment-write";
import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import ListBannerPage from "../../board-list/banner";
export default function DetailWrite() {
  const { onModify, data, onList } = UseDetailWrite();
  console.log(data);
  return (
    <div className={styles.css_layout}>
      <div className={styles.css_banner}>
        <ListBannerPage />
      </div>
      <div className={styles.css_header}>{data?.fetchBoard?.title}</div>
      <div className={styles.css_info}>
        <div className={styles.css_user}>
          <Image
            src="/assets/Profile.png"
            width={0}
            height={0}
            sizes="100vw"
            alt="profile"
            className={styles.css_profileimage}
          />
          <div className={styles.css_name}>{data?.fetchBoard?.writer}</div>
          <div className={styles.css_date}>
            {data?.fetchBoard?.createdAt.split("T")[0]}
          </div>
        </div>
        <div className={styles.css_detailhr}></div>
        <div className={styles.css_side}>
          <div className={styles.css_sidebutton}>
            <div className={styles.css_clip}>
              <Image
                src="/assets/Clip.png"
                width={0}
                height={0}
                sizes="100vw"
                alt="clip"
                className={styles.css_clip}
              />
            </div>
            <div className={styles.css_location}>
              <Image
                src="/assets/Location.png"
                width={0}
                height={0}
                sizes="100vw"
                alt="location"
                className={styles.css_location}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className={styles.css_image}>
          <Image
            src="/assets/MainImage.png"
            width={0}
            height={0}
            sizes="100vw"
            alt="mainimage"
            className={styles.css_image}
          />
        </div>
      </div>
      <div className={styles.css_text}>{data?.fetchBoard?.contents}</div>
      <div className={styles.css_showaddressitem}>
        <div className={styles.css_showaddressnum}>
          우편번호 : {data?.fetchBoard?.boardAddress.zipcode}
        </div>
        <div className={styles.css_showaddress}>
          주소 : {data?.fetchBoard?.boardAddress.address}
        </div>
        <div className={styles.css_showaddressdetail}>
          상세 주소 : {data?.fetchBoard?.boardAddress.addressDetail}
        </div>
      </div>
      <div className={styles.css_showyoutubeUrl}>
        링크 : {data?.fetchBoard?.youtubeUrl}
      </div>
      <div className={styles.css_bottomimage}>
        <Image
          src="/assets/BottomImage.png"
          width={0}
          height={0}
          sizes="100vw"
          alt="bottomimage"
          className={styles.css_bottomimageImage}
        />
      </div>
      <div className={styles.css_heart}>
        <div className={styles.css_hate}>
          <DislikeOutlined />
          <span>24</span>
        </div>
        <div className={styles.css_like}>
          <LikeOutlined />
          <span>12</span>
        </div>
      </div>
      <div className={styles.css_detailbutton}>
        <button className={styles.css_list}>
          <Image
            src="/assets/List.png"
            width={0}
            height={0}
            sizes="100vw"
            alt="list"
            className={styles.css_listimage}
            onClick={onList}
          />
        </button>
        <button className={styles.css_modify}>
          <Image
            src="/assets/Modify.png"
            width={0}
            height={0}
            sizes="100vw"
            alt="modify"
            className={styles.css_modifyimage}
            onClick={onModify}
          />
        </button>
      </div>
      <div className={styles.css_comment}>
        <div className={styles.css_commentheader}>
          <div className={styles.css_commenttag}>댓글</div>
        </div>
        <CommnentPage />
      </div>
    </div>
  );
}