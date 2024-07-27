import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';

export default function Test() {
  return (
    <>
      <Swiper
        pagination={true}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
            <Page1/>
        </SwiperSlide>
        <SwiperSlide>
            <Page2/>
        </SwiperSlide>
        <SwiperSlide>
            <Page3/>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
