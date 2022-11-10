import React from "react";
import axios from "axios";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./Certifications.css";
import NoRecord from "../norecord/NoRecord";
import Loader from "../loader/Loader";
import CCard from "./CCard";
import CForm from "./CForm";
import CUForm from "./CUForm";

export default function Certificates(props) {
  const navigate = useNavigate();
  const [Certificates, setCertificates] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    axios
      .get(
        `http://localhost:5000/certificate/retrieveAll/${props.email}`
      )
      .then((res) => {
        setCertificates(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [Certificates]);

  return (
    <section id="certificates">
      <div className="head-title">
        <div className="left">
          <h1>Certificates</h1>
        </div>
        <div className="right">
          <button
            onClick={() => {
              navigate("/home/certifications/addCertificate");
            }}
            className="badge rounded-pill text-bg-primary"
          >
            Add Certificate
          </button>
        </div>
      </div>
      <div className="certificates-cards">
        <div className="row">
          <Routes>
            <Route
              exact
              path="/addCertificate"
              element={<CForm email={props.email} />}
            />
            <Route path="/updateCertificate/:hash" element={<CUForm />} />
          </Routes>
          {!isLoading ? (
            <>
              {Certificates.length > 0 ? (
                Certificates.map((certificate, index) => {
                  return (
                    <CCard
                      Certificate={certificate}
                      key={index}
                      setMcontent={props.setMcontent}
                      modalT={props.setModal}
                    />
                  );
                })
              ) : (
                <NoRecord />
              )}
            </>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </section>
  );
}
