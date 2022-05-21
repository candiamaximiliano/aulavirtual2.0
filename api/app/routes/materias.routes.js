const { Router } = require("express");
const {
  getMaterias,
  postMateria,
  getMateriaById,
  putMateria,
  deleteMateria,
} = require("../controllers/materias.controller");

const router = Router();

router.get("/materias", getMaterias);

router.post("/materias", postMateria);

router.get("/materias/:id", getMateriaById);

router.put("/materias/:id", putMateria);

router.delete("/materias/:id", deleteMateria);

module.exports = router;
