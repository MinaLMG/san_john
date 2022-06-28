import { Fragment, useEffect, useState } from "react";
import classes from "./Basic.module.css";
// import axios from "../axios";
import instance from "../axios";
export default function Basic(props) {
  const [teams, setTeams] = useState([]);
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
  const [fathers, setFathers] = useState([]);
  const getFathers = async () => {
    try {
      const res = await instance.get("/Fathers");
      //   console.log(res);
      console.log(res.data);
      setFathers(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const [phone_numbers, setPhone_numbers] = useState([]);
  const getPhone_numbers = async () => {
    try {
      const res = await instance.get("/Phone_Numbers");
      //   console.log(res);
      console.log(res.data);
      setPhone_numbers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [persons, setPersons] = useState([]);
  const getPersons = async () => {
    try {
      const res = await instance.get("/Persons");
      //   console.log(res);
      console.log(res.data);
      setPersons(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [meetings, setMeetings] = useState([]);
  const getMeetings = async () => {
    try {
      const res = await instance.get("/Meetings");
      //   console.log(res);
      console.log(res.data);
      setMeetings(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTeams();
    getRoles();
    getStatus();
    getEducation_years();
    getFathers();
    getPhone_numbers();
    getPersons();
    getMeetings();
  }, []);

  return (
    <Fragment>
      <button onClick={props.onGoBack}> back</button>
      <h1> الفرق </h1>
      {teams.length != 0 && (
        <ul>
          {teams.map((team) => {
            return <li key={team._id}> {team.name} </li>;
          })}
        </ul>
      )}
      <h1> الادوار </h1>
      {roles.length != 0 && (
        <ul>
          {roles.map((role) => {
            return <li key={role._id}> {role.name} </li>;
          })}
        </ul>
      )}
      <h1> الحالة </h1>
      {Status.length != 0 && (
        <ul>
          {Status.map((status) => {
            return <li key={status._id}> {status.name} </li>;
          })}
        </ul>
      )}
      <h1> السنين الدراسية </h1>
      {education_years.length != 0 && (
        <ul>
          {education_years.map((education_year) => {
            return <li key={education_year._id}> {education_year.name} </li>;
          })}
        </ul>
      )}
      <h1> الاباء </h1>
      {fathers.length != 0 && (
        <ul>
          {fathers.map((father) => {
            return <li key={father._id}> {father.name} </li>;
          })}
        </ul>
      )}
      <h1> ارقام التليفونات </h1>
      {phone_numbers.length != 0 && (
        <ul>
          {phone_numbers.map((phone) => {
            return <li key={phone._id}> {phone.number} </li>;
          })}
        </ul>
      )}
      <h1>الخدام </h1>
      {persons.length != 0 && (
        <ul>
          {persons.map((person) => {
            return <li key={person._id}> {person._id} </li>;
          })}
        </ul>
      )}
      <h1>الاجتماعات </h1>
      {meetings.length != 0 && (
        <ul>
          {meetings.map((meeting) => {
            return <li key={meeting._id}> {meeting.description} </li>;
          })}
        </ul>
      )}
    </Fragment>
  );
}
