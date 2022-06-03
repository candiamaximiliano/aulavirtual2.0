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
              <div className={`main-banner__data $`}>
                <h1 className={`main-banner__title ${banner.title}`}>
                  {title}
                </h1>
                <p className={banner.subtitle}>{subtitle}</p>
                <Link
                  to="/cursos"
                  className={`button accent-color ${banner.button}`}
                >
                  Ver cursos
                </Link>
              </div>
              <div className={`img-container s-ratio-19-9 ${banner.imagen2}`}>
                <img
                  src={`${process.env.REACT_APP_BACKEND}/imagenes/${poster}`}
                  alt="Curso actual"
                />
              </div>
            </div>
          ) : courseBanner ? (
            <div className="ed-grid m-grid-3">
              <div className="main-banner__data m-cols-2">
                <h1
                  className={`main-banner__title s-mb-0 ${banner.courseTitle}`}
                >
                  {title}
                </h1>
                <p className={`s-opacity-6 ${banner.courseP}`}>{subtitle}</p>
                <p className={`${banner.info}`}>{info}</p>
                {/* {speciality && (
                  <p>
                    Este curso forma parte de la especialidad{" "}
                    <Link to="/cursos">{speciality}</Link>
                  </p>
                )} */}
              </div>
              <div className="img-container s-ratio-16-9 m-cols-1">
                <img
                  src={`${process.env.REACT_APP_BACKEND}/imagenes/${poster}`}
                  alt="Curso actual"
                  className={`${banner.imagen2}`}
                />
              </div>
            </div>
          ) : (
            <div className={`main-banner__data s-center ${banner.main}`}>
              <h1 className={`main-banner__title ${banner.title2}`}>{title}</h1>
              <p className={`${banner.p2}`}>{subtitle}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
