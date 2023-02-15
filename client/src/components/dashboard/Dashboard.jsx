import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Dashboard.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import Modal from "../section/modal/Modal";
import Home from "../section/home/Home";
import Introduction from "../section/introduction/Introduction";
import Education from "../section/education/Education";
import Experience from "../section/experience/Experience";
import Certifications from "../section/certifications/Certifications";
import Projects from "../section/projects/Projects";
import Achievements from "../section/achievements/Achievements";
import Skills from "../section/skills/Skills";

export default function Dashboard(props) {
  const navigate = useNavigate();
  const [mode, setMode] = React.useState(false);
  const [stoggle, setStoggle] = React.useState(true);
  const [modal, setModal] = React.useState(false);

  mode
    ? document.body.classList.add("dark")
    : document.body.classList.remove("dark");

  function toggle() {
    setStoggle(!stoggle);
  }

  function toggleMode() {
    setMode(!mode);
  }

  async function logout() {
    Swal.fire({
      title: "Logout ?",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        window.location.reload();
      }
    });
  }

  return (
    <>
      <Modal status={modal} setModal={setModal} email={props.user.email} />
      <Sidebar toggle={stoggle} logout={logout} mode={mode} />
      <section id="content">
        <Navbar
          stoggle={toggle}
          logout={logout}
          mtoggle={toggleMode}
          modalT={setModal}
          userName={props.user.userName}
        />
        <main>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Home email={props.user.email} userName={props.user.userName} />
              }
            />
            <Route
              path="/intro/*"
              element={<Introduction email={props.user.email} />}
            />
            <Route
              path="/education/*"
              element={<Education email={props.user.email} />}
            />
            <Route
              path="/experience/*"
              element={<Experience email={props.user.email} />}
            />
            <Route
              path="/certifications/*"
              element={<Certifications email={props.user.email} />}
            />
            <Route
              path="/projects/*"
              element={<Projects email={props.user.email} />}
            />
            <Route
              path="/achievements/*"
              element={<Achievements email={props.user.email} />}
            />
            <Route
              path="/skills/*"
              element={<Skills email={props.user.email} />}
            />
          </Routes>
        </main>
      </section>
    </>
  );
}
