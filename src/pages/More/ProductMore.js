import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import classes from "./ProductMore.module.css";
import Truth from "./Truth"

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import axios from "axios";
import Currency from "../../components/Currency/Currency";
import translate from "../../components/translate/translate";

const ProductMore = ({ productMore, setProductMore, user, cartNumbers, minusNumber }) => {
  const [loading, setLoading] = useState(false);
  const [activeImage, setImageActive] = useState(null)
  const [truth, setTruth] = useState(false)

  const [localstorage, setLocalstorage] = useState([
    {
      _id: "",
      name: "",
      price: "",
      photo: "",
      desc: "",
      categoryId: "",
    },
  ]);

  const Winlocation = window.location.pathname;
  const CategoryFind = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `${process.env.REACT_APP_URL}/add/` + Winlocation
    );
    setProductMore(data.data);
    setLoading(false);
  };

  useEffect(() => {
    CategoryFind();
  }, []);

  const clickHandler = async (e) => {
    await setLocalstorage(productMore);
  };

  const ProductCart = localStorage.getItem("productsInCart") && Object.values(JSON.parse(localStorage.getItem("productsInCart"))).find(x => x._id === productMore._id)
  return (
    <div className={classes.ProductMore}>
      <div className={"container"}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className={classes.row}>
              <div className={classes.left}>
                <div className={classes.Left_left}>
                  {productMore.photo ? productMore.photo.map((item, index) => (
                    item && <div className={classes.images_nth} key={index} onClick={(e) => {
                      setImageActive(item)
                      window.scroll(0, 0);
                    }}>
                      <img src={"/uploads/" + item} alt="" width={"100%"} />
                    </div>
                  )) : ""}

                </div>
                <div className={classes.Left_Right}>
                  <TransformWrapper>
                    <TransformComponent>
                      {activeImage !== null ? activeImage && <img
                        src={"/uploads/" + activeImage}
                        alt=""
                        className={classes.img}
                      /> : productMore.photo[0] && <img
                        src={"/uploads/" + productMore.photo[0]}
                        alt=""
                        className={classes.img}
                      />}
                    </TransformComponent>
                  </TransformWrapper>
                </div>
              </div>
              <div className={classes.right}>
                <h2 className={classes.name}>{translate(productMore.name_ru, productMore.name_uz)}</h2>
                <h4 className={classes.price}>{Currency(productMore.price)}</h4>
                <div className={classes.description}>
                  <h3 className={classes.desc_title}>{translate("О продукте:", "Mahsulot haqida:")}</h3>
                  <p className={classes.desc}>{translate(productMore.desc_ru, productMore.desc_uz)}</p>
                </div>
                <div className={classes.buttons}>
                  <button className={classes.buttonBuy} onClick={() => {
                    setTruth(true)
                  }}>{translate("Купить в один клик", "Bir bosishda sotib olish")}</button>
                  {ProductCart ? (
                    ProductCart &&
                    <button className={classes.buttonBuyCartAdd}>
                      <div
                        className={classes.minus}
                        onClick={(e) => {
                          minusNumber(productMore)
                        }}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </div>
                      <div className={classes.center}>{ProductCart.inCart}</div>
                      <div
                        className={classes.plus}
                        onClick={(e) => {
                          cartNumbers(productMore)
                        }}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </div>
                    </button>
                  ) : (
                    <button
                      className={classes.buttonBuyCart}
                      onClick={() => {
                        clickHandler()
                        cartNumbers(productMore)
                      }}
                    >
                      {translate("Добавить в корзину", "Savatga qoʻshish")}
                    </button>
                  )}
                </div>
              </div>
            </div>

          </>
        )}
      </div>
      {
        truth ? <div className={classes.Bg_Truth} onClick={() => {
          setTruth(false)
        }}></div> : ""
      }
      {truth ? <Truth user={user} truth={truth} setTruth={setTruth} productMore={productMore} /> : ""}
    </div >
  );
};

export default ProductMore;
