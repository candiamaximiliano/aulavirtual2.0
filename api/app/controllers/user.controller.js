const { User } = require("../config/db.config");

exports.putUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      fotoDePerfil,
      nombre,
      apellido,
      usuario,
      email,
      dni,
      fechaDeNacimiento,
      direccion,
      numeroDeContacto,
      roles,
    } = req.body;

    const usuarioEncontrado = await User.findOne({
      where: { id: id },
    });

    usuarioEncontrado === null
      ? res.status(404).send("No se encontró una usuario con ese id")
      : await User.update(
          {
            fotoDePerfil: fotoDePerfil,
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
            roles: roles,
          },
          { where: { id: id } }
        );
    res.send("Usuario actualizado correctamente");
  } catch (error) {
    console.error(error);
    next(error);
  }
};
