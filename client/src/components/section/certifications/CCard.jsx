import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toast from "../../dashboard/SweetAlert";

export default function CCard({ Certificate }) {
  const navigate = useNavigate();

  const deleteCertificate = () => {
    axios
      .delete(
        `http://localhost:5000/certificate/delete/${Certificate._id}`
      )
      .then((res) => {
        Toast.fire({
          icon: "success",
          title: res.data.message,
        });
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: err.response.data.message,
        });
      });
  };

  return (
    <div className="col-md-6 col-12">
      <div className="box-info">
        <div className="box-content">
          <div className="box-info-head">
            <span className="badge text-bg-success">
              {Certificate.issued_on}
            </span>
            <h5>{Certificate.title}</h5>
            <span className="badge text-bg-success">
              Certificate No: {Certificate.no}
            </span>
          </div>
          <div className="box-info-body">
            <p>Issued By : {Certificate.issued_by}</p>
          </div>
          <div className="box-info-footer">
            <a href={Certificate.verify} target="_blank" rel="noopener noreferrer">
              <i className="fa fa-duotone fa-arrow-up-right-from-square"></i>
            </a>
            <button
              onClick={() =>
                navigate(
                  `/home/certifications/updateCertificate/${Certificate._id}`
                )
              }
            >
              <i className="fa fa-duotone fa-edit"></i>
            </button>
            <a href={Certificate.view} target="_blank" rel="noopener noreferrer">
              <i className="fa fa-duotone fa-eye"></i>
            </a>
            <button onClick={deleteCertificate}>
              <i className="fa fa-duotone fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
