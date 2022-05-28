const { Router } = require("express");
const { authJwt } = require("../middlewares");
const {
  getFragmentoById,
  postFragmento,
  putFragmento,
  deleteFragmento,
  getAllFragmentos,
} = require("../controllers/fragmentos.controller");

const router = Router();

// router.get('/', getClases);

router.get(
  "/fragmentos/:fragmentoId",
  /* [authJwt.verifyToken],  */ getFragmentoById
);

router.get("/fragmentos", /* [authJwt.verifyToken],  */ getAllFragmentos);

router.post(
  "/fragmentos",
  /* [authJwt.verifyToken, authJwt.isAdmin], */
  postFragmento
);

router.put("/fragmentos/:fragmentoId", putFragmento);

router.delete("/fragmentos/:fragmentoId", deleteFragmento);

module.exports = router;
