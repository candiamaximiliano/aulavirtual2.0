import React, { useEffect } from "react";
import { getClase } from "../../redux/actionCreators";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import claseStyle from "../../styles/clase.module.css";
import InfiniteScrollComponent from "../Organisms/InfiniteScroll";

const Clase = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const clase = useSelector((state) => state.claseReducer.clase);
  useEffect(() => {
    dispatch(getClase(id));
  }, [dispatch, id]);

  return (
    <div className={claseStyle.container}>
      {clase && (
        <>
          <div className={claseStyle.titleContainer}>
            <h3 className={claseStyle.title}>{clase[0].nombre}</h3>
            <h6 className={claseStyle.subtitle}>
              Esta clase pertenece a la materia{" "}
              <strong>{clase[0].belongsToMateria}</strong> del curso{" "}
              <strong>{clase[0].belongsToCurso}</strong>
            </h6>
          </div>
          <div className={claseStyle.dataContainer}>
            <div className={claseStyle.descripcionContainer}>
              <p>{clase[0].descripcion}</p>
            </div>
            <div className={claseStyle.profesorContainer}>
              <h6>Clase a cargo de:</h6>
              <ul className={claseStyle.ul}>
                {clase[0].profesores.map((profesor, index) => (
                  <li className={claseStyle.li} key={index}>
                    {profesor}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={claseStyle.playerContainer}>
            <InfiniteScrollComponent data={clase[0].fragmentos} />
          </div>
        </>
      )}
    </div>
  );
};

export default Clase;
