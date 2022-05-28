import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/actionCreators";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {
  const navigate = useNavigate();
  const form = useRef();
  const checkBtn = useRef();
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [loading, setLoading] = useState(false);
  // const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
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
    // form.current.validateAll();
    if (/* checkBtn.current.context._errors.length === 0 */ true) {
      dispatch(login(usuario, contraseña))
        .then(() => {
          navigate("/profile");
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="subContainer">
        <div className="profileContainer">
          <img
            src="https://thumbs4.imagebam.com/6c/a5/f0/ME9I39H_t.png"
            alt="logo512.png"
            className="profileImage"
          />
        </div>
        <form className="formLayout" onSubmit={handleLogin} ref={form}>
          <div className="formGroup">
            <input
              type="text"
              className="formControl"
              name="usuario"
              value={usuario}
              onChange={onChangeUsername}
              // validations={[required]}
              placeholder="Usuario"
            />
          </div>
          <div className="formGroup">
            <input
              type="password"
              className="formControl"
              name="contraseña"
              value={contraseña}
              onChange={onChangePassword}
              // validations={[required]}
              placeholder="Contraseña"
            />
          </div>
          <div className="formGroup">
            <button className="formButton" disabled={loading}>
              {loading && <span className="loading"></span>}
              <span>Iniciar Sesión</span>
            </button>
          </div>
          {message && (
            <div className="messageContainer">
              <div className="message" role="alert">
                {message}
              </div>
            </div>
          )}
          {/* <CheckButton style={{ display: "none" }} ref={checkBtn} /> */}
        </form>
      </div>
    </div>
  );
};
export default Login;
