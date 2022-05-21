const { Clase, Fragmento, Materia, Curso } = require("../config/db.config");

const getClases = async (req, res, next) => {
  try {
    const totalClases = await Clase.findAll({
      attributes: ["id", "nombre", "descripcion", "profesores"],
      include: [
        {
          model: Materia,
          attributes: ["id", "nombre"],
        },
      ],
      include: [
        {
          model: Fragmento,
          attributes: ["id", "nombre", "url", "recursos"],
        },
      ],
    });
    totalClases.length > 0
      ? res.status(200).send(totalClases)
      : res.status(404).send("No se encontraron clases");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getClaseById = async (req, res, next) => {
  const { claseId } = req.params;
  try {
    const totalClases = await Clase.findAll({
      attributes: ["id", "nombre", "descripcion", "profesores"],
      include: [
        {
          model: Materia,
          attributes: ["id", "nombre"],
        },
      ],
      include: [
        {
          model: Fragmento,
          attributes: ["id", "nombre", "url", "recursos"],
        },
      ],
    });
    console.log(totalClases);
    if (claseId) {
      const claseById = await totalClases.filter(
        (clase) => clase.id == claseId
      );
      claseById.length
        ? res.send(claseById)
        : res.send("No existe un video con ese identificador");
    } else {
      res.send("Por favor ingrese un identificador por params");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const postClase = async (req, res, next) => {
  try {
    const {
      curso,
      nombre,
      descripcion,
      profesores,
      materia,
      nombreFragmento,
      urlFragmento,
      recursosFragmento,
    } = req.body;

    const parseStringToArray = (str) => {
      let array = str.split(", ");
      return array;
    };

    await Clase.findOrCreate({
      where: {
        nombre: nombre,
        descripcion: descripcion,
        profesores: parseStringToArray(profesores),
      },
    });

    const newClase = await Clase.findOne({
      where: {
        nombre: nombre,
      },
    });

    const cursoDB = await Curso.findOne({
      where: {
        nombre: curso,
      },
    });

    const materiaDB = await Materia.findOne({
      where: {
        nombre: materia,
      },
    });

    const fragmento = await Fragmento.create({
      nombre: nombreFragmento,
      url: urlFragmento,
      recursos: parseStringToArray(recursosFragmento),
    });

    // newClase.setCurso(cursoDB);
    newClase.setMaterium(materiaDB); //No se porque es materium en vez de materia XD
    // materiaDB.setCurso(cursoDB);
    fragmento.setClase(newClase);

    res.send("Clase subida correctamente");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const putClase = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, url, profesores, recursos } = req.body;

    //     const parseStringToArray = (str) => {
    //       let array = str.split(", ")
    //     return array;
    //  }

    const claseEncontrada = await Clase.findOne({
      where: { id: id },
    });

    claseEncontrada === null
      ? res.status(404).send("No se encontró una clase con ese id")
      : await Clase.update(
          {
            nombre: nombre,
            url: url,
            profesores: parseStringToArray(profesores),
            recursos: parseStringToArray(recursos),
          },

          { where: { id: id } }
        );

    res.send("Clase actualizada correctamente");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const deleteClase = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    await Clase.destroy({
      where: {
        id: id,
      },
    });
    res.send("Clase eliminada correctamente");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getClases,
  getClaseById,
  postClase,
  putClase,
  deleteClase,
};
