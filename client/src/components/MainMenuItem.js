import classes from "./MainMenuItem.module.css";
import General from "./general/General.module.css";
export default function MainMenuItem(props) {
  return (
    <div className={classes.area}>
      <button onClick={props.onClick} className={General["area-button"]}>
        {props.buttonContent}
      </button>
    </div>
  );
}
