const { Clase, Fragmento, Materia, Curso } = require("../config/db.config");

const getClases = async (req, res, next) => {
  try {
    const totalClases = await Clase.findAll({
      attributes: [
        "id",
        "nombre",
        "descripcion",
        "profesores",
        "belongsToMateria",
        "belongsToCurso",
      ],
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
      attributes: [
        "id",
        "nombre",
        "descripcion",
        "profesores",
        "belongsToMateria",
        "belongsToCurso",
      ],
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
    const { curso, nombre, descripcion, profesores, materia } = req.body;

    const parseStringToArray = (str) => {
      let array = str.split(", ");
      return array;
    };

    let claseYaExiste = null;

    claseYaExiste = await Clase.findOne({
      where: {
        nombre: nombre,
        descripcion: descripcion,
        profesores: parseStringToArray(profesores),
        belongsToMateria: materia,
        belongsToCurso: curso,
      },
    });

    const cursoDB = await Curso.findOne({
      where: {
        nombre: curso,
      },
    });

    const materiaDB = await Materia.findOne({
      where: {
        cursoId: cursoDB.id,
        nombre: materia,
      },
    });

    if (!materiaDB)
      return res
        .status(403)
        .send("Primero debes crear una matería para alojar esta clase");

    if (claseYaExiste) {
      if (materiaDB.id == claseYaExiste.materiumId) {
        return res
          .status(403)
          .send(
            "La clase que intentas añadir ya existe en nuestra base de datos"
          );
      } else {
        await Clase.create({
          nombre: nombre,
          descripcion: descripcion,
          profesores: parseStringToArray(profesores),
          belongsToMateria: materia,
          belongsToCurso: curso,
        });
      }
    } else {
      await Clase.create({
        nombre: nombre,
        descripcion: descripcion,
        profesores: parseStringToArray(profesores),
        belongsToMateria: materia,
        belongsToCurso: curso,
      });
    }

    const newClase = await Clase.findOne({
      where: {
        materiumId: null,
        nombre: nombre,
        descripcion: descripcion,
        profesores: parseStringToArray(profesores),
        belongsToMateria: materia,
        belongsToCurso: curso,
      },
    });

    newClase.setMaterium(materiaDB); //No se porque es materium en vez de materia XD

    return res.send("Clase subida correctamente");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const putClase = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { curso, nombre, descripcion, profesores, materia } = req.body;

    //     const parseStringToArray = (str) => {
    //       let array = str.split(", ")
    //     return array;
    //  }

    const claseEncontrada = await Clase.findOne({
      where: { id: id },
    });

    const cursoDB = await Curso.findOne({
      where: {
        nombre: curso,
      },
    });

    const materiaDB = await Materia.findOne({
      where: {
        cursoId: cursoDB.id,
        nombre: materia,
      },
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

    newClase.setMaterium(materiaDB); //No se porque es materium en vez de materia XD

    res.send("Clase actualizada correctamente");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const deleteClase = async (req, res, next) => {
  try {
    const { id } = req.params;
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
