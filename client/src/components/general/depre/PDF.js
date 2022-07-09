import React from "react";
import Pdf from "react-to-pdf";

const ref = React.createRef();
export default function PDF(props) {
  return (
    <>
      <div className="Post" ref={ref}>
        hi
      </div>
      <Pdf targetRef={ref} fileName="post.pdf">
        {({ toPdf }) => <button onClick={toPdf}>get pdf</button>}
      </Pdf>
    </>
  );
}
