import React from "react";
import axios from "axios";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./Introduction.css";
import ICard from "./ICard";
import IForm from "./IForm";
import IUForm from "./IUForm";

export default function Introduction(props) {
  const navigate = useNavigate();

  React.useEffect(() => {
    axios
      .get(`http://localhost:5000/introduction/retrieve/${props.email}`)
      .then((res) => {
        if (res.data.name === undefined) {
          navigate("/home/intro/addIntro");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.email]);

  return (
    <section id="introduction">
      <div className="head-title">
        <div className="left">
          <h1>Introduction</h1>
        </div>
        <div className="right">
          <button
            onClick={() => {
              navigate("/resume");
            }}
            className="badge rounded-pill text-bg-primary"
          >
            Resume
          </button>
        </div>
      </div>
      <div className="introduction-card">
        <div className="row">
          <Routes>
            <Route exact path="/" element={<ICard email={props.email} />} />
            <Route path="/addIntro" element={<IForm email={props.email} />} />
            <Route
              path="/updateIntro"
              element={<IUForm email={props.email} />}
            />
          </Routes>
        </div>
      </div>
    </section>
  );
}
