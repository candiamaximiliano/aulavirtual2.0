import React from "react";
import layout from "../../styles/layout.module.css";

const Layout = () => {
  return (
    <div className={layout.containerLayout}>
      <div className={layout.imageContainer}>
        <h1 className={layout.frase}>Formando profesionales con fundamentos</h1>
        <img
          className={layout.logoLayout}
          src={`${process.env.REACT_APP_BACKEND}/imagenes/zunzuncito.png`}
          alt="LogoApp"
        ></img>
      </div>
    </div>
  );
};

export default Layout;
