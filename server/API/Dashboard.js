import Certificate from "../models/Certificate.js";
import Project from "../models/Project.js";
import Achievement from "../models/Achievement.js";

function dashboard(req, res) {
  var email = req.params.email;
  var data = {};
  var promises = [];
  promises.push(Certificate.find({ email: email }, "title"));
  promises.push(Certificate.countDocuments({ email: email }));
  promises.push(Project.find({ email: email }, "name"));
  promises.push(Project.countDocuments({ email: email }));
  promises.push(Achievement.countDocuments({ email: email }));
  Promise.all(promises)
    .then((results) => {
      data.Certificates = results[0];
      data.ccertificates = results[1];
      data.Projects = results[2];
      data.cprojects = results[3];
      data.cachievements = results[4];
      res.send(data);
      // console.log(data);
    })
    .catch((err) => {
      res.json(err);
    });
}

export default dashboard;
