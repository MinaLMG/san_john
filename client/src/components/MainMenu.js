import React from "react";
import { useState } from "react";
import classes from "./MainMenu.module.css";
import PData from "./Data/PData";
import Attendance from "./Attendance/Attendance";
import Reports from "./reports/Reports";
import Basic from "./Basic/Basic";
import MainMenuItem from "./MainMenuItem";
import logo from "../assets/logo.jpeg";
export default function MainMenu() {
  const [chosen, setChosen] = useState("data");
  function changeChosen(val) {
    setChosen(val);
  }
  return (
    <div className={classes.backgroud}>
      <header className={classes.header}>
        <h1 className={classes.title}>خدمة القديس حبيب جرجس</h1>
        <img src={logo} className={classes.image}></img>
      </header>
      {chosen == undefined && (
        <div className=" container-width">
          <MainMenuItem
            onClick={() => {
              changeChosen("data");
            }}
            buttonContent={"بيانات الخدام"}
          ></MainMenuItem>
          <MainMenuItem
            onClick={() => {
              changeChosen("attendance");
            }}
            buttonContent={"الغياب / الحضور"}
          ></MainMenuItem>
          <MainMenuItem
            onClick={() => {
              changeChosen("reports");
            }}
            buttonContent={"التقارير"}
          ></MainMenuItem>
          <MainMenuItem
            onClick={() => {
              changeChosen("basic");
            }}
            buttonContent={"قاعدة البيانات (not recommended)"}
          ></MainMenuItem>
        </div>
      )}
      {chosen == "data" && (
        <PData
          onGoBack={() => {
            changeChosen(undefined);
          }}
        ></PData>
      )}
      {chosen == "attendance" && (
        <Attendance
          onGoBack={() => {
            changeChosen(undefined);
          }}
        ></Attendance>
      )}
      {chosen == "reports" && (
        <Reports
          onGoBack={() => {
            changeChosen(undefined);
          }}
        ></Reports>
      )}
      {chosen == "basic" && (
        <Basic
          onGoBack={() => {
            changeChosen(undefined);
          }}
        ></Basic>
      )}
    </div>
  );
}
