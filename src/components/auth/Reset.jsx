import React from "react";
import axios from "axios";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import { showPassword } from "./Auth.js";
import R1 from "../../assets/img/reset-1.svg";
import R2 from "../../assets/img/reset-2.svg";
import R3 from "../../assets/img/reset-3.svg";

export default function Reset() {
  const navigate = useNavigate();
  const [alert, setAlert] = React.useState("");
  const [step, setStep] = React.useState(1);
  const [flag, setFlag] = React.useState(false);
  const [serverOTP, setserverOTP] = React.useState("");
  const [User, setUser] = React.useState({
    email: "",
    otp: "",
    newpassword: "",
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
    } else if (name === "newpassword") {
      if (value.length < 6) {
        e.target.style.borderColor = "red";
        setFlag(false);
      } else {
        e.target.style.borderColor = "green";
        setFlag(true);
      }
    }
  };

  const sendOTP = (e) => {
    e.preventDefault();
    if (User.email && flag) {
      axios
        .post("https://resumedp.herokuapp.com/auth/sendotp", User)
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
      setAlert("Please fill all the fields Correctly");
    }
  };

  function validateOTP(e) {
    e.preventDefault();
    if (User.otp === serverOTP) {
      setAlert("OTP verified");
      setStep(3);
    } else if (User.otp !== serverOTP) {
      setAlert("Incorrect OTP");
    }
  }

  const changePassword = (e) => {
    e.preventDefault();
    if (User.newpassword) {
      axios
        .post("https://resumedp.herokuapp.com/auth/changepassword", User)
        .then((res) => {
          setAlert(res.data.message);
          if (res.data.success) {
            setStep(1);
            setUser({ email: "", otp: "", newpassword: "" });
          }
        })
        .catch((err) => {
          setAlert(err.response.data.message);
        });
    } else {
      setAlert("Please Enter New Password");
    }
  };

  return (
    <div class="main">
      <section id="login">
        <div className="container align-middle">
          <div className="form-content">
            <div className="form-image">
              <figure>
                {step === 1 && <img src={R1} alt="ResumeDP" />}
                {step === 2 && <img src={R2} alt="ResumeDP" />}
                {step === 3 && <img src={R3} alt="ResumeDP" />}
              </figure>
            </div>

            <div className="form">
              <h2 className="form-title">Reset Password</h2>
              <p className="form-alert">{alert}</p>
              <form className="main-form mt-5">
                {step === 1 && (
                  <>
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

                    <div className="form-button text-center">
                      <button onClick={sendOTP} className="main-btn">
                        Send OTP
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
                        name="email"
                        onChange={handleChange}
                        value={User.email}
                        placeholder="Email"
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
                        placeholder="OTP"
                      />
                    </div>
                    <div className="form-button text-center">
                      <button className="main-btn" onClick={validateOTP}>
                        Verify OTP
                      </button>
                    </div>
                  </>
                )}
                {step === 3 && (
                  <>
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
                    <div className="form-group">
                      <label>
                        <i className="zmdi zmdi-lock" />
                      </label>

                      <label style={{ marginLeft: "90%" }}>
                        <i
                          className="fa fa-duotone fa-eye"
                          onClick={() => showPassword(0, "newpassword")}
                          style={{ cursor: "pointer" }}
                        />
                      </label>
                      <input
                        type="password"
                        name="newpassword"
                        onChange={handleChange}
                        value={User.newpassword}
                        placeholder="New Password"
                      />
                    </div>
                    <div className="form-button text-center">
                      <button className="main-btn" onClick={changePassword}>
                        Change Password
                      </button>
                    </div>
                  </>
                )}
                <div className="form-button text-center">
                  <button
                    onClick={() => navigate("/login")}
                    className="form-switch"
                  >
                    Back to Login
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
