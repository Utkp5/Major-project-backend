import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade,  Navigation, Pagination } from "swiper";
import "swiper/css";
import "../Pages/Home/Home.css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import slider_1 from "../Pages/Assets/New folder/slider-1.webp"
import slider_2 from "../Pages/Assets/New folder/slider-2.webp"

function Slider() {
  return (
    <>
    <Swiper spaceBetween={30} effect={"fade"} centeredSlides={true}
    autoplay={{delay: 2500, disableOnInteraction: false,}} 
    navigation={true} pagination={{ clickable: true,}}
    modules={[EffectFade, Navigation, Pagination]} className="mySwiper">

        <SwiperSlide>
          <img src={slider_1} style={{width:"99vw"}}/>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider_2} style={{width:"99vw"}}/>
        </SwiperSlide>

    </Swiper>
    </>
  )
}

export default Slider;
