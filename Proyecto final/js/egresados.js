const formulario = document.getElementById("formEgresados");

const inputCedula = document.getElementById("identificacion");
const inputNombre = document.getElementById("nombre");
const inputCorreo = document.getElementById("correo");
const inputTelefono = document.getElementById("telefono");
const inputLugarTrabajo = document.getElementById("empresa");
const inputFechaRegistro = document.getElementById("fecha");
const inputOpciones = document.getElementById("opciones");

const btnregistro = document.getElementById("guardar-registro");


// ==============================
// FUNCIONES DE VALIDACIÓN
// ==============================

function validarCedula(numeroCedula) {

    return /^[0-9]{9}$/.test(numeroCedula);

}


function validarNombreCompleto(nombre) {

    return nombre.length >= 2;

}


function validarCorreo(correo) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

}


function validarTelefono(telefono) {

    return /^[0-9]{8,12}$/.test(telefono);

}


function validarLugarTrabajo(lugarTrabajo) {

    return lugarTrabajo.length >= 2;

}


function validarCarrera(carrera) {

    return carrera !== "";

}


// ==============================
// RESALTAR CAMPOS INCORRECTOS
// ==============================

function resaltarCamposVacios() {

    let error = false;


    // CÉDULA

    if (!validarCedula(inputCedula.value.trim())) {

        inputCedula.classList.add("input-error");

        error = true;

    } else {

        inputCedula.classList.remove("input-error");

    }


    // NOMBRE COMPLETO

    if (!validarNombreCompleto(inputNombre.value.trim())) {

        inputNombre.classList.add("input-error");

        error = true;

    } else {

        inputNombre.classList.remove("input-error");

    }


    // CORREO

    if (!validarCorreo(inputCorreo.value.trim())) {

        inputCorreo.classList.add("input-error");

        error = true;

    } else {

        inputCorreo.classList.remove("input-error");

    }


    // TELÉFONO

    if (!validarTelefono(inputTelefono.value.trim())) {

        inputTelefono.classList.add("input-error");

        error = true;

    } else {

        inputTelefono.classList.remove("input-error");

    }


    // LUGAR DE TRABAJO

    if (!validarLugarTrabajo(inputLugarTrabajo.value.trim())) {

        inputLugarTrabajo.classList.add("input-error");

        error = true;

    } else {

        inputLugarTrabajo.classList.remove("input-error");

    }


    // CARRERA

    if (!validarCarrera(inputOpciones.value)) {

        inputOpciones.classList.add("input-error");

        error = true;

    } else {

        inputOpciones.classList.remove("input-error");

    }


    return error;

}


// ==============================
// COLOCAR FECHA ACTUAL
// ==============================

function establecerFechaActual() {

    const hoy = new Date();

    const anio = hoy.getFullYear();

    const mes = String(
        hoy.getMonth() + 1
    ).padStart(2, "0");

    const dia = String(
        hoy.getDate()
    ).padStart(2, "0");


    inputFechaRegistro.value =
        `${anio}-${mes}-${dia}`;

}


// ==============================
// REGISTRAR EGRESADO EN MONGODB
// ==============================

async function guardarEgresado(e) {

    e.preventDefault();


    // VALIDAR LOS CAMPOS

    const error = resaltarCamposVacios();


    if (error) {

        Swal.fire({

            title: "No se puede registrar el egresado",

            text: "Complete correctamente los campos resaltados.",

            icon: "warning",

            confirmButtonText: "Aceptar"

        });

        return;

    }


    // CREAR OBJETO CON LOS DATOS

    const nuevoEgresado = {

        identificacion:
            inputCedula.value.trim(),

        nombre:
            inputNombre.value.trim(),

        correo:
            inputCorreo.value.trim(),

        telefono:
            inputTelefono.value.trim(),

        carrera:
            inputOpciones.value,

        fecha:
            inputFechaRegistro.value,

        empresa:
            inputLugarTrabajo.value.trim()

    };


    try {

        // ENVIAR LOS DATOS AL BACKEND

        const respuesta = await fetch(

            "http://localhost:3000/egresados",

            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body: JSON.stringify(
                    nuevoEgresado
                )

            }

        );


        // RECIBIR RESPUESTA DEL BACKEND

        const datos =
            await respuesta.json();


        // SI EL BACKEND DEVUELVE UN ERROR

        if (!respuesta.ok) {

            Swal.fire({

                title:
                    "No se pudo registrar",

                text:
                    datos.mensajeError ||
                    "Ocurrió un error al registrar el egresado.",

                icon:
                    "error",

                confirmButtonText:
                    "Aceptar"

            });

            return;

        }


        // SI TODO SALE BIEN

        formulario.reset();


        establecerFechaActual();


        Swal.fire({

            title:
                "¡Registro exitoso!",

            text:
                "El egresado fue registrado correctamente.",

            icon:
                "success",

            confirmButtonText:
                "Aceptar"

        });


        console.log(
            "Egresado guardado:",
            datos.egresado
        );


    } catch (error) {

        console.error(
            "Error:",
            error
        );


        Swal.fire({

            title:
                "Error de conexión",

            text:
                "No fue posible conectar con el servidor.",

            icon:
                "error",

            confirmButtonText:
                "Aceptar"

        });

    }

}


// ==============================
// INICIAR PÁGINA
// ==============================

establecerFechaActual();


// EVENTO DEL FORMULARIO

formulario.addEventListener("submit", guardarEgresado);