import React, { useEffect, useState } from "react";
import General from "../general/General.module.css";
import back from "../../assets/icons/arrow.png";
import InputWithLabel from "../general/InputWithLabel";
import DateGet from "../general/DateGet";
import PrettySelect from "../general/PrettySelect";
import instance from "../axios";
import Modal from "../general/Modal";
export default function AddPerson(props) {
  const [teams, setTeams] = useState([]);
  const [teams_M, setTeams_M] = useState([]);
  const getTeams = async () => {
    try {
      const res = await instance.get("/Teams");
      //   console.log(res);
      console.log(res.data);
      setTeams(res.data);
      //   let temp = res.data.map((x) => ({ [x.id]: x.country }));
      //   setTeams_M(temp);
      let obj = {};
      for (let i = 0; i < res.data.length; i++) {
        obj[res.data[i]._id] = res.data[i].name;
      }
      setTeams_M(obj);
    } catch (error) {
      console.log(error);
    }
  };

  const [roles, setRoles] = useState([]);
  const [roles_M, setRoles_M] = useState([]);
  const getRoles = async () => {
    try {
      const res = await instance.get("/Roles");
      //   console.log(res);
      console.log(res.data);
      setRoles(res.data);
      let obj = {};
      for (let i = 0; i < res.data.length; i++) {
        obj[res.data[i]._id] = res.data[i].name;
      }
      setRoles_M(obj);
    } catch (error) {
      console.log(error);
    }
  };

  const [Status, setStatus] = useState([]);
  const [Status_M, setStatus_M] = useState([]);
  const getStatus = async () => {
    try {
      const res = await instance.get("/Status");
      //   console.log(res);
      console.log(res.data);
      setStatus(res.data);
      let obj = {};
      for (let i = 0; i < res.data.length; i++) {
        obj[res.data[i]._id] = res.data[i].name;
      }
      setStatus_M(obj);
    } catch (error) {
      console.log(error);
    }
  };

  const [education_years, setEducation_years] = useState([]);
  const [education_years_M, setEducation_years_M] = useState([]);
  const getEducation_years = async () => {
    try {
      const res = await instance.get("/Education_Years");
      //   console.log(res);
      console.log(res.data);
      setEducation_years(res.data);
      let obj = {};
      for (let i = 0; i < res.data.length; i++) {
        obj[res.data[i]._id] = res.data[i].name;
      }
      setEducation_years_M(obj);
    } catch (error) {
      console.log(error);
    }
  };
  const [fathers, setFathers] = useState([]);
  const [fathers_M, setFathers_M] = useState([]);
  const getFathers = async () => {
    try {
      const res = await instance.get("/Fathers");
      //   console.log(res);
      console.log(res.data);
      setFathers(res.data);
      let obj = {};
      for (let i = 0; i < res.data.length; i++) {
        obj[res.data[i]._id] = res.data[i].name;
      }
      setFathers_M(obj);
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
  }, []);

  const [person, setPerson] = useState(
    props.edit ? props.person : { name: "", ID: "" }
  );
  const [name_error, setName_error] = useState(false);
  const [birth_date_error, setBirth_date_error] = useState(false);
  const [educ_year_error, setEduc_year_error] = useState(false);
  const [father_error, setFather_error] = useState(false);
  const [bapitization_father_error, setBapitization_father_error] =
    useState(false);
  const [bapitization_church_error, setBapitization_church_error] =
    useState(false);
  const [bapitization_date_error, setBapitization_date_error] = useState(false);
  const [address_error, setAddress_error] = useState(false);

  const [phone_error, setPhone_error] = useState(false);
  const [phone, setPhone] = useState(
    props.edit ? (person.phone_number ? person.phone_number : "") : ""
  );

  const [eamil_error, setEmail_error] = useState(false);
  const [facebook_error, setFacebook_error] = useState(false);
  const [father_job_error, setFather_job_error] = useState(false);
  const [father_phone_error, setFather_phone_error] = useState(false);
  const [father_phone_number, setFather_phone_number] = useState(
    props.edit
      ? person.father_phone_number
        ? person.father_phone_number
        : ""
      : ""
  );
  const [mother_job_error, setMother_job_error] = useState(false);
  const [ID_error, setID_error] = useState(false);
  const [ID, setID] = useState(props.edit ? person.ID : "");
  const [serv_date_entered_error, setServ_date_entered_error] = useState(false);
  const [serv_date_graduated_error, setServ_date_graduated_error] =
    useState(false);
  const [prep_date_entered_error, setPrep_date_entered_error] = useState(false);
  const [prep_date_graduated_error, setPrep_date_graduated_error] =
    useState(false);
  const [status_error, setStatus_error] = useState(false);
  const [team_error, setTeam_error] = useState(false);
  const [role_error, setRole_error] = useState(false);
  const [disableButton, setDisableButton] = useState(props.edit ? false : true);
  const [duplicatedID, setDuplicatedID] = useState(false);
  const [addingError, setAddingError] = useState(false);
  const add_person = async () => {
    try {
      const res = await instance.post("/Persons", person);
      //   console.log(res);
      console.log(res.data);
      // if (!phone_error && phone) {
      //   const res2 = await instance.post("/Phone_Numbers", {
      //     number: phone,
      //     p_ID: person._id,
      //   });
      // }

      props.onGoBack();
    } catch (error) {
      console.log(error);
      setAddingError(true);
      setTimeout(() => {
        setAddingError(false);
      }, 3000);

      // if (error[error].code == 11000) {
      //   setDuplicatedID(true);
      //   setTimeout(() => {
      //     setDuplicatedID(false);
      //   }, 3000);
      // }
    }
  };
  const edit_person = async () => {
    try {
      console.log(person);
      let to_send = JSON.parse(JSON.stringify(person));
      delete to_send["__v"];
      let id_to_send = to_send["_id"];
      delete to_send["_id"];
      console.log(to_send);
      const res = await instance.patch(`/Persons/${id_to_send}`, to_send);
      //   console.log(res);
      console.log(res.data);
      props.onEdit(id_to_send, to_send["name"]);
    } catch (error) {
      console.log(error);
      setAddingError(true);
      setTimeout(() => {
        setAddingError(false);
      }, 3000);
    }
  };
  const [tryToDelete, setTryToDelete] = useState(false);
  const delete_person = async () => {
    try {
      console.log(person);
      let id_to_send = person["_id"];
      const res = await instance.delete(`/Persons/${id_to_send}`);
      //   console.log(res);
      console.log(res.data);
      props.onEdit(null);
    } catch (error) {
      console.log(error);
      setAddingError(true);
      setTimeout(() => {
        setAddingError(false);
      }, 3000);
    }
  };
  return (
    <React.Fragment>
      <div className={General.actions}>
        <h3> {props.edit ? "تعديل بيانات الخادم :" : "  اضافة خادم جديد :"}</h3>
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
        {/* <div className={General["data-element"]}></div> */}
        <div className={General["data-element"]}>
          <InputWithLabel
            label={"الاسم *"}
            placeHolder={"اسم الخادم"}
            type={"text"}
            width={"100%"}
            onChange={(e) => {
              const val = e.target.value;
              if (val == "") {
                setName_error(true);
                setDisableButton(true);
                setPerson((prev) => {
                  return { ...prev, name: "" };
                });
              } else {
                setName_error(false);
                if (person.ID != "") setDisableButton(false);
                setPerson((prev) => {
                  return { ...prev, name: val };
                });
              }
            }}
            value={props.edit ? person.name : person.name ? person.name : ""}
            red={name_error}
          ></InputWithLabel>
        </div>
        <div className={General["data-element"]}>
          <div className={General["element-container"]}>
            <div className={General["element-container-title"]}>
              تاريخ الميلاد
            </div>
            <DateGet
              onChange={(date) => {
                const val = date;
                if (val == undefined) {
                  setBirth_date_error(true);
                  setPerson((prev) => {
                    delete prev["birth_date"];
                    return prev;
                  });
                } else {
                  setBirth_date_error(false);
                  setPerson((prev) => {
                    return { ...prev, birth_date: val };
                  });
                }
              }}
              edit={props.edit}
              c_year={
                person.birth_date && props.edit
                  ? new Date(person.birth_date).getFullYear()
                  : undefined
              }
              c_month={
                person.birth_date && props.edit
                  ? new Date(person.birth_date).getMonth() + 1
                  : undefined
              }
              c_day={
                person.birth_date && props.edit
                  ? new Date(person.birth_date).getDate()
                  : undefined
              }
            ></DateGet>
          </div>
        </div>
        <div className={General["data-element"]}>
          <div className={General["element-container"]}>
            <PrettySelect
              data={education_years_M}
              onChange={(e_y) => {
                const val = e_y;
                if (val == undefined) {
                  setEduc_year_error(true);
                  setPerson((prev) => {
                    delete prev["education_year"];
                    return prev;
                  });
                } else {
                  setEduc_year_error(false);
                  setPerson((prev) => {
                    return { ...prev, education_year: val };
                  });
                }
              }}
              option="المرحلة الدراسية"
              noDefault={false}
              chosen={person.education_year}
            ></PrettySelect>
          </div>
        </div>
        {/* <div className={General["data-element"]}>
          <div className={General["element-container"]}>
            <PrettySelect
              data={fathers_M}
              option="اب الاعتراف"
              onChange={(father) => {
                const val = father;
                if (val == undefined) {
                  setFather_error(true);
                  setPerson((prev) => {
                    delete prev["father"];
                    return prev;
                  });
                } else {
                  setFather_error(false);
                  setPerson((prev) => {
                    return { ...prev, father: val };
                  });
                }
              }}
              chosen={person.father}
            ></PrettySelect>
          </div>
        </div> */}
        <div className={General["data-element"]}>
          <InputWithLabel
            type={"text"}
            width={"100%"}
            onChange={(e) => {
              const val = e.target.value;
              if (val == "=") {
                setFather_error(true);
                setPerson((prev) => {
                  delete prev["father"];
                  return prev;
                });
              } else {
                setFather_error(false);
                setPerson((prev) => {
                  return { ...prev, father: val };
                });
              }
            }}
            red={false}
            label="اب الاعتراف"
            placeHolder="اب الاعتراف"
            value={
              props.edit ? person.father : person.father ? person.father : ""
            }
          ></InputWithLabel>
        </div>
        <div className={General["data-element"]}>
          <InputWithLabel
            label={"اب العماد"}
            placeHolder={"الكاهن الذى تمت على يده المعمودية"}
            type={"text"}
            width={"100%"}
            onChange={(e) => {
              const val = e.target.value;
              if (val == "") {
                setBapitization_father_error(true);
                setPerson((prev) => {
                  delete prev["bapitization_father"];
                  return prev;
                });
              } else {
                setBapitization_father_error(false);
                setPerson((prev) => {
                  return { ...prev, bapitization_father: val };
                });
              }
            }}
            red={false}
            value={
              props.edit
                ? person.bapitization_father
                : person.bapitization_father
                ? person.bapitization_father
                : ""
            }
          ></InputWithLabel>
        </div>
        <div className={General["data-element"]}>
          <InputWithLabel
            label={"كنيسة المعمودية"}
            placeHolder={"كنيسة المعمودية"}
            type={"text"}
            width={"100%"}
            onChange={(e) => {
              const val = e.target.value;
              if (val == "") {
                setBapitization_church_error(true);
                setPerson((prev) => {
                  delete prev["bapitization_church"];
                  return prev;
                });
              } else {
                setBapitization_church_error(false);
                setPerson((prev) => {
                  return { ...prev, bapitization_church: val };
                });
              }
            }}
            red={false}
            value={
              props.edit
                ? person.bapitization_church
                : person.bapitization_church
                ? person.bapitization_church
                : ""
            }
          ></InputWithLabel>
        </div>
        <div className={General["data-element"]}>
          <div className={General["element-container"]}>
            <div className={General["element-container-title"]}>
              تاريخ المعمودية
            </div>
            <DateGet
              onChange={(date) => {
                const val = date;
                if (val == undefined) {
                  setBapitization_date_error(true);
                  setPerson((prev) => {
                    delete prev["bapitization_date"];
                    return prev;
                  });
                } else {
                  setBapitization_date_error(false);
                  setPerson((prev) => {
                    return { ...prev, bapitization_date: val };
                  });
                }
              }}
              edit={props.edit}
              c_year={
                person.birth_date && props.edit
                  ? new Date(person.bapitization_date).getFullYear()
                  : undefined
              }
              c_month={
                person.birth_date && props.edit
                  ? new Date(person.bapitization_date).getMonth() + 1
                  : undefined
              }
              c_day={
                person.birth_date && props.edit
                  ? new Date(person.bapitization_date).getDate()
                  : undefined
              }
            ></DateGet>
          </div>
        </div>

        <div className={General["data-element"]}>
          <InputWithLabel
            label={"العنوان"}
            placeHolder={"العنوان"}
            type={"text"}
            width={"100%"}
            onChange={(e) => {
              const val = e.target.value;
              if (val == "") {
                setAddress_error(true);
                setPerson((prev) => {
                  delete prev["address"];
                  return prev;
                });
              } else {
                setAddress_error(false);
                setPerson((prev) => {
                  return { ...prev, address: val };
                });
              }
            }}
            red={false}
            value={
              props.edit ? person.address : person.address ? person.address : ""
            }
          ></InputWithLabel>
        </div>
        <div className={General["data-element"]}>
          <InputWithLabel
            label={"رقم الموبايل"}
            placeHolder={"رقم الموبايل"}
            type={"text"}
            width={"100%"}
            onChange={(e) => {
              const val = e.target.value;
              if (val.trim().length == 0) {
                setPhone_error(false);
                setPhone(val);
                setPhone("");
                setPerson((prev) => {
                  delete prev["phone_number"];
                  return prev;
                });
              } else if (
                val[0] !== "0" ||
                val[1] !== "1" ||
                val.length !== 11 ||
                !/^[0-9]+$/.test(val)
              ) {
                setPhone_error(true);
                setPhone(val);
                setPerson((prev) => {
                  delete prev["phone_number"];
                  return prev;
                });
              } else {
                setPhone_error(false);
                setPhone(val);
                setPerson((prev) => {
                  return { ...prev, phone_number: val };
                });
              }
            }}
            red={phone_error}
            value={props.edit ? phone : phone ? phone : ""}
          ></InputWithLabel>
        </div>

        <div className={General["data-element"]}>
          <InputWithLabel
            label={"الايميل (email)"}
            placeHolder={"الايميل (email)"}
            type={"text"}
            width={"100%"}
            onChange={(e) => {
              const val = e.target.value;
              if (val == "") {
                setEmail_error(true);
                setPerson((prev) => {
                  delete prev["email"];
                  return prev;
                });
              } else {
                setEmail_error(false);
                setPerson((prev) => {
                  return { ...prev, email: val };
                });
              }
            }}
            red={false}
            value={props.edit ? person.email : person.email ? person.email : ""}
          ></InputWithLabel>
        </div>

        <div className={General["data-element"]}>
          <InputWithLabel
            label={"الفيسبوك (facebook)"}
            placeHolder={"الفيسبوك (facebook)"}
            type={"text"}
            width={"100%"}
            onChange={(e) => {
              const val = e.target.value;
              if (val == "") {
                setFacebook_error(true);
                setPerson((prev) => {
                  delete prev["facebook"];
                  return prev;
                });
              } else {
                setFacebook_error(false);
                setPerson((prev) => {
                  return { ...prev, facebook: val };
                });
              }
            }}
            red={false}
            value={
              props.edit
                ? person.facebook
                : person.facebook
                ? person.facebook
                : ""
            }
          ></InputWithLabel>
        </div>

        <div className={General["data-element"]}>
          <InputWithLabel
            label={"عمل الوالد"}
            placeHolder={"عمل الوالد"}
            type={"text"}
            width={"100%"}
            onChange={(e) => {
              const val = e.target.value;
              if (val == "") {
                setFather_job_error(true);
                setPerson((prev) => {
                  delete prev["father_job"];
                  return prev;
                });
              } else {
                setFather_job_error(false);
                setPerson((prev) => {
                  return { ...prev, father_job: val };
                });
              }
            }}
            red={false}
            value={
              props.edit
                ? person.father_job
                : person.father_job
                ? person.father_job
                : ""
            }
          ></InputWithLabel>
        </div>
        <div className={General["data-element"]}>
          <InputWithLabel
            label={"رقم الوالد"}
            placeHolder={"رقم الوالد"}
            type={"text"}
            width={"100%"}
            onChange={(e) => {
              const val = e.target.value;
              if (val.trim().length == 0) {
                setFather_phone_error(false);
                setFather_phone_number(val);
                setPerson((prev) => {
                  delete prev["father_phone_number"];
                  return prev;
                });
              } else if (
                val[0] !== "0" ||
                val[1] !== "1" ||
                val.length !== 11 ||
                !/^[0-9]+$/.test(val)
              ) {
                setFather_phone_error(true);
                setFather_phone_number(val);
                setPerson((prev) => {
                  delete prev["father_phone_number"];
                  return prev;
                });
              } else {
                setFather_phone_error(false);
                setFather_phone_number(val);
                setPerson((prev) => {
                  return { ...prev, father_phone_number: val };
                });
              }
            }}
            red={father_phone_error}
            value={props.edit ? father_phone_number : father_phone_number}
          ></InputWithLabel>
        </div>
        <div className={General["data-element"]}>
          <InputWithLabel
            label={"عمل الام"}
            placeHolder={"عمل الام"}
            type={"text"}
            width={"100%"}
            onChange={(e) => {
              const val = e.target.value;
              if (val == "") {
                setMother_job_error(true);
                setPerson((prev) => {
                  delete prev["mother_job"];
                  return prev;
                });
              } else {
                setMother_job_error(false);
                setPerson((prev) => {
                  return { ...prev, mother_job: val };
                });
              }
            }}
            red={false}
            value={
              props.edit
                ? person.mother_job
                : person.mother_job
                ? person.mother_job
                : ""
            }
          ></InputWithLabel>
        </div>
        <div className={General["data-element"]}>
          <InputWithLabel
            label={"الرقم القومى *"}
            placeHolder={"الرقم القومى"}
            type={"text"}
            width={"100%"}
            onChange={(e) => {
              const val = e.target.value.trim();
              if (val == "" || val.length !== 14 || !/^[0-9]+$/.test(val)) {
                setID_error(true);
                setID(val);
                if (person.name != "") setDisableButton(true);

                setPerson((prev) => {
                  return { ...prev, ID: "" };
                });
              } else {
                setID_error(false);
                setID(val);

                setDisableButton(false);

                setPerson((prev) => {
                  return { ...prev, ID: val };
                });
              }
            }}
            red={ID_error}
            value={props.edit ? ID : ID}
          ></InputWithLabel>
        </div>
        <div className={General["data-element"]}></div>

        <div className={General["data-element"]}>
          <div className={General["element-container"]}>
            <div className={General["element-container-title"]}>
              تاريخ الالتحاق باعداد خدام
            </div>
            <DateGet
              onChange={(date) => {
                const val = date;
                if (val == undefined) {
                  setPrep_date_entered_error(true);
                  setPerson((prev) => {
                    delete prev["prep_date_entered"];
                    return prev;
                  });
                } else {
                  setPrep_date_entered_error(false);
                  setPerson((prev) => {
                    return { ...prev, prep_date_entered: val };
                  });
                }
              }}
              edit={props.edit}
              c_year={
                person.birth_date && props.edit
                  ? new Date(person.prep_date_entered).getFullYear()
                  : undefined
              }
              c_month={
                person.birth_date && props.edit
                  ? new Date(person.prep_date_entered).getMonth() + 1
                  : undefined
              }
              c_day={
                person.birth_date && props.edit
                  ? new Date(person.prep_date_entered).getDate()
                  : undefined
              }
            ></DateGet>
          </div>
        </div>
        {/* <hr className={General.hr}></hr> */}
        <div className={General["data-element"]}>
          <div className={General["element-container"]}>
            <div className={General["element-container-title"]}>
              تاريخ التخرج من اعداد خدام
            </div>
            <DateGet
              onChange={(date) => {
                const val = date;
                if (val == undefined) {
                  setPrep_date_graduated_error(true);
                  setPerson((prev) => {
                    delete prev["prep_date_graduated"];
                    return prev;
                  });
                } else {
                  setPrep_date_graduated_error(false);
                  setPerson((prev) => {
                    return { ...prev, prep_date_graduated: val };
                  });
                }
              }}
              edit={props.edit}
              c_year={
                person.birth_date && props.edit
                  ? new Date(person.prep_date_graduated).getFullYear()
                  : undefined
              }
              c_month={
                person.birth_date && props.edit
                  ? new Date(person.prep_date_graduated).getMonth() + 1
                  : undefined
              }
              c_day={
                person.birth_date && props.edit
                  ? new Date(person.prep_date_graduated).getDate()
                  : undefined
              }
            ></DateGet>
          </div>
        </div>
        {/* <hr className={General.hr}></hr> */}

        <div className={General["data-element"]}>
          <div className={General["element-container"]}>
            <div className={General["element-container-title"]}>
              تاريخ الالتحاق بالخدمة
            </div>
            <DateGet
              onChange={(date) => {
                const val = date;
                if (val == undefined) {
                  setServ_date_entered_error(true);
                  setPerson((prev) => {
                    delete prev["serv_date_entered"];
                    return prev;
                  });
                } else {
                  setServ_date_entered_error(false);
                  setPerson((prev) => {
                    return { ...prev, serv_date_entered: val };
                  });
                }
              }}
              edit={props.edit}
              c_year={
                person.birth_date && props.edit
                  ? new Date(person.serv_date_entered).getFullYear()
                  : undefined
              }
              c_month={
                person.birth_date && props.edit
                  ? new Date(person.serv_date_entered).getMonth() + 1
                  : undefined
              }
              c_day={
                person.birth_date && props.edit
                  ? new Date(person.serv_date_entered).getDate()
                  : undefined
              }
            ></DateGet>
          </div>
        </div>
        {/* <hr className={General.hr}></hr> */}
        <div className={General["data-element"]}>
          <div className={General["element-container"]}>
            <div className={General["element-container-title"]}>
              تاريخ التخرج من الخدمة
            </div>
            <DateGet
              onChange={(date) => {
                const val = date;
                if (val == undefined) {
                  setServ_date_graduated_error(true);
                  setPerson((prev) => {
                    delete prev["serv_date_graduated"];
                    return prev;
                  });
                } else {
                  setServ_date_graduated_error(false);
                  setPerson((prev) => {
                    return { ...prev, serv_date_graduated: val };
                  });
                }
              }}
              edit={props.edit}
              c_year={
                person.birth_date && props.edit
                  ? new Date(person.serv_date_graduated).getFullYear()
                  : undefined
              }
              c_month={
                person.birth_date && props.edit
                  ? new Date(person.serv_date_graduated).getMonth() + 1
                  : undefined
              }
              c_day={
                person.birth_date && props.edit
                  ? new Date(person.serv_date_graduated).getDate()
                  : undefined
              }
            ></DateGet>
          </div>
        </div>
        {/* <hr className={General.hr}></hr> */}
        <div className={General["data-element"]}>
          <div className={General["element-container"]}>
            <PrettySelect
              data={teams_M}
              option="الفرقة"
              onChange={(team) => {
                const val = team;
                if (val == undefined) {
                  setTeam_error(true);
                  setPerson((prev) => {
                    delete prev["team"];
                    return prev;
                  });
                } else {
                  setTeam_error(false);
                  setPerson((prev) => {
                    return { ...prev, team: val };
                  });
                }
              }}
              chosen={person.team}
            ></PrettySelect>
          </div>
        </div>
        <div className={General["data-element"]}>
          <div className={General["element-container"]}>
            <PrettySelect
              data={roles_M}
              option="التخصص"
              onChange={(role) => {
                const val = role;
                if (val == undefined) {
                  setRole_error(true);
                  setPerson((prev) => {
                    delete prev["role"];
                    return prev;
                  });
                } else {
                  setRole_error(false);
                  setPerson((prev) => {
                    return { ...prev, role: val };
                  });
                }
              }}
              chosen={person.role}
            ></PrettySelect>
          </div>
        </div>
        <div className={General["data-element"]}>
          <div className={General["element-container"]}>
            <PrettySelect
              data={Status_M}
              option="الحالة"
              onChange={(status) => {
                const val = status;
                if (val == undefined) {
                  setStatus_error(true);
                  setPerson((prev) => {
                    delete prev["status"];
                    return prev;
                  });
                } else {
                  setStatus_error(false);
                  setPerson((prev) => {
                    return { ...prev, status: val };
                  });
                }
              }}
              chosen={person.status}
            ></PrettySelect>
          </div>
        </div>
        <div className={General["data-element"]}></div>

        {/* <hr className={General.hr}></hr> */}

        {/* <hr className={General.hr}></hr> */}

        {/* <div className={General["data-element"]}>
          <InputWithLabel
            label={"رقم الام"}
            placeHolder={"رقم الام"}
            type={"text"}
            width={"100%"}
          ></InputWithLabel>
        </div> */}
        {/* <hr className={General.hr}></hr> */}
      </form>
      <div
        className={`${General.final} ${
          props.edit ? General["more-buttons"] : ""
        }`}
      >
        <button
          className={General.button}
          disabled={disableButton}
          onClick={props.edit ? edit_person : add_person}
        >
          {props.edit ? "حفظ التعديلات" : " اضافة الخادم"}
        </button>
        {addingError && (
          <span className={General.error}>
            فيه حاجة غلط .. راجع البيانات:D .. ممكن الاسم او الرقم القومى متكرر
          </span>
        )}
        {props.edit && (
          <button
            className={General.button}
            disabled={disableButton}
            onClick={() => {
              setTryToDelete(true);
            }}
          >
            حذف الخادم
          </button>
        )}
        {tryToDelete && (
          <Modal
            onHide={() => {
              setTryToDelete(false);
            }}
            data={{
              header: "حذف الخادم ",
              message:
                "متأكد انك عاوز تحذفه ؟ لو مش عاوز دوس علامة الغلط او برة البلوك ده :D",
              button: "أيوة",
            }}
            onOk={() => {
              delete_person();
            }}
          ></Modal>
        )}
      </div>
      {/* {person.name}
      {person.birth_date && person.birth_date.toString()}
      {person.education_year && person.education_year}
      {person.father && person.father}
      {person.bapitization_father && person.bapitization_father}
      {person.bapitization_church && person.bapitization_church}
      {person.bapitization_date && person.bapitization_date.toString()}
      {person.address && person.address}
      {phone && phone}
      {person.email && person.email}
      {person.facebook && person.facebook}
      {person.father_job && person.father_job}
      {person.mother_job && person.mother_job}
      {person.father_phone_number && person.father_phone_number}
      {person.ID && person.ID}
      {person.prep_date_entered && person.prep_date_entered.toString()}
      {person.prep_date_graduated && person.prep_date_graduated.toString()}
      {person.serv_date_entered && person.serv_date_entered.toString()}
      {person.serv_date_graduated && person.serv_date_graduated.toString()}
      {person.status && person.status}
      {person.team && person.team}
      {person.role && person.role} */}
    </React.Fragment>
  );
  //   return <button onClick={props.onGoBack}> back</button>;
}
