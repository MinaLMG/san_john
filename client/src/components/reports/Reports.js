import { Fragment } from "react";

export default function Reports(props) {
  return (
    <Fragment>
      <button onClick={props.onGoBack}> back</button>
    </Fragment>
  );
}
