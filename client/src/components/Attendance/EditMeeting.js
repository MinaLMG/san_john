import React, { useEffect, useState } from "react";
import classes from "./EditMeeting.module.css";
import General from "../general/General.module.css";
import back from "../../assets/icons/arrow.png";
import instance from "../axios";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import AddMeeting from "./AddMeeting";
export default function EditMeeting(props) {
  const [meetings, setMeetings] = useState([]);
  const getMeetings = async () => {
    try {
      const res = await instance.get("/Meetings");
      setMeetings(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const [meeting_types, setMeeting_types] = useState([]);
  const [meeting_types_M, setMeeting_types_M] = useState([]);

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

  useEffect(() => {
    getMeetings();
    getMeeting_Types();
  }, []);
  const [chosen, setChosen] = useState(null);
  console.log("chosen", chosen);
  function getDate(val) {
    let date = new Date(val);
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    return day + "/" + (month + 1) + "/" + year;
  }
  return (
    <React.Fragment>
      {chosen == null && (
        <React.Fragment>
          <div className={General.actions}>
            <h3> تعديل اجتماع موجود بالفعل : </h3>
            <h3 className={General.h3} onClick={props.onGoBack}>
              back
              <img
                className={General.img}
                src={back}
                onClick={props.onGoBack}
              ></img>
            </h3>
          </div>
          <div className={General.auto}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={meetings.map((meeting) => {
                return {
                  id: meeting._id,
                  date: getDate(meeting.date),
                  meeting_type: meeting_types_M[meeting.meeting_type],
                };
              })}
              getOptionLabel={(option) =>
                option.date +
                " " +
                (option.meeting_type ? option.meeting_type : "")
              }
              isOptionEqualToValue={(option, value) => option.id === value.id}
              sx={{ width: "50%" }}
              renderInput={(params) => (
                <TextField {...params} label="تاريخ الاجتماع"></TextField>
              )}
              value={chosen}
              onChange={(e, newVal) => {
                setChosen(newVal);
              }}
            />
          </div>
        </React.Fragment>
      )}
      {chosen && (
        <AddMeeting
          onGoBack={() => {
            props.onGoBack();
          }}
          edit={true}
          meeting={chosen ? meetings.find((x) => x._id === chosen.id) : null}
          onEdit={async (id, date) => {
            setChosen(null);
            await getMeetings();
            // if (id) setChosen({ id: id, date: date });
            // else setChosen(null);
          }}
        ></AddMeeting>
      )}
    </React.Fragment>
  );
}
