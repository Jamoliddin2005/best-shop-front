import React, { useEffect, useState } from "react";
import Currency from "../../../components/Currency/Currency";
import translate from "../../../components/translate/translate";
import Loading from "../../../components/Loading/Loading";
import NameLength from "../../../components/NameLength/NameLength";
import classes from "./NewProducts.module.css";
function NewProducts({ ProductMore, setErrorServer, onScrollTop }) {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState(0);
  const [moreBtn, setMoreBtn] = useState(true);

  const MoreProducts = () => {
    productBase();
  };

  const productBase = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/products/showProducts/${pages + 8}`
      );
      const res = await response.json();
      setPages(pages + 8);
      setProducts(res);
      if (res.length < pages + 8) {
        setMoreBtn(false);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    productBase();
  }, []);

  return (
    <div className={classes.NewProducts}>
      <div className={"container"}>
        <div className={classes.top}>
          <h1 className={classes.title}>
            {translate("Новые продукты", "Yangi mahsulotlar")}
          </h1>
        </div>

        <div className={classes.newProds}>
          {loading ? (
            <div className={classes.loading_div}>
              <Loading />
            </div>
          ) : products && products.length > 0 ? (
            <>
              <div className={classes.allProducts}>
                {products.map(
                  (item, index) =>
                    item.photo[0] && (
                      <div
                        className={classes.product}
                        key={index}
                        onClick={() => {
                          ProductMore(item._id);
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
                          <div className={classes.price__name}>
                            <h2 className={classes.name}>
                              {translate(
                                NameLength(item.name_ru, 25),
                                NameLength(item.name_uz, 30)
                              )}
                            </h2>
                            <h3 className={classes.price}>
                              {Currency(item.price)}
                            </h3>
                          </div>
                        </div>
                      </div>
                    )
                )}
              </div>
              {moreBtn && (
                <button
                  onClick={() => MoreProducts()}
                  className={classes.more_btn}
                >
                  {translate("ЕЩЕ", "Yana")}
                </button>
              )}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default NewProducts;
