import React from "react";
import HomeCarousel from "../../HomeCarousel/HomeCarousel";
import Categories from "../../Categories/Categories";
import NewProducts from "../../NewProducts/NewProducts";
import { AiOutlineRight } from "react-icons/ai";

import "../Administrator.css";
import { Link } from "react-router-dom";

function Home({
  user,
  getCategory,
  setContacts,
  loading,
  setLoading,
  contacts,
  ProductMore,
  categoryLoading,
  setCategoryLoading,
  categoryBig,
  setCategoryBig,
}) {
  return (
    <div className="adminPage">
      <p className="p_admin_pages">
        <Link to={"/admin"}>Admin</Link> <AiOutlineRight />    <Link to={"/admin/homePage"}>Home Page</Link>
      </p>
      <div className="adminTitle">
        <h1>Home Page for Admin</h1>
        <HomeCarousel user={user} />
        <Categories
          getCategory={getCategory}
          categoryLoading={categoryLoading}
          setCategoryLoading={setCategoryLoading}
          categoryBig={categoryBig}
          setCategoryBig={setCategoryBig}
          user={user}
          loading={loading}
          setLoading={setLoading}
          contacts={contacts}
          setContacts={setContacts}
        />
        <NewProducts
          user={user}
          loading={loading}
          setLoading={setLoading}
          contacts={contacts}
          setContacts={setContacts}
          ProductMore={ProductMore}
        />
      </div>
    </div>
  );
}

export default Home;
