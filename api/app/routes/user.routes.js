const express = require("express");
const { Router } = require("express");
const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(express.json());

router.get("/usuarios/", controller.getUsers);
router.put("/user/:id", controller.putUser);
router.delete("/user/:id", controller.deleteUser);

module.exports = router;
