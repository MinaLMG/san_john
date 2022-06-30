import React, { useState } from "react";
import classes from "./DateGet.module.css";
export default function DateGet(props) {
  const [years, setYears] = useState(
    [...Array(100).keys()].map((year) => {
      return year + 1970;
    })
  );
  const [c_year, setC_year] = useState(undefined);
  function yearChangeHandler(e) {
    let temp = +e.target.value;
    setC_year(temp);
    if (c_day && c_month) {
      if (temp % 4 !== 0 && c_month == 2 && c_day == 29) {
        props.onChange(new Date(temp, c_month - 1, 1, 3));
      } else {
        props.onChange(new Date(temp, c_month - 1, c_day, 3));
      }
    } else props.onChange(undefined);
  }
  /********************* */
  const [months, setMonths] = useState(
    [...Array(12).keys()].map((month) => {
      return month + 1;
    })
  );
  const [c_month, setC_month] = useState(undefined);
  function monthChangeHandler(e) {
    let temp = +e.target.value;
    setC_month(temp);
    if (c_day && c_year) {
      if ([1, 3, 5, 7, 8, 10, 12].includes(temp)) {
        props.onChange(new Date(c_year, temp - 1, c_day, 3));
      } else if ([4, 6, 9, 11].includes(temp) && c_day >= 31)
        props.onChange(new Date(c_year, temp - 1, 1, 3));
      else if (temp == 2 && c_year % 4 == 0 && c_day >= 30) {
        props.onChange(new Date(c_year, temp - 1, 1, 3));
      } else if (temp == 2 && c_year % 4 !== 0 && c_day >= 29) {
        props.onChange(new Date(c_year, temp - 1, 1, 3));
      }
    } else props.onChange(undefined);
  }
  /********************* */
  const [days, setDays] = useState(
    [...Array(31).keys()].map((day) => {
      return day + 1;
    })
  );
  const [c_day, setC_day] = useState(undefined);
  function dayChangeHandler(e) {
    let temp = +e.target.value;
    setC_day(+e.target.value);
    if (c_month && c_year)
      props.onChange(new Date(c_year, c_month - 1, temp, 3));
    else props.onChange(undefined);
  }
  function dateReset() {
    setC_day(undefined);
    setC_month(undefined);
    setC_year(undefined);
    props.onChange(undefined);
  }
  return (
    <div className={classes.container}>
      <div className={classes.reset} onClick={dateReset}></div>

      <select
        className={classes.select}
        onChange={yearChangeHandler}
        selected={c_year}
      >
        <option disabled={true} selected={c_year === undefined}>
          year
        </option>
        {years.map((year) => {
          return <option value={year}>{year}</option>;
        })}
      </select>

      <select
        className={classes.select}
        selected={c_month}
        onChange={monthChangeHandler}
      >
        <option disabled={true} selected={c_month === undefined}>
          month
        </option>
        {months.map((month) => {
          return <option value={month}>{month}</option>;
        })}
      </select>
      <select
        className={classes.select}
        onChange={dayChangeHandler}
        selected={c_day}
      >
        <option disabled={true} selected={c_day === undefined}>
          day
        </option>
        ;
        {c_month &&
          days.map((day) => {
            {
              if (
                [1, 3, 5, 7, 8, 10, 12].includes(c_month) ||
                ([4, 6, 9, 11].includes(c_month) && day < 31) ||
                ([2].includes(c_month) && c_year % 4 == 0 && day < 30) ||
                ([2].includes(c_month) && c_year % 4 !== 0 && day < 29)
              )
                return <option value={day}>{day}</option>;
            }
          })}
      </select>
    </div>
  );
}
