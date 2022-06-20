import React from "react";

const AlertPopUp = () => {
  return (
    <div className="alert-popup">
      <div className="alert-popup__container">
        <span className="close-icon" onClick={props.handleClose}>
          x
        </span>
        {props.content}
      </div>
    </div>
  );
};

export default AlertPopUp;
