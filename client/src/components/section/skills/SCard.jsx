import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SCard(props) {
  const navigate = useNavigate();
  const [skills, setskills] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`http://localhost:5000/skill/retrieve/${props.email}`)
      .then((res) => {
        setskills(res.data);
        if (res.data.technical === undefined) {
          navigate("/skills/addSkills");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.email]);

  return (
    <>
      <div className="col-md-6 col-12">
        <div className="box-info">
          <div className="box-content">
            <div className="box-info-head text-center">
              <h5>Technical Skills</h5>
            </div>
            <div className="box-info-body">
              <h6>
                {skills.technical &&
                  skills.technical.split(",").map((skill, index) => {
                    return <span class="badge text-bg-warning m-1">{skill}</span>;
                  })}
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-12">
        <div className="box-info">
          <div className="box-content">
            <div className="box-info-head text-center">
              <h5>Hobbies</h5>
            </div>
            <div className="box-info-body">
              <h6>{skills.hobbies &&
                  skills.hobbies.split(",").map((skill, index) => {
                    return <span class="badge text-bg-warning m-1">{skill}</span>;
                  })}</h6>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-12">
        <div className="box-info">
          <div className="box-content">
            <div className="box-info-head text-center">
              <h5>Language Known</h5>
            </div>
            <div className="box-info-body">
              <h6>{skills.language &&
                  skills.language.split(",").map((skill, index) => {
                    return <span class="badge text-bg-warning m-1">{skill}</span>;
                  })}</h6>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-12">
        <div className="box-info">
          <div className="box-content">
            <div className="box-info-head text-center">
              <h5>Extra Curricular</h5>
            </div>
            <div className="box-info-body">
              <h6>{skills.extra_curricular &&
                  skills.extra_curricular.split(",").map((skill, index) => {
                    return <span class="badge text-bg-warning m-1">{skill}</span>;
                  })}</h6>
            </div>
          </div>
        </div>
      </div>
      <div className="box-info-footer">
        <button onClick={() => navigate("/skills/updateSkills")}>
          <i className="fa fa-duotone fa-edit"></i>
        </button>
      </div>
    </>
  );
}
