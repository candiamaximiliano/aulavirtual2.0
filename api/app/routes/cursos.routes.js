const { Router } = require("express");
const { getCursos, getCursoById } = require("../controllers/cursos.controller");
const { authJwt } = require("../middlewares");

const router = Router();

router.get("/cursos", [authJwt.verifyToken], getCursos);

router.get("/cursos/:id", [authJwt.verifyToken], getCursoById);

module.exports = router;
