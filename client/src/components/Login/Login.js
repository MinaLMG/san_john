import classes from "./Login.module.css";
import General from "../general/General.module.css";
import InputWithLabel from "../general/InputWithLabel";
import { useState } from "react";
import instance from "../axios";
export default function Login(props) {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  async function checkAccount() {
    try {
      setEnteringError(false);
      const res = await instance.post("/User", {
        name: name,
        password: password,
      });
      props.setRegistered(true, res.data.admin);
    } catch (error) {
      setEnteringError(true);
      setTimeout(() => {
        setEnteringError(false);
      }, 3000);
      console.log(error);
    }
  }
  async function createAccount() {
    try {
      const res = await instance.post("/Users", {
        name: "HGF",
        password: "01212719704",
        admin: true,
      });
      const res2 = await instance.post("/Users", {
        name: "shady",
        password: "shadyshady",
        admin: false,
      });
      const res3 = await instance.post("/Users", {
        name: "anis",
        password: "anisanis",
        admin: false,
      });
    } catch (error) {
      setTimeout(() => {
        setEnteringError(false);
      }, 3000);
      console.log(error);
    }
  }
  const [enteringError, setEnteringError] = useState(false);
  return (
    <div className={classes.width}>
      <div className={classes.border}>
        <h2 className={classes["login-header"]}>تسجيل الدخول</h2>
        <div className={classes["to-center"]}>
          <div className={General["data-element"]}>
            <InputWithLabel
              label={"اسم المستخدم"}
              placeHolder={"اسم المستخدم"}
              type={"text"}
              width={"100%"}
              onChange={(e) => {
                const val = e.target.value;
                if (val == "") {
                  setNameError(true);
                  setName(val);
                } else {
                  setNameError(false);
                  setName(val);
                }
              }}
              red={false}
              value={name}
            ></InputWithLabel>
          </div>{" "}
          <div className={General["data-element"]}>
            <InputWithLabel
              label={"كلمة المرور"}
              placeHolder={"كلمة المرور"}
              type={"password"}
              width={"100%"}
              onChange={(e) => {
                const val = e.target.value;
                if (val == "") {
                  setPasswordError(true);
                  setPassword(val);
                } else {
                  setPasswordError(false);
                  setPassword(val);
                }
              }}
              red={false}
              value={password}
            ></InputWithLabel>
          </div>
        </div>
        <div className={classes.actions}>
          <button className={General.button} onClick={checkAccount}>
            تسجيل دخول
          </button>
          {/* <button className={General.button} onClick={createAccount}>
            اول مرة
          </button> */}
        </div>
        {enteringError && (
          <span className={General.error}>
            السيرفر وقع او البيانات غلط .. اتاكد و سجل تانى
          </span>
        )}
      </div>
    </div>
  );
}
