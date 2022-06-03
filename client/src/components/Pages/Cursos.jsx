import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCursos } from "../../redux/actionCreators";
import { Banner } from "../Organisms/Banner";
import { Card } from "../Organisms/Card";
import style from "../../styles/cursos.module.css";

const Cursos = () => {
  const dispatch = useDispatch();
  const cursos = useSelector((state) => state.cursoReducer.cursos);
  useEffect(() => {
    dispatch(getAllCursos());
  }, [dispatch]);

  return (
    <div className={style.container}>
      <Banner
        color="first-color"
        image={{
          src: `${process.env.REACT_APP_BACKEND}/imagenes/instructorado.png`,
          alt: "alt",
        }}
        title="Cursos y Especializaciones"
        subtitle="Aquí encontrarás las herramientas necesarias para desarrollarte profesionalmente"
      />
      {cursos && (
        <main className="ed-grid m-grid-3">
          {cursos?.map((s) => (
            <Card
              key={s.id}
              cardId={s.id}
              picture={s.portada}
              name={s.nombre}
              path="cursos"
            />
          ))}
        </main>
      )}
    </div>
  );
};

export default Cursos;
