const { Router } = require("express");
const {
  getMaterias,
  postMateria,
  getMateriaById,
  putMateria,
  deleteMateria,
} = require("../controllers/materias.controller");
const { authJwt } = require("../middlewares");

const router = Router();

router.get("/materias", /* [authJwt.verifyToken], */ getMaterias);

router.post("/materias", postMateria);

router.get("/materias/:id", /* [authJwt.verifyToken], */ getMateriaById);

router.put("/materias/:id", putMateria);

router.delete("/materias/:id", deleteMateria);

module.exports = router;
