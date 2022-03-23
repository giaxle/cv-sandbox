import React from "react";
import style from "./alert.module.scss";

const Alert = ({ alert }) => {
  return (
    <div
      className={
        alert.type === "green"
          ? style.greenAlert
          : null || alert.type === "red"
          ? style.redAlert
          : null || alert.type === "yellow"
          ? style.yellowAlert
          : null
      }
    >
      {alert.message}
    </div>
  );
};

export default Alert;
