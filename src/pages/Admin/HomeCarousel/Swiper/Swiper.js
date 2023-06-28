import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Loading from "../../../../components/Loading/Loading";
import { Pagination, Navigation } from "swiper";

function SwiperHead({ contacts, deleteCarousel, loading }) {

  return (
    <div className="carouselHome">
      <div className="carousel">
        {contacts.length ? (
          <Swiper
            slidesPerView={1.1}
            spaceBetween={30}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            effect="coverflow"
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {loading ? (
              <Loading />
            ) : (
              contacts.map((item, index) => (
                item.post &&
                <SwiperSlide key={index}>
                  <div className="row">
                    <a href={item.link} target={"_blank"} rel="noreferrer">
                      <img src={`/uploads/${item.post}`} alt="" />
                    </a>
                    <button onClick={(e) => deleteCarousel(item._id)} className={"delete_btn"}>
                      Delete
                    </button>
                  </div>
                </SwiperSlide>
              ))
            )}
          </Swiper>
        ) : (
          <p>No products!</p>
        )}
      </div>
    </div>
  );
}

export default SwiperHead;
