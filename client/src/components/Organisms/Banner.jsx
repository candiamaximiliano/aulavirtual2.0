import React from "react";
import { Link } from "react-router-dom";
import banner from "../../styles/banner.module.css";

export const Banner = ({
  color,
  image,
  title,
  subtitle,
  home,
  poster,
  courseBanner,
  speciality,
  info,
}) => {
  return (
    <div className={`main-banner img-container l-block ${banner.data}`}>
      <div className="ed-grid">
        <div>
          <img
            src={image.src}
            alt={image.alt}
            className={`main-banner__img ${banner.image}`}
          />
          {home ? (
            <div className="ed-grid m-grid-2">
              <div className={`main-banner__data`}>
                <h1 className="main-banner__title">{title}</h1>
                <p>{subtitle}</p>
                <Link to="/cursos" className="button accent-color">
                  Ver cursos
                </Link>
              </div>
              <div className="img-container s-ratio-19-9">
                <img
                  src={`https://profesoradocaribeño.com.ar/imagenes/${poster}"`}
                  alt="Curso actual"
                />
              </div>
            </div>
          ) : courseBanner ? (
            <div className="ed-grid m-grid-3">
              <div className="main-banner__data m-cols-2">
                <h1 className="main-banner__title s-mb-0">{title}</h1>
                <p className="s-opacity-6">{subtitle}</p>
                <p>{info}</p>
                {speciality && (
                  <p>
                    Este curso forma parte de la especialidad{" "}
                    <Link to="/especialidades">{speciality}</Link>
                  </p>
                )}
              </div>
              <div className="img-container s-ratio-16-9 m-cols-1">
                <img
                  src={`https://profesoradocaribeño.com.ar/imagenes/${poster}"`}
                  alt="Curso actual"
                />
              </div>
            </div>
          ) : (
            <div className="main-banner__data s-center">
              <h1 className="main-banner__title">{title}</h1>
              <p>{subtitle}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
