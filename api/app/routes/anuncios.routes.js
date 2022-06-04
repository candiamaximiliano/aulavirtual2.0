const { Router } = require("express");
const { authJwt } = require("../middlewares");
const {
  getAnuncioById,
  postAnuncio,
  putAnuncio,
  deleteAnuncio,
  getAllAnuncios,
} = require("../controllers/anuncios.controller");

const router = Router();

// router.get('/', getClases);

router.get("/anuncios/:anuncioId", /* [authJwt.verifyToken], */ getAnuncioById);

router.get("/anuncios", /* [authJwt.verifyToken], */ getAllAnuncios);

router.post(
  "/anuncios",
  /* [authJwt.verifyToken, authJwt.isAdmin], */
  postAnuncio
);

router.put("/anuncios/:anuncioId", putAnuncio);

router.delete("/anuncios/anuncioId", deleteAnuncio);

module.exports = router;
