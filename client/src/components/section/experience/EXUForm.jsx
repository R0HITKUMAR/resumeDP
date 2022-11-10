import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Toast from "../../dashboard/SweetAlert";

export default function EUForm() {
  const navigate = useNavigate();
  const { hash } = useParams();
  const [EXdata, setEXdata] = React.useState({});

  React.useEffect(() => {
    axios
      .get(`http://localhost:5000/experience/retrieveOne/${hash}`)
      .then((res) => {
        setEXdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [hash]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEXdata({ ...EXdata, [name]: value });
  };

  const updateExperience = () => {
    axios
      .put(`http://localhost:5000/experience/update/${hash}`, EXdata)
      .then((res) => {
        Toast.fire({
          icon: "success",
          title: "Experience Updated Successfully",
        });
        navigate("/home/experience");
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
    <div className="col-md-6 col-12 experience-form">
      <div className="box-info">
        <div className="box-content">
          <div className="box-info-head">
            <span className="badge text-bg-success">
              <input
                type="text"
                name="duration"
                value={EXdata.duration}
                onChange={handleChange}
                placeholder="Enter Duration"
              />
            </span>
            <h5>
              <input
                type="text"
                name="position"
                value={EXdata.position}
                onChange={handleChange}
                placeholder="Enter Position / Role"
              />
            </h5>
            <span className="badge text-bg-success company">
              <input
                type="select"
                name="company"
                value={EXdata.company}
                onChange={handleChange}
                placeholder="Enter Company Name"
              />
            </span>
          </div>
          <div className="box-info-body">
            <p>
              Type :{" "}
              <span className="badge text-bg-warning">
                <input
                  type="text"
                  name="type"
                  value={EXdata.type}
                  onChange={handleChange}
                  placeholder="Enter Employment Type"
                />
              </span>
            </p>
            <p>
              Description : <br />
              <input
                type="text"
                name="des"
                value={EXdata.des}
                onChange={handleChange}
                placeholder="Enter Description"
              />
            </p>
          </div>
          <div className="box-info-footer">
            <button onClick={() => navigate("/home/experience")}>
              <i className="fa fa-duotone fa-x"></i>
            </button>
            <button onClick={updateExperience}>
              <i className="fa fa-duotone fa-check"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
