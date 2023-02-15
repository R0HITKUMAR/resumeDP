import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";
import LLM from "../../../assets/img/logo/logo-mini-nobg-light.svg";
import LDM from "../../../assets/img/logo/logo-mini-nobg-dark.svg";
import LDL from "../../../assets/img/logo/logo-full-nobg-dark.svg";
import LLL from "../../../assets/img/logo/logo-full-nobg-light.svg";

export default function Sidebar({ logout, toggle, mode }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [active, setActive] = React.useState("/");

  React.useEffect(() => {
    const path = location.pathname.slice(5);
    // eslint-disable-next-line
    const s = "/" + path.replace(/^\/([^\/]*).*$/, "$1");
    setActive(s);
  }, [location.pathname]);

  const Links = [
    { name: "Home", icon: "fa fa-duotone fa-house", param: "/" },
    {
      name: "Introduction",
      icon: "fa fa-duotone fa-circle-info",
      param: "/intro",
    },
    { name: "Education", icon: "fa fa-duotone fa-school", param: "/education" },
    {
      name: "Experience",
      icon: "fa fa-duotone fa-briefcase",
      param: "/experience",
    },
    {
      name: "Certifications",
      icon: "fa fa-duotone fa-file-certificate",
      param: "/certifications",
    },
    {
      name: "Projects",
      icon: "fa fa-duotone fa-microchip",
      param: "/projects",
    },
    {
      name: "Achievements",
      icon: "fa fa-duotone fa-trophy",
      param: "/achievements",
    },
    {
      name: "Skills",
      icon: "fa fa-duotone fa-screwdriver-wrench",
      param: "/skills",
    },
  ];

  return (
    <section id="sidebar" className={toggle ? "hide" : ""}>
      {mode ? (
        //Dark mode
        <button onClick={() => navigate("/")} className="brand">
          {toggle ? (
            <img src={LDM} alt="logo" className="brand-image-m" />
          ) : (
            <img src={LDL} alt="logo" className="brand-image-lg" />
          )}
        </button>
      ) : (
        // Light Mode
        <button onClick={() => navigate("/")} className="brand">
          {toggle ? (
            <img src={LLM} alt="logo" className="brand-image-m" />
          ) : (
            <img src={LLL} alt="logo" className="brand-image-lg" />
          )}
        </button>
      )}

      <ul className="side-menu top">
        {Links.map((item, index) => {
          return (
            <li className={active === item.param ? "active" : ""} key={index}>
              <button onClick={() => navigate(`${item.param}`)}>
                <i className={item.icon} />
                <span className="text">{item.name}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <ul className="side-menu">
        <li>
          <button onClick={logout}>
            <i className="fa fa-duotone fa-arrow-right-from-bracket" />
            <span className="text">Logout</span>
          </button>
        </li>
      </ul>
    </section>
  );
}
