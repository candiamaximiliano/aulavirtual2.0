import React from "react";
import layout from "../../styles/layout.module.css";

const Layout = () => {
  return (
    <div className={layout.containerLayout}>
      <div className={layout.imageContainer}>
        <h1 className={layout.frase}>¡Con Sabor a Caribe!</h1>
        <img
          className={layout.logoLayout}
          src="https://profesoradocaribeño.com.ar/imagenes/zunzuncito.png"
          alt="LogoApp"
        ></img>
      </div>
    </div>
  );
};

export default Layout;
