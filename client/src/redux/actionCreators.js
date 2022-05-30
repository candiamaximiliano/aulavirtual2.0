import api from "../services/api";
import {
  GET_ALL_ANUNCIOS,
  GET_ALL_CURSOS,
  GET_ALL_MATERIAS,
  GET_ALL_PROFESORES,
  GET_ANUNCIO,
  GET_CURSO,
  GET_MATERIA,
  GET_CLASE,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  REFRESH_TOKEN,
  CLEAR_MESSAGE,
  SET_PROVINCES,
  SET_CITIES,
} from "./actions";

import AuthService from "../services/auth.service";

export const register = (input) => (dispatch) => {
  return AuthService.userRegister(input).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: REGISTER_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};

export const login = (usuario, contraseña) => (dispatch) => {
  return AuthService.userLogin(usuario, contraseña).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: LOGIN_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};
export const logout = () => (dispatch) => {
  AuthService.logout();
  dispatch({
    type: LOGOUT,
  });
};

export const refreshToken = (accessToken) => (dispatch) => {
  dispatch({
    type: REFRESH_TOKEN,
    payload: accessToken,
  });
};

export const setMessage = (message) => ({
  type: SET_MESSAGE,
  payload: message,
});
export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});

export const getAllAnuncios = () => (dispatch) => {
  api
    .get(`/anuncios`)
    .then((resp) => {
      return dispatch({
        type: GET_ALL_ANUNCIOS,
        anuncios: resp.data,
      });
    })
    .catch((error) => console.error(error));
};

export const getAllCursos = () => (dispatch) => {
  api
    .get(`/cursos`)
    .then((resp) => {
      return dispatch({
        type: GET_ALL_CURSOS,
        cursos: resp.data,
      });
    })
    .catch((error) => console.error(error));
};

export const getAllMaterias = () => (dispatch) => {
  api
    .get(`/materias`)
    .then((resp) => {
      return dispatch({
        type: GET_ALL_MATERIAS,
        materias: resp.data,
      });
    })
    .catch((error) => console.error(error));
};

export const getAllProfesores = () => (dispatch) => {
  api
    .get(`/profesores/`)
    .then((resp) => {
      return dispatch({
        type: GET_ALL_PROFESORES,
        profesores: resp.data,
      });
    })
    .catch((error) => console.error(error));
};

export const getAnuncio = (id) => (dispatch) => {
  api
    .get(`/anuncios/${id}`)
    .then((resp) => {
      return dispatch({
        type: GET_ANUNCIO,
        anuncio: resp.data,
      });
    })
    .catch((error) => console.error(error));
};

export const getCurso = (id) => (dispatch) => {
  api
    .get(`/cursos/${id}`)
    .then((resp) => {
      return dispatch({
        type: GET_CURSO,
        curso: resp.data,
      });
    })
    .catch((error) => console.error(error));
};

export const getMateria = (id) => (dispatch) => {
  api
    .get(`/materias/${id}`)
    .then((resp) => {
      return dispatch({
        type: GET_MATERIA,
        materia: resp.data,
      });
    })
    .catch((error) => console.error(error));
};

export const getClase = (id) => (dispatch) => {
  api
    .get(`/clases/${id}`)
    .then((resp) => {
      return dispatch({
        type: GET_CLASE,
        clase: resp.data,
      });
    })
    .catch((error) => console.error(error));
};

export const chargeProvinces = () => (dispatch) => {
  api
    .get(`/provincias/`)
    .then((resp) => {
      return dispatch({
        type: SET_PROVINCES,
        provinces: resp.data,
      });
    })
    .catch((error) => console.error(error));
};

export const chargeCities = (province) => (dispatch) => {
  api
    .get(`/ciudades/${province}`)
    .then((resp) => {
      return dispatch({
        type: SET_CITIES,
        cities: resp.data,
      });
    })
    .catch((error) => console.error(error));
};
