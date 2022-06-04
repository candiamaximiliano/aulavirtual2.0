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
      imagen,
      nombre,
      apellido,
      usuario,
      email,
      contraseña,
      dni,
      fechaDeNacimiento,
      direccion,
      provincia,
      ciudad,
      numeroDeContacto,
      consentimientoWhatsapp,
      roles,
    } = req.body;

    const usuarioEncontrado = await User.findOne({
      where: { id: Number(id) },
    });

    if (req.body.provincia) {
      Provincia.findOne({
        where: {
          NOMBRE_PROVINCIA: req.body.provincia,
        },
      }).then((provincia) => {
        usuarioEncontrado.setProvincium(provincia);
      });
    }

    if (req.body.ciudad) {
      Ciudad.findOne({
        where: {
          NOMBRE_CIUDAD: req.body.ciudad,
        },
      }).then((ciudad) => {
        usuarioEncontrado.setCiudad(ciudad);
      });
    }

    if (req.body.roles) {
      Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles,
          },
        },
      }).then((roles) => {
        usuarioEncontrado.setRoles(roles);
      });
    }

    usuarioEncontrado === null
      ? res.status(404).send("No se encontró una usuario con ese id")
      : await User.update(
          {
            imagen: imagen,
            contraseña: contraseña,
            nombre: nombre,
            apellido: apellido,
            usuario: usuario,
            email: email,
            dni: dni,
            fechaDeNacimiento: fechaDeNacimiento,
            direccion: direccion,
            provincia: provincia,
            ciudad: ciudad,
            numeroDeContacto: numeroDeContacto,
            consentimientoWhatsapp: consentimientoWhatsapp,
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
