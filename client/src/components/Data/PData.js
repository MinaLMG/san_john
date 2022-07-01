import React, { Fragment, useState } from "react";
import AddPerson from "./AddPerson";
import classes from "./PData.module.css";
import classes1 from "../MainMenuItem.module.css";
import classes2 from "./AddPerson.module.css";
import back from "../../assets/icons/arrow.png";
import ShowPerson from "./ShowPerson/ShowPerson";
export default function PData(props) {
  const [chosen, setChosen] = useState(undefined);
  return (
    <div className="container-width">
      {chosen == undefined && (
        <React.Fragment>
          <div className={classes2.actions}>
            <h3> بيانات الخدام : </h3>
            <h3 className={classes2.h3} onClick={props.onGoBack}>
              back
              <img
                className={classes2.img}
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
                className={classes1.button}
              >
                اضافة خادم
              </button>
            </div>
            <div className={classes.area}>
              <button
                onClick={() => {
                  setChosen("Show");
                }}
                className={classes1.button}
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
    </div>
  );
}
