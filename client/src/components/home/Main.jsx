import React from "react";
import "./Main.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo/logo-full-nobg-dark.svg";

export default function Main({ setUser }) {
  const navigate = useNavigate();

  const sampleLogin = () => {
    alert(
      "You are now logged in as a sample user\nOn Refreshing the page, you will be logged out\nTo login as a sample user again, click on 'Sample' button\nTo login as a new user, click on 'Sign Up' button"
    );
    setUser({
      email: "r.k2962002@gmail.com",
      userName: "R0HITKUMAR",
    });
  };

  return (
    <>
      <section id="main-landing" className="text-light text-center">
        <img src={logo} alt="logo" className="logo img-fluid" />
        <br></br>
        <button className="btn" onClick={() => navigate("/login")}>
          Login
        </button>
        <button className="btn" onClick={() => navigate("/register")}>
          Sign Up
        </button>
        <br />
        <p className="m-0" style={{ fontFamily: "inherit" }}>
          Try the Builder
          <a
            href="javascript:void(0)"
            className="mx-2"
            onClick={sampleLogin}
            style={{ textDecoration: "none", color: "white" }}
          >
            <u>Click Here</u>
          </a>
        </p>
        <div className="footer bottom-fixed bottom-0 text-center text-light mt-3">
          <p className="m-0" style={{ fontFamily: "monospace" }}>
            Developed, Made and Hosted with ❤️ by{" "}
            <a
              href="https://aboutrohit.in"
              style={{ textDecoration: "none", color: "white" }}
              target="_blank"
              rel="noreferrer"
            >
              Rohit Kumar
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
