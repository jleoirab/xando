import React from "react";
import Container from 'react-bootstrap/Container';

interface StatusToastProp {
  message?: string;
}


const StatusToast: React.FC<StatusToastProp> = (props: StatusToastProp) => {
  const display = (!!props.message || !!props.message?.trim().length);

  return (
    <div className={`statusToastContainer ${display ? "statusToastContainer_visible" : ""}`}>
      {props.message}
    </div>
  );
}

export default StatusToast;