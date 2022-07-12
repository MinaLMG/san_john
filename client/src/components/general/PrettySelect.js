import classes from "./PrettySelect.module.css";
import React, { useState } from "react";
import "./PrettySelect.module.css";
export default function PrettySelect(props) {
  //TODO handle performance
  const [options, setOptions] = useState(props.data);
  const optionsKeys = Object.keys(props.data);
  function changeState(e) {
    props.onChange(e.target.value != "" ? e.target.value : undefined);
  }
  function reset() {
    props.onChange(undefined);
  }
  return (
    <React.Fragment>
      <div className={classes.reset} onClick={reset}></div>
      <select
        className={` ${classes["form-select"]} ${classes.width}${
          props.className ? props.className : ""
        } ${props.red ? classes.red : ""}`}
        aria-label="Default select example"
        onChange={changeState}
        value={props.chosen ? props.chosen : ""}
        // style={{ width: props.width ? props.width : "" }}\
      >
        <option disabled={true} value={""}>
          {props.option}
        </option>
        {optionsKeys.map((key, index) => {
          return (
            <option key={key} value={key}>
              {props.data[key]}
            </option>
          );
        })}
      </select>
    </React.Fragment>
  );
}
