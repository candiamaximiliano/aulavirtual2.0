const {
  admin,
  profesor,
  alumno,
  instructorado,
  especializacion,
  profesorado,
} = require(".");

const ROLES = {
  Admin: admin,
  Profesor: profesor,
  Alumno: alumno,
  Instructorado: instructorado,
  Especializacion: especializacion,
  Profesorado: profesorado,
};

module.exports = ROLES;
