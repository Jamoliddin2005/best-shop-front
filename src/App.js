import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import 'swiper/css';
// Import css
import "./App.css";

// Import Pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Admin from "./pages/Admin/Admin";
import Categories from "./pages/Categories/Categories";
import ProductMorePage from "./pages/More/ProductMore";
import Contact from "./pages/Contact/Contact";
import AdminHome from "./pages/Admin/Administrator/Home/Home";
import Shop from "./pages/Shop/Shop";

// Import Components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ServerError from "./pages/500/ServerError";
import Cart from "./pages/Cart/Cart";

function App() {
  const [user, setUser] = useState(null);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [uzLanguage, setUzLanguage] = useState(true)
  const [ErrorServer, setErrorServer] = useState(false)

  // Add To Card
  const [productNumbers, setProductNumbers] = useState("");
  const [productsInCart, setProductsInCart] = useState("");
  const [totalCoastGet, setTotalCoastGet] = useState("");

  const onScrollTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const GetTranslate = () => {
    if (localStorage.getItem("language") === "ru") {
      window.localStorage.setItem("language", "ru")
      setUzLanguage(false)
    } else if (localStorage.getItem("language") === "uz") {
      window.localStorage.setItem("language", "uz")
      setUzLanguage(true)
    } else {
      window.localStorage.setItem("language", "uz")
      setUzLanguage(true)
    }
  }

  const GetToken = async () => {
    if (sessionStorage.getItem('token')) {
      try {
        await fetch(`${process.env.REACT_APP_URL}/auth/find`, {
          method: "GET",
          headers: {
            'Authorization': sessionStorage.getItem('token')
          }
        }).then((res) => res.json())
          .then((res) => {
            if (res.user) {
              setUser(res.user)
            }
          })
          .catch(err => console.log(err))
      } catch (error) {
        setErrorServer(true)
      }
    } else {
      setUser(null)
    }
  }

  useEffect(() => {
    GetToken()
    GetTranslate()
  }, [])

  const [categoryBig, setCategoryBig] = useState([
    {
      _id: "",
      name: "",
      price: "",
      photo: "",
      desc: "",
      categoryId: "",
    },
  ]);

  const [moreLoading, setMoreLoading] = useState(false);

  const [productMore, setProductMore] = useState({
    _id: "",
    name: "",
    price: "",
    photo: "",
    desc: "",
    categoryId: "",
  });

  const [categories, setCategories] = useState([
    {
      name: "",
      photo: "",
    },
  ]);

  const Abouts = [
    {
      icon: "fas fa-map-marker-alt fa-fw",
      name: "Uzbekistan / Almalik",
      hrefs: "https://www.google.com/maps/@40.8422655,69.6106512,21z",
    },
    {
      icon: "fa fa-phone fa-fw",
      name: "+998942245606",
      hrefs: "tel:+998942245606",
    },
    {
      icon: "fa fa-envelope fa-fw",
      name: "jamoliddindev@gmail.com",
      hrefs: "mailto:jamoliddindev@gmail.com",
    },
  ];

  const [contacts, setContacts] = useState([
    {
      name: "",
      photo: "",
    },
  ]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoading(true);
        fetch(`${process.env.REACT_APP_URL}/add/showCategory`).then(res => res.json()).then(res => {
          setCategories(res);
        }).catch(err => {
          setErrorServer(true)
        })
        setLoading(false);
      } catch (error) {
        setErrorServer(true)
      }
    };
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      setLoading(true);
      await fetch(`${process.env.REACT_APP_URL}/add/showCategory`).then(res => res.json()).then(res => {
        setContacts(res);
      }).catch(err => setErrorServer(true))
      setLoading(false);
    } catch (error) {
      setErrorServer(true)
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    const getUser = () => {
      try {
        fetch(`${process.env.REACT_APP_URL}/auth/login/success`, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        })
          .then((response) => {
            if (response.status === 200) return response.json();
            throw new Error("authentication has been failed!");
          })
          .then((resObject) => {
            setUser(resObject.user);
          })
          .catch((err) => {
            setErrorServer(true)
          });
      } catch (error) {
        setErrorServer(true)
      }
    };
    getUser();
  }, []);

  let navigate = useNavigate();

  const getCategory = async (id) => {
    try {
      setCategoryLoading(true);
      navigate("/category/" + id);
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL}/add/category/` + id
      );
      setCategoryBig(data.data);
      setCategoryLoading(false);
    } catch (error) {
      setErrorServer(true)
    }
  };
  const ProductMore = async (id) => {
    try {
      setMoreLoading(true);
      navigate("/product/more/" + id);
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL}/add/product/more/` + id
      );
      setMoreLoading(false);
      setProductMore(data.data);
    } catch (error) {
      setErrorServer(true)
    }
  };



  // Add To Card 

  useEffect(() => {
    function getLocals() {
      setProductNumbers(localStorage.getItem("cartNumbers"));
      setProductsInCart(localStorage.getItem("productsInCart"));
      setTotalCoastGet(localStorage.getItem("totalCoast"));

    }
    getLocals();
  }, [])

  function cartNumbers(item) {
    setProductNumbers(localStorage.getItem("cartNumbers"));
    if (productNumbers) {
      localStorage.setItem("cartNumbers", +productNumbers + 1);
    } else {
      localStorage.setItem("cartNumbers", 1);
    }
    setItems(item);
    totalCoast(item);
    setProductNumbers(localStorage.getItem("cartNumbers"));
  }

  function setItems(product) {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    if (cartItems != null) {
      if (cartItems[product._id] === undefined) {
        product.inCart = 0;
        cartItems = {
          ...cartItems,
          [product._id]: product,
        };
      }
      cartItems[product._id].inCart += 1
    } else {
      product.inCart = 1;
      cartItems = {
        [product._id]: product,
      };
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    setProductsInCart(localStorage.getItem("productsInCart"));
  }

  function totalCoast(product) {
    let cartCoast = localStorage.getItem("totalCoast");
    if (cartCoast !== null) {
      localStorage.setItem(
        "totalCoast",
        +cartCoast + Number(product.price)
      );
      setTotalCoastGet(localStorage.getItem("totalCoast"));
    } else {
      localStorage.setItem("totalCoast", Number(product.price));
      setTotalCoastGet(localStorage.getItem("totalCoast"));
    }
  }

  function minusNumber(item) {
    setProductNumbers(localStorage.getItem("cartNumbers"));
    if (productNumbers) {
      localStorage.setItem("cartNumbers", +productNumbers - 1);
    }
    setItemsMinus(item);
    totalCoastMinus(item);
    setProductNumbers(localStorage.getItem("cartNumbers"));
  }

  function setItemsMinus(product) {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    if (cartItems != null) {
      if (cartItems[product._id] === undefined) {
        cartItems = {
          ...cartItems,
          [product._id]: product,
        };
      }
      cartItems[product._id].inCart--;
    } else {
      product.inCart--;
      cartItems = {
        [product._id]: product,
      };
    }
    if (cartItems[product._id].inCart < 1) {
      delete cartItems[product._id]
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    setProductsInCart(localStorage.getItem("productsInCart"));
  }

  function totalCoastMinus(product) {
    let cartCoast = localStorage.getItem("totalCoast");
    if (cartCoast !== null) {
      localStorage.setItem(
        "totalCoast",
        +cartCoast - Number(product.price)
      );
      setTotalCoastGet(localStorage.getItem("totalCoast"));
    }
  }

  return (
    <div className="App" onCopy={(e) => e.preventDefault()}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {ErrorServer || <Navbar
        onScrollTop={onScrollTop}
        user={user}
        uzLanguage={uzLanguage}
        setUzLanguage={setUzLanguage}
        productNumbers={productNumbers}
        totalCoastGet={totalCoastGet}
      />}
      <div className="mongo_big">
        <Routes>
          <Route
            path="/"
            element={
              ErrorServer ? <Navigate to="/server-error" /> :
                <Home
                  onScrollTop={onScrollTop}
                  setErrorServer={setErrorServer}
                  loading={loading}
                  setLoading={setLoading}
                  categories={categories}
                  setCategories={setCategories}
                  ProductMore={ProductMore}
                  getCategory={getCategory}
                  categoryBig={categoryBig}
                  setCategoryBig={setCategoryBig}
                />
            }
          />
          <Route path="/about" element={ErrorServer ? <Navigate to="/server-error" /> : <About />} />
          <Route
            path="/login"
            element={
              ErrorServer ? <Navigate to="/server-error" /> : user ? <Navigate to="/" /> : <Login user={user} setUser={setUser} GetToken={GetToken} />
            }
          />
          <Route path="*" element={ErrorServer ? <Navigate to="/server-error" /> : <Navigate to="/" />} />
          <Route
            path="/product/more/:id"
            element={
              ErrorServer ? <Navigate to="/server-error" /> :
                <ProductMorePage
                  onScrollTop={onScrollTop}
                  cartNumbers={cartNumbers}
                  minusNumber={minusNumber}
                  user={user}
                  setProductMore={setProductMore}
                  productMore={productMore}
                />
            }
          />
          <Route
            path="/admin"
            element={
              ErrorServer ? <Navigate to="/server-error" /> :
                user ? (
                  <Admin
                    onScrollTop={onScrollTop}
                    GetToken={GetToken}
                    Abouts={Abouts}
                    ProductMore={ProductMore}
                    getCategory={getCategory}
                    user={user}
                    categoryBig={categoryBig}
                    setCategoryBig={setCategoryBig}
                    categoryLoading={categoryLoading}
                    setCategoryLoading={setCategoryLoading}
                  />
                ) : (
                  <Navigate to={"/login"} />
                )
            }
          />
          <Route
            path="/contact"
            element={
              ErrorServer
                ? <Navigate
                  to="/server-error"
                />
                : <Contact
                  onScrollTop={onScrollTop}
                />} />
          <Route path="/shop"
            element={
              ErrorServer ?
                <Navigate
                  to="/server-error" />
                : <Shop
                  onScrollTop={onScrollTop}
                  loading={loading}
                  categories={categories} />
            } />
          <Route
            path="/cart"
            element={
              ErrorServer ?
                <Navigate
                  to="/server-error"
                />
                : <Cart
                  user={user}
                  totalCoastGet={totalCoastGet}
                  cartNumbers={cartNumbers}
                  minusNumber={minusNumber}
                  productNumbers={productNumbers}
                  onScrollTop={onScrollTop}
                  loading={loading} />}
          />
          <Route
            path="/category/:id"
            element={
              ErrorServer ?
                <Navigate to="/server-error"
                /> :
                <Categories
                  onScrollTop={onScrollTop}
                  moreLoading={moreLoading}
                  setMoreLoading={setMoreLoading}
                  setCategoryBig={setCategoryBig}
                  user={user}
                  categoryLoading={categoryLoading}
                  setCategoryLoading={setCategoryLoading}
                  categoryBig={categoryBig}
                  ProductMore={ProductMore}
                />
            }
          />
          <Route
            path="/admin/homePage"
            element={
              ErrorServer ?
                <Navigate
                  to="/server-error"
                /> :
                user ? (
                  <AdminHome
                    onScrollTop={onScrollTop}
                    categoryBig={categoryBig}
                    setCategoryBig={setCategoryBig}
                    categoryLoading={categoryLoading}
                    setCategoryLoading={setCategoryLoading}
                    getCategory={getCategory}
                    ProductMore={ProductMore}
                    user={user}
                    loading={loading}
                    contacts={contacts}
                    setLoading={setLoading}
                    setContacts={setContacts}
                  />
                ) : (
                  <Navigate
                    to="/"
                  />
                )

            }
          />
          <Route
            path="/server-error"
            element={ErrorServer
              ? <ServerError
              />
              : <Navigate to="/"
              />
            }
          />
        </Routes>
        {ErrorServer || <Footer categories={categories} Abouts={Abouts} loading={loading} />}
      </div>
    </div>
  );
}

export default App;
