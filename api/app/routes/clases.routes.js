const { Router } = require("express");
const { authJwt } = require("../middlewares");
const {
  getClases,
  getClaseById,
  postClase,
  putClase,
  deleteClase,
} = require("../controllers/clases.controller");

const router = Router();

// router.get('/', getClases);

router.get("/clases/:claseId", /* [authJwt.verifyToken], */ getClaseById);

router.get("/clases", /* [authJwt.verifyToken], */ getClases);

// router.post(
//   "/",
//   /* [authJwt.verifyToken, authJwt.isAdmin], */
//   postClase
// );

router.post("/clases", postClase);

router.put("/clases/:id", putClase);

router.delete("/clases/:id", deleteClase);

module.exports = router;
