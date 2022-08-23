import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Main from "./Main";
import Login from "../auth/Login";
import Reset from "../auth/Reset";
import Register from "../auth/Register";
import Dashboard from "../dashboard/Dashboard";
import axios from "axios";
import Resume from "../builder/Resume";
import Profile from "../profile/Profile";

export default function Home() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");

  const setUser = (email) => {
    setEmail(email);
  };

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const path = window.location.pathname;
    axios
      .get(`https://resumedp.herokuapp.com/auth/validate/${token}`)
      .then((res) => {
        if (res.data.isLogged) {
          setUser(res.data.email);
          if (
            path === "/" ||
            path === "/login" ||
            path === "/register" ||
            path === "/resetPassword"
          ) {
            navigate("/home");
          }
        } else {
          console.log("Failed to Authenticate");
          if (
            path === "/login" ||
            path === "/register" ||
            path === "/resetPassword" ||
            path === "/resume"
          ) {
            navigate(path);
          } else {
            navigate("/");
          }
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/home/*" element={email && <Dashboard email={email} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/resetPassword" element={<Reset />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/user/:userName" element={<Profile />} />
      </Routes>
    </>
  );
}
