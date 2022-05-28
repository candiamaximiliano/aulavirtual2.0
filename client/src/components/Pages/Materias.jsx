import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Banner } from "../Organisms/Banner";
import { getAllMaterias } from "../../redux/actionCreators";
import { Card } from "../Organisms/Card";

const Materias = () => {
  const dispatch = useDispatch();
  const materias = useSelector((state) => state.materiaReducer.materias);
  useEffect(() => {
    dispatch(getAllMaterias());
  }, [dispatch]);

  return (
    <>
      <Banner
        color="dark-color"
        image={{
          src: "",
          alt: "Banner cursos",
        }}
        title="Nuestros cursos"
        subtitle="Comienza desde cero hoy mismo en tu camino a dominar la tecnología"
      />
      {materias && (
        <main className="ed-grid m-grid-5">
          {materias?.map((c) => (
            <Card
              key={c.id}
              cardId={c.id}
              picture={c.clase.nombre}
              name={c.nombre}
              path="cursos"
            />
          ))}
        </main>
      )}
    </>
  );
};

export default Materias;
