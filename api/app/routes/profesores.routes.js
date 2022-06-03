const { Router } = require("express");
const { getProfesores } = require("../controllers/user.controller");
const { authJwt } = require("../middlewares");

const router = Router();

router.get("/profesores", [authJwt.verifyToken], getProfesores);

// router.get("/profesores/:id", getCursoById);

module.exports = router;
