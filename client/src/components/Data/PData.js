import React, { Fragment, useEffect, useState } from "react";
import AddPerson from "./AddPerson";
import classes from "./PData.module.css";
import General from "../general/General.module.css";
import back from "../../assets/icons/arrow.png";
import ShowPerson from "./ShowPerson/ShowPerson";
export default function PData(props) {
  const [chosen, setChosen] = useState(
    localStorage.getItem("PDataChosen")
      ? localStorage.getItem("PDataChosen")
      : undefined
  );
  useEffect(() => {
    if (chosen != undefined) localStorage.setItem("PDataChosen", chosen);
    else localStorage.removeItem("PDataChosen");
  }, [chosen]);
  return (
    <React.Fragment>
      {chosen == undefined && (
        <React.Fragment>
          <div className={General.actions}>
            <h3> بيانات الخدام : </h3>
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
            <div className={classes.area}>
              <button
                onClick={() => {
                  setChosen("Add");
                }}
                className={General["area-button"]}
              >
                إضافة خادم
              </button>
            </div>
            <div className={classes.area}>
              <button
                onClick={() => {
                  setChosen("Show");
                }}
                className={General["area-button"]}
              >
                عرض الخدام
              </button>
            </div>
          </div>
        </React.Fragment>
      )}
      {chosen == "Add" && (
        <AddPerson
          onGoBack={() => {
            setChosen(undefined);
          }}
        ></AddPerson>
      )}

      {chosen == "Show" && (
        <ShowPerson
          onGoBack={() => {
            setChosen(undefined);
          }}
        ></ShowPerson>
      )}
    </React.Fragment>
  );
}
