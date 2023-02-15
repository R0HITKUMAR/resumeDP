import React from "react";
import "./Main.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo/logo-full-nobg-dark.svg"

export default function Main({ setUser }) {

  const navigate = useNavigate();

  const sampleLogin = () => {
    alert("You are now logged in as a sample user\nOn Refreshing the page, you will be logged out\nTo login as a sample user again, click on 'Sample' button\nTo login as a new user, click on 'Sign Up' button")
    setUser({
      email: "r.k2962002@gmail.com",
      userName: "R0HITKUMAR",
    })
  }

  return (
    <section id="main-landing" className="text-light text-center">
      <img src={logo} alt="logo" className="logo img-fluid" /><br></br>
      <button className="btn" onClick={() => navigate("/login")}>Login</button>
      <button className="btn" onClick={() => navigate("/register")}>Sign Up</button>
      <button className="btn" onClick={sampleLogin}>Sample</button>
    </section>
  );
}
