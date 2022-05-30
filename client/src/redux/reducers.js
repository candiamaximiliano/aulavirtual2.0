import {
  GET_ALL_ANUNCIOS,
  GET_ALL_CURSOS,
  GET_ALL_MATERIAS,
  GET_ALL_PROFESORES,
  GET_ANUNCIO,
  GET_CURSO,
  GET_MATERIA,
  GET_CLASE,
  SET_PROVINCES,
  SET_CITIES,
} from "./actions";

// const initialState = {
//   countries: [{ name: "Argentina", code: "ar" }],
//   provinces: [null],
//   cities: [null],
// };

export const anuncioReducer = (state = {}, action) => {
  if (action.type === GET_ALL_ANUNCIOS) {
    return {
      ...state,
      anuncios: action.anuncios,
    };
  }
  if (action.type === GET_ANUNCIO) {
    return {
      ...state,
      anuncio: action.anuncio,
    };
  }
  return state;
};

export const cursoReducer = (state = {}, action) => {
  if (action.type === GET_ALL_CURSOS) {
    return {
      ...state,
      cursos: action.cursos,
    };
  }

  if (action.type === GET_CURSO) {
    return {
      ...state,
      curso: action.curso,
    };
  }
  return state;
};

export const materiaReducer = (state = {}, action) => {
  if (action.type === GET_ALL_MATERIAS) {
    return {
      ...state,
      materias: action.materias,
    };
  }

  if (action.type === GET_MATERIA) {
    return {
      ...state,
      materia: action.materia,
    };
  }
  return state;
};

export const profesorReducer = (state = {}, action) => {
  if (action.type === GET_ALL_PROFESORES) {
    return {
      ...state,
      profesores: action.profesores,
    };
  }
  return state;
};

export const claseReducer = (state = {}, action) => {
  if (action.type === GET_CLASE) {
    return {
      ...state,
      clase: action.clase,
    };
  }
  return state;
};

export const provincesReducer = (state = {}, action) => {
  if (action.type === SET_PROVINCES) {
    return {
      ...state,
      provinces: action.provinces,
    };
  }
  return state;
};

export const citiesReducer = (state = {}, action) => {
  if (action.type === SET_CITIES) {
    return {
      ...state,
      cities: action.cities,
    };
  }
  return state;
};
