import api from "./api";
import getTokenData from "./getTokenData";
import TokenService from "./token.service";

const userRegister = ({
  nombre,
  apellido,
  password,
  email,
  imagen,
  fecha_nacimiento,
  pais,
  provincia,
  ciudad,
  celular,
}) => {
  return api.post("/auth/signup", {
    nombre,
    apellido,
    password,
    email,
    imagen,
    fecha_nacimiento,
    pais,
    provincia,
    ciudad,
    celular,
  });
};

const userLogin = (usuario, contraseña) => {
  return api
    .post("/auth/signin", {
      usuario,
      contraseña,
    })
    .then((response) => {
      if (response.data.accessToken) {
        TokenService.setUser(response.data);
      }
      return response.data;
    });
};

const logout = () => {
  TokenService.removeUser();
};

const getCurrentUser = () => {
  const clientSessionStorage = JSON.parse(sessionStorage.getItem("user"));
  return getTokenData(clientSessionStorage.accessToken);
};

const AuthService = {
  userRegister,
  userLogin,
  logout,
  getCurrentUser,
};

export default AuthService;
