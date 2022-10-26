import { Fragment, useState } from "react";
import General from "../general/General.module.css";
import back from "../../assets/icons/arrow.png";
import classes from "./BasicChosen.module.css";
import AddBasic from "./AddBasic";
import ShowBasic from "./ShowBasic/ShowBasic";
export default function BasicChosen(props) {
  const [chosen, setChosen] = useState(undefined);
  const dict = {
    edu: "المراحل الدراسية",
    status: "الحالة",
    roles: "التخصصات",
    teams: "الفرق",
    speakers: "المتكلمين",
    meeting_types: "انواع الاجتماعات",
    users: "المستخدمين",
  };
  const dict2 = {
    edu: "مرحلة دراسية",
    status: "حالة",
    roles: "تخصص",
    teams: "فريق",
    speakers: "متكلم",
    meeting_types: "نوع اجتماع",
    users: "مستخدم",
  };
  return (
    <Fragment>
      {chosen == undefined && (
        <Fragment>
          <div className={General.actions}>
            <h3>خيارات {dict[props.data]} : </h3>
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
                إضافة {dict2[props.data]}
              </button>
            </div>
            <div className={classes.area}>
              <button
                onClick={() => {
                  setChosen("Show");
                }}
                className={General["area-button"]}
              >
                عرض {dict2[props.data]}
              </button>
            </div>
          </div>
        </Fragment>
      )}
      {chosen == "Add" && (
        <AddBasic
          onGoBack={() => {
            setChosen(undefined);
          }}
          data={props.data}
        ></AddBasic>
      )}

      {chosen == "Show" && (
        <ShowBasic
          onGoBack={() => {
            setChosen(undefined);
          }}
          data={props.data}
        ></ShowBasic>
      )}
    </Fragment>
  );
}
