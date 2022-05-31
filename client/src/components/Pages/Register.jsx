import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  register,
  chargeCities,
  chargeProvinces,
} from "../../redux/actionCreators";
import { v4 as uuidv4 } from "uuid";
import api from "../../services/api";
import Swal from "sweetalert2";
import "animate.css";
import style from "../../styles/register.module.css";

const Register = () => {
  //OBJETO USUARIO QUE SE MANDARA A LA RUTA PARA HACER EL REGISTER

  const [input, setInput] = useState({
    imagen: "zunzuncito.png",
    nombre: "",
    apellido: "",
    usuario: "",
    email: "",
    contraseña: "",
    dni: "",
    fechaDeNacimiento: "",
    pais: "",
    provincia: "",
    ciudad: "",
    direccion: "",
    numeroDeContacto: "",
    consentimientoWhatsapp: false,
  });

  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let [termsAccepted, setTerms] = useState(true);
  const { provinces } = useSelector((state) => state.provincesReducer);
  const { cities } = useSelector((state) => state.citiesReducer);
  const countries = [{ name: "Argentina", code: "ar" }];

  const handleSubmitUser = (e) => {
    e.preventDefault();
    setSuccessful(false);
    dispatch(register(input))
      .then(() => {
        setSuccessful(true);
        Swal.fire("¡Registrado con exito!", "", "success");
        navigate("/login");
      })
      .catch(() => {
        setSuccessful(false);
        Swal.fire("¡Ha ocurrido un error, intentalo nuevamente!", "", "error");
      });
    if (successful) {
      navigate("/login");
      setInput({
        imagen: "zunzuncito.png",
        nombre: "",
        apellido: "",
        usuario: "",
        email: "",
        contraseña: "",
        dni: "",
        fechaDeNacimiento: "",
        pais: "",
        provincia: "",
        ciudad: "",
        direccion: "",
        numeroDeContacto: "",
        consentimientoWhatsapp: false,
      });
    }
  };

  const handleCheck = (e) => {
    if (e.target.checked) {
      setInput({
        ...input,
        consentimientoWhatsapp: true,
      });
    } else {
      setInput({
        ...input,
        consentimientoWhatsapp: false,
      });
    }
  };

  // Estado auxiliar para selects del pais/provincia/ciudad
  const [countriesInfo, setCountriesInfo] = useState({
    name: "none",
    code: "none",
    province: "none",
    city: "none",
    uruguayDone: false,
  });

  // Vinculamos hacer dispatch cuando hayan cambio en cierta propiedad -> USER
  useEffect(() => {
    dispatch(chargeProvinces());
  }, [dispatch]);

  useEffect(() => {
    if (countriesInfo.province !== "none") {
      dispatch(chargeCities(countriesInfo.province));
    }
  }, [countriesInfo.province, dispatch]);

  //FUNCION QUE GUARDA EN UN ESTADO LOCAL LAS OPCIONES DE UBICACION SELECCIONADAS POR EL USUARIO
  function handleCountriesData(e) {
    if (e.target.name === "pais") {
      let nombresPais = countries.map((el) => el.name);
      if (nombresPais.includes(e.target.value)) {
        let pais = countries.filter((el) => el.name === e.target.value);
        setCountriesInfo((prevState) => {
          return { ...prevState, name: e.target.value, code: pais[0].code };
        });
      }
    }

    if (e.target.name === "provincia") {
      let nombresProvincias = provinces.map((el) => el.NOMBRE_PROVINCIA);
      if (nombresProvincias.includes(e.target.value)) {
        let provincia = provinces.filter(
          (el) => el.NOMBRE_PROVINCIA === e.target.value
        );
        setCountriesInfo((prevState) => {
          return { ...prevState, province: provincia[0].NOMBRE_PROVINCIA };
        });
      }
    }

    if (e.target.name === "ciudad") {
      let nombresCiudades = cities.map((el) => el.NOMBRE_CIUDAD);
      if (nombresCiudades.includes(e.target.value)) {
        let ciudad = cities.filter((el) => el.NOMBRE_CIUDAD === e.target.value);
        // console.log(ciudad)
        setCountriesInfo((prevState) => {
          return { ...prevState, city: ciudad[0].NOMBRE_CIUDAD };
        });
      }
    }
  }

  //FUNCION QUE MODIFICA EL OBJETO DEL USUARIO
  function handleChangeUser(e) {
    e.preventDefault();
    handleCountriesData(e); //Controlador de paises
    handleErrorsUser(e); //controlador de errores
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  //FORMULARIO CONTROLADO FUNCIONES DE USUARIO
  let [errors, setErrors] = useState({
    nombre: "",
    apellido: "",
    usuario: "",
    email: "",
    contraseña: "",
    dni: "",
    fechaDeNacimiento: "",
    direccion: "",
    numeroDeContacto: "",
    consentimientoWhatsapp: false,
    conditions: "",
    checked: "",
  });

  function handleErrorsUser(e) {
    if (e.target.name === "nombre") {
      /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(e.target.value)
        ? setErrors((prevState) => {
            return { ...prevState, [e.target.name]: "" };
          })
        : setErrors((prevState) => {
            return {
              ...prevState,
              [e.target.name]: "El NOMBRE solo debe contener letras.",
            };
          });

      if (e.target.value === "") {
        setErrors((prevState) => {
          return {
            ...prevState,
            [e.target.name]: "El NOMBRE no puede estar vacío",
          };
        });
      }
    }

    if (e.target.name === "apellido") {
      /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(e.target.value)
        ? setErrors((prevState) => {
            return { ...prevState, [e.target.name]: "" };
          })
        : setErrors((prevState) => {
            return {
              ...prevState,
              [e.target.name]: "El APELLIDO solo debe contener letras.",
            };
          });

      if (e.target.value === "") {
        setErrors((prevState) => {
          return {
            ...prevState,
            [e.target.name]: "El APELLIDO no puede estar vacío",
          };
        });
      }
    }

    if (e.target.name === "email") {
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
        e.target.value
      )
        ? setErrors((prevState) => {
            return { ...prevState, [e.target.name]: "" };
          })
        : setErrors((prevState) => {
            return {
              ...prevState,
              [e.target.name]:
                "Ingrese un email válido. Ej: example@example.com",
            };
          });

      if (e.target.value === "") {
        setErrors((prevState) => {
          return {
            ...prevState,
            [e.target.name]: "Es obligatorio ingresar un EMAIL.",
          };
        });
      }
    }

    if (e.target.name === "numeroDeContacto") {
      !isNaN(e.target.value * 1)
        ? setErrors((prevState) => {
            return { ...prevState, [e.target.name]: "" };
          })
        : setErrors((prevState) => {
            return {
              ...prevState,
              [e.target.name]: "Solo debe ingresar numeros",
            };
          });

      if (!(e.target.value.length > 5)) {
        setErrors((prevState) => {
          return {
            ...prevState,
            [e.target.name]:
              "El numero celular debe tener entre 6 a 15 dígitos",
          };
        });
      }

      if (e.target.value.length > 15) {
        setErrors((prevState) => {
          return {
            ...prevState,
            [e.target.name]:
              "El numero celular debe tener entre 6 a 15 dígitos",
          };
        });
      }

      if (e.target.value === "") {
        setErrors((prevState) => {
          return {
            ...prevState,
            [e.target.name]: "Es obligatorio ingresar un NUMERO DE CELULAR.",
          };
        });
      }
    }

    if (e.target.name === "contraseña") {
      /^.{6,}$/.test(e.target.value)
        ? setErrors((prevState) => {
            return { ...prevState, [e.target.name]: "" };
          })
        : setErrors((prevState) => {
            return {
              ...prevState,
              [e.target.name]:
                "La contraseña debe tener al menos 6 caracteres.",
            };
          });

      if (e.target.value === "") {
        setErrors((prevState) => {
          return {
            ...prevState,
            [e.target.name]: "Es obligatorio ingresar una CONTRASEÑA",
          };
        });
      }
    }

    if (e.target.name === "fechaDeNacimiento") {
      let year = e.target.value.slice(0, 4);
      let month = e.target.value.slice(5, 7);
      let day = e.target.value.slice(-2);

      setErrors((prevState) => {
        return { ...prevState, [e.target.name]: "" };
      });

      if (day < 1 || day > 31) {
        setErrors((prevState) => {
          return { ...prevState, [e.target.name]: "Ingrese un día válido." };
        });
      }

      if (month < 1 || month > 12) {
        setErrors((prevState) => {
          return { ...prevState, [e.target.name]: "Ingrese un mes válido." };
        });
      }

      if (year < 1900 || year > new Date().getFullYear()) {
        setErrors((prevState) => {
          return { ...prevState, [e.target.name]: "Ingrese un año válido." };
        });
      }
    }
  }

  //FUNCION QUE HACE EL TOGGLE DEL BUTON AL ACEPTAR LOS TERMINOS Y CHEQUEA SI HAY ERRORES, Y DATA EN EL OBJETO A ENVIAR
  function handleChecked(e) {
    //Se checkea
    let errorsCounter = 0;
    let dataEmpty = 0;
    if (termsAccepted === true) {
      setTerms(false);

      setErrors((prevState) => {
        return { ...prevState, [e.target.name]: "" };
      });

      for (let prop in input) {
        if (input[prop] === "") {
          // console.log(input[prop])
          if (prop === "imagen") {
            //NO CONTAMOS imagen
          } else {
            // console.log(input[prop], prop, 'sumó')
            dataEmpty++;
          }
        }
      }
      for (let prop in errors) {
        if (errors[prop]) {
          // console.log(errors[prop], prop, 'sumó')
          errorsCounter++;
        }
      }

      if (dataEmpty > 0 || errorsCounter > 0) {
        setTerms(true);
      } else if (dataEmpty === 0 || errorsCounter === 0) {
        setTerms(false);
      }
      // console.log(errorsCounter, dataEmpty)
    }

    if (termsAccepted === false) {
      setTerms(true);
    }
  }

  // Cargar imagen de tipo File
  const fileInput = useRef(null);
  const [file, setFile] = useState();
  const [format, setFormat] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(
    "ninguna imagen seleccionada"
  );

  const saveFile = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    setUploadSuccess(e.target.files[0]?.name);
    var formatImage = e.target.files[0]?.name.split(".");
    setFormat(formatImage[formatImage?.length - 1]);
  };

  const uploadUserFile = async (e) => {
    e.preventDefault();
    const code = uuidv4();
    // console.log(code)
    const formData = new FormData();
    formData.append("file", file);
    formData.append("format", format);
    try {
      const res = await api.post(
        `/upload/imagenes/${code}.${format}`,
        formData
      );
      console.log(res);
      setInput({
        ...input,
        [e.target.name]: code + "." + format,
      });
      Swal.fire("Imagen cargada con Exito", "", "success");
    } catch (ex) {
      console.log(ex);
    }
  };

  function finalCheck(e) {
    let errorsCounter = 0;
    let dataEmpty = 0;

    for (let prop in input) {
      if (input[prop] === "") {
        // console.log(input[prop])
        if (prop === "imagen") {
          //NO CONTAMOS imagen
        } else {
          // console.log(input[prop], prop, 'sumó')
          dataEmpty++;
        }
      }
    }
    for (let prop in errors) {
      if (errors[prop]) {
        // console.log(errors[prop], prop, 'sumó')
        errorsCounter++;
      }
    }

    if (dataEmpty > 0 || errorsCounter > 0) {
      Swal.fire(
        "¡Ha ocurrido un error!",
        "Revisa los datos ingresados",
        "error"
      );
    } else if (dataEmpty === 0 || errorsCounter === 0) {
      handleSubmitUser(e);
    }
    // console.log(errorsCounter, dataEmpty)
  }

  return (
    <div className={`${style.container} ed-grid`}>
      <div className={style.subContainer}>
        <div className={style.profileContainer}>
          <img
            src={`${process.env.REACT_APP_BACKEND}/imagenes/${input.imagen}`}
            alt="profileImg"
            className={style.img}
            // ref={imgProfile}
          />
        </div>
        <form className={style.formLayout} onSubmit={(e) => finalCheck(e)}>
          {!successful && (
            <div className={style.div}>
              <div className={style.formGroup}>
                <i className={`fa fa-2x fa-camera ${style.icon}`}></i>{" "}
                <input
                  id="inputTag"
                  type="file"
                  accept="image/x-png,image/jpeg"
                  className={style.inputFile}
                  name="imagen"
                  multiple={false}
                  ref={fileInput}
                  placeholder="Imagen"
                  onChange={(e) => {
                    saveFile(e);
                  }}
                />{" "}
                <button
                  type="button"
                  className={style.fileButton}
                  onClick={() => fileInput.current.click()}
                >
                  {uploadSuccess === "ninguna imagen seleccionada"
                    ? `${" "}Subir foto de perfil`
                    : null}{" "}
                  {uploadSuccess === "ninguna imagen seleccionada"
                    ? null
                    : uploadSuccess}{" "}
                </button>
                {errors.image && <p>{errors.image}</p>}
                <button
                  className={style.uploadButton}
                  name="imagen"
                  onClick={(e) => uploadUserFile(e)}
                >
                  Cargar
                </button>
              </div>
              {errors.imagen && (
                <p
                  className={`${style.errors} animate__animated animate__fadeInDown `}
                >
                  {errors.imagen}
                </p>
              )}
              <div className={style.formGroup}>
                <i className={`fa-solid fa-marker fa-2x ${style.icon}`}></i>
                <input
                  type="text"
                  className={style.formControl}
                  name="nombre"
                  value={input.nombre}
                  onChange={handleChangeUser}
                  placeholder="Nombre"
                />
              </div>
              <div className={style.formGroup}>
                <i className={`fa-solid fa-marker fa-2x ${style.icon}`}></i>
                <input
                  type="text"
                  className={style.formControl}
                  name="apellido"
                  value={input.apellido}
                  onChange={handleChangeUser}
                  placeholder="Apellido"
                />
              </div>

              {/* MENSAJE DE ERROR DE NOMBRE Y APELLIDO */}

              {errors.nombre && (
                <p
                  className={`${style.errors} animate__animated animate__fadeInDown `}
                >
                  {errors.nombre}
                </p>
              )}
              {errors.apellido && (
                <p
                  className={`${style.errors} animate__animated animate__fadeInDown `}
                >
                  {errors.apellido}
                </p>
              )}

              <div className={style.formGroup}>
                <i className={`fa-solid fa-user fa-2x ${style.icon}`}></i>
                <input
                  type="text"
                  className={style.formControl}
                  name="usuario"
                  value={input.usuario}
                  onChange={(e) => handleChangeUser(e)}
                  placeholder="Usuario"
                />
              </div>
              <div className={style.formGroup}>
                <i className={`fa-solid fa-at fa-2x ${style.icon}`}></i>
                <input
                  type="email"
                  className={style.formControl}
                  name="email"
                  value={input.email}
                  onChange={(e) => handleChangeUser(e)}
                  placeholder="E-mail"
                />
              </div>
              {errors.email && (
                <p
                  className={`${style.errors} animate__animated animate__fadeInDown `}
                >
                  {errors.email}
                </p>
              )}
              <div className={style.formGroup}>
                <i className={`fa-solid fa-lock fa-2x ${style.icon}`}></i>
                <input
                  type="password"
                  className={style.formControl}
                  name="contraseña"
                  value={input.contraseña}
                  onChange={(e) => handleChangeUser(e)}
                  placeholder="Contraseña"
                />
              </div>
              {errors.contraseña && (
                <p
                  className={`${style.errors} animate__animated animate__fadeInDown `}
                >
                  {errors.contraseña}
                </p>
              )}
              <div className={style.formGroup}>
                <i
                  className={`fa-solid fa-address-card fa-2x ${style.icon}`}
                ></i>
                <input
                  type="number"
                  className={style.formControl}
                  name="dni"
                  value={input.dni}
                  onChange={(e) => handleChangeUser(e)}
                  placeholder="DNI sin puntos ni letras"
                />
              </div>
              <div className={style.formGroup}>
                <i
                  className={`fa-solid fa-calendar-days fa-2x ${style.icon}`}
                ></i>
                <input
                  type="date"
                  className={style.formControl}
                  name="fechaDeNacimiento"
                  value={input.fechaDeNacimiento}
                  onChange={(e) => handleChangeUser(e)}
                  placeholder="Fecha de nacimiento | DD/MM/AAAA"
                />
              </div>
              {errors.fechaDeNacimiento && (
                <p
                  className={`${style.errors} animate__animated animate__fadeInDown `}
                >
                  {errors.fechaDeNacimiento}
                </p>
              )}
              <div className={style.formGroup}>
                {" "}
                <i
                  className={`fa fa-globe fa-2x ${style.icon}`}
                  aria-hidden="true"
                ></i>{" "}
                <select
                  className={style.formControl}
                  name="pais"
                  onChange={(e) => {
                    handleChangeUser(e);
                  }}
                >
                  <option selected disabled hidden>
                    Selecciona país
                  </option>

                  {countries.length > 0
                    ? countries?.map((el, i) => {
                        return (
                          <option key={i} id={el.code} value={el.name}>
                            {el.name}
                          </option>
                        );
                      })
                    : "Cargando..."}
                </select>
              </div>

              {input.pais ? (
                <div className={style.formGroup}>
                  <i
                    className={`fa fa-map-marker fa-2x ${style.icon}`}
                    aria-hidden="true"
                  ></i>{" "}
                  <select
                    className={style.formControl}
                    name="provincia"
                    onChange={(e) => handleChangeUser(e)}
                  >
                    <option selected disabled hidden>
                      Selecciona una provincia
                    </option>

                    {provinces.length > 0 ? (
                      provinces?.map((el, i) => {
                        return (
                          <option key={i} value={el.NOMBRE_PROVINCIA}>
                            {el.NOMBRE_PROVINCIA}
                          </option>
                        );
                      })
                    ) : (
                      <option>Cargando...</option>
                    )}
                  </select>
                </div>
              ) : null}

              {input.provincia && input.pais !== "Uruguay" ? (
                <div className={style.formGroup}>
                  {" "}
                  <i
                    className={`fa fa-building fa-2x ${style.icon}`}
                    aria-hidden="true"
                  >
                    {" "}
                  </i>{" "}
                  <select
                    type="text"
                    className={style.formControl}
                    name="ciudad"
                    placeholder="Ciudad"
                    value={input.ciudad}
                    onChange={(e) => handleChangeUser(e)}
                  >
                    <option selected disabled hidden>
                      Selecciona una ciudad
                    </option>
                    {cities?.length > 0 ? (
                      cities?.map((el, i) => {
                        return (
                          <option key={i} value={el.NOMBRE_CIUDAD}>
                            {el.NOMBRE_CIUDAD}
                          </option>
                        );
                      })
                    ) : (
                      <option>Cargando...</option>
                    )}
                  </select>
                </div>
              ) : null}
              <div className={style.formGroup}>
                <i className={`fa-solid fa-house fa-2x ${style.icon}`}></i>
                <input
                  type="text"
                  className={style.formControl}
                  name="direccion"
                  value={input.direccion}
                  onChange={(e) => handleChangeUser(e)}
                  placeholder='Dirección: ej. Rivadavia 1464 depto 3"C"'
                />
              </div>
              <div className={style.formGroup}>
                <i className={`fa-solid fa-phone fa-2x ${style.icon}`}></i>
                <input
                  type="text"
                  className={style.formControl}
                  name="numeroDeContacto"
                  value={input.numeroDeContacto}
                  onChange={(e) => handleChangeUser(e)}
                  placeholder="Ingrese un número de contacto"
                />
              </div>
              {errors.numeroDeContacto && (
                <p
                  className={`${style.errors} animate__animated animate__fadeInDown `}
                >
                  {errors.numeroDeContacto}
                </p>
              )}
              <div className={style.checkGroup}></div>
              <div className="form-check d-flex justify-content-center">
                {" "}
                <input
                  type="checkbox"
                  className={`form-check-input`}
                  name="consentimientoWhatsapp"
                  value={input.consentimientoWhatsapp}
                  onChange={handleCheck}
                />
                <label
                  className={style.checkLabel}
                  htmlFor="consentimientoWhatsapp"
                >
                  Quiero entrar al grupo de Whatsapp
                </label>
              </div>
              <div className={style.checkGroup}></div>
              <div className="form-check d-flex justify-content-center">
                {" "}
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="checked"
                  id="flexCheckChecked"
                  onChange={(e) => handleChecked(e)}
                />{" "}
                <label className={style.checkLabel} htmlFor="flexCheckChecked">
                  {" "}
                  Acepto términos y condiciones.{" "}
                </label>{" "}
              </div>
              <div className={style.formGroup}>
                <button
                  className={`${style.formButton}`}
                  disabled={termsAccepted}
                >
                  REGISTRARME
                </button>
              </div>
            </div>
          )}
          {message && (
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
          )}
        </form>
      </div>
    </div>
  );
};
export default Register;
