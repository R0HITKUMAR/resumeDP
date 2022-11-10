import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toast from "../../dashboard/SweetAlert";

export default function ECard({ Education }) {
    const navigate = useNavigate();
    const deleteEducation = () => {
        axios.delete(`http://localhost:5000/education/delete/${Education._id}`)
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
                        <span className="badge text-bg-success">{Education.year}</span>
                        <h5>{Education.degree} in {Education.field}</h5>
                        <span className="badge text-bg-success">{Education.school}</span>
                    </div>
                    <div className="box-info-body">
                        <p>Score : <span className="badge text-bg-warning">{Education.grade}</span></p>
                        <p>Affilation : {Education.affiliation}</p>
                        <p>Description : {Education.des}</p>
                    </div>
                    <div className="box-info-footer">
                        <button onClick={() => navigate(`/home/education/updateEducation/${Education._id}`)}>
                            <i className="fa fa-duotone fa-edit"></i>
                        </button>
                        <button onClick={deleteEducation}>
                            <i className="fa fa-duotone fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
