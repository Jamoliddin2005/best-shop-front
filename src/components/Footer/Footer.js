import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Footer.css";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";
import translate from "../translate/translate";

const Pages = [
  {
    name: "Home",
  },
  {
    name: "About Us",
  },
  {
    name: "Shop Locations",
  },
  {
    name: "FAQs",
  },
  {
    name: "Contact",
  },
];

export default function Footer({ categories, Abouts, loading }) {
  const [input, setInput] = useState("");

  const URI_API = `https://api.telegram.org/bot${process.env.REACT_APP_TOKEN}/sendMessage`;

  const submitHandler = async (e) => {
    e.preventDefault();
    let message = `<b>#Mongo.uz</b>\n\n`;
    message += `<b>Email: </b> ${input}\n`;
    message += `<b>Time: </b> ${new Date().toLocaleString()}`;

    await axios
      .post(URI_API, {
        chat_id: process.env.REACT_APP_CHAT_ID,
        parse_mode: "html",
        text: message,
      })
      .then((res) => {
        setInput("");
      })
      .catch((err) => {
        return toast.error("ERROR!!!");
      })
      .finally(() => {
        return toast.success("Success!");
      });
  };

  return (
    <div className="Footer">
      <div className="Footer_Top">
        <div className="container">
          <div className="row">
            <ul>
              <Link to="/" className="Home_Logo">
                <span>Mongo.uz</span>
              </Link>
              {Abouts.map((item, index) => (
                item.icon &&
                <li key={index}>
                  <a
                    href={item.hrefs}
                    target={"_blank"}
                    rel="noopener noreferrer"
                  >
                    <i className={item.icon}></i>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="footer_center">
              <h3>{translate("Категории", "Kategoriyalar")}</h3>
              {loading ? (
                <div className="loading_Div_footer">
                  <Loading />
                </div>
              ) : (
                categories.map((item, index) => (
                  item.photo &&
                  <li key={index}>
                    <Link to={`/category/${item._id}`}>
                      {translate(item.name_ru, item.name_uz)}
                    </Link>
                  </li>
                ))
              )}
            </ul>
            <ul>
              <h3>{translate("Страницы", "Sahifalar")}</h3>
              {Pages.map((item, index) => (
                item.name && <li key={index}>
                  <Link to={index}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer_bottom">
            <ul>
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=100078919103944"
                  target={"_blank"}
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
              </li>
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
              <li>
                <a
                  target={"_blank"}
                  href="https://www.linkedin.com/in/jamoliddin-ko-charov-8a6193234/"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-linkedin"></i>
                </a>
              </li>
            </ul>
            <div className="form">
              <form action="/auth" onSubmit={submitHandler}>
                <input
                  type="email"
                  placeholder={translate(
                    "Введите Email",
                    "Emailingizni kiriting"
                  )}
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                  autoComplete="off"
                  required={true}
                />
                <button type="submit">
                  {translate("Отправить", "Yuborish")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
