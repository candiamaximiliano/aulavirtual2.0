import api from "./api";
import getTokenData from "./getTokenData";
import TokenService from "./token.service";

const userRegister = ({
  imagen,
  nombre,
  apellido,
  usuario,
  email,
  contraseña,
  dni,
  fechaDeNacimiento,
  direccion,
  pais,
  provincia,
  ciudad,
  numeroDeContacto,
  consentimientoWhatsapp,
}) => {
  return api.post("/auth/signup", {
    imagen,
    nombre,
    apellido,
    usuario,
    email,
    contraseña,
    dni,
    fechaDeNacimiento,
    direccion,
    pais,
    provincia,
    ciudad,
    numeroDeContacto,
    consentimientoWhatsapp,
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
