import React from "react";
import axios from "axios";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./Skills.css";
import SCard from "./SCard";
import SForm from "./SForm";
import SUForm from "./SUForm";

export default function Skills(props) {
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
  }, [skills]);

  return (
    <section id="skills">
      <div className="head-title">
        <div className="left">
          <h1>Skills</h1>
        </div>
        <div className="right"></div>
      </div>
      <div className="skills-cards">
        <div className="row">
          <Routes>
            <Route exact path="/" element={<SCard email={props.email} />} />
            <Route path="/addSkills" element={<SForm email={props.email} />} />
            <Route
              path="/updateSkills"
              element={<SUForm email={props.email} />}
            />
          </Routes>
        </div>
      </div>
    </section>
  );
}
