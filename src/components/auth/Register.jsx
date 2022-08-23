import React from "react";
import axios from "axios";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import { showPassword } from "./Auth.js";
import R1 from "../../assets/img/register-1.svg";
import R2 from "../../assets/img/reset-2.svg";
import R3 from "../../assets/img/reset-3.svg";

export default function Register() {
  const navigate = useNavigate();
  const [alert, setAlert] = React.useState("");
  const [checked, setChecked] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [serverOTP, setserverOTP] = React.useState("");
  const [flag, setFlag] = React.useState(false);
  const [User, setUser] = React.useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlert("");
    setUser({
      ...User,
      [name]: value,
    });
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
    } else if (name === "confirmPassword") {
      if (value !== User.password) {
        e.target.style.borderColor = "red";
        setFlag(false);
      } else {
        e.target.style.borderColor = "green";
        setFlag(true);
      }
    } else if (name === "userName") {
      axios
        .get(`https://resumedp.herokuapp.com/auth/validateUserName/${value}`)
        .then((res) => {
          if (
            res.data.message !== "Username Already Exists" &&
            value.length >= 6
          ) {
            e.target.style.borderColor = "green";
            setFlag(false);
          } else {
            e.target.style.borderColor = "red";
            setFlag(true);
          }
        });
    }
  };

  const sendVOTP = (e) => {
    e.preventDefault();
    if (
      User.userName &&
      User.email &&
      User.password &&
      User.confirmPassword &&
      flag
    ) {
      if (checked) {
        axios
          .post("https://resumedp.herokuapp.com/auth/sendVotp", User)
          .then((res) => {
            setAlert(res.data.message);
            if (res.data.success) {
              setserverOTP(res.data.otp);
              setStep(2);
            }
          })
          .catch((err) => {
            setAlert(err.response.data.message);
          });
      } else {
        setAlert("Please Accept the Terms and Conditions");
      }
    } else {
      setAlert("Please fill all fields Correctly");
    }
  };

  function validateOTP(e) {
    e.preventDefault();
    if (User.otp === serverOTP) {
      setAlert("OTP verified");
      Register();
    } else if (User.otp !== serverOTP) {
      setAlert("Incorrect OTP");
    }
  }

  const handleChangeCheckbox = (e) => {
    setChecked(e.target.checked);
  };

  function Register() {
    axios
      .post("https://resumedp.herokuapp.com/auth/register", User)
      .then((res) => {
        setAlert(res.data.message);
        if (res.data.success) {
          setUser({
            userName: "",
            email: "",
            password: "",
            confirmPassword: "",
            otp: "",
          });
          setStep(1);
        } else if (!res.data.success) {
          setUser({
            userName: "",
            email: "",
            password: "",
            confirmPassword: "",
            otp: "",
          });
          setStep(1);
        }
      })
      .catch((err) => {
        setAlert(err.response.data.message);
      });
  }

  return (
    <div className="main">
      <section id="register">
        <div className="container">
          <div className="form-content">
            <div className="form">
              <h2 className="form-title">Sign up</h2>
              <p className="form-alert">&nbsp;{alert}</p>
              <form className="main-form">
                {step === 1 && (
                  <>
                    <div className="form-group">
                      <label>
                        <i className="zmdi zmdi-account material-icons-name" />
                      </label>
                      <input
                        type="text"
                        name="userName"
                        onChange={handleChange}
                        value={User.userName}
                        placeholder="Enter User Name"
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        <i className="zmdi zmdi-email" />
                      </label>
                      <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        value={User.email}
                        placeholder="Your Email"
                      />
                    </div>
                    <div className="form-group">
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
                      <label>
                        <i className="zmdi zmdi-lock-outline" />
                      </label>
                      <label style={{ marginLeft: "90%" }}>
                        <i
                          className="fa fa-duotone fa-eye"
                          onClick={() => showPassword(0, "confirmPassword")}
                          style={{ cursor: "pointer" }}
                        />
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        onChange={handleChange}
                        value={User.confirmPassword}
                        placeholder="Repeat your password"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="checkbox"
                        name="agree-term"
                        id="agree-term"
                        onClick={handleChangeCheckbox}
                        className="agree-term"
                      />
                      <label for="agree-term" className="label-agree-term">
                        <span>
                          <span />
                        </span>
                        I agree all statements in
                        <a href="/" className="term-service">
                          Terms of service
                        </a>
                      </label>
                    </div>
                    <div className="form-button text-center">
                      <button onClick={sendVOTP} className="main-btn">
                        Submit
                      </button>
                    </div>
                  </>
                )}
                {step === 2 && (
                  <>
                    <div className="form-group">
                      <label>
                        <i className="zmdi zmdi-account material-icons-name" />
                      </label>
                      <input
                        type="text"
                        name="userName"
                        onChange={handleChange}
                        value={User.userName}
                        placeholder="Enter User Name"
                        disabled={true}
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        <i className="zmdi zmdi-email" />
                      </label>
                      <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        value={User.email}
                        placeholder="Your Email"
                        disabled={true}
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        <i className="zmdi zmdi-lock" />
                      </label>
                      <input
                        type="text"
                        name="otp"
                        onChange={handleChange}
                        value={User.otp}
                        placeholder="Enter OTP"
                      />
                    </div>
                    <div className="form-button text-center">
                      <button onClick={validateOTP} className="main-btn">
                        Verify OTP
                      </button>
                    </div>
                  </>
                )}
                <div className="form-button text-center">
                  <button
                    onClick={() => navigate("/login")}
                    className="form-switch"
                  >
                    I am already member
                  </button>
                </div>
              </form>
            </div>

            <div className="form-image text-center">
              <figure>
                {step === 1 && <img src={R1} alt="ResumeDP" />}
                {step === 2 && <img src={R2} alt="ResumeDP" />}
                {step === 3 && <img src={R3} alt="ResumeDP" />}
              </figure>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
