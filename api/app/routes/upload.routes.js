const express = require("express");
const router = express.Router();
const { saveImage } = require("../controllers/saveImage.controller");

router.post("upload/static/:code", saveImage);

module.exports = router;
