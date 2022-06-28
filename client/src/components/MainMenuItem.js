import classes from "./MainMenuItem.module.css";
export default function MainMenuItem(props) {
  return (
    <div className={classes.area}>
      <button onClick={props.onClick} className={classes.button}>
        {props.buttonContent}
      </button>
    </div>
  );
}
