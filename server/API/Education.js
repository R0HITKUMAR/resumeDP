import Education from "../models/Education.js";

function addEducation(req, res) {
  const education = new Education(req.body);
  education
    .save()
    .then(() => res.send({ message: "Details added successfully" }))
    .catch((err) => res.send({ message: err }));
}

function retrieveEducation(req, res) {
  Education.findById(req.params.id)
    .then((Education) => res.send(Education))
    .catch((err) => res.send({ message: err }));
}

function retrieveEducations(req, res) {
  Education.find({ email: req.params.email })
    .then((Educations) => res.send(Educations.reverse()))
    .catch((err) => res.send({ message: err }));
}

function deleteEducation(req, res) {
  Education.findByIdAndDelete(req.params.id)
    .then(() => res.send({ message: "Details deleted successfully" }))
    .catch((err) => res.send({ message: err }));
}

function updateEducation(req, res) {
  Education.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((Education) => res.send(Education))
    .catch((err) => res.send({ message: err }));
}

export {
  addEducation,
  retrieveEducation,
  retrieveEducations,
  deleteEducation,
  updateEducation,
};
