import React from "react";
import classes from "./Header.module.css";
import HeaderLogo from "./HeaderLogo";

function Header() {
  return (
    <div className={classes.Header}>
      <div className="container" style={{ height: "100%" }}>
        <div className={classes.row}>
          <div className={classes.Left}>
            <div className={classes.item}>
              <h1>About Us</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel,
                accusantium omnis repellendus alias odit eveniet fuga non
                nostrum in labore. Aperiam molestiae deserunt beatae laboriosam
                sit. Dignissimos eveniet quae accusantium et dolore culpa a odit
                magnam illo ratione? Iusto, aut!
              </p>
            </div>
          </div>
          <div className={classes.Right}>
            <HeaderLogo />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
