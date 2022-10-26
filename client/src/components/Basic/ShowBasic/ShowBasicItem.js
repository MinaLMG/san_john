import classes from "./ShowBasicItem.module.css";
export default function ShowBasicItem(props) {
  return (
    <div className={classes.data}>
      <div className={classes.item}>
        <div className={classes.title}>الاسم</div>
        <div className={classes.content}>
          {props.element.name ? props.element.name : ""}
        </div>
      </div>
    </div>
  );
}
