const { mv } = require("express-fileupload");

const saveImage = (req, res) => {
  let { code } = req.params;
  let File = req.files.file;
  File.mv(`./assets/imagenes/${code}`, (err) => {
    if (err) return res.status(500).send({ message: err });

    return res.status(200).send({ message: "¡Archivo subido correctamente!" });
  });
};

module.exports = {
  saveImage,
};
