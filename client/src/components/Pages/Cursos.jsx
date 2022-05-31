import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCursos } from "../../redux/actionCreators";
import { Banner } from "../Organisms/Banner";
import { Card } from "../Organisms/Card";

const Cursos = () => {
  const dispatch = useDispatch();
  const cursos = useSelector((state) => state.cursoReducer.cursos);
  useEffect(() => {
    dispatch(getAllCursos());
  }, [dispatch]);

  return (
    <>
      <Banner
        color="first-color"
        image={{
          src: `${process.env.REACT_APP_BACKEND}/imagenes/prueba.png`,
          alt: "alt",
        }}
        title="Cursos"
        subtitle="Domina una tecnología con las rutas de aprendizaje que te ofrecemos"
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
    </>
  );
};

export default Cursos;
