import React from "react";

export default function carts({ classes, carts }) {
  return (
    <div className={"container"}>
      <div className={classes.carts}>
        {carts.map((item, index) => (
          item.img && <div className={classes.cart} key={index}>
            <i className={item.img}></i>
            <h3>{item.text}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
