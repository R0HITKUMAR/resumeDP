import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./Home.css";

export default function Home(props) {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`https://resumedps.aboutrohit.in/dashboard/${props.email}/get`)
      .then((res) => {
        setDashboard(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const Dashboard = [
    {
      title: "Certifications",
      val: dashboard.ccertificates,
      icon: "fa-certificate",
    },
    { title: "Projects", val: dashboard.cprojects, icon: "fa-microchip" },
    {
      title: "Achievements",
      val: dashboard.cachievements,
      icon: "fa-screwdriver-wrench",
    },
    { title: "Profile Views", val: "50", icon: "fa-eye" },
  ];

  return (
    <section id="home">
      <div className="head-title">
        <div className="left">
          <h1>Dashboard</h1>
        </div>
        <div className="right">
          <button
            onClick={() => navigate("/resume")}
            className="badge rounded-pill text-bg-primary"
          >
            Download Latest Resume
          </button>
        </div>
      </div>
      <div className="box">
        <ul className="box-info count">
          {Dashboard.map((item, index) => {
            return (
              <li key={index}>
                <i className={`fa fa-duotone ${item.icon}`} />
                <span className="text">
                  <h3>{item.val}</h3>
                  <p>{item.title}</p>
                </span>
              </li>
            );
          })}
        </ul>
        <ul className="box-info">
          <li>
            <i className="fa fa-duotone fa-certificate" />
            <span className="text">
              <h3>Recent Certificates</h3>
              <p>Coming Soon..</p>
            </span>
          </li>
          <li>
            <i className="fa fa-duotone fa-microchip" />
            <span className="text">
              <h3>Recent Projects</h3>
              <p>Coming Soon..</p>
            </span>
          </li>
          <li>
            <i className="fa fa-duotone fa-microchip" />
            <span className="text">
              <h3>Logged in As:</h3>
              <p>
                {props.userName}
                <br />
                {props.email}
              </p>
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}
