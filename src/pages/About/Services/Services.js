import React from "react";
import Carts from "./carts";
import classes from "./Services.module.css";

const Services = () => {
  const carts = [
    {
      img: "fa fa-truck fa-lg",
      text: "Delivery Services",
    },
    {
      img: "fas fa-exchange-alt",
      text: "Shipping & Return",
    },
    {
      img: "fa fa-percent",
      text: "Promotion",
    },
    {
      img: "fa fa-user",
      text: "24 Hours Service",
    },
  ];

  return (
    <div className={classes.section}>
      <div className={classes.services}>
        <h2>Our Services</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod Lorem ipsum dolor sit amet.
        </p>
      </div>
      <Carts classes={classes} carts={carts} />
    </div>
  );
};

export default Services;
