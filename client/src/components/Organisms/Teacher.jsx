import React from "react";
import teacherStyle from "../../styles/teacher.module.css";

export const Teacher = ({
  nombre,
  apellido,
  imagen,
  pais,
  provincia,
  ciudad,
}) => {
  return (
    <article className={teacherStyle.article}>
      <div className={teacherStyle.container}>
        <div className={teacherStyle.imagenContainer}>
          <img
            className={teacherStyle.imagen}
            src={`${process.env.REACT_APP_BACKEND}/imagenes/${imagen}`}
            alt={nombre}
          />
        </div>
        <div className={teacherStyle.dataContainer}>
          <p className={teacherStyle.name}>{`${nombre} ${apellido}`}</p>
          <p className={teacherStyle.ciudad}>{`${ciudad}, ${provincia}`}</p>
          <p className={teacherStyle.pais}>{pais}</p>
        </div>
        <button className={teacherStyle.button}>Enviar Mensaje</button>
      </div>
    </article>
  );
};
