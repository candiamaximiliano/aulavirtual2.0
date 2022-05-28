const { Router } = require("express");
const { getCursos, getCursoById } = require("../controllers/cursos.controller");

const router = Router();

router.get("/alumnos", getCursos);

router.get("/alumnos/:id", getCursoById);

module.exports = router;
