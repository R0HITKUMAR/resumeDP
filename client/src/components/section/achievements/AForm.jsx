import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from "../../dashboard/SweetAlert";

export default function AForm(props) {
    const navigate = useNavigate();

    const [Adata, setAdata] = React.useState({
        year: "",
        title: "",
        email: props.email,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdata({ ...Adata, [name]: value });
    }

    const addAchievement = () => {
        axios.post(`https://resumedps.aboutrohit.in/achievement/add`, Adata)
            .then(res => {
                Toast.fire({
                    icon: 'success',
                    title: res.data.message
                })
                navigate("/achievements")
            }).catch(err => {
                Toast.fire({
                    icon: 'error',
                    title: 'Oops... Something went wrong!'
                })
                console.log(err)
            })
    }

    return (
        <div className="col-md-6 col-12 achievement-form">
            <div className="box-info">
                <div className="box-content">
                    <div className="box-info-head">
                        <span className="badge text-bg-success">
                            <input
                                type="text"
                                name="year"
                                value={Adata.year}
                                onChange={handleChange}
                                placeholder="Year"
                            />
                        </span>
                        <h5>
                            <textarea
                                type="text"
                                name="title"
                                value={Adata.title}
                                onChange={handleChange}
                                placeholder="Enter Achievement"
                                rows={5}
                            ></textarea>
                        </h5>
                    </div>
                    <div className="box-info-footer">
                        <button onClick={() => navigate("/achievements")}>
                            <i className="fa fa-duotone fa-x"></i>
                        </button>
                        <button onClick={addAchievement}>
                            <i className="fa fa-duotone fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
