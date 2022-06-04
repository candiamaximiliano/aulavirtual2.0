import React from "react";
import publication from "../../styles/publication.module.css";

export const Publication = ({ coverImage, title, subtitle, url, content }) => {
  return (
    <article className={`publication l-block ${publication.article}`}>
      <div className={`publication__container ${publication.container}`}>
        <div className={`imgcontainer ${publication.imageContainer}`}>
          <img
            className={`${publication.coverImage}`}
            src={`${process.env.REACT_APP_BACKEND}/imagenes/${coverImage}`}
            alt={title}
          />
        </div>
        <div className={`${publication.content}`}>
          <h2 className={`publication__title t3 ${publication.title}`}>
            {title}
          </h2>
          <span>
            <b className={publication.b}>{subtitle}</b>
          </span>
          <div className="publication__content">
            <p className={publication.p}>{content}</p>
          </div>
        </div>
      </div>
    </article>
  );
};
