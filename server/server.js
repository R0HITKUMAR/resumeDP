import express from "express";
import bodyParser from "body-parser";
import fileupload from "express-fileupload";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import ConnectDB from "./database.js";
import Auth from "./routes/Auth.js";
import Dashboard from "./routes/Dashboard.js";
import Project from "./routes/Project.js";
import Education from "./routes/Education.js";
import Achievement from "./routes/Achievement.js";
import Certificate from "./routes/Certificate.js";
import Experience from "./routes/Experience.js";
import Introduction from "./routes/Introduction.js";
import Skill from "./routes/Skill.js";
import config from "./config.js";

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

resumee.get("/", (req, res) => {
  res.send("Welcome to Resumee");
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
