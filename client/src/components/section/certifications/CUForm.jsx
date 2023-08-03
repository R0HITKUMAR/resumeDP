import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Toast from "../../dashboard/SweetAlert";

export default function CUForm() {
  const navigate = useNavigate();

  const [Cdata, setCdata] = React.useState({});
  const { hash } = useParams();

  React.useEffect(() => {
    axios
      .get(`https://resumedps.aboutrohit.in/certificate/retrieveOne/${hash}`)
      .then((res) => {
        setCdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [hash]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCdata({
      ...Cdata,
      [name]: value,
    });
  };

  const updateCertificate = () => {
    axios
      .put(`https://resumedps.aboutrohit.in/certificate/update/${hash}`, Cdata)
      .then((res) => {
        Toast.fire({
          icon: "success",
          title: "Certificate Updated Successfully",
        });
        navigate("/certifications");
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: "Oops... Something went wrong!",
        });
        console.log(err);
      });
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
                placeholder="Enter Certififcate Title"
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
          </div>
          <div className="box-info-footer">
            <button onClick={() => navigate("/certifications")}>
              <i className="fa fa-duotone fa-x"></i>
            </button>
            <button onClick={updateCertificate}>
              <i className="fa fa-duotone fa-check"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
