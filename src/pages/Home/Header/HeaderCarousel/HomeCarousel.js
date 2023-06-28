import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import Loading from "../../../../components/Loading/Loading";


SwiperCore.use([Autoplay]);
const HomeCarousel = ({ setErrorServer }) => {
  const [loading, setLoading] = useState(false);

  const [contacts, setContacts] = useState([
    {
      title: "",
      desc: "",
      select: "",
      photo: "",
    },
  ]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        await fetch(`${process.env.REACT_APP_URL}/add/show`)
          .then(res => res.json())
          .then(response => setContacts(response))
          .catch(err => {
            setErrorServer(true)
          })
        setLoading(false);
      } catch (error) {
        if (error) {
          setErrorServer(true)
        }
      }
    };
    getProduct();
  }, []);

  return contacts.length ? (
    <div className="container">
      <Swiper
        slidesPerView={
          window.innerWidth > 480 ? 1.1 : 1
        }
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 2000,
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
          <div className="swiper_loading">
            <Loading />
          </div>
        ) : (
          contacts.map((item, index) => (
            item.post &&
            <SwiperSlide key={index}>
              <div className="row">
                <a href={item.link} target={"_blank"} rel="noreferrer">
                  <img
                    src={`/uploads/${item.post}`}
                    alt=""
                  />
                </a>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  ) : null;
};

export default HomeCarousel;
