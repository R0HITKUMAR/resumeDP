import React from "react";
import axios from "axios";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./Projects.css";
import NoRecord from "../norecord/NoRecord";
import Loader from "../loader/Loader";
import PCard from "./PCard";
import PForm from "./PForm";
import PUForm from "./PUForm";

export default function Projects(props) {
  const navigate = useNavigate();
  const [Projects, setProjects] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    axios
      .get(`https://resumedp.herokuapp.com/project/retrieveAll/${props.email}`)
      .then((res) => {
        setProjects(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [Projects]);

  return (
    <section id="projects">
      <div className="head-title">
        <div className="left">
          <h1>Projects</h1>
        </div>
        <div className="right">
          <button
            onClick={() => {
              navigate("/home/projects/addProject");
            }}
            className="badge rounded-pill text-bg-primary"
          >
            Add Project
          </button>
        </div>
      </div>
      <div className="project-cards">
        <div className="row">
          <Routes>
            <Route
              exact
              path="/addProject"
              element={<PForm email={props.email} />}
            />
            <Route path="/updateProject/:hash" element={<PUForm />} />
          </Routes>
          {!isLoading ? (
            <>
              {Projects.length > 0 ? (
                Projects.map((project, index) => {
                  return <PCard Project={project} key={index} />;
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
