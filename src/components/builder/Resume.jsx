import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Resume.css";

export default function Resume(props) {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [Intro, setIntro] = React.useState([]);
  const [Education, setEducation] = React.useState([]);
  const [Projects, setProjects] = React.useState([]);
  const [Experience, setExperience] = React.useState([]);
  const [Certificates, setCertificates] = React.useState([]);
  const [Achievements, setAchievements] = React.useState([]);
  const [skills, setskills] = React.useState([]);
  const path = window.location.pathname;

  React.useEffect(() => {
    setEmail(props.email);
    axios
      .get(`https://resumedps.aboutrohit.in/introduction/retrieve/${email}`)
      .then((res) => {
        setIntro(res.data);
      });
    axios
      .get(`https://resumedps.aboutrohit.in/education/retrieveAll/${email}`)
      .then((res) => {
        setEducation(res.data);
      });
    axios
      .get(`https://resumedps.aboutrohit.in/project/retrieveAll/${email}`)
      .then((res) => {
        setProjects(res.data);
      });
    axios
      .get(`https://resumedps.aboutrohit.in/certificate/retrieveAll/${email}`)
      .then((res) => {
        setCertificates(res.data);
      });
    axios
      .get(`https://resumedps.aboutrohit.in/achievement/retrieveAll/${email}`)
      .then((res) => {
        setAchievements(res.data);
      });
    axios
      .get(`https://resumedps.aboutrohit.in/skill/retrieve/${email}`)
      .then((res) => {
        setskills(res.data);
      });
    axios
      .get(`https://resumedps.aboutrohit.in/experience/retrieveAll/${email}`)
      .then((res) => {
        setExperience(res.data);
      });
  }, [email]);

  return (
    <>
      {path !== "/resume" ? (
        <button
          className="m-2"
          style={{ float: "right" }}
          onClick={() => {
            navigate("/resume");
          }}
        >
          <i class="fa-solid fa-print"></i>
        </button>
      ) : (
        ""
      )}

      <section id="resume">
        <div className="resume-container p-2">
          <div className="resume-header text-center">
            <h5>{Intro.name}</h5>
            <h6> ({Intro.position})</h6>
            <p>
              {Intro.email} | {Intro.phone} | {Intro.address}
              <br />({Intro.careerObjective})
            </p>
          </div>
          <div className="row resume-body mt-3">
            <div className="col-4">
              <div className="resume-item education">
                <h6>Education</h6>
                {Education &&
                  Education.map((education, index) => {
                    return (
                      <div className="row" key={index}>
                        <div className="col-8 education-title">
                          {education.degree} / {education.field}
                        </div>
                        <div className="col-4 education-year d-flex flex-row-reverse">
                          {education.year}
                        </div>
                        <div className="col-12 d-flex flex-row-reverse">
                          {education.school}
                        </div>
                        <div className="col-12 d-flex flex-row-reverse">
                          Score : {education.grade}
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="resume-item skills">
                <h6>Skills</h6>
                <p>
                  {skills.technical &&
                    skills.technical.split(",").map((skill, index) => {
                      return <span class="badge">{skill}</span>;
                    })}
                </p>
              </div>
              <div className="resume-item language">
                <h6>Language Known</h6>
                <p>
                  {skills.language &&
                    skills.language.split(",").map((skill, index) => {
                      return <span class="badge">{skill}</span>;
                    })}
                </p>
              </div>
              <div className="resume-item hobbies">
                <h6>Hobbies</h6>
                <p>
                  {skills.hobbies &&
                    skills.hobbies.split(",").map((skill, index) => {
                      return <span class="badge">{skill}</span>;
                    })}
                </p>
              </div>
              <div className="resume-item extra-curr">
                <h6>Extra Curriclular</h6>
                <p>
                  {skills.extra_curricular &&
                    skills.extra_curricular.split(",").map((skill, index) => {
                      return <span class="badge">{skill}</span>;
                    })}
                </p>
              </div>
              <div className="resume-item links">
                <h6>Links</h6>
                <a href={Intro.link1}>
                  <span class="badge">{Intro.link1N}</span>
                </a>
                <a href={Intro.link2}>
                  <span class="badge">{Intro.link2N}</span>
                </a>
                <a href={Intro.link3}>
                  <span class="badge">{Intro.link3N}</span>
                </a>
                <a href={Intro.link4}>
                  <span class="badge">{Intro.link4N}</span>
                </a>
              </div>
            </div>
            <div className="col-8">
              <div className="resume-item projects">
                <h6>Projects</h6>
                {Projects &&
                  Projects.map((project, index) => {
                    return (
                      <div className="project-item row">
                        <div className="col-12 project-name">
                          {project.name}
                        </div>
                        <div className="col-10 project-technology">
                          ({project.technology})
                        </div>
                        <div className="col-2" style={{ float: "right" }}>
                          {project.duration}
                        </div>
                        <div className="col-12 about-project">
                          <ul>
                            <li>{project.desc}</li>
                            <li>{project.learn}</li>
                            <li>
                              <b>URL: </b>
                              {project.url}
                            </li>
                          </ul>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="resume-item certificates">
                <h6>Certifications</h6>
                <ul>
                  {Certificates &&
                    Certificates.map((certificate, index) => {
                      return (
                        <li>
                          {certificate.title} ({certificate.issued_by}) (
                          {certificate.issued_on})
                        </li>
                      );
                    })}
                </ul>
              </div>
              <div className="resume-item certificates">
                <h6>Achievements</h6>
                <ul>
                  {Achievements &&
                    Achievements.map((achievement, index) => {
                      return (
                        <li>
                          {achievement.title} ({achievement.year})
                        </li>
                      );
                    })}
                </ul>
              </div>
              <div className="resume-item experiences">
                <h6>Organization</h6>
                <div className="row">
                  {Experience &&
                    Experience.map((experience, index) => {
                      return (
                        <div className="col-6">
                          <span className="position">
                            {experience.position}
                          </span>{" "}
                          <br />({experience.company})<br />
                          <span className="badge">{experience.duration}</span>
                          <span className="badge">{experience.type}</span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="row resume-item footer mt-5">
              <h6>
                <span style={{ float: "left" }}>
                  {new Date().toLocaleDateString("en-us", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span style={{ float: "right" }}>{Intro.name}</span>
              </h6>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
