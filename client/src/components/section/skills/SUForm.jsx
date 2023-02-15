import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toast from "../../dashboard/SweetAlert";

export default function SUForm(props) {
  const navigate = useNavigate();
  const [skill, setSkill] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`/skill/retrieve/${props.email}`)
      .then((res) => {
        setSkill(res.data);
        if (res.data.technical === undefined) {
          navigate("http://localhost:5000/skills/addSkills");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.email]);

  const handleChange = (e) => {
    setSkill({ ...skill, [e.target.name]: e.target.value });
  };

  const updateSkills = () => {
    axios
      .put(`http://localhost:5000/skill/update/${skill._id}`, skill)
      .then((res) => {
        Toast.fire({
          icon: "success",
          title: "Skills updated successfully",
        });
        navigate("/skills");
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: err.response.data.message,
        });
      });
  };

  return (
    <>
      <div className="col-md-6 col-12">
        <div className="box-info">
          <div className="box-content">
            <div className="box-info-head text-center">
              <h5>Technical Skills</h5>
            </div>
            <div className="box-info-body">
              <textarea
                type="text"
                name="technical"
                onChange={handleChange}
                value={skill.technical}
                rows={5}
              ></textarea>
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
              <textarea
                type="text"
                name="hobbies"
                onChange={handleChange}
                value={skill.hobbies}
                rows={5}
              ></textarea>
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
              <textarea
                type="text"
                name="language"
                onChange={handleChange}
                value={skill.language}
                rows={5}
              ></textarea>
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
              <textarea
                type="text"
                name="extra_curricular"
                onChange={handleChange}
                value={skill.extra_curricular}
                rows={5}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div className="box-info-footer">
        <button onClick={updateSkills}>
          <i className="fa fa-duotone fa-check"></i>
        </button>
      </div>
    </>
  );
}
