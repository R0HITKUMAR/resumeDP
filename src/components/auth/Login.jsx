import React from "react";
import axios from "axios";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import { showPassword } from "./Auth.js";
import img from "../../assets/img/login.svg";

export default function Login(props) {
  const navigate = useNavigate();
  const [alert, setAlert] = React.useState("");
  const [flag, setFlag] = React.useState(false);
  const [checkbox, setCheckbox] = React.useState(false);
  const [User, setUser] = React.useState({
    email: localStorage.getItem("resumeDPE"),
    password: localStorage.getItem("resumeDPP"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...User,
      [name]: value,
    });
    setAlert("");
    if (name === "email") {
      if (value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
        e.target.style.borderColor = "green";
        setFlag(true);
      } else {
        e.target.style.borderColor = "red";
        setFlag(false);
      }
    } else if (name === "password") {
      if (value.length < 6) {
        e.target.style.borderColor = "red";
        setFlag(false);
      } else {
        e.target.style.borderColor = "green";
        setFlag(true);
      }
    }
  };

  function Login(e) {
    e.preventDefault();
    if (User.email && User.password && flag) {
      axios
        .post("https://resumedp.herokuapp.com/auth/login", User)
        .then((res) => {
          setAlert(res.data.message);
          if (res.data.message === "Logged In Successfully") {
            checkbox && localStorage.setItem("resumeDPE", User.email);
            checkbox && localStorage.setItem("resumeDPP", User.password);
            props.setUser(res.data.email);
            setUser({
              email: "",
              password: "",
            });

            localStorage.setItem("token", res.data.token);
            navigate("/home");
          }
        })
        .catch((err) => {
          setAlert(err.response.data.message);
        });
    } else {
      setAlert("Please fill all fields Correctly!");
    }
  }

  return (
    <div class="main">
      <section id="login">
        <div className="container">
          <div className="form-content">
            <div className="form-image">
              <figure>
                <img src={img} alt="Get Started with Resumee" />
              </figure>
            </div>
            <div className="form">
              <h2 className="form-title">Login</h2>
              <p className="form-alert">&nbsp;{alert}</p>
              <form className="main-form mt-5">
                <div className="form-group">
                  <label>
                    <i className="zmdi zmdi-account material-icons-name" />
                  </label>
                  <input
                    type="text"
                    name="email"
                    onChange={handleChange}
                    value={User.email}
                    placeholder="Email"
                  />
                </div>
                <div className="form-group flex">
                  <label>
                    <i className="zmdi zmdi-lock" />
                  </label>
                  <label style={{ marginLeft: "90%" }}>
                    <i
                      className="fa fa-duotone fa-eye"
                      onClick={() => showPassword(0)}
                      style={{ cursor: "pointer" }}
                    />
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={User.password}
                    placeholder="Password"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="checkbox"
                    name="remember-me"
                    id="remember-me"
                    className="agree-term"
                    onChange={() => setCheckbox(!checkbox)}
                  />
                  <label for="remember-me" className="label-agree-term">
                    <span>
                      <span />
                    </span>
                    Remember me
                  </label>
                  <span
                    onClick={() => navigate("/resetPassword")}
                    className="form-switch"
                    style={{ float: "right", cursor: "pointer" }}
                  >
                    Reset Password
                  </span>
                </div>
                <div className="form-button text-center">
                  <button type="submit" onClick={Login} className="main-btn">
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/register")}
                    className="form-switch"
                  >
                    Create an account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
