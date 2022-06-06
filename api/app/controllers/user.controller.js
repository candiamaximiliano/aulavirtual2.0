const { User, Role, Pais, Ciudad, Provincia } = require("../config/db.config");
const ROLES = require("../config/roles.config");
const Op = require("sequelize").Op;

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
      where: { id: id },
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
            imagen: imagen ? imagen : usuarioEncontrado.imagen,
            contraseña: contraseña ? contraseña : usuarioEncontrado.contraseña,
            nombre: nombre ? nombre : usuarioEncontrado.nombre,
            apellido: apellido ? apellido : usuarioEncontrado.apellido,
            usuario: usuario ? usuario : usuarioEncontrado.usuario,
            email: email ? email : usuarioEncontrado.email,
            dni: dni ? dni : usuarioEncontrado.dni,
            fechaDeNacimiento: fechaDeNacimiento
              ? fechaDeNacimiento
              : usuarioEncontrado.fechaDeNacimiento,
            direccion: direccion ? direccion : usuarioEncontrado.direccion,
            provincia: provincia ? provincia : usuarioEncontrado.provincia,
            ciudad: ciudad ? ciudad : usuarioEncontrado.ciudad,
            numeroDeContacto: numeroDeContacto
              ? numeroDeContacto
              : usuarioEncontrado.numeroDeContacto,
            consentimientoWhatsapp: consentimientoWhatsapp
              ? consentimientoWhatsapp
              : usuarioEncontrado.consentimientoWhatsapp,
            roles: roles ? roles : usuarioEncontrado.roles,
          },
          { where: { id: id } }
        );
    res.send("Usuario actualizado correctamente");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const usuarios = await User.findAll();
    res.send(usuarios);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await User.destroy({
      where: {
        id: id,
      },
    });
    res.send("Usuario eliminado correctamente");
  } catch (error) {
    console.error(error);
    next(error);
  }
};
