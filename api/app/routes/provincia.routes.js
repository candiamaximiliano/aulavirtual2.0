const express = require("express");
const router = express.Router();

const { getProvincias } = require("../controllers/provincias.controller");

router.get("provincias/", getProvincias);

module.exports = router;
