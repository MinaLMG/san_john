import React, { useEffect, useState } from "react";
import General from "../general/General.module.css";
import classes from "./RegisterAttendance.module.css";
import back from "../../assets/icons/arrow.png";
import instance from "../axios";
import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import TextField from "@mui/material/TextField";
import Modal from "../general/Modal";
import BarcodeReader from "react-barcode-reader";
export default function RegisterAttendance(props) {
  const [attendees, setAttendees] = useState([]);
  const [chosen, setChosen] = useState(null);
  const [req_error, setReq_error] = useState(false);
  const [deleting_error, setDeleting_error] = useState(false);
  const getAttendees = async () => {
    try {
      const res = await instance.get(
        `/Meeting_Attendeds/Meeting/${props.meeting._id}`
      );
      setAttendees(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAttendees();
  }, []);
  const [persons, setPersons] = useState([]);
  useEffect(() => {
    async function fetchData() {
      if (chosen == null) {
        return;
      }
      try {
        console.log(new Date(Date.now()));
        const res = await instance.post(`/Meeting_Attendeds/`, {
          m_ID: props.meeting._id,
          p_ID: chosen.id,
          time_attended: new Date(Date.now()),
        });
        setAttendees((prev) => {
          return [res.data.attendance, ...prev];
        });
        console.log(res.data.attendance.date);
      } catch (e) {
        setReq_error(true);
        setTimeout(() => {
          setReq_error(false);
        }, 3000);
      }
    }
    fetchData();
  }, [chosen]);
  const getPersons = async () => {
    try {
      const res = await instance.get("/Persons");
      //   console.log(res);
      // console.log(res.data);
      setPersons(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPersons();
  }, []);
  console.log(chosen);
  const [tryToDelete, setTryToDelete] = useState(false);
  const [idToDelete, setIDToDelete] = useState(null);
  function getTime(val) {
    let date = new Date(val);
    let hour = "" + date.getHours();
    hour = hour.length == 1 ? "0" + hour : hour;
    let minute = "" + date.getMinutes();
    minute = minute.length == 1 ? "0" + minute : minute;
    let sec = "" + date.getSeconds();
    sec = sec.length == 1 ? "0" + sec : sec;
    return hour + ":" + minute + ":" + sec;
  }
  const delete_attendance = async () => {
    try {
      const res = await instance.delete(`/Meeting_Attendeds/${idToDelete}`);

      setAttendees((prev) => {
        return attendees.filter((x) => {
          return x._id != idToDelete;
        });
      });
    } catch (error) {
      console.log(error);
      setDeleting_error(true);
      setTimeout(() => {
        setDeleting_error(false);
      }, 3000);
    }
  };
  function handleError(error) {
    console.log(error);
  }
  function handleScan(data) {
    try {
      const person = persons.find((person) => {
        return person.ID == data;
      });
      setChosen({ id: person._id, name: person.name });
    } catch (error) {
      setChosen(null);
    }
  }
  return (
    <React.Fragment>
      <BarcodeReader onError={handleError} onScan={handleScan} />
      <div className={General.actions}>
        <h3> تسجيل الحضور : </h3>
        <h3 className={General.h3} onClick={props.onGoBack}>
          back
          <img
            className={General.img}
            src={back}
            onClick={props.onGoBack}
          ></img>
        </h3>
      </div>
      <div className={`${General.auto} ${classes.auto}`}>
        <div className={classes.label}> اضافة حضور :</div>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={persons.map((person) => {
            return { id: person._id, name: person.name };
          })}
          getOptionLabel={(option) => option.name}
          // getOptionSelected={(option, value) => option.id === value.id}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          sx={{ width: "50%" }}
          renderInput={(params) => (
            <TextField {...params} label="اسم الخادم"></TextField>
          )}
          value={chosen}
          onChange={(e, newVal) => {
            setChosen(newVal);
          }}
        />
      </div>
      {(req_error || deleting_error) && (
        <div className={classes["error-container"]}>
          <div className={General.error}>
            {req_error &&
              " الخادم متضافش ..  ممكن يكون متسجل ف الغياب.. وارد برضو يكون مش ف السيستم..  راجع بياناتك"}
            {deleting_error &&
              "الخادم ما اتحذفش من الغياب .. خلى بالك .. اتاكد ان السيرفر شغال"}
          </div>
        </div>
      )}
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">الاسم</th>
              <th scope="col">الرقم القومى</th>
              <th scope="col">وقت الحضور</th>
              <th scope="col">خيارات</th>
            </tr>
          </thead>
          {attendees && (
            <tbody>
              {attendees.map((attendee) => {
                return (
                  <tr key={attendee.person._id} className={classes.tr}>
                    <td>{attendee.person.name}</td>
                    <td>{attendee.person.ID}</td>
                    <td>{getTime(attendee.date)}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => {
                          setIDToDelete(attendee._id);
                          setTryToDelete(true);
                        }}
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
        {tryToDelete && (
          <Modal
            onHide={() => {
              setTryToDelete(false);
            }}
            data={{
              header: "حذف الحضور ",
              message:
                "متأكد انك عاوز تحذفه ؟ لو مش عاوز دوس علامة الغلط او برة البلوك ده :D",
              button: "أيوة",
            }}
            onOk={() => {
              delete_attendance();
              setTryToDelete(false);
            }}
          ></Modal>
        )}
      </div>
    </React.Fragment>
  );
}
