import classes from "./ServantsReport.module.css";
import General from "../general/General.module.css";
import React, { Fragment, useEffect, useRef, useState } from "react";
import back from "../../assets/icons/arrow.png";
import PrettySelect from "../general/PrettySelect";
import Report from "./Report";
import ReactToPrint from "react-to-print";
import CheckListItem from "../general/CheckListItem";
export default function ServantsReport(props) {
  const componentRef = useRef();
  const [teamChosen, setTeamChosen] = useState(undefined);
  const [teamChosenToView, setTeamChosenToView] = useState(undefined);
  const [statusChosen, setStatusChosen] = useState(undefined);
  const [statusChosenToView, setStatusChosenToView] = useState(undefined);
  const [roleChosen, setRoleChosen] = useState(undefined);
  const [roleChosenToView, setRoleChosenToView] = useState(undefined);
  const [education_yearChosen, setEducation_yearChosen] = useState(undefined);
  const [education_yearChosenToView, setEducation_yearChosenToView] =
    useState(undefined);
  const [teams, setTeams] = useState(props.teams);
  const [teams_M, setTeams_M] = useState({});
  useEffect(() => {
    let obj = {};
    for (let i = 0; i < teams.length; i++) {
      obj[teams[i]._id] = teams[i].name;
    }
    setTeams_M(obj);
  }, [teams]);
  const [status, setStatus] = useState(props.Status);
  const [status_M, setStatus_M] = useState({});
  useEffect(() => {
    let obj = {};
    for (let i = 0; i < status.length; i++) {
      obj[status[i]._id] = status[i].name;
    }
    setStatus_M(obj);
  }, [status]);
  const [roles, setRoles] = useState(props.roles);
  const [roles_M, setRoles__M] = useState({});
  useEffect(() => {
    let obj = {};
    for (let i = 0; i < roles.length; i++) {
      obj[roles[i]._id] = roles[i].name;
    }
    setRoles__M(obj);
  }, [roles]);
  const [education_years, setEducation_years] = useState(props.education_years);
  const [education_years_M, setEducation_years_M] = useState({});
  useEffect(() => {
    let obj = {};
    for (let i = 0; i < education_years.length; i++) {
      obj[education_years[i]._id] = education_years[i].name;
    }
    setEducation_years_M(obj);
  }, [education_years]);
  //   const [options, setOptions] = useState({
  //     name: true,
  //     phone_number: true,
  //     father: true,
  //     birth_date: true,
  //     team: true,
  //     role: true,
  //     status: true,
  //     education_year: true,
  //   });
  const [showName, setShowName] = useState(true);
  const [showPhone_number, setShowPhone_number] = useState(true);
  const [showFather, setShowFather] = useState(true);
  const [showBirth_date, setShowBirth_date] = useState(true);
  const [showTeam, setShowTeam] = useState(true);
  const [showRole, setShowRole] = useState(true);
  const [showStatus, setShowStatus] = useState(true);
  const [showEducation_year, setShowEducation_year] = useState(true);
  //   useEffect(() => {
  //     setPerPage(1);
  //     setUpdate((prev) => prev + 1);
  //   }, [
  //     showBirth_date,
  //     showEducation_year,
  //     showFather,
  //     showName,
  //     showPhone_number,
  //     showRole,
  //     showStatus,
  //     showTeam,
  //   ]);
  const [update, setUpdate] = useState(1);
  const [personsToReport, setPersonsToReport] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const [perPage, setPerPage] = useState(1);
  const perTable = 42;
  //   console.log("per page ", perPage);
  return (
    <Fragment>
      <div className={General.actions}>
        <h3> تقارير الخدام:</h3>
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
        <div className={classes.note}>
          لو عاوز كل الخدام ممكن ما تحددش حاجة :D
        </div>
        <div className={General["data-element"]}>
          <div className={General["element-container"]}>
            <PrettySelect
              data={status_M}
              option="الحالة"
              onChange={(status) => {
                setStatusChosen(status);
              }}
              chosen={statusChosen}
            ></PrettySelect>
          </div>
        </div>
        <div className={General["data-element"]}>
          <div className={General["element-container"]}>
            <PrettySelect
              data={teams_M}
              option="الفرقة"
              onChange={(team) => {
                setTeamChosen(team);
              }}
              chosen={teamChosen}
            ></PrettySelect>
          </div>
        </div>
        <div className={General["data-element"]}>
          <div className={General["element-container"]}>
            <PrettySelect
              data={roles_M}
              option="الدور"
              onChange={(role) => {
                setRoleChosen(role);
              }}
              chosen={roleChosen}
            ></PrettySelect>
          </div>
        </div>
        <div className={General["data-element"]}>
          <div className={General["element-container"]}>
            <PrettySelect
              data={education_years_M}
              option="المرحلة الدراسية"
              onChange={(edu) => {
                setEducation_yearChosen(edu);
              }}
              chosen={education_yearChosen}
            ></PrettySelect>
          </div>
        </div>
        <div className={classes.note}>
          اختار الصفوف اللى عاوزها ف التقرير جنب الاسم :D ( ال pdf بيتحدث اول ما
          تدوس )
        </div>
        <div className={General["data-element-small"]}>
          <CheckListItem
            content={"الاسم"}
            value={showName}
            onChange={() => {}}
            //   onChange={(val) => {
            //     setOptions((prev) => {
            //       prev.name = val;
            //       return prev;
            //     });
            //     setUpdate((prev) => prev + 1);
            //   }}
          ></CheckListItem>
        </div>
        <div className={General["data-element-small"]}>
          <CheckListItem
            content={"رقم الموبايل"}
            value={showPhone_number}
            onChange={(val) => {
              setShowPhone_number(val);
              setPerPage(1);

              // setUpdate((prev) => prev + 1);
            }}
          ></CheckListItem>
        </div>
        <div className={General["data-element-small"]}>
          <CheckListItem
            content={"اب الاعتراف"}
            value={showFather}
            onChange={(val) => {
              setShowFather(val);
              setPerPage(1);

              // setUpdate((prev) => prev + 1);
            }}
          ></CheckListItem>
        </div>
        <div className={General["data-element-small"]}>
          <CheckListItem
            content={"تاريخ الميلاد"}
            value={showBirth_date}
            onChange={(val) => {
              setShowBirth_date(val);
              setPerPage(1);

              //   setUpdate((prev) => prev + 1);
            }}
          ></CheckListItem>
        </div>
        <div className={General["data-element-small"]}>
          <CheckListItem
            content={"الفرقة"}
            value={showTeam}
            onChange={(val) => {
              setShowTeam(val);
              setPerPage(1);

              //   setUpdate((prev) => prev + 1);
            }}
          ></CheckListItem>
        </div>
        <div className={General["data-element-small"]}>
          <CheckListItem
            content={"التخصص"}
            value={showRole}
            onChange={(val) => {
              setShowRole(val);
              setPerPage(1);

              // setUpdate((prev) => prev + 1);
            }}
          ></CheckListItem>
        </div>
        <div className={General["data-element-small"]}>
          <CheckListItem
            content={"حالة الخدمة"}
            value={showStatus}
            onChange={(val) => {
              setShowStatus(val);
              setPerPage(1);

              //   setUpdate((prev) => prev + 1);
            }}
          ></CheckListItem>
        </div>
        <div className={General["data-element-small"]}>
          <CheckListItem
            content={"المرحلة الدراسية"}
            value={showEducation_year}
            onChange={(val) => {
              setShowEducation_year(val);
              setPerPage(1);

              //   setUpdate((prev) => prev + 1);
            }}
          ></CheckListItem>
        </div>
      </form>
      <div className={General.final}>
        <button
          className={General.button}
          disabled={false}
          onClick={() => {
            setPersonsToReport(() => {
              let temp = JSON.parse(JSON.stringify(props.persons));
              if (teamChosen != undefined) {
                let temp2 = [];
                temp.map((person) => {
                  if (person.team == teamChosen) temp2.push(person);
                });
                temp = temp2;
              }
              if (roleChosen != undefined) {
                let temp2 = [];
                temp.map((person) => {
                  if (person.role == roleChosen) temp2.push(person);
                });
                temp = temp2;
              }
              if (statusChosen != undefined) {
                let temp2 = [];
                temp.map((person) => {
                  if (person.status == statusChosen) temp2.push(person);
                });
                temp = temp2;
              }
              if (education_yearChosen != undefined) {
                let temp2 = [];
                temp.map((person) => {
                  if (person.education_year == education_yearChosen)
                    temp2.push(person);
                });
                temp = temp2;
              }
              return temp;
            });
            setShowReport(true);
            setRoleChosenToView(props.rolesDict[roleChosen]);
            setEducation_yearChosenToView(
              props.education_yearsDict[education_yearChosen]
            );
            setTeamChosenToView(props.teamsDict[teamChosen]);
            setStatusChosenToView(props.StatusDict[statusChosen]);
          }}
        >
          انشاء تقرير
        </button>
      </div>
      {showReport && (
        <React.Fragment>
          <ReactToPrint
            trigger={() => (
              <button className={General["print-button"]}>طباعة التقرير</button>
            )}
            content={() => componentRef.current}
            pageStyle={`

            @media print {
              .pagebreak {
                page-break-before: always;
              }
              .PrintSection{
                direction: rtl !important;
              }
            }
          `}
          />
          <div ref={componentRef} className="PrintSection">
            {showReport &&
              perPage &&
              update &&
              personsToReport.map((person, index) => {
                return index % (perPage * perTable) == 0 ? (
                  <React.Fragment key={index}>
                    <div className="page-break"> </div>
                    <Report
                      key={index}
                      current={index / (perPage * perTable) + 1}
                      all={Math.ceil(
                        (personsToReport.length + 1) / (perPage * perTable)
                      )}
                      headerContent={` تقرير خدام ${
                        roleChosenToView ||
                        education_yearChosenToView ||
                        teamChosenToView ||
                        statusChosenToView
                          ? "("
                          : "أسرة القديس حبيب جرجس"
                      }${roleChosenToView ? roleChosenToView + " " : ""}${
                        education_yearChosenToView
                          ? education_yearChosenToView + " "
                          : ""
                      }${teamChosenToView ? teamChosenToView + " " : ""}${
                        statusChosenToView ? statusChosenToView + " " : ""
                      }${
                        roleChosenToView ||
                        education_yearChosenToView ||
                        teamChosenToView ||
                        statusChosenToView
                          ? ")"
                          : ""
                      }`}
                      people={personsToReport.slice(
                        index,
                        index + perPage * perTable
                      )}
                      roles={props.rolesDict}
                      teams={props.teamsDict}
                      status={props.StatusDict}
                      education_years={props.education_yearsDict}
                      showName={showName}
                      showPhone_number={showPhone_number}
                      showFather={showFather}
                      showTeam={showTeam}
                      showRole={showRole}
                      showEducation_year={showEducation_year}
                      showStatus={showStatus}
                      showBirth_date={showBirth_date}
                      perPage={perPage}
                      changePerPage={(val) => {
                        setPerPage(val);
                      }}
                      perTable={perTable}
                    ></Report>
                  </React.Fragment>
                ) : (
                  ""
                );
              })}
          </div>
        </React.Fragment>
      )}
    </Fragment>
  );
}
