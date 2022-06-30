import { Fragment, useState } from "react";
import AddPerson from "./AddPerson";
import classes from "./PData.module.css";
import ShowPerson from "./ShowPerson/ShowPerson";
export default function PData(props) {
  const [chosen, setChosen] = useState("Show");
  return (
    <div className="container-width">
      {chosen == undefined && (
        <div className={classes.options}>
          <button onClick={props.onGoBack}> back</button>
          <button
            onClick={() => {
              setChosen("Add");
            }}
          >
            اضافة خادم
          </button>
          <button
            onClick={() => {
              setChosen("Show");
            }}
          >
            عرض الخدام
          </button>
        </div>
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
