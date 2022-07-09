import { propTypes } from "react-bootstrap/esm/Image";
import classes from "./CheckListItem.module.css";
export default function CheckListItem(props) {
  return (
    <div className={`form-check ${classes["form-check"]}`}>
      <input
        className={`form-check-input ${classes["form-check-input"]}`}
        type="checkbox"
        checked={props.value}
        id="flexCheckDefault"
        onChange={(e) => {
          props.onChange(e.target.checked);
        }}
      />
      <label
        className={`form-check-label ${classes["form-check-label"]}`}
        htmlFor="flexCheckDefault"
      >
        {props.content}
      </label>
    </div>
  );
}
