const { User } = require('../config/db.config');

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.putUser = async (req, res, next) =>{
  
  try {
    const { id } = req.params;
    const { base64,
    nombre,
    apellido,
    usuario,
    email,
    dni,
    fechaDeNacimiento,
    direccion,
    numeroDeContacto,
    instructorado,
    especializacion,
    profesorado } = req.body;

    const usuarioEncontrado = await User.findOne({
      where: { id: id },
    });

    usuarioEncontrado === null
    ? res.status(404).send('No se encontró una usuario con ese id')
    : await User.update({
      base64: base64,
      nombre: nombre,
      apellido: apellido,
      usuario: usuario,
      email: email,
      dni: dni,
      fechaDeNacimiento: fechaDeNacimiento,
      direccion: direccion,
      numeroDeContacto: numeroDeContacto,
      instructorado: instructorado,
      especializacion: especializacion,
      profesorado: profesorado,
      },
      { where: { id: id}
      })
      res.send('Usuario actualizada correctamente');

  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};