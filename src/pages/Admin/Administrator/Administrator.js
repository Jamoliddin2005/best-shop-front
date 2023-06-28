import React from "react";
import { Link } from "react-router-dom";
// import classes from "./Administrator.module.css";

const Administrator = ({
  user,
}) => {
  return (
    <div>
      <div className="adminPage">
        <div className="adminTitle">
          {user.firstName ? (
            <h1>Welcome {user.firstName}</h1>
          ) : (
            <h1>Welcome {user.phoneNumber}</h1>
          )}

          <ul>
            <li>
              <Link to={"/admin/homePage"}>home</Link>
            </li>
            <li>
              <Link to={"/admin/homePage"}>About</Link>
            </li>
            <li>
              <Link to={"/admin/homePage"}>Shop</Link>
            </li>
            <li>
              <Link to={"/admin/homePage"}>Contact</Link>
            </li>
          </ul>
        </div>
        <div
          className="admin_LogOut"
          onClick={() => {
            window.sessionStorage.removeItem("token");
            window.open(
              `${process.env.REACT_APP_URL}/auth/login/logout`,
              "_self"
            );
          }}
        >
          <h4>LogOut</h4>
        </div>
      </div>
    </div>
  );
};

export default Administrator;
