import React, { useEffect, useState } from "react";
import classes from "./NewProducts.module.css";
import ProductsAdd from "./ProductsAdd/ProductsAdd";
import Products from "./Products/Products";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading/Loading";
import translate from "../../../components/translate/translate";

const NewProducts = ({
  loading,
  setLoading,
  contacts,
  setContacts,
  ProductMore,
}) => {
  const [name_uz, setName_uz] = useState("");
  const [name_ru, setName_ru] = useState("");
  const [price, setPrice] = useState("");
  const [desc_uz, setDesc_uz] = useState("");
  const [desc_ru, setDesc_ru] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoone, setPhotoOne] = useState("https://bref.sh/img/logo-null.png");

  const [pages, setPages] = useState(0);
  const [moreBtn, setMoreBtn] = useState(true);

  const [products, setProducts] = useState([
    {
      name_uz: "",
      name_ru: "",
      price: "",
      photo: "",
      desc_uz: "",
      desc_ru: "",
      categoryId: "",
      gender: "",
    },
  ]);

  const ProductForm = new FormData();
  ProductForm.append("name_uz", name_uz);
  ProductForm.append("name_ru", name_ru);
  ProductForm.append("price", price.replace("e"));
  ProductForm.append("desc_uz", desc_uz);
  ProductForm.append("desc_ru", desc_ru);
  ProductForm.append("categoryId", categoryId);
  if (photo) {
    for (let i = 0; i < photo.length; i++) {
      ProductForm.append("photo", photo[i]);
    }
  }

  const CreateProductHandler = async (e) => {
    e.preventDefault();
    const ProductPhoto = document.getElementById("ProductPhoto");
    ProductPhoto.value = "";

    try {
      e.preventDefault();
      if (
        name_uz &&
        name_ru &&
        price &&
        desc_uz &&
        desc_ru &&
        photo &&
        categoryId
      ) {
        e.preventDefault();
        setPhoto("");
        setName_uz("");
        setName_ru("");
        setPrice("");
        setDesc_uz("");
        setDesc_ru("");
        setLoading("");
        setProducts("");
        const { data } = await axios.post(
          `${process.env.REACT_APP_URL}/add/addProduct`,
          ProductForm,
          {
            headers: {
              Authorization: sessionStorage.getItem("token"),
            },
          }
        );
        setProducts(data.data);
        toast.success("Product qo'shildi");
        setPhotoOne("https://bref.sh/img/logo-null.png");
      } else {
        toast.error("Productni to'liq kiriting");
      }
    } catch (error) {
      return toast.error("ERROR!!!");
    }
  };

  const MoreProducts = () => {
    productBase();
  };
  const productBase = async () => {
    setLoading(true);
    const response = await fetch(
      `${process.env.REACT_APP_URL}/products/showProducts/${pages + 3}`
    );

    const res = await response.json();
    setPages(pages + 3);
    setProducts(res);
    if (res.length < pages + 3) {
      setMoreBtn(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    productBase();
  }, []);

  const ProductDelete = async (id) => {
    const res = window.confirm("Mahsulot o'chirilsinmi?");
    if (res) {
      toast.success("Mahsulot o'chirildi!");
      const { data } = await axios.delete(
        `${process.env.REACT_APP_URL}/delete/products/delete/` + id,
        {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        }
      );
      setProducts(data.data);
    }
  };

  return (
    <div className={classes.NewProducts}>
      <ProductsAdd
        setName_uz={setName_uz}
        setName_ru={setName_ru}
        setPrice={setPrice}
        setDesc_uz={setDesc_uz}
        setDesc_ru={setDesc_ru}
        setCategoryId={setCategoryId}
        setPhoto={setPhoto}
        CreateProductHandler={CreateProductHandler}
        name_uz={name_uz}
        name_ru={name_ru}
        price={price}
        desc_uz={desc_uz}
        desc_ru={desc_ru}
        categoryId={categoryId}
        photo={photo}
        photoone={photoone}
        setPhotoOne={setPhotoOne}
        loading={loading}
        setLoading={setLoading}
        contacts={contacts}
        setContacts={setContacts}
      />

      <div className={classes.ProductsDiv}>
        {products ? (
          products.length ? (
            loading ? (
              <Loading />
            ) : (
              <>
                <div className={classes.getProductAll}>
                  {products.map(
                    (item, index) =>
                      item.photo && (
                        <Products
                          key={index}
                          id={item._id}
                          name_uz={item.name_uz}
                          name_ru={item.name_ru}
                          price={item.price}
                          photo={item.photo}
                          desc_uz={item.desc_uz}
                          desc_ru={item.desc_ru}
                          categoryId={item.categoryId}
                          ProductDelete={ProductDelete}
                          ProductMore={ProductMore}
                        />
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
            )
          ) : (
            <h2 className={classes.productNull}>Mahsulotlar yo'q</h2>
          )
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default NewProducts;
