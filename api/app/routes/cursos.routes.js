const { Router } = require("express");
const { getCursos, getCursoById } = require("../controllers/cursos.controller");

const router = Router();

router.get("/cursos", getCursos);

router.get("/cursos/:id", getCursoById);

module.exports = router;
