import Achievement from "../models/Achievement.js";

function addAchievement(req, res) {
  const achievement = new Achievement(req.body);
  achievement
    .save()
    .then(() => res.send({ message: "Achievement added successfully" }))
    .catch((err) => res.send({ message: err }));
}

function retrieveAchievement(req, res) {
  Achievement.findById(req.params.id)
    .then((Achievement) => res.send(Achievement))
    .catch((err) => res.send({ message: err }));
}

function retrieveAchievements(req, res) {
  Achievement.find({ email: req.params.email })
    .then((Achievements) => res.send(Achievements.reverse()))
    .catch((err) => res.send({ message: err }));
}

function deleteAchievement(req, res) {
  Achievement.findByIdAndDelete(req.params.id)
    .then(() => res.send({ message: "Details deleted successfully" }))
    .catch((err) => res.send({ message: err }));
}

function updateAchievement(req, res) {
  Achievement.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((Achievement) => res.send(Achievement))
    .catch((err) => res.send({ message: err }));
}

export {
  addAchievement,
  retrieveAchievement,
  retrieveAchievements,
  deleteAchievement,
  updateAchievement,
};
