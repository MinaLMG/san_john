import { useEffect, useState } from "react";
import classes from "./ShowPersonDataItem.module.css";
import SmallItem from "./SmallItem";
export default function ShowPersonDataItem(props) {
  // const [data, setData] = useState(props);
  // useEffect(() => {
  //   setData(props);
  // }, [props]);
  return (
    <div className={classes.data}>
      <SmallItem title={props.title} content={props.content}></SmallItem>
    </div>
  );
}
