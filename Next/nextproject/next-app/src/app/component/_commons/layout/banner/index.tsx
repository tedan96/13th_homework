"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import styles from "./styles.module.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ListBannerPage() {
  return (
    <div className={styles.css_banner}>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        //   사용자 상호작용 후 자동재생이 멈춤방지
      >
        <SwiperSlide>
          <Image
            src="/assets/Sky.png"
            alt="ima"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "10%",
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/assets/Sky2.png"
            alt="ima"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "10%",
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/assets/Sky3.png"
            alt="ima"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "10%",
            }}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
