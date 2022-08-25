import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Toast from "../../dashboard/SweetAlert";

export default function EUForm() {
  const navigate = useNavigate();
  const { hash } = useParams();
  const [Edata, setEdata] = React.useState({});
  React.useEffect(() => {
    axios
      .get(`https://resumedp.herokuapp.com/education/retrieveOne/${hash}`)
      .then((res) => {
        setEdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [hash]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEdata({ ...Edata, [name]: value });
  };

  const updateProject = () => {
    axios
      .put(`https://resumedp.herokuapp.com/education/update/${hash}`, Edata)
      .then((res) => {
        Toast.fire({
          icon: "success",
          title: "Education Updated Successfully",
        });
        navigate("/home/education");
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
    <div className="col-md-6 col-12 education-form">
      <div className="box-info">
        <div className="box-content">
          <div className="box-info-head">
            <span className="badge text-bg-success">
              <input
                type="text"
                name="year"
                value={Edata.year}
                onChange={handleChange}
                placeholder="Enter Year"
              />
            </span>
            <h5>
              <input
                type="text"
                name="degree"
                value={Edata.degree}
                onChange={handleChange}
                placeholder="Enter Degree/Course Name"
              />
              <input
                type="text"
                name="field"
                value={Edata.field}
                onChange={handleChange}
                placeholder="Enter Specialization/Field Name"
              />
            </h5>
            <span className="badge text-bg-success school">
              <input
                type="text"
                name="school"
                value={Edata.school}
                onChange={handleChange}
                placeholder="Enter College / School Name"
              />
            </span>
          </div>
          <div className="box-info-body">
            <p>
              Score :
              <span className="badge text-bg-warning">
                <input
                  type="text"
                  name="grade"
                  value={Edata.grade}
                  onChange={handleChange}
                  placeholder="Enter Score"
                />
              </span>
            </p>
            <p>
              Affilation :{" "}
              <input
                type="text"
                name="affiliation"
                value={Edata.affiliation}
                onChange={handleChange}
                placeholder="Enter Affilating Agency Name"
              />
            </p>
            <p>
              Description : <br />
              <input
                type="text"
                name="des"
                value={Edata.des}
                onChange={handleChange}
                placeholder="Enter Description"
              />
            </p>
          </div>
          <div className="box-info-footer">
            <button onClick={() => navigate("/home/education")}>
              <i className="fa fa-duotone fa-x"></i>
            </button>
            <button onClick={updateProject}>
              <i className="fa fa-duotone fa-check"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
