import React, { useEffect, useState } from "react";
import "./Admin.css";
import Administrator from "./Administrator/Administrator";
import ClientPage from "./ClientPage/ClientPage";

function Admin({ user, getCategory, ProductMore, Abouts, GetToken }) {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([
    {
      name: "",
      photo: "",
    },
  ]);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_URL}/add/showCategory`);
      setContacts(await response.json());
      setLoading(false);
    };
    getCategories();
  }, []);

  return (
    <>
      {user.isAdmin ? (
        <Administrator
          ProductMore={ProductMore}
          getCategory={getCategory}
          user={user}
          loading={loading}
          setLoading={setLoading}
          contacts={contacts}
          setContacts={setContacts}
        />
      ) : (
        <ClientPage user={user} GetToken={GetToken} />
      )}
    </>
  );
}
export default Admin;
