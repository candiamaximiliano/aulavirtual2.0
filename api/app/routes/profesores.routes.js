const { Router } = require("express");
const { getCursos, getCursoById } = require("../controllers/cursos.controller");

const router = Router();

router.get("/profesores", getCursos);

router.get("/profesores/:id", getCursoById);

module.exports = router;
