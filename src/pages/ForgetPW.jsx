import styled from "styled-components";
import React, { useRef, useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Pagination, Navigation } from 'swiper/modules';

import {useNavigate} from "react-router-dom";
import ForgetPwP1 from "../components/Login/ForgetPwP1";
import ForgetPwP2 from "../components/Login/ForgetPwP2";

export default function ForgetPW() {
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  return (
    <Container>
        <Swiper
            navigation={false}
            allowTouchMove={false} // (클릭 상태로)스와이프 비활성화
            modules={[ Navigation]}
            spaceBetween={50}
            slidesPerView={1}
            onSwiper={(swiper) => {
                swiperRef.current = swiper; // Swiper 인스턴스를 swiperRef에 저장 -> slidePrev,slideNext사용을 위함.
            }}
        >
            <SwiperSlide>
            <PrevButton onClick={() => (navigate(-1))}></PrevButton>
            <ForgetPwP1 email={email} setEmail={setEmail} swiperRef={swiperRef}/>
            {/* <NextButton onClick={() => swiperRef.current.slideNext()}>다음으로</NextButton> */} {/* 테스트용 */}
            </SwiperSlide>

            <SwiperSlide>
            <PrevButton onClick={() => swiperRef.current.slidePrev()}>&#10094;</PrevButton>
            <ForgetPwP2 email={email}/>
            </SwiperSlide>
            
        </Swiper>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const PrevButton = styled(IoIosArrowBack)`
  position: absolute;
  top: 20px; /* 화살표를 상단에 위치시킴 */
  left: 10px;
  z-index: 10;
  font-size: 24px;
  cursor: pointer;
`;

const NextButton = styled.div`
  position: absolute;
  bottom: 20px; /* "다음으로" 버튼을 하단에 위치시킴 */
  right: 10px;
  z-index: 10;
  font-size: 24px;
  background-color: #000;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;
