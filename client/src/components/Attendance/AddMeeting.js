import React, { useState } from "react";
import classes from "./AddMeeting.module.css";
import General from "../general/General.module.css";
import back from "../../assets/icons/arrow.png";
import InputWithLabel from "../general/InputWithLabel";
import DateGet from "../general/DateGet";
import instance from "../axios";
import Modal from "../general/Modal";
export default function AddMeeting(props) {
  const [meeting, setMeeting] = useState(
    props.meeting
      ? props.meeting
      : {
          date: new Date(Date.now()),
        }
  );
  const [date_error, setDate_error] = useState(false);
  const [disableButton, setDisableButton] = useState(
    props.edit ? false : false
  );
  const [addingError, setAddingError] = useState(false);
  const add_meeting = async () => {
    try {
      let nowDate = new Date(Date.now());
      meeting["date_created"] = nowDate;
      const res = await instance.post("/Meetings", meeting);
      console.log(res.data);
      props.onGoBack();
    } catch (error) {
      console.log(error);
      setAddingError(true);
      setTimeout(() => {
        setAddingError(false);
      }, 3000);
    }
  };
  const edit_meeting = async () => {
    try {
      console.log(meeting);
      let to_send = JSON.parse(JSON.stringify(meeting));
      delete to_send["__v"];
      delete to_send["date_created"];
      let id_to_send = to_send["_id"];

      delete to_send["_id"];
      const res = await instance.patch(`/Meetings/${id_to_send}`, to_send);
      console.log(res.data);
      props.onEdit(id_to_send, to_send["date"]);
    } catch (error) {
      console.log(error);
      setAddingError(true);
      setTimeout(() => {
        setAddingError(false);
      }, 3000);
    }
  };
  const [tryToDelete, setTryToDelete] = useState(false);
  const delete_meeting = async () => {
    try {
      console.log(meeting);
      let id_to_send = meeting["_id"];
      const res = await instance.delete(`/Meetings/${id_to_send}`);
      console.log(res.data);
      props.onEdit(null);
    } catch (error) {
      console.log(error);
      setAddingError(true);
      setTimeout(() => {
        setAddingError(false);
      }, 3000);
    }
  };
  return (
    <React.Fragment>
      <div className={General.actions}>
        <h3>{props.edit ? "تعديل بيانات اجتماع" : " اضافة اجتماع جديد :"} </h3>
        <h3 className={General.h3} onClick={props.onGoBack}>
          back
          <img
            className={General.img}
            src={back}
            onClick={props.onGoBack}
          ></img>
        </h3>
      </div>
      <form className={General.form}>
        <div className={General["data-element"]}>
          <div className={General["element-container"]}>
            <div className={General["element-container-title"]}>
              تاريخ الاجتماع
            </div>
            <DateGet
              onChange={(date) => {
                const val = date;
                if (val == undefined) {
                  setDate_error(true);
                  setDisableButton(true);
                  setMeeting((prev) => {
                    delete prev["date"];
                    return prev;
                  });
                } else {
                  setDisableButton(false);
                  setDate_error(false);
                  setMeeting((prev) => {
                    return { ...prev, date: val };
                  });
                }
              }}
              edit={props.edit}
              c_year={
                meeting.date ? new Date(meeting.date).getFullYear() : undefined
              }
              c_month={
                meeting.date ? new Date(meeting.date).getMonth() + 1 : undefined
              }
              c_day={
                meeting.date ? new Date(meeting.date).getDate() : undefined
              }
            ></DateGet>
          </div>
        </div>
        <div className={General["data-element"]}>
          <InputWithLabel
            label={"معلومات "}
            placeHolder={"معلومات الاجتماع"}
            type={"text"}
            width={"100%"}
            onChange={(e) => {
              const val = e.target.value;
              if (val == "") {
                setMeeting((prev) => {
                  return { ...prev, description: val };
                });
              } else {
                setMeeting((prev) => {
                  return { ...prev, description: val };
                });
              }
            }}
            value={
              props.edit
                ? meeting.description
                : meeting.description
                ? meeting.description
                : ""
            }
            red={false}
          ></InputWithLabel>
        </div>
      </form>
      <div
        className={`${General.final} ${
          props.edit ? General["more-buttons"] : ""
        }`}
      >
        <button
          className={General.button}
          disabled={disableButton}
          onClick={props.edit ? edit_meeting : add_meeting}
        >
          {props.edit ? "حفظ التعديلات" : " اضافة الاجتماع"}
        </button>
        {addingError && (
          <span className={General.error}>
            السيرفر وقع او البيانات غلط .. خلى بالك لازم يكون فيه تاريخ
          </span>
        )}
        {props.edit && (
          <button
            className={General.button}
            disabled={disableButton}
            onClick={() => {
              setTryToDelete(true);
            }}
          >
            حذف الاجتماع
          </button>
        )}
        {tryToDelete && (
          <Modal
            onHide={() => {
              setTryToDelete(false);
            }}
            data={{
              header: "حذف الاجتماع ",
              message:
                "متأكد انك عاوز تحذفه ؟ لو مش عاوز دوس علامة الغلط او برة البلوك ده :D",
              button: "أيوة",
            }}
            onOk={() => {
              delete_meeting();
            }}
          ></Modal>
        )}
      </div>
    </React.Fragment>
  );
}
