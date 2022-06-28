import { Fragment } from "react";
import classes from "./PData.module.css";
export default function PData(props) {
  return (
    <Fragment>
      <button onClick={props.onGoBack}> back</button>
    </Fragment>
  );
}
