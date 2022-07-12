import General from "../../general/General.module.css";
import classes from "./ShowBasic.module.css";
import React, { useEffect, useState } from "react";
import back from "../../../assets/icons/arrow.png";
import { Autocomplete, TextField } from "@mui/material";
import instance from "../../axios";
import AddBasic from "../AddBasic";
import ShowBasicItem from "./ShowBasicItem";
export default function ShowBasic(props) {
  const [elements, setElements] = useState([]);
  const getElements = async () => {
    try {
      let res;
      switch (props.data) {
        case "teams":
          res = await instance.get("/Teams");
          break;
        case "roles":
          res = await instance.get("/Roles");
          break;
        case "status":
          res = await instance.get("/Status");
          break;
        case "edu":
          res = await instance.get("/Education_Years");
          break;
        default:
          break;
      }

      setElements(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getElements();
  }, []);
  const [chosen, setChosen] = useState(null);
  //   async function getPerson() {
  //     let person = JSON.parse(
  //       JSON.stringify(persons.find((x) => x._id === chosen.id))
  //     );
  //     // setPerson(props.person);
  //     if (person.team) {
  //       const res = await instance.get(`/Team/${person.team}`);
  //       // setPerson((prev) => {
  //       //   prev.team = res.data.name;
  //       //   return prev;
  //       // });
  //       person.team = res.data.name;
  //     }
  //     if (person.role) {
  //       const res = await instance.get(`/Role/${person.role}`);
  //       person.role = res.data.name;
  //     }
  //     if (person.status) {
  //       const res = await instance.get(`/Status/${person.status}`);
  //       person.status = res.data.name;
  //     }
  //     if (person.education_year) {
  //       const res = await instance.get(
  //         `/Education_Year/${person.education_year}`
  //       );
  //       person.education_year = res.data.name;
  //     }
  //     console.log(person);
  //     return person;
  //   }
  const [edit, setEdit] = useState(undefined);
  const dict = {
    teams: "الفريق",
    status: "الحالة",
    roles: "التخصص",
    edu: "المرحلة الدراسية",
  };
  const dict2 = {
    teams: "فريق",
    status: "حالة",
    roles: "تخصص",
    edu: "مرحلة الدراسية",
  };
  const dict3 = {
    teams: "الفرق",
    status: "الحالات",
    roles: "التخصصات",
    edu: "المراحل الدراسية",
  };
  return (
    <React.Fragment>
      {!edit && (
        <React.Fragment>
          <div className={General.actions}>
            <h3> {dict3[props.data]} المسجلة : </h3>
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
              options={elements.map((element) => {
                return { id: element._id, name: element.name };
              })}
              getOptionLabel={(option) => option.name}
              // getOptionSelected={(option, value) => option.id === value.id}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              sx={{ width: "50%" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={`اسم ${dict[props.data]}`}
                ></TextField>
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
              <ShowBasicItem
                element={
                  chosen && elements
                    ? elements.find((x) => x._id === chosen.id)
                    : null
                }
              ></ShowBasicItem>
              <div className={General.final}>
                <button
                  className={General.button}
                  disabled={false}
                  onClick={() => {
                    setEdit(true);
                  }}
                >
                  تعديل {dict[props.data]}
                </button>
              </div>
            </React.Fragment>
          )}
        </React.Fragment>
      )}
      {edit && (
        <AddBasic
          onGoBack={() => {
            setEdit(undefined);
          }}
          onEdit={async (id, name) => {
            setEdit(undefined);
            await getElements();
            if (id) setChosen({ id: id, name: name });
            else setChosen(null);
          }}
          edit={true}
          element={chosen ? elements.find((x) => x._id === chosen.id) : null}
          data={props.data}
        ></AddBasic>
      )}
    </React.Fragment>
  );
}
