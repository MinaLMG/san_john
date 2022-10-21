import React, { Fragment, useEffect, useState } from "react";
import BarcodeReader from "react-barcode-reader";
import Test from "./BarCodeHandler";
import classes from "./Attendance.module.css";
import General from "../general/General.module.css";
import back from "../../assets/icons/arrow.png";
import AddMeeting from "./AddMeeting";
import EditMeeting from "./EditMeeting";
import RegisterMeeting from "./RegisterMeeting";
export default function Attendance(props) {
  const [ID_Read, set_ID_Read] = useState(undefined);
  const [chosen, setChosen] = useState(
    localStorage.getItem("AttendanceChosen")
      ? localStorage.getItem("AttendanceChosen")
      : undefined
  );
  useEffect(() => {
    if (chosen == undefined) localStorage.removeItem("AttendanceChosen");
    else localStorage.setItem("AttendanceChosen", chosen);
  }, [chosen]);
  return (
    <Fragment>
      {chosen == undefined && (
        <React.Fragment>
          <div className={General.actions}>
            <h3> غياب/حضور : </h3>
            <h3 className={General.h3} onClick={props.onGoBack}>
              back
              <img
                className={General.img}
                src={back}
                onClick={props.onGoBack}
              ></img>
            </h3>
          </div>
          <div className={classes.options}>
            <Test></Test>
            <div className={classes.area}>
              <button
                onClick={() => {
                  setChosen("Add");
                }}
                className={General["area-button"]}
              >
                اضافة اجتماع جديد
              </button>
            </div>
            <div className={classes.area}>
              <button
                onClick={() => {
                  setChosen("Edit");
                }}
                className={General["area-button"]}
              >
                تعديل بيانات اجتماع مسجل بالفعل
              </button>
            </div>
            <div className={classes.area}>
              <button
                onClick={() => {
                  setChosen("Register");
                }}
                className={General["area-button"]}
              >
                تسجيل حضور فى اجتماع مسجل بالفعل
              </button>
            </div>
          </div>
        </React.Fragment>
      )}
      {chosen == "Add" && (
        <AddMeeting
          onGoBack={() => {
            setChosen(undefined);
          }}
        ></AddMeeting>
      )}
      {chosen == "Edit" && (
        <React.Fragment>
          <EditMeeting
            onGoBack={() => {
              setChosen(undefined);
            }}
          ></EditMeeting>
        </React.Fragment>
      )}
      {chosen == "Register" && (
        <React.Fragment>
          <RegisterMeeting
            onGoBack={() => {
              setChosen(undefined);
            }}
          ></RegisterMeeting>
        </React.Fragment>
      )}
    </Fragment>
  );
}
