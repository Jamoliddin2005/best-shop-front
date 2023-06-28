import React from "react";
import classes from "./Contact.module.css";
import Form from "./Form/Form";
import Map from "./Map/Map.js";
export default function Contact() {
  return (
    <div className={classes.Contact}>
      <div className={classes.Contact_Top}>
        <div className={classes.texts}>
          <h2>Contact Us</h2>
          <p>
            Proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum. Lorem ipsum dolor sit amet.
          </p>
        </div>
        <Map />
      </div>
      <Form />
    </div>
  );
}
