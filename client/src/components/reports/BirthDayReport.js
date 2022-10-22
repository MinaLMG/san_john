import React, { Fragment, useRef, useState } from "react";
import General from "../general/General.module.css";
import back from "../../assets/icons/arrow.png";
import classes from "./BirthDayReport.module.css";
import PrettySelect from "../general/PrettySelect";
import Report from "./Report";
import ReactToPrint from "react-to-print";

export default function BirthDayReport(props) {
  const componentRef = useRef();
  const [birth_month_chosen, setBirth_month_chosen] = useState(
    new Date(Date.now()).getMonth()
  );
  const [birth_month_chosen_to_show, setBirth_month_chosen_to_show] =
    useState(undefined);

  const [showReport, setShowReport] = useState(false);
  const [perPage, setPerPage] = useState(1);
  const perTable = 42;
  const [personsToReport, setPersonsToReport] = useState([]);
  return (
    <Fragment>
      <div className={General.actions}>
        <h3>تقرير بأعياد الميلاد :</h3>
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
        <div className={General["data-element"]}>
          <div className={General["element-container"]}>
            <PrettySelect
              data={{
                0: 1,
                1: 2,
                2: 3,
                3: 4,
                4: 5,
                5: 6,
                6: 7,
                7: 8,
                8: 9,
                9: 10,
                10: 11,
                11: 12,
              }}
              option="الشهر"
              onChange={(month) => {
                setBirth_month_chosen(month);
              }}
              chosen={birth_month_chosen}
            ></PrettySelect>
          </div>
        </div>
      </form>
      <div className={General.final}>
        <button
          className={General.button}
          disabled={birth_month_chosen == undefined}
          onClick={() => {
            setPersonsToReport(() => {
              let temp = [];
              props.persons.map((person) => {
                let date = new Date(person.birth_date);
                if (date.getMonth() == birth_month_chosen) {
                  temp.push(person);
                }
              });
              return temp;
            });
            setShowReport(true);
            setBirth_month_chosen_to_show(birth_month_chosen);
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
                      headerContent={`تقرير أعياد ميلاد شهر ${
                        birth_month_chosen_to_show - -1
                      }`}
                      people={personsToReport.slice(
                        index,
                        index + perPage * perTable
                      )}
                      roles={props.rolesDict}
                      teams={props.teamsDict}
                      status={props.StatusDict}
                      education_years={props.education_yearsDict}
                      showName={true}
                      showPhone_number={true}
                      showFather={false}
                      showTeam={true}
                      showRole={true}
                      showEducation_year={true}
                      showStatus={true}
                      showBirth_date={true}
                      perPage={perPage}
                      changePerPage={(val) => {
                        setPerPage(val);
                      }}
                      perTable={perTable}
                      last={
                        perPage * perTable * (index + 1) >
                        personsToReport.length
                      }
                      total={personsToReport.length}
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
