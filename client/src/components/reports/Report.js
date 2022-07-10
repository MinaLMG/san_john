import classes from "./Report.module.css";
import photo from "../../assets/logo.jpeg";
import { useEffect, useRef, useState } from "react";
export default function Report(props) {
  const [teams, setTeams] = useState(props.teams);
  const [roles, setRoles] = useState(props.roles);
  const [status, setStatus] = useState(props.status);
  const [education_years, setEducation_years] = useState(props.education_years);
  function getCurrentDate() {
    const date = new Date(Date.now());
    return (
      date.getDate() +
      "/" +
      (1 + date.getMonth()) +
      "/" +
      date.getFullYear() +
      " " +
      (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
      ":" +
      (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
      ":" +
      (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds())
    );
  }
  function getDate(val) {
    let date = new Date(val);
    let year =
      date.getFullYear() < 10 ? "0" + date.getFullYear() : date.getFullYear();
    let month =
      date.getMonth() + 1 < 10
        ? "0" + (1 + date.getMonth())
        : date.getMonth() + 1;
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    return day + "/" + month + "/" + year;
  }
  const [perPage, setPerPage] = useState(props.perPage);
  useEffect(() => {
    setPerPage(props.perPage);
  }, [props.perPage]);
  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      let cm = 37.795275591;
      let cms = ref.current.offsetWidth / cm;
      let floored = Math.floor((0.95 * 28) / cms);
      // setPerPage(floored);
      props.changePerPage(floored);
    }
  }, [
    ref.current && ref.current.offsetWidth,
    // props.perPage,
    // props.showBirth_date,
    // props.showEducation_year,
    // props.showFather,
    // props.showName,
    // props.showPhone_number,
    // props.showRole,
    // props.showStatus,
    // props.showTeam,
  ]);
  return (
    <div className={classes.report}>
      <header className={classes.header}>
        <img src={photo} className={classes["header-image"]}></img>
        <div className={classes["header-content"]}>{props.headerContent}</div>
        <div className={classes["header-date"]}>{getCurrentDate()}</div>
      </header>
      <div className={classes.body}>
        {perPage &&
          [...Array(perPage).keys()].map((index) => {
            let tablePersons = props.people.slice(
              index * props.perTable,
              (index + 1) * props.perTable
            );
            return (
              <div
                className={classes["table-container"]}
                style={{ width: 100 / perPage + "%" }}
                key={index}
              >
                {tablePersons.length != 0 && perPage ? (
                  <table
                    className={classes.table}
                    ref={index == 0 && props.current == 1 ? ref : undefined}
                  >
                    <thead>
                      <tr>
                        {props.showName && <th>الاسم</th>}
                        {props.showPhone_number && <th>رقم التليفون</th>}
                        {props.showFather && <th>اب الاعتراف</th>}
                        {props.showBirth_date && <th>تاريخ الميلاد</th>}
                        {props.showTeam && <th>الفرقة</th>}
                        {props.showRole && <th>التخصص</th>}
                        {props.showStatus && <th>حالة الخدمة</th>}
                        {props.showEducation_year && <th>المرحلة الدراسية</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {(teams || roles || status || education_years || true) &&
                        tablePersons.map((person, index) => {
                          return (
                            <tr key={person._id}>
                              {/*key={person._id}-->*/}
                              {props.showName && <td>{person.name}</td>}
                              {props.showPhone_number && (
                                <td>{person.phone_number}</td>
                              )}
                              {props.showFather && <td>{person.father}</td>}
                              {props.showBirth_date && (
                                <td>
                                  {person.birth_date
                                    ? getDate(person.birth_date)
                                    : ""}
                                </td>
                              )}
                              {props.showTeam && (
                                <td>{person.team ? teams[person.team] : ""}</td>
                              )}
                              {props.showRole && (
                                <td>{person.role ? roles[person.role] : ""}</td>
                              )}
                              {props.showStatus && (
                                <td>
                                  {person.status ? status[person.status] : ""}
                                </td>
                              )}
                              {props.showEducation_year && (
                                <td>
                                  {person.education_year
                                    ? education_years[person.education_year]
                                    : ""}
                                </td>
                              )}
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                ) : (
                  ""
                )}
              </div>
            );
          })}
      </div>
      <footer className={classes.footer}>
        {props.current} / {props.all}
      </footer>
    </div>
  );
}
