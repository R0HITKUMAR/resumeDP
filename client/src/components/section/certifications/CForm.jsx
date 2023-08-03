import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from "../../dashboard/SweetAlert";

export default function CForm(props) {
  const navigate = useNavigate();

  const [Cdata, setCdata] = React.useState({
    title: "",
    no: "",
    issued_by: "",
    issued_on: "",
    verify: "",
    view: "",
    email: props.email,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCdata({
      ...Cdata,
      [name]: value,
    });
  };

  const addCertificate = () => {
    if (
      Cdata.title !== "" &&
      Cdata.issued_by !== "" &&
      Cdata.issued_on !== "" 
    ) {
      axios
        .post("https://resumedps.aboutrohit.in/certificate/add", Cdata)
        .then((res) => {
          Toast.fire({
            icon: "success",
            title: res.data.message,
          });
          navigate("/certifications");
        })
        .catch((err) => {
          Toast.fire({
            icon: "error",
            title: "Some Fields are Empty",
          });
          console.log(err);
        });
    } else {
      Toast.fire({
        icon: "error",
        title: "Oops... Something went wrong!",
      });
    }
  };

  return (
    <div className="col-md-6 col-12 certificate-form">
      <div className="box-info">
        <div className="box-content">
          <div className="box-info-head">
            <span className="badge text-bg-success">
              <input
                type="text"
                name="issued_on"
                value={Cdata.issued_on}
                onChange={handleChange}
                placeholder="Issued On"
              />
            </span>
            <h5>
              <input
                type="text"
                name="title"
                value={Cdata.title}
                onChange={handleChange}
                placeholder="Enter Certificate Title"
              />
            </h5>
            <span className="badge text-bg-success no">
              <input
                type="text"
                name="no"
                value={Cdata.no}
                onChange={handleChange}
                placeholder="Enter Certificate No."
              />
            </span>
          </div>
          <div className="box-info-body">
            <p>
              Issued By :
              <input
                type="text"
                name="issued_by"
                value={Cdata.issued_by}
                onChange={handleChange}
                placeholder="Enter Issuing Authority Name"
              />
            </p>
            <p>
              Verify URL:
              <input
                type="text"
                name="verify"
                value={Cdata.verify}
                onChange={handleChange}
                placeholder="Enter Verification URL"
              />
            </p>
            <br />
          </div>
          <div className="box-info-footer">
            <button onClick={() => navigate("/certifications")}>
              <i className="fa fa-duotone fa-x"></i>
            </button>
            <button onClick={addCertificate}>
              <i className="fa fa-duotone fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
