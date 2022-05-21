const { Clase, Curso, Materia } = require("../config/db.config");

const getMaterias = async (req, res, next) => {
  try {
    const totalMaterias = await Materia.findAll({
      attributes: ["id", "nombre"],
      include: [
        {
          model: Clase,
          attributes: ["id", "nombre", "descripcion", "profesores"],
        },
      ],
    });
    totalMaterias.length
      ? res.status(200).send(totalMaterias)
      : res.status(404).send("No existen materias");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getMateriaById = async (req, res) => {
  try {
    const { id } = req.params;
    const materias = await Materia.findAll({
      attributes: ["id", "nombre"],
      include: [
        {
          model: Clase,
          attributes: ["id", "nombre", "descripcion", "profesores"],
        },
      ],
    });
    console.log(materias);
    const materiaById = await materias.filter((materia) => materia.id == id);
    materiaById.length
      ? res.send(materiaById)
      : res.send("No existe un video con ese identificador");
  } catch (error) {
    console.error(error);
    // next(error);
  }
};

const postMateria = async (req, res, next) => {
  const { curso, nombre, subtitulo, informacion, nivel, portada } = req.body;
  try {
    await Materia.findOrCreate({
      where: {
        nombre,
        subtitulo,
        informacion,
        nivel,
        portada,
      },
    });

    const cursoDB = await Curso.findOne({
      where: {
        nombre: curso,
      },
    });

    materiaCreada = await Materia.findOne({
      where: {
        nombre: nombre,
      },
    });

    materiaCreada.setCurso(cursoDB);
    // cursoDB.setMaterium(materiaCreada);

    res.send("Materia subida correctamente");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const putMateria = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;

    const materiaEncontrada = await Materia.findOne({
      where: { id: id },
    });

    materiaEncontrada === null
      ? res.status(404).send("No se encontró una materia con ese id")
      : await Materia.update(
          {
            nombre: nombre,
          },
          { where: { id: id } }
        );
    res.send("Materia actualizada correctamente");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const deleteMateria = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("id de materia: " + id);
    await Materia.destroy({
      where: {
        id: id,
      },
    });
    res.send("Materia eliminada correctamente");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMaterias,
  getMateriaById,
  postMateria,
  putMateria,
  deleteMateria,
};
