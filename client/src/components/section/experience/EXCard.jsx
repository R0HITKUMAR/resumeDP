import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toast from "../../dashboard/SweetAlert";

export default function EXCard({ Experience }) {
    const navigate = useNavigate();
    const deleteExperience = () => {
        axios.delete(`https://resumedps.aboutrohit.in/experience/delete/${Experience._id}`)
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
                        <span className="badge text-bg-success">{Experience.duration}</span>
                        <h5>{Experience.position}</h5>
                        <span className="badge text-bg-success">{Experience.company}</span>
                    </div>
                    <div className="box-info-body">
                        <p>Type : <span className="badge text-bg-warning">{Experience.type}</span></p>
                        <p>Description : {Experience.des}</p>
                    </div>
                    <div className="box-info-footer">
                        <button onClick={() => navigate(`/home/experience/updateExperience/${Experience._id}`)}>
                            <i className="fa fa-duotone fa-edit"></i>
                        </button>
                        <button onClick={deleteExperience}>
                            <i className="fa fa-duotone fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
