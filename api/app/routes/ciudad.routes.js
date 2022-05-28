const express = require("express");
const router = express.Router();

const { getCiudades } = require("../controllers/ciudades.controller");

router.get("ciudades/:provincia", getCiudades);

module.exports = router;
