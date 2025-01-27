import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import SplashOne from '../fragments/SplashOne';
import SplashTwo from '../fragments/SplashTwo';
import Forms from './Forms';

import 'swiper/css';
import 'swiper/css/pagination';

function SplashScreen() {
  const [iwSwiper, setIsSwiper] = useState(null);

  const goNext = () => {
    if (iwSwiper) iwSwiper.slideNext(); 
  };

  const goPrev = () => {
    if (iwSwiper) iwSwiper.slidePrev();
  };

  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        onSwiper={setIsSwiper} 
        grabCursor={true}
        className="w-full h-full"
      >
        <SwiperSlide>
          <SplashOne onNext={goNext} />
        </SwiperSlide>

        <SwiperSlide>
          <SplashTwo onNext={goNext} onPrev={goPrev} />
        </SwiperSlide>

        <SwiperSlide>
          <Forms onPrev={goPrev} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default SplashScreen;
