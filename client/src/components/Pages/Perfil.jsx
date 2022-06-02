import React from "react";
import { useSelector } from "react-redux";
import perfil from "../../styles/perfil.module.css";

const Perfil = () => {
  const user = useSelector((state) => state.auth?.user);
  console.log(user);

  return (
    <div className={perfil.background}>
      <div className={perfil.profileContainer}>
        <div className={perfil.profileImage}>
          <img
            src={`${process.env.REACT_APP_BACKEND}/imagenes/${user.imagen}`}
            alt={user.imagen}
            className={perfil.imagen}
          />
        </div>
        <div className={perfil.information}>
          <h3>{`${user.nombre} ${user.apellido}`}</h3>
        </div>
        <button className={perfil.button}>Editar Perfil</button>
      </div>
      <div className={perfil.userContent}>
        <div className={perfil.content1}>
          <div className={perfil.data}>
            <h5>Usuario: </h5> <p>{`${user.usuario}`}</p>
          </div>
          <div className={perfil.data}>
            <h5>Email: </h5> <p>{`${user.email}`}</p>
          </div>
          <div className={perfil.data}>
            <h5>DNI: </h5> <p>{`${user.dni}`}</p>
          </div>
          <div className={perfil.data}>
            <h5>Fecha de Nacimiento: </h5> <p>{`${user.fechaDeNacimiento}`}</p>
          </div>
          <div className={perfil.data}>
            <h5>Dirección: </h5> <p>{`${user.direccion}`}</p>
          </div>
          <div className={perfil.data}>
            <h5>Celular: </h5> <p>{`${user.numeroDeContacto}`}</p>
          </div>
        </div>
        <div className={perfil.content2}>
          <div className={perfil.data}>
            <h5>Formación en curso:</h5>
            {user.roles?.map((rol) => (
              <p>{rol}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
