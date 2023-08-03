import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toast from "../../dashboard/SweetAlert";

export default function ICard(props) {
  const navigate = useNavigate();
  const [Intro, setIntro] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`http://localhost:5000/introduction/retrieve/${props.email}`)
      .then((res) => {
        setIntro(res.data);
        if (res.data.name === undefined) {
          navigate("/intro/addIntro");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIntro({ ...Intro, [name]: value });
  };

  const updateSkills = () => {
    axios
      .put(`http://localhost:5000/introduction/update/${Intro._id}`, Intro)
      .then((res) => {
        Toast.fire({
          icon: "success",
          title: "Updated Successfully",
        });
        navigate("/intro");
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: err.response.data.message,
        });
      });
  };

  return (
    <>
      <div className="col-12 intro">
        <div className="box-info">
          <div className="box-content">
            <div className="box-info-head text-center">
              <h1>
                <input
                  type="text"
                  name="name"
                  value={Intro.name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                />
              </h1>
              <p className="justify-content-center text-center">
                (
                <input
                  type="text"
                  name="position"
                  value={Intro.position}
                  onChange={handleChange}
                  placeholder="Enter Position"
                />
                )
              </p>
              <p className="justify-content-center text-center">
                <input
                  type="text"
                  name="email"
                  value={Intro.email}
                  onChange={handleChange}
                  placeholder="Enter Email Address"
                />{" "}
                |{" "}
                <input
                  type="text"
                  name="phone"
                  value={Intro.phone}
                  onChange={handleChange}
                  placeholder="Enter Contact No."
                />{" "}
                |{" "}
                <input
                  type="text"
                  name="address"
                  value={Intro.address}
                  onChange={handleChange}
                  placeholder="Enter Address"
                />
              </p>
              <p className="justify-content-center text-center">
                <textarea
                  name="careerObjective"
                  value={Intro.careerObjective}
                  onChange={handleChange}
                  placeholder="Enter Career Objective"
                />
              </p>
            </div>
            <div className="box-info-footer"></div>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-12 social">
        <div className="box-info">
          <div className="box-content">
            <div className="box-info-head text-center">
              <h5>Social Links</h5>
            </div>
            <div className="box-info-body">
              <div className="social-link">
                <div>
                  <input
                    type="text"
                    name="link1N"
                    value={Intro.link1N}
                    onChange={handleChange}
                    placeholder="Enter Link Name"
                  />
                  <input
                    type="text"
                    name="link1"
                    value={Intro.link1}
                    onChange={handleChange}
                    placeholder="Enter Link URL"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="link2N"
                    value={Intro.link2N}
                    onChange={handleChange}
                    placeholder="Enter Link Name"
                  />
                  <input
                    type="text"
                    name="link2"
                    value={Intro.link2}
                    onChange={handleChange}
                    placeholder="Enter Link URL"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="link3N"
                    value={Intro.link3N}
                    onChange={handleChange}
                    placeholder="Enter Link Name"
                  />
                  <input
                    type="text"
                    name="link3"
                    value={Intro.link3}
                    onChange={handleChange}
                    placeholder="Enter Link URL"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="link4N"
                    value={Intro.link4N}
                    onChange={handleChange}
                    placeholder="Enter Link Name"
                  />
                  <input
                    type="text"
                    name="link4"
                    value={Intro.link4}
                    onChange={handleChange}
                    placeholder="Enter Link URL"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-12 resume">
        <div className="box-info">
          <div className="box-content">
            <div className="box-info-head text-center">
              <h5>Generated Resume</h5>
            </div>
            <div className="box-info-body">
              <div className="resume-archive">
                <p>Resume ID: ABCDEF </p>
                <p>
                  <button>View</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="box-info-footer">
        <button onClick={updateSkills}>
          <i className="fa fa-duotone fa-check"></i>
        </button>
      </div>
    </>
  );
}
