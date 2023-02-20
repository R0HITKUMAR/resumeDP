import Experience from "../models/Experience.js";

function addExperience(req, res) {
    const experience = new Experience(req.body);
    experience.save()
      .then(() => res.send({ message: "Details added successfully" }))
      .catch((err) => res.send({ message: err }));
  }
  
  function retrieveExperience(req, res) {
    Experience.findById(req.params.id)
      .then((Experience) => res.send(Experience))
      .catch((err) => res.send({ message: err }));
  }
  
  function retrieveExperiences(req, res) {
    Experience.find({ email: req.params.email })
      .then((Experiences) => res.send(Experiences.reverse()))
      .catch((err) => res.send({ message: err }));
  }
  
  function deleteExperience(req, res) {
    Experience.findByIdAndDelete(req.params.id)
      .then(() => res.send({ message: "Details deleted successfully" }))
      .catch((err) => res.send({ message: err }));
  }
  
  function updateExperience(req, res) {
    Experience.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((Experience) => res.send(Experience))
      .catch((err) => res.send({ message: err }));
  }
  
  export {
    addExperience,
    retrieveExperience,
    retrieveExperiences,
    deleteExperience,
    updateExperience
  };
  