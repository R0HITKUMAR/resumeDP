import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UC from "../../../assets/img/under-conc.svg";

export default function ICard(props) {
  const navigate = useNavigate();
  const [Intro, setIntro] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(
        `https://resumedps.aboutrohit.in/introduction/retrieve/${props.email}`
      )
      .then((res) => {
        setIntro(res.data);
        if (res.data.name === undefined) {
          navigate("/home/intro/addIntro");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.email]);

  return (
    <>
      <div className="col-12 intro">
        <div className="box-info">
          <div className="box-content">
            <div className="box-info-head text-center">
              <h1>{Intro.name}</h1>
              {Intro.position && (
                <p className="justify-content-center text-center">
                  ({Intro.position})
                </p>
              )}
              {Intro.email && Intro.phone && Intro.address && (
                <p className="justify-content-center text-center">
                  {Intro.email}| {Intro.phone}|{Intro.address}
                </p>
              )}
              {Intro.careerObjective && (
                <p className="justify-content-center text-center">
                  {Intro.careerObjective}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-12 social">
        <div className="box-info">
          <div className="box-content">
            <div className="box-info-head text-center">
              <h5>Social Links</h5>
            </div>
            <div className="box-info-body">
              <div className="social-link row">
                <div className="col-10">
                  {Intro.link1N}
                  <br />
                  {Intro.link2N}
                  <br />
                  {Intro.link3N}
                  <br />
                  {Intro.link4N}
                  <br />
                </div>
                <div className="col-2">
                  {Intro.link1 && (
                    <a
                      href={Intro.link1}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit
                    </a>
                  )}
                  <br />
                  {Intro.link2 && (
                    <a
                      href={Intro.link2}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit
                    </a>
                  )}
                  <br />
                  {Intro.link3 && (
                    <a
                      href={Intro.link3}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit
                    </a>
                  )}
                  <br />
                  {Intro.link4 && (
                    <a
                      href={Intro.link4}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit
                    </a>
                  )}
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-12 resume">
        <div className="box-info">
          <div className="box-content">
            <div className="box-info-head text-center">
              <h5>Generated Resume</h5>
            </div>
            <div className="box-info-body">
              <div className="resume-archive text-center justify-content-center">
                <img src={UC} alt="UC" height={"200px"} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="box-info-footer">
        <button onClick={() => navigate("/home/intro/updateIntro")}>
          <i className="fa fa-duotone fa-edit"></i>
        </button>
      </div>
    </>
  );
}
