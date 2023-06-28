import React from "react";
import classes from "./ServerError.module.css";
import ErrorGif from "./error.gif";

function ServerError() {
  return (
    <div className={classes.ServerError}>
      <img src={ErrorGif} alt="" />
      <h1>
        500 <span>Server Error</span>
      </h1>
    </div>
  );
}

export default ServerError;
