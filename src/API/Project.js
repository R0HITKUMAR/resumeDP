import Project from "../models/Project.js";

function addProject(req, res) {
  const project = new Project(req.body);
  project
    .save()
    .then(() => res.send({ message: "Project added successfully" }))
    .catch((err) => res.send({ message: err }));
}

function retrieveProject(req, res) {
  Project.findById(req.params.id)
    .then((project) => res.send(project))
    .catch((err) => res.send({ message: err }));
}

function retrieveProjects(req, res) {
  Project.find({ email: req.params.email })
    .then((projects) => res.send(projects.reverse()))
    .catch((err) => res.send({ message: err }));
}

function deleteProject(req, res) {
  Project.findByIdAndDelete(req.params.id)
    .then(() => res.send({ message: "Project deleted successfully" }))
    .catch((err) => res.send({ message: err }));
}

function updateProject(req, res) {
  Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((project) => res.send(project))
    .catch((err) => res.send({ message: err }));
}

export {
  addProject,
  retrieveProject,
  retrieveProjects,
  deleteProject,
  updateProject,
};
