import React, { useEffect } from "react";
import { Banner } from "../Organisms/Banner";
import { getAllProfesores } from "../../redux/actionCreators";
import { useDispatch, useSelector } from "react-redux";
import { Teacher } from "../Organisms/Teacher";

const Teachers = () => {
  const dispatch = useDispatch();
  const profesores = useSelector((state) => state.profesorReducer.profesores);
  useEffect(() => {
    dispatch(getAllProfesores());
  }, [dispatch]);

  return (
    <>
      <Banner
        color="third-color"
        image={{
          src: "https://static.vecteezy.com/system/resources/previews/002/294/885/non_2x/digital-classroom-web-banner-design-student-watching-teacher-on-online-web-education-platform-online-education-digital-classroom-e-learning-concept-header-or-footer-banner-free-vector.jpg",
          alt: "Banner profesores",
        }}
        title="Nuestros profesores"
        subtitle="Este plantel docente esta altamente calificado para guiarte en tu camino por los Ritmos Caribeños. Te invitamos a que los conozcas"
      />
      {profesores && (
        <main className="ed-grid m-grid-3 lg-grid-4 row-gap">
          {profesores?.map((t) => (
            <Teacher
              key={t.id}
              imagen={t.imagen}
              nombre={t.nombre}
              apellido={t.apellido}
              pais={t.Pai.NOMBRE_PAIS}
              provincia={t.Provincium.NOMBRE_PROVINCIA}
              ciudad={t.Ciudad.NOMBRE_CIUDAD}
            />
          ))}
        </main>
      )}
    </>
  );
};

export default Teachers;
