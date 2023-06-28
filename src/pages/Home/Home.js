import React from "react";
import Header from "./Header/Header";

import "./Home.css";
import NewProducts from "./NewProducts/NewProducts";
import Section from "./Section/Section";
function Home({
  setCategoryBig,
  categoryBig,
  getCategory,
  ProductMore,
  categories,
  setCategories,
  loading,
  setLoading,
  setErrorServer,
  onScrollTop
}) {
  return (
    <div className="about">
      <Header setErrorServer={setErrorServer} />
      <Section
        loading={loading}
        setLoading={setLoading}
        categories={categories}
        setCategories={setCategories}
        getCategory={getCategory}
        categoryBig={categoryBig}
        setCategoryBig={setCategoryBig}
      />
      <NewProducts
        onScrollTop={onScrollTop}
        ProductMore={ProductMore}
        setErrorServer={setErrorServer} />
    </div>
  );
}

export default Home;
