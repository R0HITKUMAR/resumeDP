import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from "../../dashboard/SweetAlert";
import "./Projects.css";


export default function PForm(props) {
  const navigate = useNavigate();

  const [Pdata, setPdata] = React.useState({
    name: "",
    duration: "",
    url: "",
    domain: "",
    technology: "",
    desc: "",
    learn: "",
    email:props.email
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPdata({
      ...Pdata,
      [name]: value,
    });
  };

  const addProject = () => {
    axios.post("https://resumedps.aboutrohit.in/project/add", Pdata)
      .then(res => {
        Toast.fire({
          icon: 'success',
          title: res.data.message
        })
        navigate("/home/projects")
      }).catch(err => {
        Toast.fire({
          icon: 'error',
          title: 'Oops... Something went wrong!'
        })
        console.log(err)
      })
  }

  return (

    <div className="col-md-6 project-form">
      <div className="box-info pform">
        <div className="box-content">
          <div className="box-info-head">
            <span className="badge text-bg-success m-1">
              <input
                type="text"
                name="domain"
                value={Pdata.domain}
                onChange={handleChange}
                placeholder="Enter Project Domain"
              />
            </span>
            <h5>
              <input
                type="text"
                name="name"
                value={Pdata.name}
                onChange={handleChange}
                placeholder="Enter Project Name"
              />
            </h5>
            <p>
              <input
                type="text"
                name="duration"
                value={Pdata.duration}
                onChange={handleChange}
                placeholder="Enter Project Duration"
              />
            </p>
          </div>
          <div className="box-info-body">
            <p>Skills</p>
            <span className="badge text-bg-warning">
              <input
                type="text"
                name="technology"
                value={Pdata.technology}
                onChange={handleChange}
                placeholder="Enter Skills Separated by Comma"
              />
            </span>
            <p>Description</p>
            <ul>
              <li>
                <textarea
                  type="text"
                  name="desc"
                  value={Pdata.desc}
                  onChange={handleChange}
                  placeholder="Enter Project Description"
                  rows={3}
                ></textarea>
              </li>
            </ul>
            <p>Learnings</p>
            <ul>
              <li>
                <textarea
                  type="text"
                  name="learn"
                  value={Pdata.learn}
                  onChange={handleChange}
                  placeholder="Enter Project Duration"
                  rows={3}
                ></textarea>
              </li>
            </ul>
            <p>URL</p>
            <ul>
              <li>
                <input
                  type="text"
                  name="url"
                  value={Pdata.url}
                  onChange={handleChange}
                  placeholder="Enter Project URL"
                />
              </li>
            </ul>
          </div>
          <div className="box-info-footer">
            <button onClick={() => navigate("/home/projects")}>
              <i className="fa fa-duotone fa-x"></i>
            </button>
            <button onClick={addProject}>
              <i className="fa fa-duotone fa-add"></i>
            </button>
          </div>
        </div>
      </div>
    </div >
  );
}
