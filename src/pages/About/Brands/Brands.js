import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import "./Brands.css";

function Brands() {
  SwiperCore.use([Autoplay]);

  const brands = [
    {
      img: "https://templatemo.com/templates/templatemo_559_zay_shop/assets/img/brand_01.png",
    },
    {
      img: "https://templatemo.com/templates/templatemo_559_zay_shop/assets/img/brand_02.png",
    },
    {
      img: "https://templatemo.com/templates/templatemo_559_zay_shop/assets/img/brand_03.png",
    },
    {
      img: "https://templatemo.com/templates/templatemo_559_zay_shop/assets/img/brand_04.png",
    },
    {
      img: "https://templatemo.com/templates/templatemo_559_zay_shop/assets/img/brand_02.png",
    },
    {
      img: "https://templatemo.com/templates/templatemo_559_zay_shop/assets/img/brand_03.png",
    },
  ];

  return (
    <div className={"Brands"}>
      <div className="container">
        <div className="text">
          <h2>Our Brands</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod Lorem ipsum dolor sit amet.
          </p>
        </div>
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 900,
            disableOnInteraction: false,
          }}
          effect="coverflow"
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {brands.map((item, index) => (
            item.img &&
            <SwiperSlide key={index}>
              <img src={item.img} className={"image"} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Brands;
