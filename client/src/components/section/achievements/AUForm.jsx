import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Toast from "../../dashboard/SweetAlert";

export default function AUForm() {
  const navigate = useNavigate();
  const { hash } = useParams();
  const [Adata, setAdata] = React.useState({});

  React.useEffect(() => {
    axios
      .get(`http://localhost:5000/achievement/retrieveOne/${hash}`)
      .then((res) => {
        setAdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [hash]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdata({ ...Adata, [name]: value });
  };

  const updateAchievement = () => {
    axios
      .put(`http://localhost:5000/achievement/update/${hash}`, Adata)
      .then((res) => {
        Toast.fire({
          icon: "success",
          title: "Achievement Updated Successfully",
        });
        navigate("/home/achievements");
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: "Oops... Something went wrong!",
        });
        console.log(err);
      });
  };

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
            <button onClick={() => navigate("/home/achievements")}>
              <i className="fa fa-duotone fa-x"></i>
            </button>
            <button onClick={updateAchievement}>
              <i className="fa fa-duotone fa-check"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
