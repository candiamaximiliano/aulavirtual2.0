const { Clase, Curso, Materia } = require("../config/db.config");

const getMaterias = async (req, res, next) => {
  try {
    const totalMaterias = await Materia.findAll({
      attributes: [
        "id",
        "nombre",
        "subtitulo",
        "informacion",
        "nivel",
        "portada",
        "belongsToCurso",
      ],
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
      attributes: [
        "id",
        "nombre",
        "subtitulo",
        "informacion",
        "nivel",
        "portada",
        "belongsToCurso",
      ],
      include: [
        {
          model: Clase,
          attributes: ["id", "nombre", "descripcion", "profesores"],
        },
      ],
    });
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
    let materiaYaExiste = null;

    materiaYaExiste = await Materia.findOne({
      where: {
        nombre,
        subtitulo,
        informacion,
        nivel,
        portada,
        belongsToCurso: curso,
      },
    });

    const cursoDB = await Curso.findOne({
      where: {
        nombre: curso,
      },
    });

    if (!cursoDB) {
      return res
        .status(404)
        .send(
          "No se encontró el curso al cual quieres añadir esta nueva materia"
        );
    }

    if (materiaYaExiste) {
      if (cursoDB.id == materiaYaExiste.cursoId) {
        return res
          .status(403)
          .send(
            "La materia que intentas añadir ya existe en nuestra base de datos"
          );
      } else {
        await Materia.create({
          nombre,
          subtitulo,
          informacion,
          nivel,
          portada,
          belongsToCurso: curso,
        });
      }
    } else {
      await Materia.create({
        nombre,
        subtitulo,
        informacion,
        nivel,
        portada,
        belongsToCurso: curso,
      });
    }

    const materiaCreada = await Materia.findOne({
      where: {
        cursoId: null,
        nombre,
        subtitulo,
        informacion,
        nivel,
        portada,
        belongsToCurso: curso,
      },
    });

    await materiaCreada.setCurso(cursoDB);

    return res.send("Materia subida correctamente");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const putMateria = async (req, res, next) => {
  try {
    const { id } = req.params;
    const idParams = Number(id);
    console.log("Este es el id hecho numero", idParams);
    const { curso, nombre, subtitulo, informacion, nivel, portada } = req.body;

    const materiaEncontrada = await Materia.findOne({
      where: { id: idParams },
    });

    const cursoDB = curso
      ? Curso.findOne({
          where: {
            nombre: curso,
          },
        })
      : null;

    materiaEncontrada === null
      ? res.status(404).send("No se encontró una materia con ese id")
      : await Materia.update(
          {
            nombre: nombre ? nombre : materiaEncontrada.nombre,
            subtitulo: subtitulo ? subtitulo : materiaEncontrada.subtitulo,
            informacion: informacion
              ? informacion
              : materiaEncontrada.informacion,
            nivel: nivel ? nivel : materiaEncontrada.nivel,
            portada: portada ? portada : materiaEncontrada.portada,
            belongsToCurso: curso ? curso : materiaEncontrada.curso,
          },
          { where: { id: idParams } }
        );

    cursoDB ? await materiaEncontrada.setCurso(cursoDB) : null;

    res.send("Materia actualizada correctamente");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const deleteMateria = async (req, res, next) => {
  try {
    const { id } = req.params;
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
