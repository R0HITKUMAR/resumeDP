import Introduction from "../models/Introduction.js";

function addIntroduction(req, res) {
  const introduction = new Introduction(req.body);
  introduction
    .save()
    .then(() => res.send({ message: "Introduction added successfully" }))
    .catch((err) => res.send({ message: err }));
}

function retrieveIntroduction(req, res) {
  Introduction.findOne({ emailid: req.params.email })
    .then((introductions) => res.send(introductions))
    .catch((err) => res.send({ message: err }));
}

function updateIntroduction(req, res) {
  Introduction.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((Introduction) => res.send(Introduction))
    .catch((err) => res.send({ message: err }));
}

export { addIntroduction, retrieveIntroduction, updateIntroduction };
