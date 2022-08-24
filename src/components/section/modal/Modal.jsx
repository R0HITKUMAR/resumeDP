import React from "react";
import "./Modal.css";
import Resume from "../../builder/Resume";

export default function Modal(props) {
  if (props.status) {
    document.body.style.overflow = "hidden";
  }
  const handleClose = () => {
    props.setModal(false);
    document.body.style.overflow = "auto";
  };

  return (
    <div
      className="modal show fade"
      style={{ display: props.status ? "block" : "none" }}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
    >
      <button
        onClick={handleClose}
        type="button"
        className="p-2"
        style={{ float: "right" }}
      >
        <i className="fa fa-solid fa-x"></i>
      </button>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-body">
            <Resume email={props.email} />
          </div>
        </div>
      </div>
    </div>
  );
}
