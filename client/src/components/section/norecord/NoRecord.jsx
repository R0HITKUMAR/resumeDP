import React from "react";
import img from "../../../assets/img/no-record.svg";

export default function NoRecord() {
  const path = window.location.pathname;
  const [pathName, setPathName] = React.useState(path);
  React.useEffect(() => {
    setPathName(path);
  }, [path]);

  return (
    <div className="text-center norecord">
      {pathName === "/education" ||
      pathName === "/achievements" ||
      pathName === "/projects" ||
      pathName === "/certifications" ||
      pathName === "/experience" ? (
        <img src={img} alt="No Record" style={{ height: "70vh" }} />
      ) : null}
    </div>
  );
}
