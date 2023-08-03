import React from "react";
import axios from "axios";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./Experience.css";
import NoRecord from "../norecord/NoRecord";
import Loader from "../loader/Loader";
import EXCard from "./EXCard";
import EXForm from "./EXForm";
import EXUForm from "./EXUForm";

export default function Experience(props) {
  const navigate = useNavigate();

  const [Experience, setExperience] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    axios
      .get(`https://resumedps.aboutrohit.in/experience/retrieveAll/${props.email}`)
      .then((res) => {
        setExperience(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [Experience]);

  return (
    <section id="experience">
      <div className="head-title">
        <div className="left">
          <h1>Experiences</h1>
        </div>
        <div className="right">
          <button
            onClick={() => {
              navigate("/experience/addExperience");
            }}
            className="badge rounded-pill text-bg-primary"
          >
            Add Experience
          </button>
        </div>
      </div>
      <div className="experience-cards">
        <div className="row">
          <Routes>
            <Route
              exact
              path="/addExperience"
              element={<EXForm email={props.email} />}
            />
            <Route path="/updateExperience/:hash" element={<EXUForm />} />
          </Routes>
          {!isLoading ? (<>
          {Experience.length > 0 ? (
            Experience.map((Experience, index) => {
              return <EXCard Experience={Experience} key={index} />;
            })
          ) : (
            <NoRecord />
          )}</>) : (<Loader />)}
        </div>
      </div>
    </section>
  );
}
