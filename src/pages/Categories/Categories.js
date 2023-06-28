import axios from "axios";
import React, { useEffect } from "react";
import Currency from "../../components/Currency/Currency";
import translate from "../../components/translate/translate";
import Loading from "../../components/Loading/Loading";
import NameLength from "../../components/NameLength/NameLength";
import classes from "./Categories.module.css";

const Categories = ({
  categoryBig,
  categoryLoading,
  setCategoryLoading,
  setCategoryBig,
  ProductMore,
  onScrollTop
}) => {
  useEffect(() => {
    const CategoryFind = async () => {
      const location = window.location.pathname;
      setCategoryLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_URL}/add/` + location);
      setCategoryLoading(false);
      setCategoryBig(data.data);
    };
    CategoryFind();
  }, []);

  window.scroll(0, 0);

  return (
    <div className={classes.Categories}>
      <div className={"container"}>
        <div className={classes.row}>
          {categoryBig.length ? (
            categoryLoading ? (
              <Loading />
            ) : (
              categoryBig.map((item, index) => (
                item.photo[0] && <div
                  key={index}
                  className={classes.product}
                  onClick={() => {
                    ProductMore(item._id)
                    onScrollTop()
                  }}
                >
                  <div className={classes.image}>
                    <img
                      src={"/uploads/" + item.photo[0]}
                      className={classes.img}
                      alt=""
                    />
                  </div>
                  <div className={classes.texts}>
                    <div className={classes.price_name}>
                      <h2 className={classes.name}>{translate(NameLength(item.name_ru, 25), NameLength(item.name_uz, 30))}</h2>
                      <h3 className={classes.price}>{Currency(item.price)}</h3>
                    </div>
                    <div className={classes.desc}>
                      <p className={classes.desc}>{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))
            )
          ) : (
            <h2>Bu Categoriyada mahsulot yo'q</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
