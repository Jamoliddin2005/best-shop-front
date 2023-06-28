import React from "react";
import Loading from "../../../components/Loading/Loading";
import classes from "./section.module.css";
import translate from "../../../components/translate/translate"

function Section({
  getCategory,
  categories,
  loading,
}) {
  return (
    <div className={"container"}>
      <div className={classes.top}>
        <h1 className={classes.h1}>{translate("Категории", "Kategoriyalar")}</h1>
      </div>
      <div className={classes.bottom_Categories}>
        <div className={classes.row}>
          {loading ? (
            <Loading />
          ) : (
            categories.map((item, index) => (
              item.photo && <div className={classes.item} key={index}>
                <div
                  className={classes.images}
                  onClick={() => getCategory(item._id)}
                >
                  <img
                    className={classes.image}
                    src={"/uploads/" + item.photo}
                    alt=""
                  />
                </div>
                <h3 className={classes.h3}>{translate(item.name_ru, item.name_uz)}</h3>
                <button
                  className={classes.btn}
                  onClick={() => getCategory(item._id)}
                >
                  {translate("Начать", "Boshlash")}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Section;
