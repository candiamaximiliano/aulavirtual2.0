import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actionCreators";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
// const validEmail = (value) => {
//   if (!isEmail(value)) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This is not a valid email.
//       </div>
//     );
//   }
// };
const vusuario = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};
const vcontraseña = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};
const vfotoDePerfil = (value) => {
  if (value.length < 6 || value.length > 200) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};
const vnombre = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};
const vapellido = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};
const vdni = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};
const vfechaDeNacimiento = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};
const vdireccion = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};
const vnumeroDeContacto = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();
  const [input, setInput] = useState({
    fotoDePerfil: "",
    base64: "",
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
    instructorado: false,
    especializacion: false,
    profesorado: false,
  });

  const [base64, setBase64] = useState("");

  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    showFile();
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

  const imgProfile = useRef();

  /* if (window.File && window.FileReader && window.FileList && window.Blob) { */
  function showFile() {
    var demoImage = imgProfile.current;
    var file = document.querySelector("input[type=file]").files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
      demoImage.src = reader.result;
    };
    reader.readAsDataURL(file);
    let base64;
    setTimeout(() => {
      base64 = demoImage.src.split(",");
      setBase64(base64[1]);
    }, 1000);
  }

  const handleRegister = (e) => {
    e.preventDefault();
    setSuccessful(false);
    form.current.validateAll();
    let base = base64;
    setInput({
      ...input,
      base64: base,
    });
    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(input))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
    if (successful) {
      navigate("/login");
      setInput({
        fotoDePerfil: "",
        base64: "",
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
        instructorado: false,
        especializacion: false,
        profesorado: false,
      });
    }
  };

  return (
    <div className="container">
      <div /* className={style.subContainer} */>
        <div /* className={style.profileContainer} */>
          <img
            src="https://thumbs4.imagebam.com/6c/a5/f0/ME9I39H_t.png"
            alt="logo512.png"
            /* className={style.profileImage} */
            ref={imgProfile}
          />
        </div>
        <form
          /* className={style.formLayout} */ onSubmit={handleRegister}
          ref={form}
        >
          {!successful && (
            <div /* className={style.div} */>
              <div /* className={style.formGroup} */>
                <input
                  type="file"
                  // accept="image/x-png,image/jpeg"
                  /* className={style.formControl} */
                  name="fotoDePerfil"
                  value={input.fotoDePerfil}
                  onChange={handleOnChange}
                  validations={[required, vfotoDePerfil]}
                  placeholder="Foto de perfil"
                />
              </div>
              <div /* className={style.formGroup} */>
                <input
                  type="text"
                  /* className={style.formControl} */
                  name="nombre"
                  value={input.nombre}
                  onChange={handleOnChange}
                  validations={[required, vnombre]}
                  placeholder="Nombre"
                />
              </div>
              <div /* className={style.formGroup} */>
                <input
                  type="text"
                  /* className={style.formControl} */
                  name="apellido"
                  value={input.apellido}
                  onChange={handleOnChange}
                  validations={[required, vapellido]}
                  placeholder="Apellido"
                />
              </div>
              <div /* className={style.formGroup} */>
                <input
                  type="text"
                  /* className={style.formControl} */
                  name="usuario"
                  value={input.usuario}
                  onChange={handleOnChange}
                  validations={[required, vusuario]}
                  placeholder="Usuario"
                />
              </div>
              <div /* className={style.formGroup} */>
                <input
                  type="email"
                  /* className={style.formControl} */
                  name="email"
                  value={input.email}
                  onChange={handleOnChange}
                  validations={[required /* validEmail */]}
                  placeholder="E-mail"
                />
              </div>
              <div /* className={style.formGroup} */>
                <input
                  type="password"
                  /* className={style.formControl} */
                  name="contraseña"
                  value={input.contraseña}
                  onChange={handleOnChange}
                  validations={[required, vcontraseña]}
                  placeholder="Contraseña"
                />
              </div>
              <div /* className={style.formGroup} */>
                <input
                  type="number"
                  /* className={style.formControl} */
                  name="dni"
                  value={input.dni}
                  onChange={handleOnChange}
                  validations={[required, vdni]}
                  placeholder="DNI sin puntos ni letras"
                />
              </div>
              <div /* className={style.formGroup} */>
                <input
                  type="date"
                  /* className={style.formControl} */
                  name="fechaDeNacimiento"
                  value={input.fechaDeNacimiento}
                  onChange={handleOnChange}
                  validations={[required, vfechaDeNacimiento]}
                  placeholder="Fecha de nacimiento | DD/MM/AAAA"
                />
              </div>
              <div /* className={style.formGroup} */>
                <input
                  type="text"
                  /* className={style.formControl} */
                  name="direccion"
                  value={input.direccion}
                  onChange={handleOnChange}
                  validations={[required, vdireccion]}
                  placeholder='Dirección: ej. Rivadavia 1464 depto 3"C", Posadas, Misiones'
                />
              </div>
              <div /* className={style.formGroup} */>
                <input
                  type="text"
                  /* className={style.formControl} */
                  name="numeroDeContacto"
                  value={input.numeroDeContacto}
                  onChange={handleOnChange}
                  validations={[required, vnumeroDeContacto]}
                  placeholder="Ingrese un número de contacto"
                />
              </div>
              <div /* className={style.checkGroup} */>
                <input
                  type="checkbox"
                  // className="form-control"
                  name="consentimientoWhatsapp"
                  value={input.consentimientoWhatsapp}
                  onChange={handleCheck}
                  /* className={style.checkbox} */
                />
                <label
                  /* className={style.checkLabel} */
                  htmlFor="consentimientoWhatsapp"
                >
                  Quiero entrar al grupo de Whatsapp
                </label>
              </div>
              <div /* className={style.formGroup} */>
                <button /* className={style.formButton} */>REGISTRARME</button>
              </div>
            </div>
          )}
          {message && (
            <div /* className={style.formGroup} */>
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
          {/* <CheckButton style={{ display: "none" }} ref={checkBtn} /> */}
        </form>
      </div>
    </div>
  );
};
export default Register;
