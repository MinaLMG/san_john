import classes from "./ShowPerson.module.css";
import classes2 from "../AddPerson.module.css";
import React, { useEffect, useState } from "react";
import back from "../../../assets/icons/arrow.png";
import { Autocomplete, TextField } from "@mui/material";
import instance from "../../axios";
import ShowPersonItem from "./ShowPersonItem";
import AddPerson from "../AddPerson";
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

  async function getPerson() {
    let person = JSON.parse(
      JSON.stringify(persons.find((x) => x._id === chosen.id))
    );
    // setPerson(props.person);
    if (person.team) {
      const res = await instance.get(`/Team/${person.team}`);
      // setPerson((prev) => {
      //   prev.team = res.data.name;
      //   return prev;
      // });
      person.team = res.data.name;
    }
    if (person.role) {
      const res = await instance.get(`/Role/${person.role}`);
      person.role = res.data.name;
    }
    if (person.status) {
      const res = await instance.get(`/Status/${person.status}`);
      person.status = res.data.name;
    }
    if (person.education_year) {
      const res = await instance.get(
        `/Education_Year/${person.education_year}`
      );
      person.education_year = res.data.name;
    }
    console.log(person);
    return person;
  }
  const [edit, setEdit] = useState(undefined);
  return (
    <React.Fragment>
      {!edit && (
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
            <React.Fragment>
              <ShowPersonItem
                person={
                  chosen && persons
                    ? persons.find((x) => x._id === chosen.id)
                    : null
                }
              ></ShowPersonItem>
              <div className={classes2.final}>
                <button
                  className={classes2.button}
                  disabled={false}
                  onClick={() => {
                    setEdit(true);
                  }}
                >
                  تعديل الخادم
                </button>
                {/* {addingError && (
          <span className={classes2.error}>
            فيه حاجة غلط .. راجع البيانات:D .. ممكن الاسم او الرقم القومى متكرر
          </span>
        )} */}
              </div>
            </React.Fragment>
          )}
        </React.Fragment>
      )}
      {edit && (
        <AddPerson
          onGoBack={() => {
            setEdit(undefined);
          }}
          onEdit={async (id, name) => {
            setEdit(undefined);
            await getPersons();
            if (id) setChosen({ id: id, name: name });
            else setChosen(null);
          }}
          edit={true}
          person={chosen ? persons.find((x) => x._id === chosen.id) : null}
        ></AddPerson>
      )}
    </React.Fragment>
  );
}
