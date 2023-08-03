import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Main from "./Main";
import Login from "../auth/Login";
import Reset from "../auth/Reset";
import Register from "../auth/Register";
import Dashboard from "../dashboard/Dashboard";
import axios from "axios";
import Resume from "../builder/Resume";

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState({
    email: "",
    userName: "",
  });

  const setUserDetails = (email, userName) => {
    setUser({
      email: email,
      userName: userName,
    });
  };

  React.useEffect(() => {
    axios.get("https://resumedps.aboutrohit.in").then((res) => {
      console.log(res);
    });
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const path = window.location.pathname;
    axios
      .get(`https://resumedps.aboutrohit.in/auth/validate/${token}`)
      .then((res) => {
        if (res.data.isLogged) {
          setUserDetails(res.data.email, res.data.userName);
          if (
            path === "/" ||
            path === "/login" ||
            path === "/register" ||
            path === "/resetPassword"
          ) {
            navigate("/");
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
        <Route path="/*" element={user.email ? <Dashboard user={user} /> : <Main setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUserDetails} />} />
        <Route path="/resetPassword" element={<Reset />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/resume"
          element={user.email && <Resume email={user.email} />}
        />
      </Routes>
    </>
  );
}
