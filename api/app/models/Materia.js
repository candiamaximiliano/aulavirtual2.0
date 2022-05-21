const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("materia", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subtitulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    informacion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    nivel: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: ["PRINCIPIANTE"],
    },
    portada: {
      type: DataTypes.STRING,
      defaultValue: "portadaGenerica",
    },
  });
};
