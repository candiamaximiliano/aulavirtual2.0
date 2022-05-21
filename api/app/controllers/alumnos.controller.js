const bcrypt = require('bcrypt');
const { Alumno } = require('../../../api/src/db');

const getAlumnos = async () => {
  try {
    return await Alumno.findAll();
  } catch (error) {
    next(error);
  }
};

const getAlumnoById = async (req, res, next) =>{
  try {
    const { userId } = req.query;
    const totalUsers = await getAlumnos();
    if(userId) {
      const userById = await totalUsers.filter(user => user.id.toLowerCase().includes(userId.toLowerCase()));
      userById.length?
      res.status(200).send(userById):
      res.status(404).send('No existe ese usuario');
    } else {
      res.status(200).send(totalUsers);
    }
  } catch (error) {
    next(error);
  }
};

const postAlumno = async (req, res, next) =>{
  try {
    const { 
      fotoDePerfil, 
      nombre, 
      apellido, 
      usuario, 
      email, 
      contraseña,
      contraseña2, 
      dni, 
      fechaDeNacimiento, 
      direccion, 
      numeroDeContacto, 
      consentimientoWhatsapp, 
    } = req.body;
  
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(contraseña, saltRounds);
    
    const userCreated = await Alumno.create({
      fotoDePerfil, 
      nombre, 
      apellido, 
      usuario, 
      email, 
      contraseña: passwordHash, 
      dni, 
      fechaDeNacimiento, 
      direccion, 
      numeroDeContacto, 
      consentimientoWhatsapp,
    });
    res.send('Usuario registrado correctamente');
  } catch (error) {
    next(error);
  }
};

const putAlumno = async (req, res, next) =>{
  try {
    const {id} = req.params;
    const {
      fotoDePerfil, 
      nombre, 
      apellido, 
      usuario, 
      email,  
      dni, 
      fechaDeNacimiento, 
      direccion, 
      numeroDeContacto, 
    } = req.body;

    await Alumno.update({
      fotoDePerfil: fotoDePerfil ,
      nombre: nombre,
      apellido: apellido, 
      usuario: usuario, 
      email: email,  
      dni: dni, 
      fechaDeNacimiento: fechaDeNacimiento, 
      direccion: direccion, 
      numeroDeContacto: numeroDeContacto, 
    },{
      where:{
        id: id,
      }
    })
    res.send('Datos actualizados correctamente')
  } catch (error) {
    next(error);
  }
};

const deleteAlumno = async (req, res, next) =>{
  try {
    const {id} = req.params;
    await Alumno.destroy({
      where:{
        id: id,
      }
    })
    res.send('Alumno borrado exitosamente!')
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAlumnos, getAlumnoById, postAlumno, putAlumno, deleteAlumno
}