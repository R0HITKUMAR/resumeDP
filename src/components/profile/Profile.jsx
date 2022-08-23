import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Profile() {
  const userName = useParams().userName;
  const [email, setEmail] = React.useState("");
  React.useEffect(() => {
    axios
      .get(`https://resumedp.herokuapp.com/auth/validateUserName/${userName}`)
      .then((res) => {
        if (res.data.status) {
          setEmail(res.data.email);
        } else if (!res.data.status) {
            setEmail("Not Found");
          console.log("Failed to Authenticate");
        }
      });
  }, [userName]);

  return (
    <div>Hii{userName}{email && <p>{email}</p>}</div>
  );
}
