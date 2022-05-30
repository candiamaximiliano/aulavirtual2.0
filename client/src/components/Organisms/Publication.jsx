import React from "react";
import publication from "../../styles/publication.module.css";

export const Publication = ({ coverImage, title, subtitle, url, content }) => {
  return (
    <article className={`publication l-block ${publication.article}`}>
      <div className={`publication__container ${publication.container}`}>
        <div className={`imgcontainer ${publication.imageContainer}`}>
          <img
            className={`${publication.coverImage}`}
            src={coverImage}
            alt={title}
          />
        </div>
        <div className={`${publication.content}`}>
          <h2 className="publication__title t3">{title}</h2>
          <span>
            <b>{subtitle}</b> a las {url}
          </span>
          <div className="publication__content">
            <p>{content}</p>
          </div>
        </div>
      </div>
    </article>
  );
};
