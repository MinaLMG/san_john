import React, { useEffect, useState } from "react";
import classes from "./AddMeeting.module.css";
import General from "../general/General.module.css";
import back from "../../assets/icons/arrow.png";
import InputWithLabel from "../general/InputWithLabel";
import DateGet from "../general/DateGet";
import instance from "../axios";
import Modal from "../general/Modal";
import PrettySelect from "../general/PrettySelect";
export default function AddMeeting(props) {
  let start = new Date(Date.now());
  start.setHours(0);
  start.setMinutes(0);
  start.setSeconds(0);
  start.setMilliseconds(0);

  const [meeting, setMeeting] = useState(
    props.meeting
      ? props.meeting
      : {
          date: start,
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
      // props.onGoBack();
      props.GoMeeting(res.data._id);
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
  const [meeting_types, setMeeting_types] = useState([]);
  const [meeting_types_M, setMeeting_types_M] = useState([]);

  const [speaker, setSpeaker] = useState(undefined);
  const [speakers_M, setSpeakers_M] = useState([]);
  const getMeeting_Types = async () => {
    try {
      const res = await instance.get("/Meeting_Types");
      //   console.log(res);
      console.log(res.data);
      setMeeting_types(res.data);
      //   let temp = res.data.map((x) => ({ [x.id]: x.country }));
      //   setTeams_M(temp);
      let obj = {};
      for (let i = 0; i < res.data.length; i++) {
        obj[res.data[i]._id] = res.data[i].name;
      }
      setMeeting_types_M(obj);
    } catch (error) {
      console.log(error);
    }
  };
  const getSpeakers = async () => {
    try {
      const res = await instance.get("/Speakers");
      //   console.log(res);
      console.log(res.data);
      setSpeakers_M(res.data);
      //   let temp = res.data.map((x) => ({ [x.id]: x.country }));
      //   setTeams_M(temp);
      let obj = {};
      for (let i = 0; i < res.data.length; i++) {
        obj[res.data[i]._id] = res.data[i].name;
      }
      setSpeakers_M(obj);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMeeting_Types();
    getSpeakers();
  }, []);
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
        <div className={General["data-element"]}>
          <div className={General["element-container"]}>
            <PrettySelect
              data={meeting_types_M}
              option="نوع الاجتماع"
              onChange={(type) => {
                const val = type;
                if (val == undefined) {
                  // setTeam_error(true);
                  setMeeting((prev) => {
                    delete prev["meeting_type"];
                    return prev;
                  });
                } else {
                  // setTeam_error(false);
                  setMeeting((prev) => {
                    return { ...prev, meeting_type: val };
                  });
                }
              }}
              chosen={meeting.meeting_type}
            ></PrettySelect>
          </div>
        </div>
        <div className={General["data-element"]}>
          <div className={General["element-container"]}>
            <PrettySelect
              data={speakers_M}
              option="المتكلم"
              onChange={(speaker) => {
                const val = speaker;
                if (val == undefined) {
                  // setTeam_error(true);
                  setMeeting((prev) => {
                    delete prev["speaker"];
                    return prev;
                  });
                } else {
                  // setTeam_error(false);
                  setMeeting((prev) => {
                    return { ...prev, speaker: val };
                  });
                }
                // if (val == undefined) {
                //   // setTeam_error(true);
                //   setSpeaker(undefined);
                // } else {
                //   // setTeam_error(false);
                //   setSpeaker(val);
                // }
              }}
              chosen={meeting.speaker}
            ></PrettySelect>
          </div>
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
            السيرفر وقع او البيانات غلط .. خلى بالك لازم يكون فيه تاريخ و نوع
            اجتماع مختلفين
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
