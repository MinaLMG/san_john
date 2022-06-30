import { Fragment, useState } from "react";
import BarcodeReader from "react-barcode-reader";
import Test from "./BarCodeHandler";

export default function Attendance(props) {
  const [Id_Read, set_ID_Read] = useState(undefined);
  return (
    <Fragment>
      <Test></Test>
      <button onClick={props.onGoBack}> back</button>
    </Fragment>
  );
}
