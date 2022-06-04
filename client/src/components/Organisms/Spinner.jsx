import React from "react";
import { Spinner } from "reactstrap";
import loading from "../../styles/loading.module.css";

const Loading = () => {
  return (
    <div className={loading.container}>
      <Spinner color="success" className={loading.spinner} />
      <p className={loading.p}>CARGANDO...</p>
    </div>
  );
};

export default Loading;
