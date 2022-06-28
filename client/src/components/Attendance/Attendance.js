import { Fragment } from "react";

export default function Attendance(props) {
  return (
    <Fragment>
      <button onClick={props.onGoBack}> back</button>
    </Fragment>
  );
}
