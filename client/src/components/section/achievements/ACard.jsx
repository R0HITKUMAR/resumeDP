import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toast from "../../dashboard/SweetAlert";

export default function ACard({ Achievement }) {
    const navigate = useNavigate();
    const deleteAchievement = () => {
        axios.delete(`https://resumedps.aboutrohit.in/achievement/delete/${Achievement._id}`)
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
                        <span className="badge text-bg-success">{Achievement.year}</span>
                        <h5>{Achievement.title}</h5>
                    </div>
                    <div className="box-info-footer">
                        <button onClick={() => navigate(`/achievements/updateAchievement/${Achievement._id}`)}>
                            <i className="fa fa-duotone fa-edit"></i>
                        </button>
                        <button onClick={deleteAchievement}>
                            <i className="fa fa-duotone fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
