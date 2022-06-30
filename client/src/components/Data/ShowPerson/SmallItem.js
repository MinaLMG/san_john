import { useEffect, useState } from "react";
import classes from "./SmallItem.module.css";
export default function SmallItem(props) {
  // const [data, setData] = useState(props);
  // useEffect(() => {
  //   setData(props);
  // }, [props]);
  return (
    <div className={classes.item}>
      <div className={classes.title}>{props.title}</div>
      {props.content && <div className={classes.content}>{props.content}</div>}
    </div>
  );
}
