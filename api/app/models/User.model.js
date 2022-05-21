const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    fotoDePerfil: {
      type: DataTypes.TEXT,
      defaultValue: 'zunzuncito',
    },
    base64: {
      type: DataTypes.TEXT,
      defaultValue: 'zunzuncito',
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usuario: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    contraseña: {
      type: DataTypes.STRING
    },
    dni: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    fechaDeNacimiento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numeroDeContacto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    consentimientoWhatsapp: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    instructorado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    especializacion: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    profesorado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  return User;
};