import React, { Fragment, useEffect, useRef, useState } from "react";
import General from "../general/General.module.css";
import back from "../../assets/icons/arrow.png";
import Report from "./Report";
import ReactToPrint from "react-to-print";
import classes from "./Reports.module.css";
import instance from "../axios";
import ReportsItem from "./ReportsItem";
import BirthDayReport from "./BirthDayReport";
import ServantsReport from "./ServantsReport";
export default function Reports(props) {
  const componentRef = useRef();
  const pageStyle = `

  @media print {
    .pagebreak {
      page-break-before: always;
    }
    .PrintSection{
      direction: rtl !important;
    }
  }
`;
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
  const [personsToReport, setPersonsToReport] = useState([]);

  const [teams, setTeams] = useState([]);
  const [teamsDict, setTeamsDict] = useState({});

  const getTeams = async () => {
    try {
      const res = await instance.get("/Teams");
      //   console.log(res);
      console.log(res.data);
      setTeams(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [roles, setRoles] = useState([]);
  const [rolesDict, setRolesDict] = useState({});
  const getRoles = async () => {
    try {
      const res = await instance.get("/Roles");
      //   console.log(res);
      console.log(res.data);
      setRoles(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [Status, setStatus] = useState([]);
  const [StatusDict, setStatusDict] = useState({});

  const getStatus = async () => {
    try {
      const res = await instance.get("/Status");
      //   console.log(res);
      console.log(res.data);
      setStatus(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [education_years, setEducation_years] = useState([]);
  const [education_yearsDict, setEducation_yearsDict] = useState({});

  const getEducation_years = async () => {
    try {
      const res = await instance.get("/Education_Years");
      //   console.log(res);
      console.log(res.data);
      setEducation_years(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const [update, setUpdate] = useState(1);
  useEffect(() => {
    getPersons();
    getTeams();
    getRoles();
    getStatus();

    getEducation_years();
  }, []);
  useEffect(() => {
    teams.map((team) => {
      setTeamsDict((prev) => {
        prev[team._id] = team.name;
        return prev;
      });
    });
  }, [teams]);
  useEffect(() => {
    roles.map((role) => {
      setRolesDict((prev) => {
        prev[role._id] = role.name;
        return prev;
      });
    });
  }, [roles]);
  useEffect(() => {
    Status.map((status) => {
      setStatusDict((prev) => {
        prev[status._id] = status.name;
        return prev;
      });
    });
  }, [Status]);
  useEffect(() => {
    education_years.map((edu) => {
      setEducation_yearsDict((prev) => {
        prev[edu._id] = edu.name;
        return prev;
      });
      setUpdate((prev) => prev + 1);
    });
  }, [education_years]);
  const perTable = 42;
  const [perPage, setPerPage] = useState(1);

  const [showReport, setShowReport] = useState(false);
  const [chosen, setChosen] = useState(undefined);
  return (
    <Fragment>
      {chosen == undefined && (
        <Fragment>
          <div className={General.actions}>
            <h3>التقارير : </h3>
            <h3 className={General.h3} onClick={props.onGoBack}>
              back
              <img
                className={General.img}
                src={back}
                onClick={props.onGoBack}
              ></img>
            </h3>
          </div>
          <ReportsItem
            onClick={() => {
              setChosen("birthday");
            }}
            buttonContent={"أعياد الميلاد"}
          ></ReportsItem>
          <ReportsItem
            onClick={() => {
              setChosen("servants");
            }}
            buttonContent={"تقارير الخدام"}
          ></ReportsItem>
          <ReportsItem
            onClick={() => {
              setChosen(undefined);
              setChosen("meetings");
            }}
            buttonContent={"تقارير ( حضور/غياب ) اجتماعات"}
          ></ReportsItem>
        </Fragment>
      )}
      {chosen == "birthday" && (
        <BirthDayReport
          onGoBack={() => {
            setChosen(undefined);
          }}
          rolesDict={rolesDict}
          teamsDict={teamsDict}
          StatusDict={StatusDict}
          education_yearsDict={education_yearsDict}
          persons={persons}
        ></BirthDayReport>
      )}
      {chosen == "servants" && (
        <ServantsReport
          onGoBack={() => {
            setChosen(undefined);
          }}
          rolesDict={rolesDict}
          teamsDict={teamsDict}
          StatusDict={StatusDict}
          education_yearsDict={education_yearsDict}
          persons={persons}
          Status={Status}
          teams={teams}
          roles={roles}
          education_years={education_years}
        ></ServantsReport>
      )}
      {chosen == "meetings" && (
        <ServantsReport
          onGoBack={() => {
            setChosen(undefined);
          }}
          rolesDict={rolesDict}
          teamsDict={teamsDict}
          StatusDict={StatusDict}
          education_yearsDict={education_yearsDict}
          persons={persons}
          Status={Status}
          teams={teams}
          roles={roles}
          education_years={education_years}
          meetings={true}
        ></ServantsReport>
      )}

      {/* {false && (
        <React.Fragment>
          <ReactToPrint
            trigger={() => (
              <button className={classes["print-button"]}>طباعة التقرير</button>
            )}
            content={() => componentRef.current}
            pageStyle={pageStyle}
          />
          <div ref={componentRef} className="PrintSection">
            {update &&
              personsToReport.map((person, index) => {
                <React.Fragment key={index}>
                  {index % (perPage * perTable) == 0 && (
                    <Fragment>
                      <div className="page-break"> </div>
                      <Report
                        current={index / (perPage * perTable) + 1}
                        all={Math.ceil(
                          (persons.length + 1) / (perPage * perTable)
                        )}
                        headerContent={"خدام اسرة حبيب جرجس"}
                        people={personsToReport.slice(
                          index,
                          index + perPage * perTable
                        )}
                        roles={rolesDict}
                        teams={teamsDict}
                        status={StatusDict}
                        education_years={education_yearsDict}
                        showName={true}
                        showPhone_number={true}
                        showBapitization_father={true}
                        showTeam={true}
                        showRole={true}
                        showEducation_year={true}
                        showStatus={true}
                        showBirth_date={false}
                        perPage={perPage}
                        perTable={perTable}
                      ></Report>
                    </Fragment>
                  )}
                </React.Fragment>;
              })}
          </div>
        </React.Fragment>
      )} */}
    </Fragment>
  );
}
