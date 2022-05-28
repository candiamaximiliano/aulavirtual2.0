const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("curso", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    portada: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    informacion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    habilidades: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    conocimientos: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    nivel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
