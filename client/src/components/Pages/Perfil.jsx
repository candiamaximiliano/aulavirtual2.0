import React from "react";
import { useSelector } from "react-redux";
import perfil from "../../styles/perfil.module.css";

const Perfil = () => {
  const user = useSelector((state) => state.auth?.user);

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
            <h5 className={perfil.h5}>Usuario: </h5>
            <p className={perfil.p}>{`${user.usuario}`}</p>
          </div>
          <div className={perfil.data}>
            <h5 className={perfil.h5}>Email: </h5>{" "}
            <p className={perfil.p}>{`${user.email}`}</p>
          </div>
          <div className={perfil.data}>
            <h5 className={perfil.h5}>DNI: </h5>{" "}
            <p className={perfil.p}>{`${user.dni}`}</p>
          </div>
          <div className={perfil.data}>
            <h5 className={perfil.h5}>Fecha de Nacimiento: </h5>{" "}
            <p className={perfil.p}>{`${user.fechaDeNacimiento}`}</p>
          </div>
          <div className={perfil.data}>
            <h5 className={perfil.h5}>Dirección: </h5>{" "}
            <p
              className={perfil.p}
            >{`${user.direccion}, ${user.ciudad.NOMBRE_CIUDAD}, ${user.provincia.NOMBRE_PROVINCIA}, ${user.pais.NOMBRE_PAIS}`}</p>
          </div>
          <div className={perfil.data}>
            <h5 className={perfil.h5}>Celular: </h5>{" "}
            <p className={perfil.p}>{`${user.numeroDeContacto}`}</p>
          </div>
        </div>
        <div className={perfil.content2}>
          <div className={perfil.data}>
            <h5 className={perfil.h5}>Formación en curso:</h5>
            {user.roles?.map((rol) => (
              <p className={perfil.roles}>
                {rol === process.env.REACT_APP_INSTRUCTORADO
                  ? "Instructorado en Salsa y Bachata"
                  : rol === process.env.REACT_APP_ESPECIALIZACION
                  ? "Especialización en Estilo y Coreografía"
                  : rol === process.env.REACT_APP_PROFESORADO
                  ? "Profesorado en Ritmos Caribeños"
                  : rol === process.env.REACT_APP_ALUMNO
                  ? null
                  : rol === process.env.REACT_APP_ADMIN
                  ? null
                  : rol === process.env.REACT_APP_PROFESOR
                  ? null
                  : "Actualmente no formas parte de ninguna capacitación"}
                {/* TODO: CORREGIR ESTA LOGICA QUE ESTA MAL */}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
