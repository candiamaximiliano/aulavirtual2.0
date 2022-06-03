const { Router } = require("express");
const { getProfesores } = require("../controllers/user.controller");

const router = Router();

router.get("/profesores", getProfesores);

// router.get("/profesores/:id", getCursoById);

module.exports = router;
