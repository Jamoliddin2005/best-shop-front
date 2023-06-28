import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import translate from "../translate/translate";
import axios from "axios";
import NameLength from "../NameLength/NameLength";

function Navbar({ user, uzLanguage, setUzLanguage, productNumbers,
  totalCoastGet, onScrollTop }) {
  const [languages, setLanguages] = useState(false);
  const [search, setSearch] = useState([]);
  const [value, setValue] = useState("");
  const [searchBoolean, setSearchBoolean] = useState(false);


  const timeoutId = useRef();
  const onSearchFunction = async (e) => {
    clearTimeout(timeoutId.current);
    setSearchBoolean(false);

    timeoutId.current = setTimeout(async () => {
      if (e) {
        const { data } = await axios.get(
          `${process.env.REACT_APP_URL}/products/search/${e}`
        );
        setSearchBoolean(true);
        setSearch(data.cursor);
      }
    }, 300);
  };

  return (
    <div className={"Navbar_big"}>
      <div className={"navbar_top"}>
        <div className="container">
          <div className="row">
            <ul>
              <li>
                <a href="mailto:jamoliddindev@gmail.com">
                  <i className="fa-solid fa-envelope"></i>{" "}
                  jamoliddindev@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+998942245606">
                  <i className="fa-solid fa-phone"></i>
                  +998942245606
                </a>
              </li>
            </ul>
            <ul>
              <li>
                <a
                  target={"_blank"}
                  href="https://www.instagram.com/jamoliddin__05/"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </li>
              <li>
                <a
                  target={"_blank"}
                  href="https://t.me/jamoliddin9717"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-telegram"></i>
                </a>
              </li>
              <div className="lan">
                <li
                  className={
                    languages ? "language language_active" : "language"
                  }
                >
                  <span
                    className={uzLanguage ? "active" : ""}
                    onClick={(e) => {
                      languages ? setLanguages(false) : setLanguages(true);
                      setUzLanguage(true);

                      window.localStorage.setItem("language", "uz");
                    }}
                  >
                    <img src="/flags/uzb.png" alt="" />
                    O'zbekcha
                  </span>
                  <span
                    className={uzLanguage ? "" : "active"}
                    onClick={(e) => {
                      setUzLanguage(false);
                      languages ? setLanguages(false) : setLanguages(true);
                      window.localStorage.setItem("language", "ru");
                    }}
                  >
                    <img src="/flags/russian.png" alt="" />
                    Русский
                  </span>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>
      {searchBoolean && (
        <div
          className="search_bg"
          onClick={() => {
            setValue("");
            setSearchBoolean(false);
          }}
        ></div>
      )}
      <nav>
        <div className="container">
          <div className="row">
            <Link to="/" className="navbar_left" onClick={() => onScrollTop()}>
              <span>Mongo.uz</span>
            </Link>
            <ul
              className={`${user ? "navbar_center navbar_user_center" : "navbar_center"
                }`}
            >
              <div className="inputSearch">
                <input
                  type="Search"
                  placeholder={translate(
                    "Поиск продуктов и категорий",
                    "Mahsulotlar va turkumlar izlash"
                  )}
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    onSearchFunction(e.target.value);
                  }}
                />
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Layer_1"
                    x="0"
                    y="0"
                    version="1.1"
                    viewBox="0 0 29 29"
                    xmlSpace="preserve"
                  >
                    <path d="M11.854 21.854c-5.514 0-10-4.486-10-10s4.486-10 10-10 10 4.486 10 10-4.486 10-10 10zm0-18c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.588-8-8-8z" />
                    <path d="M26.146 27.146a.997.997 0 0 1-.707-.293l-7.694-7.694a.999.999 0 1 1 1.414-1.414l7.694 7.694a.999.999 0 0 1-.707 1.707z" />
                  </svg>
                </button>
                {searchBoolean && (
                  <div className={"searchedProducts"}>
                    {search.map((item, index) => (
                      <Link
                        to={`/product/more/${item._id}`}
                        key={index}
                        onClick={() => {
                          window.onload();
                          setValue("");
                          setSearchBoolean(false);
                        }}
                        className="product"
                      >
                        <img src={`/uploads/${item.photo[0]}`} alt="" />
                        <p>
                          {translate(
                            NameLength(item.name_ru, 30),
                            NameLength(item.name_uz, 30)
                          )}
                        </p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </ul>
            {user ? (
              <ul className="navbar_right AdminRight">
                <li>
                  <Link to={"/"} onClick={() => onScrollTop()}>
                    <i className="fa-regular fa-heart"></i>
                    <span>0</span>
                  </Link>
                </li>

                <li>
                  <Link to="/cart" onClick={() => onScrollTop()}>
                    <i className="fa-solid fa-cart-arrow-down"></i>
                    <span>{productNumbers ? productNumbers : 0}</span>
                  </Link>
                </li>
                <Link
                  to="/admin"
                  className="User"
                  onClick={() => onScrollTop()}
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt="" />
                  ) : (
                    <img src="/uploads/user.png" alt="" />
                  )}

                  {NameLength(user.firstName ? user.firstName : user.phoneNumber, 10)}
                </Link>
              </ul>
            ) : (
              <ul className="navbar_right">
                <li>
                  <Link to={"/"} onClick={() => onScrollTop()}>
                    <i className="fa-regular fa-heart"></i>
                    <span>0</span>
                    <p>{translate("Избранное", "Sevimlilar")}</p>
                  </Link>
                </li>

                <li>
                  <Link to="/cart" onClick={() => onScrollTop()}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="slightly transparent"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9 6.5C9 4.88779 10.2402 3.5 12 3.5C13.7598 3.5 15 4.88779 15 6.5V7.5H9V6.5ZM7.5 9V11.5H9V9H15V11.5H16.5V9H18.5V19.75C18.5 20.1642 18.1642 20.5 17.75 20.5H6.25C5.83579 20.5 5.5 20.1642 5.5 19.75V9H7.5ZM7.5 7.5V6.5C7.5 4.11221 9.35984 2 12 2C14.6402 2 16.5 4.11221 16.5 6.5V7.5H19.25H20V8.25V19.75C20 20.9926 18.9926 22 17.75 22H6.25C5.00736 22 4 20.9926 4 19.75V8.25V7.5H4.75H7.5Z"
                        fill="#141415"
                      ></path>
                    </svg>
                    <span>{productNumbers ? productNumbers : 0}</span>
                    <p>{translate("Корзина", "Savat")}</p>
                  </Link>
                </li>
                <li className="registerClick">
                  <Link to={"/login"} onClick={() => onScrollTop()}>
                    <i className="fa-regular fa-user"></i>
                    <p>{translate("Войти", "Kirish")}</p>
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
