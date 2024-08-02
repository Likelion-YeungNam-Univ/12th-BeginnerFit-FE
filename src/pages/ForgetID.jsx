import styled from "styled-components";
import React, { useRef } from 'react';
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
import ForgetIdP1 from "../components/Login/ForgetIdP1";
import ForgetIdP2 from "../components/Login/ForgetIdP2";

export default function ForgetID() {
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  localStorage.removeItem('findName'); // 이전 값 삭제

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
            <ForgetIdP1 swiperRef={swiperRef}/>
            {/* <NextButton onClick={() => swiperRef.current.slideNext()}>다음으로</NextButton> */} {/* 테스트용 */}
            </SwiperSlide>

            <SwiperSlide>
            <PrevButton onClick={() => swiperRef.current.slidePrev()}>&#10094;</PrevButton>
            <ForgetIdP2/>
            </SwiperSlide>
            
        </Swiper>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  /* .swiper-pagination {
    top: 20px; // 페이지 인디케이터를 상단으로 이동
  } */
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

const PaginationContainer = styled.div`
  position: absolute;
  top: 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
`;

const PaginationDots = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;

  .swiper-pagination-bullet {
    background-color: #d9d9d9; // 인디케이터 색상 설정
    opacity: 1;
  }

  .swiper-pagination-bullet-active {
    background-color: #653eff; // 활성화된 인디케이터 색상 설정
  }
`;