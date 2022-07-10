import { useState } from "react";
import React from "react";
import General from "../general/General.module.css";
import back from "../../assets/icons/arrow.png";
import Modal from "../general/Modal";
import InputWithLabel from "../general/InputWithLabel";
import instance from "../axios";
export default function AddBasic(props) {
  const [element, setElement] = useState(
    props.edit ? props.element : { name: "" }
  );
  const [name_error, setName_error] = useState(false);
  const [disableButton, setDisableButton] = useState(props.edit ? false : true);
  const [addingError, setAddingError] = useState(false);

  const add_element = async () => {
    try {
      let res;
      switch (props.data) {
        case "teams":
          res = await instance.post("/Teams", element);
          break;
        case "roles":
          res = await instance.post("/Roles", element);
          break;
        case "status":
          res = await instance.post("/Status", element);
          break;
        case "edu":
          res = await instance.post("/Education_Years", element);
          break;
        default:
          break;
      }
      console.log(res.data);
      props.onGoBack();
    } catch (error) {
      console.log(error);
      setAddingError(true);
      setTimeout(() => {
        setAddingError(false);
      }, 3000);
    }
  };
  const edit_element = async () => {
    try {
      let to_send = JSON.parse(JSON.stringify(element));
      delete to_send["__v"];
      let id_to_send = to_send["_id"];
      delete to_send["_id"];
      let res;
      switch (props.data) {
        case "teams":
          res = await instance.patch(`/Teams/${id_to_send}`, to_send);
          break;
        case "roles":
          res = await instance.patch(`/Roles/${id_to_send}`, to_send);
          break;
        case "status":
          res = await instance.patch(`/Status/${id_to_send}`, to_send);
          break;
        case "edu":
          res = await instance.patch(`/Education_Years/${id_to_send}`, to_send);
          break;
        default:
          break;
      }
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
  const delete_element = async () => {
    try {
      let id_to_send = element["_id"];
      let res;
      switch (props.data) {
        case "teams":
          res = await instance.delete(`/Teams/${id_to_send}`);
          break;
        case "roles":
          res = await instance.delete(`/Roles/${id_to_send}`);
          break;
        case "status":
          res = await instance.delete(`/Status/${id_to_send}`);
          break;
        case "edu":
          res = await instance.delete(`/Education_Years/${id_to_send}`);
          break;
        default:
          break;
      }
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
  //   const [update, setUpdate] = useState(1);
  const dict = {
    teams: "الفريق",
    status: "الحالة",
    roles: "الدور",
    edu: "المرحلة الدراسية",
  };
  const dict2 = {
    teams: "فريق",
    status: "حالة",
    roles: "دور",
    edu: "مرحلة الدراسية",
  };
  return (
    <React.Fragment>
      <div className={General.actions}>
        <h3>
          {props.edit
            ? `تعديل بيانات ${dict[props.data]} :`
            : `  اضافة ${dict2[props.data]} جديد :`}
        </h3>
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
          <InputWithLabel
            label={"الاسم *"}
            placeHolder={`اسم ${dict[props.data]}`}
            type={"text"}
            width={"100%"}
            onChange={(e) => {
              const val = e.target.value;
              if (val == "") {
                setName_error(true);
                setDisableButton(true);
                setElement((prev) => {
                  return { ...prev, name: "" };
                });
              } else {
                setName_error(false);
                setDisableButton(false);
                setElement((prev) => {
                  return { ...prev, name: val };
                });
              }
            }}
            value={props.edit ? element.name : element.name ? element.name : ""}
            red={name_error}
          ></InputWithLabel>
        </div>
      </form>
      <div
        className={`${General.final} ${
          props.edit ? General["more-buttons"] : ""
        }`}
      >
        <button
          className={General.button}
          disabled={disableButton}
          onClick={props.edit ? edit_element : add_element}
        >
          {props.edit ? "حفظ التعديلات" : ` اضافة ${dict[props.data]}`}
        </button>
        {addingError && (
          <span className={General.error}>
            فيه حاجة غلط .. ممكن الاسم متكرر او السيرفر واقع :D
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
            حذف {dict[props.data]}
          </button>
        )}
        {tryToDelete && (
          <Modal
            onHide={() => {
              setTryToDelete(false);
            }}
            data={{
              header: `حذف ${dict[props.data]} `,
              message:
                "متأكد انك عاوز تحذفه ؟ لو مش عاوز دوس علامة الغلط او برة البلوك ده :D",
              button: "أيوة",
            }}
            onOk={() => {
              delete_element();
            }}
          ></Modal>
        )}
      </div>
    </React.Fragment>
  );
}
