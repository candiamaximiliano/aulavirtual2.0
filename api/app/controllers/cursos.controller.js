const { Curso, Materia } = require("../config/db.config");

const getCursos = async (req, res, next) => {
  try {
    const totalCursos = await Curso.findAll({
      attributes: ["id", "nombre"],
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

const getCursoById = async (req, res) => {
  try {
    const { id } = req.params;
    const cursoById = await Curso.findByPk(id);
    res.send(cursoById);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCursos,
  getCursoById,
};
