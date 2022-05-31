import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/actionCreators";

import style from "../../styles/login.module.css";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useRef();

  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  if (loading) {
  }

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  if (message) {
  }

  const onChangeUsername = (e) => {
    const usuario = e.target.value;
    setUsuario(usuario);
  };

  const onChangePassword = (e) => {
    const contraseña = e.target.value;
    setContraseña(contraseña);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(login(usuario, contraseña))
      .then(() => {
        navigate("/home");
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (isLoggedIn) {
    setSuccessful(true);
    return navigate("/home");
  }

  return (
    <div className={style.container}>
      <div className={style.subContainer}>
        <div className={style.profileContainer}>
          <img
            src="https://profesoradocaribeño.com.ar/imagenes/zunzuncito.png"
            alt="logo512.png"
            className={style.profileImage}
          />
        </div>
        <form className={style.formLayout} onSubmit={handleLogin} ref={form}>
          <div className={style.formGroup}>
            <i className={`fa-solid fa-user fa-2x ${style.icon}`}></i>
            <input
              type="text"
              className={style.formControl}
              name="usuario"
              value={usuario}
              onChange={onChangeUsername}
              validations={[required]}
              placeholder="Usuario"
            />
          </div>
          <div className={style.formGroup}>
            <i className={`fa-solid fa-lock fa-2x ${style.icon}`}></i>
            <input
              type="password"
              className={style.formControl}
              name="contraseña"
              value={contraseña}
              onChange={onChangePassword}
              validations={[required]}
              placeholder="Contraseña"
            />
          </div>
          <div className={style.formGroup}>
            <button className={style.formButton} disabled={loading}>
              {loading && <span className={style.loading}></span>}
              <span>Iniciar Sesión</span>
            </button>
          </div>
          {message &&
            setTimeout(() => {
              return (
                <div className={style.formGroup}>
                  <div
                    className={
                      successful ? "alert alert-success" : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
              );
            }, 4000)}
        </form>
      </div>
    </div>
  );
};
export default Login;
