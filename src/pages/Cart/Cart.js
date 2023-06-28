import React from "react";
import classes from "./Cart.module.css";
import translate from "../../components/translate/translate";
import Currency from "../../components/Currency/Currency";
import { Link, useNavigate } from "react-router-dom";
import NameLength from "../../components/NameLength/NameLength";
import "./Button.animate.css";

function Cart({
  cartNumbers,
  minusNumber,
  productNumbers,
  totalCoastGet,
  user,
}) {
  const ProductCart =
    localStorage.getItem("productsInCart") &&
    Object.values(JSON.parse(localStorage.getItem("productsInCart")));

  const navigate = useNavigate();

  const SubmitToTelegram = () => {};

  const ButtonAnimation = () => {
    const order = document.querySelector(".order");
    if (user) {
      if (order) {
        if (!order.classList.contains("animate")) {
          order.classList.add("animate");
          setTimeout(() => {
            order.classList.remove("animate");
          }, 10000);
        }
      }
    } else {
      return navigate("/login");
    }
  };

  return (
    <div className={classes.Cart}>
      <div className="container">
        <h1>{translate("Корзина", "Savat")}</h1>
        <div className={`row ${classes.row}`}>
          {ProductCart && ProductCart.length > 0 ? (
            <>
              <div className={classes.cartLeft}>
                {ProductCart.map((item, index) => (
                  <div className={classes.cart} key={index}>
                    <div className={classes.cart_image}>
                      <img src={`/uploads/${item.photo[0]}`} alt="" />
                    </div>
                    <div className={classes.cart_title}>
                      <Link to={`/product/more/${item._id}`}>
                        {translate(
                          NameLength(item.name_ru, 40),
                          NameLength(item.name_uz, 40)
                        )}
                      </Link>
                    </div>
                    <div className={classes.cart_total}>
                      <button className={classes.cart_total_btn}>
                        <div
                          className={classes.cart_minus}
                          onClick={(e) => {
                            minusNumber(item);
                          }}
                        >
                          <i className="fa-solid fa-minus"></i>
                        </div>
                        <div className={classes.cart_incart}>{item.inCart}</div>
                        <div
                          className={classes.cart_plus}
                          onClick={(e) => {
                            cartNumbers(item);
                          }}
                        >
                          <i className="fa-solid fa-plus"></i>
                        </div>
                      </button>
                    </div>
                    <div className={classes.price}>
                      <p>{Currency(item.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className={`${classes.cartRight} cartRight`}>
                <h3>{translate("Ваши заказы", "Sizning buyurtmalaringiz")}</h3>
                <ul>
                  <li>
                    <p>{translate("Товары:", "Mahsulotlar:")}</p>
                    <span>
                      {productNumbers} {translate("шт.", "ta")}
                    </span>
                  </li>
                  <li>
                    <p>{translate("Итого:", "Jami:")}</p>
                    <span>{Currency(totalCoastGet)}</span>
                  </li>
                </ul>
                <div className={classes.animateButton}>
                  <button
                    className="order"
                    onClick={() => {
                      ButtonAnimation();
                    }}
                  >
                    <span className="default">
                      {translate(
                        "Перейти к оформлению",
                        "Rasmiylashtirishga oʻtish"
                      )}
                    </span>
                    <span className="success">
                      {translate("Оформлен", "Rasmiylashtirildi")}
                      <svg viewBox="0 0 12 10">
                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                      </svg>
                    </span>
                    <div className="box"></div>
                    <div className="truck">
                      <div className="back"></div>
                      <div className="front">
                        <div className="window"></div>
                      </div>
                      <div className="light top"></div>
                      <div className="light bottom"></div>
                    </div>
                    <div className="lines"></div>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className={classes.empty}>
              <img src="/uploads/emptyCart.png" alt="" />
              <h2>
                {translate(
                  "В корзине пока нет товаров",
                  "Savatda hozircha mahsulot yoʻq"
                )}
              </h2>
              <p>
                {translate(
                  "Начните с подборок на главной странице или найдите нужный товар через поиск                  ",
                  "Bosh sahifadagi to’plamlardan boshlang yoki kerakli mahsulotni qidiruv orqali toping"
                )}
              </p>
              <Link to={"/"} className={classes.btn}>
                {translate(" На главную", " Bosh sahifa")}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
