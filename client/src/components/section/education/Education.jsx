import React from "react";
import axios from "axios";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./Education.css";
import NoRecord from "../norecord/NoRecord";
import Loader from "../loader/Loader";
import ECard from "./ECard";
import EForm from "./EForm";
import EUForm from "./EUForm";

export default function Experience(props) {
  const navigate = useNavigate();

  const [Education, setEducation] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    axios
      .get(`http://localhost:5000/education/retrieveAll/${props.email}`)
      .then((res) => {
        setEducation(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [Education]);

  return (
    <section id="education">
      <div className="head-title">
        <div className="left">
          <h1>Education</h1>
        </div>
        <div className="right">
          <button
            onClick={() => {
              navigate("/education/addEducation");
            }}
            className="badge rounded-pill text-bg-primary"
          >
            Add Education
          </button>
        </div>
      </div>
      <div className="education-cards">
        <div className="row">
          <Routes>
            <Route
              exact
              path="/addEducation"
              element={<EForm email={props.email} />}
            />
            <Route path="/updateEducation/:hash" element={<EUForm />} />
          </Routes>
          {!isLoading ? (
            <>
              {Education.length > 0 ? (
                Education.map((education, index) => {
                  return <ECard Education={education} key={index} />;
                })
              ) : (
                <NoRecord />
              )}
            </>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </section>
  );
}
