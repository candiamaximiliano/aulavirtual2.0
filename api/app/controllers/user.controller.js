const { User, Role, Pais, Ciudad, Provincia } = require("../config/db.config");
const ROLES = require("../config/roles.config");

exports.getProfesores = async (req, res, next) => {
  try {
    const usuarios = await User.findAll({
      attributes: ["id", "nombre", "apellido", "imagen"],
      include: [
        {
          model: Role,
          attributes: ["name"],
        },
        {
          model: Pais,
          attributes: ["NOMBRE_PAIS"],
        },
        {
          model: Provincia,
          attributes: ["NOMBRE_PROVINCIA"],
        },
        {
          model: Ciudad,
          attributes: ["NOMBRE_CIUDAD"],
        },
      ],
    });

    const profesores = [];
    usuarios.forEach((user) => {
      user.roles?.map((rol) => {
        rol.name === ROLES.Profesor ? profesores.push(user) : null;
      });
    });
    res.status(200).send(profesores);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

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
