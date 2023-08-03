import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toast from "../../dashboard/SweetAlert";

export default function PCard({ Project }) {
  const navigate = useNavigate();

  const deleteProject = () => {
    axios.delete(`http://localhost:5000/project/delete/${Project._id}`)
      .then(res => {
        Toast.fire({
          icon: 'success',
          title: res.data.message
        })
      }).catch(err => {
        Toast.fire({
          icon: 'error',
          title: err.response.data.message
        })
      })
  }

  return (
    <div className="col-md-6 col-12">
      <div className="box-info">
        <div className="box-content">
          <div className="box-info-head">
            <span className="badge text-bg-success m-1">{Project.domain}</span>
            <h5>{Project.name}</h5>
            <p>{Project.duration}</p>
          </div>
          <div className="box-info-body">
            <p>Skills</p>
            {Project.technology.split(",").map((tech, index) => {
              return <span className="badge text-bg-warning" key={index}>{tech}</span>;
            })}
            <p>Description</p>
            <ul>
              <li>{Project.desc}</li>
            </ul>
            <p>Learnings</p>
            <ul>
              <li>{Project.learn}</li>
            </ul>
          </div>
          <div className="box-info-footer">
            <a href={Project.url} target="_blank" rel="noopener noreferrer">
              <i className="fa fa-duotone fa-arrow-up-right-from-square"></i>
            </a>
            <button onClick={() => navigate(`/projects/updateProject/${Project._id}`)}>
              <i className="fa fa-duotone fa-edit"></i>
            </button>
            <button onClick={deleteProject}>
              <i className="fa fa-duotone fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
