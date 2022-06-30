import classes from "./ShowPerson.module.css";
import classes2 from "../AddPerson.module.css";
import React, { useEffect, useState } from "react";
import back from "../../../assets/icons/arrow.png";
import { Autocomplete, TextField } from "@mui/material";
import instance from "../../axios";
import ShowPersonItem from "./ShowPersonItem";
export default function ShowPerson(props) {
  const [persons, setPersons] = useState([]);
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
  const [chosen, setChosen] = useState(null);
  console.log(chosen);
  return (
    <React.Fragment>
      <div className={classes2.actions}>
        <h3> الخدام المسجلون : </h3>
        <h3 className={classes2.h3} onClick={props.onGoBack}>
          back
          <img
            className={classes2.img}
            src={back}
            onClick={props.onGoBack}
          ></img>
        </h3>
      </div>
      <div className={classes.auto}>
        {/* <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={persons.map((person) => {
            return person.name;
          })}
          sx={{ width: "50%" }}
          renderInput={(params) => (
            <TextField {...params} label="اسم الخادم" sep></TextField>
          )}
          value={chosen}
          onChange={(e, newVal) => {
            setChosen(newVal);
          }}
        /> */}
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
      {/* <MuiAutoComplete options={["ko", "mo", "do", "va"]}></MuiAutoComplete> */}
      {/* <Auto
        data={[
          { id: 1, name: "ko" },
          { id: 2, name: "me" },
          { id: 3, name: "go" },
          { id: 4, name: "di" },
        ]}
      ></Auto> */}
      {chosen != null && (
        <ShowPersonItem
          person={persons.find((x) => x._id === chosen.id)}
        ></ShowPersonItem>
      )}
    </React.Fragment>
  );
}
