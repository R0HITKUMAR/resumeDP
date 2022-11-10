import Certificate from "../models/Certificate.js";

function addCertificate(req, res) {
  const certificate = new Certificate(req.body);
  certificate
    .save()
    .then(() => res.send({ message: "Certificates added successfully" }))
    .catch((err) => res.send({ message: err }));
}

function retrieveCertificate(req, res) {
  Certificate.findById(req.params.id)
    .then((Certificates) => res.send(Certificates))
    .catch((err) => res.send({ message: err }));
}

function retrieveCertificates(req, res) {
  Certificate.find({ email: req.params.email })
    .then((Certificates) => res.send(Certificates.reverse()))
    .catch((err) => res.send({ message: err }));
}

function deleteCertificate(req, res) {
  Certificate.findByIdAndDelete(req.params.id)
    .then(() => res.send({ message: "Details deleted successfully" }))
    .catch((err) => res.send({ message: err }));
}

function updateCertificate(req, res) {
  Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((Certificates) => res.send(Certificates))
    .catch((err) => res.send({ message: err }));
}

export {
  addCertificate,
  retrieveCertificate,
  retrieveCertificates,
  deleteCertificate,
  updateCertificate,
};
