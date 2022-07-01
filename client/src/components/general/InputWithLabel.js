import React from "react";

import classes from "./InputWithLabel.module.css";
export default function InputWithLabel(props) {
  return (
    <div
      className={`form-group ${classes["form-g"]}`}
      style={{ width: props.width }}
    >
      <label className={classes.label}>{props.label}</label>
      <input
        type={props.type}
        className={`form-control ${classes["input"]} ${
          props.red ? classes.red : ""
        }`}
        aria-describedby="emailHelp"
        placeholder={props.placeHolder}
        onChange={props.onChange}
        value={props.value ? props.value : ""}
      />
    </div>
  );
}
