import React from "react";
import axios from "axios";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./Achievements.css";
import ACard from "./ACard";
import AForm from "./AForm";
import AUForm from "./AUForm";
import NoRecord from "../norecord/NoRecord";
import Loader from "../loader/Loader";

export default function Achievements(props) {
  const navigate = useNavigate();
  const [Achievements, setAchievements] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    axios
      .get(`https://resumedp.herokuapp.com/achievement/retrieveAll/${props.email}`)
      .then((res) => {
        setAchievements(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [Achievements]);

  return (
    <section id="achievements">
      <div className="head-title">
        <div className="left">
          <h1>Achievements</h1>
        </div>
        <div className="right">
          <button
            onClick={() => {
              navigate("/home/achievements/addAchievement");
            }}
            className="badge rounded-pill text-bg-primary"
          >
            Add Achievement
          </button>
        </div>
      </div>
      <div className="education-cards">
        <div className="row">
          <Routes>
            <Route
              exact
              path="/addAchievement"
              element={<AForm email={props.email} />}
            />
            <Route path="/updateAchievement/:hash" element={<AUForm />} />
          </Routes>
          {!isLoading ? (
            <>
              {Achievements.length > 0 ? (
                Achievements.map((achievement, index) => {
                  return <ACard Achievement={achievement} key={index} />;
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
