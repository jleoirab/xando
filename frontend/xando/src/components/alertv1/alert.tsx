import React from "react";
import {FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import './alert.css'

interface AlertProps {
  onClose(): void;
  show: boolean;
  message: string;
  title: string;
}

export const AlertV1: React.FC<AlertProps> = (props: AlertProps) => {
  if (!props.show) return (null);

  return (
    <div className="alert-v1">
      <div className="alert-title">{props.title}
        <span className="close-icon" onClick={() => {props.onClose()}}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
      </div>
      <div className="alert-message">{props.message}</div>
    </div>
  );
}
