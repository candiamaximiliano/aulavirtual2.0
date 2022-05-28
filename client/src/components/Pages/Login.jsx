import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/actionCreators";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [loading, setLoading] = useState(false);
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
    return navigate("/home");
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="usuario"
          placeholder="Usuario"
          onChange={onChangeUsername}
        />
        <input
          type="password"
          name="contraseña"
          placeholder="Contraseña"
          onChange={onChangePassword}
        />
        <button type="submit">Iniciar Sesion</button>
      </form>
    </div>
  );
};
export default Login;
