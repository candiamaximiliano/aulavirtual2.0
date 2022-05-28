const jwt = require("jsonwebtoken");
const {
  admin,
  profesor,
  alumno,
  instructorado,
  profesorado,
  especializacion,
} = require("../config");
const config = require("../config/auth.config");
const { User } = require("../config/db.config");
const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res
      .status(401)
      .send({ message: "Unauthorized! Access Token was expired!" });
  }
  return res.sendStatus(401).send({ message: "Unauthorized!" });
};

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === admin) {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Admin Role!",
      });
      return;
    });
  });
};

const isAlumno = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === alumno) {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Alumno Role!",
      });
      return;
    });
  });
};

const isAlumnoPlus = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (
          roles[i].name === alumno ||
          roles[i].name === instructorado ||
          roles[i].name === profesorado ||
          roles[i].name === especializacion
        ) {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Alumno Role!",
      });
      return;
    });
  });
};

const isProfesor = async (req, res, next) => {
  // console.log(`---- User ---- ${User} ----`)
  // const pepito = await User.findByPk(req.userId);
  // const roles = pepito.getRoles();
  // for (let i = 0; i < roles.length; i++) {
  //       if (roles[i].name === "moderator") {
  //         next();
  //         return;
  //       }
  //     }
  // res.status(403).send({
  //       message: "Require Moderator Role!"
  //     });
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === profesor) {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Profesor Role!",
      });
    });
  });
};

const isProfesorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === profesor) {
          next();
          return;
        }
        if (roles[i].name === admin) {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Profesor or Admin Role!",
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isProfesor: isProfesor,
  isAlumno: isAlumno,
  isAlumnoPlus: isAlumnoPlus,
  isProfesorOrAdmin: isProfesorOrAdmin,
};

module.exports = authJwt;
