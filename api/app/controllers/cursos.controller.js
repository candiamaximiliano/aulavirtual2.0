const { Curso, Materia } = require("../config/db.config");

const getCursos = async (req, res, next) => {
  try {
    const totalCursos = await Curso.findAll({
      attributes: [
        "id",
        "nombre",
        "portada",
        "informacion",
        "habilidades",
        "conocimientos",
        "nivel",
      ],
      include: [
        {
          model: Materia,
          // as: "materias",
          attributes: [
            "id",
            "nombre",
            "subtitulo",
            "informacion",
            "nivel",
            "portada",
          ],
        },
      ],
    });
    totalCursos.length
      ? res.status(200).send(totalCursos)
      : res.status(404).send("No existen cursos agregados");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getCursoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const totalCursos = await Curso.findAll({
      attributes: [
        "id",
        "nombre",
        "portada",
        "informacion",
        "habilidades",
        "conocimientos",
        "nivel",
      ],
      include: [
        {
          model: Materia,
          // as: "materias",
          attributes: [
            "id",
            "nombre",
            "subtitulo",
            "informacion",
            "nivel",
            "portada",
          ],
        },
      ],
    });
    const cursoById = totalCursos.filter((curso) => curso.id == id);
    res.send(cursoById);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCursos,
  getCursoById,
};
