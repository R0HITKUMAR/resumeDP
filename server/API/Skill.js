import Skills from "../models/Skill.js";

function addSkills(req, res) {
    const skills = new Skills(req.body);
    skills
      .save()
      .then(() => res.send({ message: "Skills added successfully" }))
      .catch((err) => res.send({ message: err }));
  }
  
  function retrieveSkills(req, res) {
    Skills.findOne({ email: req.params.email })
      .then((Skills) => res.send(Skills))
      .catch((err) => res.send({ message: err }));
  }
  
  function updateSkills(req, res) {
    Skills.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((Skills) => res.send(Skills))
      .catch((err) => res.send({ message: err }));
  }
  
  export { addSkills, retrieveSkills, updateSkills };
  