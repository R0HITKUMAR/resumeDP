import express from "express";
import bodyParser from "body-parser";
import fileupload from "express-fileupload";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import ConnectDB from "./src/database.js";
import Auth from "./src/routes/Auth.js";
import Dashboard from "./src/routes/Dashboard.js";
import Project from "./src/routes/Project.js";
import Education from "./src/routes/Education.js";
import Achievement from "./src/routes/Achievement.js";
import Certificate from "./src/routes/Certificate.js";
import Experience from "./src/routes/Experience.js";
import Introduction from "./src/routes/Introduction.js";
import Skill from "./src/routes/Skill.js";
import config from "./src/config.js";

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const PORT = config.PORT;

var resumee = express();
resumee.use(express.json());
resumee.use(express.urlencoded());
resumee.use(cors());
resumee.use(bodyParser.json(), urlencodedParser);
resumee.use(fileupload());
resumee.use(express.static("files"));
// Routes

resumee.use("/auth", Auth);
resumee.use("/dashboard", Dashboard);
resumee.use("/project", Project);
resumee.use("/education", Education);
resumee.use("/achievement", Achievement);
resumee.use("/experience", Experience);
resumee.use("/certificate", Certificate);
resumee.use("/introduction", Introduction);
resumee.use("/skill", Skill);

resumee.use(express.static("client/build"));

resumee.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

resumee.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
resumee.listen(PORT, () => {
  ConnectDB()
    .then(() => console.log(`Server is Running  at Port ✌`))
    .catch(() =>
      console.log(
        "Error in Connecting to Database. Please Check your Database Configurations"
      )
    );
});
