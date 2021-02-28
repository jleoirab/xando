import React from "react";
import Container from 'react-bootstrap/Container';

interface StatusToastProp {
  message?: string;
  display: boolean;
}


const StatusToast: React.FC<StatusToastProp> = (props: StatusToastProp) => (
  <div className={`statusToastContainer ${props.display ? "statusToastContainer_visible" : ""}`}>
    {props.message}
  </div>
)

export default StatusToast;