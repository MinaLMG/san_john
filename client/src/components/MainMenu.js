import React, { useEffect } from "react";
import { useState } from "react";
import classes from "./MainMenu.module.css";
import PData from "./Data/PData";
import Attendance from "./Attendance/Attendance";
import Reports from "./reports/Reports";
import Basic from "./Basic/Basic";
import MainMenuItem from "./MainMenuItem";
import logo from "../assets/logo New.png";
import Login from "./Login/Login";
import logout from "../assets/icons/logout.png";
export default function MainMenu() {
  const [chosen, setChosen] = useState(
    localStorage.getItem("MainMenuChosen")
      ? localStorage.getItem("MainMenuChosen")
      : undefined
  );
  function changeChosen(val) {
    setChosen(val);
  }
  useEffect(() => {
    if (chosen != undefined) localStorage.setItem("MainMenuChosen", chosen);
    else localStorage.removeItem("MainMenuChosen");
  }, [chosen]);
  const [registered, setRegistered] = useState(
    sessionStorage["registered"] == "true"
      ? sessionStorage["registered"]
      : false
  );
  function changeRegistered(reg, admin) {
    setRegistered(reg);
    sessionStorage["registered"] = reg;
    sessionStorage["admin"] = admin;
  }
  // const axios = require("axios");

  // const options = {
  //   method: "GET",
  //   url: "https://barcode-generator4.p.rapidapi.com/",
  //   params: { text: "123456", barcodeType: "C128", imageType: "PNG" },
  //   headers: {
  //     "X-RapidAPI-Key": "9c3403d856msh2c3649954542f94p1f7dd9jsn4d08a2c9cb22",
  //     "X-RapidAPI-Host": "barcode-generator4.p.rapidapi.com",
  //   },
  // };

  // axios
  //   .request(options)
  //   .then(function (response) {
  //     console.log(response.data);
  //   })
  //   .catch(function (error) {
  //     console.error(error);
  //   });

  return (
    <div className={classes.backgroud}>
      <header className={classes.header}>
        <h1 className={classes.title}>خدمة القديس حبيب جرجس</h1>
        <img src={logo} className={classes.image}></img>
      </header>
      {registered ? (
        <div className=" container-width">
          {chosen == undefined && (
            <React.Fragment>
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
              <div className={classes.out}>
                <button
                  onClick={() => {
                    setRegistered(false);
                    sessionStorage["registered"] = false;
                    sessionStorage["admin"] = false;
                  }}
                >
                  تسجيل الخروج <img src={logout}></img>
                </button>
              </div>
            </React.Fragment>
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
      ) : (
        <Login setRegistered={changeRegistered}></Login>
      )}
    </div>
  );
}
