import React, { useEffect, useState } from "react";
import instance from "../../axios";
import ShowPersonDataItem from "./ShowPersonDataItem";
import classes from "./ShowPersonItem.module.css";
export default function ShowPersonItem(props) {
  const [person, setPerson] = useState({});
  // useEffect(() => {
  //   async function fetchData() {
  //     // setPerson(props.person);
  //     if (person.team) {
  //       const res = await instance.get(`/Team/${person.team}`);
  //       setPerson((prev) => {
  //         prev.team = res.data.name;
  //         return prev;
  //       });
  //     }
  //     if (person.role) {
  //       const res = await instance.get(`/Role/${person.role}`);
  //       setPerson((prev) => {
  //         prev.role = res.data.name;
  //         return prev;
  //       });
  //     }
  //     if (person.status) {
  //       const res = await instance.get(`/Status/${person.status}`);
  //       setPerson((prev) => {
  //         prev.status = res.data.name;
  //         return prev;
  //       });
  //     }
  //     if (person.education_year) {
  //       const res = await instance.get(
  //         `/Education_Year/${person.education_year}`
  //       );
  //       setPerson((prev) => {
  //         prev.education_year = res.data.name;
  //         return prev;
  //       });
  //     }
  //   }
  //   fetchData();
  // }, [props.person]);
  useEffect(() => {
    async function fetchData() {
      let element = JSON.parse(JSON.stringify(props.person));
      if (element.team) {
        const res = await instance.get(`/Team/${element.team}`);

        element.team = res.data.name;
      }
      if (element.role) {
        const res = await instance.get(`/Role/${element.role}`);
        element.role = res.data.name;
      }
      if (element.status) {
        const res = await instance.get(`/Status/${element.status}`);
        element.status = res.data.name;
      }
      if (element.education_year) {
        const res = await instance.get(
          `/Education_Year/${element.education_year}`
        );
        element.education_year = res.data.name;
      }
      setPerson(element);
    }
    fetchData();
  }, [props.person]);

  function getDate(val) {
    let date = new Date(val);
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    return day + "/" + (month + 1) + "/" + year;
  }
  console.log(person);
  return (
    <div className={classes.container}>
      <React.Fragment>
        <ShowPersonDataItem
          title="?????????? :"
          content={person.name}
        ></ShowPersonDataItem>
        <ShowPersonDataItem
          title="???? ???????????? :"
          content={
            person.bapitization_father ? person.bapitization_father : undefined
          }
        ></ShowPersonDataItem>
        <ShowPersonDataItem
          title=" ?????????? ???????????? :"
          content={person.ID ? person.ID : undefined}
        ></ShowPersonDataItem>
        <ShowPersonDataItem
          title=" ?????????? ?????????????????? :"
          content={
            person.bapitization_church ? person.bapitization_church : undefined
          }
        ></ShowPersonDataItem>
        <ShowPersonDataItem
          title="?????????? ?????????????? :"
          content={person.birth_date ? getDate(person.birth_date) : undefined}
        ></ShowPersonDataItem>
        <ShowPersonDataItem
          title="  ?????????? ?????????????????? :"
          content={
            person.bapitization_date
              ? getDate(person.bapitization_date)
              : undefined
          }
        ></ShowPersonDataItem>
        <ShowPersonDataItem
          title="???? ???????????????? :"
          content={person.father ? person.father : undefined}
        ></ShowPersonDataItem>
        <ShowPersonDataItem
          title=" ???????????????? :"
          content={person.facebook ? person.facebook : undefined}
        ></ShowPersonDataItem>
        <ShowPersonDataItem
          title="??????????:"
          content={person.gender ? person.gender : undefined}
        ></ShowPersonDataItem>
        <ShowPersonDataItem
          title=" ?????????????? :"
          content={person.email ? person.email : undefined}
        ></ShowPersonDataItem>
        <ShowPersonDataItem
          title="  ?????? ???????????????? :"
          content={person.phone_number ? person.phone_number : undefined}
        ></ShowPersonDataItem>
        <ShowPersonDataItem
          title=" ?????????? ???????????????? ???????????? ???????? :"
          content={
            person.prep_date_entered
              ? getDate(person.prep_date_entered)
              : undefined
          }
        ></ShowPersonDataItem>
        <ShowPersonDataItem
          title=" ?????? ???????????? :"
          content={person.father_job ? person.father_job : undefined}
        ></ShowPersonDataItem>
        <ShowPersonDataItem
          title=" ?????????? ???????????? ???? ?????????? ???????? :"
          content={
            person.prep_date_graduated
              ? getDate(person.prep_date_graduated)
              : undefined
          }
        ></ShowPersonDataItem>
        <ShowPersonDataItem
          title=" ?????? ???????????? :"
          content={
            person.father_phone_number ? person.father_phone_number : undefined
          }
        ></ShowPersonDataItem>
        <ShowPersonDataItem
          title=" ?????????? ???????????????? ?????????????? :"
          content={
            person.serv_date_entered
              ? getDate(person.serv_date_entered)
              : undefined
          }
        ></ShowPersonDataItem>
        <ShowPersonDataItem
          title=" ?????? ???????? :"
          content={person.mother_job ? person.mother_job : undefined}
        ></ShowPersonDataItem>
        <ShowPersonDataItem
          title=" ?????????? ???????????? ???? ???????????? :"
          content={
            person.serv_date_graduated
              ? getDate(person.serv_date_graduated)
              : undefined
          }
        ></ShowPersonDataItem>
        <ShowPersonDataItem
          title="  ?????????????? :"
          content={person.address ? person.address : undefined}
        ></ShowPersonDataItem>
        <ShowPersonDataItem title=" " content=""></ShowPersonDataItem>
        <ShowPersonDataItem
          title="?????????????? ???????????????? :"
          content={person.education_year ? person.education_year : undefined}
        ></ShowPersonDataItem>
        <ShowPersonDataItem
          title="???????????? :"
          content={person.team ? person.team : undefined}
        ></ShowPersonDataItem>

        <ShowPersonDataItem
          title="???????????? :"
          content={person.role ? person.role : undefined}
        ></ShowPersonDataItem>
        <ShowPersonDataItem
          title="???????????? :"
          content={person.status ? person.status : undefined}
        ></ShowPersonDataItem>
      </React.Fragment>
    </div>
  );
}
