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
        imagen={{
          src: "https://static.vecteezy.com/system/resources/previews/002/294/885/non_2x/digital-classroom-web-banner-design-student-watching-teacher-on-online-web-education-platform-online-education-digital-classroom-e-learning-concept-header-or-footer-banner-free-vector.jpg",
          alt: "Banner profesores",
        }}
        title="Nuestros profesores"
        subtitle="Este plantel docente esta altamente calificado para guiarte en tu
              educación"
      />
      {profesores && (
        <main className="ed-grid m-grid-3 lg-grid-4 row-gap">
          {profesores?.map((t) => (
            <Teacher
              key={t.id}
              picture={t.picture}
              name={t.name}
              country={t.country}
            />
          ))}
        </main>
      )}
    </>
  );
};

export default Teachers;
