import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HomeCarousel.css";
import "react-toastify/dist/ReactToastify.css";
import SwiperHead from "./Swiper/Swiper";
import { toast } from "react-toastify";
import AddCar from "./addCarousel/AddCar";

function HomeCarousel({ user }) {
  const [photo, setPhoto] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState("");

  const [contacts, setContacts] = useState([
    {
      photo: "",
      link: "",
    },
  ]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (photo && contacts) {
      try {
        e.preventDefault();
        const dataCreate = new FormData();
        const fileInput = document.querySelector(".photoinp");
        fileInput.value = "";
        dataCreate.append("photo", photo);
        dataCreate.append("link", link);
        const { data } = await axios.post(
          `${process.env.REACT_APP_URL}/add/addCarouselHome`,
          dataCreate, {
          headers: {
            "Authorization": sessionStorage.getItem("token")
          }
        }
        );
        setContacts(data.data);
        return toast.success("Banner added!")
      } catch (error) {
        return toast.error("ERROR!!!")
      }
    } else {
      toast.error("Mahsulotlarni to'liq kiriting!!!");
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_URL}/add/show`);
      setContacts(await response.json());
      setLoading(false);
    };
    getProduct();
  }, []);

  const deleteCarousel = async (id) => {
    const response = window.confirm(`Bu mahsulot o'chirib yuborilsinmi?`);
    if (response) {
      toast.success("Product Deleted!");
      const { data } = await axios.delete(
        `${process.env.REACT_APP_URL}/delete/headerCarousel/delete/` + id, {
        headers: {
          "Authorization": sessionStorage.getItem("token")
        }
      }
      );
      setContacts(data.data);
    }
  };

  return (
    <>
      <div className="CarouselHomeHeaderBigDiv">
        <div className="headerCarousel">
          <h3>Home Header Carousel</h3>
          <AddCar
            link={link}
            setLink={setLink} z
            setPhoto={setPhoto}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        </div>
        <SwiperHead
          contacts={contacts}
          deleteCarousel={deleteCarousel}
          loading={loading}
        />
      </div>
    </>
  );
}

export default HomeCarousel;
