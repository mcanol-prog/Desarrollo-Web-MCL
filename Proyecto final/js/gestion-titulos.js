const formulario = document.getElementById("formtitulo");

const inputTitulo = document.getElementById("titulo");
const selectTipo = document.getElementById("tipo");
const inputCarrera = document.getElementById("carrera");
const inputEscuela = document.getElementById("escuela");
const inputAnio = document.getElementById("annio");
const selectEstado = document.getElementById("estado");
const cedulaEgresado = document.getElementById("cedulaEgresado");

const btnRegistrar = document.getElementById("guardar");

const inputsRequeridos = document.querySelectorAll("input[required]");
// VALIDAR IDENTIFICACIÓN

function validarCedula(cedula) {

    return /^[0-9]{9}$/.test(cedula);

}


// VALIDAR TEXTO

function validarTexto(texto) {

    return texto.trim().length >= 2;

}


// VALIDAR AÑO

function validarAnio(anio) {

    return /^[0-9]{4}$/.test(anio);

}


// VALIDAR LOS CAMPOS

function validarCampos() {

    let error = false;


    // CÉDULA DEL EGRESADO

    if (!validarCedula(cedulaEgresado.value.trim())) {

        cedulaEgresado.classList.add("input-error");

        error = true;

    } else {

        cedulaEgresado.classList.remove("input-error");

    }


    // TIPO

    if (selectTipo.value === "") {

        selectTipo.classList.add("input-error");

        error = true;

    } else {

        selectTipo.classList.remove("input-error");

    }


    // CARRERA

    if (!validarTexto(inputCarrera.value)) {

        inputCarrera.classList.add("input-error");

        error = true;

    } else {

        inputCarrera.classList.remove("input-error");

    }


    // ESCUELA

    if (!validarTexto(inputEscuela.value)) {

        inputEscuela.classList.add("input-error");

        error = true;

    } else {

        inputEscuela.classList.remove("input-error");

    }


    // AÑO

    if (!validarAnio(inputAnio.value)) {

        inputAnio.classList.add("input-error");

        error = true;

    } else {

        inputAnio.classList.remove("input-error");

    }


    // ESTADO

    if (selectEstado.value === "") {

        selectEstado.classList.add("input-error");

        error = true;

    } else {

        selectEstado.classList.remove("input-error");

    }


    return error;

}


// REGISTRAR EL TÍTULO

function registrarTitulo(event) {

    event.preventDefault();


    // VALIDAR LOS CAMPOS

    if (validarCampos()) {

        Swal.fire({

            title: "Campos incorrectos",

            text: "Complete correctamente todos los campos.",

            icon: "warning",

            confirmButtonText: "Aceptar"

        });

        return;

    }


    // OBTENER LOS EGRESADOS REGISTRADOS

    const egresados =
        JSON.parse(
            localStorage.getItem("egresados")
        ) || [];


    // BUSCAR EL EGRESADO POR SU CÉDULA

    const egresadoEncontrado =
        egresados.find(function (egresado) {

            return egresado.cedula ===
                cedulaEgresado.value.trim();

        });


    // VALIDAR SI EL EGRESADO EXISTE

    if (!egresadoEncontrado) {

        Swal.fire({

            title: "Egresado no encontrado",

            text:
                "No existe un egresado registrado con esa identificación.",

            icon: "error",

            confirmButtonText: "Aceptar"

        });

        cedulaEgresado.classList.add("input-error");

        return;

    }


    // QUITAR EL ERROR SI EL EGRESADO EXISTE

    cedulaEgresado.classList.remove("input-error");


    // OBTENER LOS TÍTULOS GUARDADOS

    let titulos =
        JSON.parse(
            localStorage.getItem("titulos")
        ) || [];


    // CREAR EL NUEVO TÍTULO

    const nuevoTitulo = {

        // AQUÍ SE ASOCIA EL TÍTULO AL EGRESADO

        cedulaEgresado:
            cedulaEgresado.value.trim(),

        tipo:
            selectTipo.value,

        carrera:
            inputCarrera.value.trim(),

        escuela:
            inputEscuela.value.trim(),

        anio:
            inputAnio.value,

        estado:
            selectEstado.value

    };


    // AGREGAR EL NUEVO TÍTULO

    titulos.push(nuevoTitulo);


    // GUARDAR LOS TÍTULOS

    localStorage.setItem(

        "titulos",

        JSON.stringify(titulos)

    );


    // MENSAJE DE ÉXITO

    Swal.fire({

        title: "¡Título registrado!",

        text:
            "El título fue asociado correctamente a " +
            egresadoEncontrado.nombre + ".",

        icon: "success",

        confirmButtonText: "Aceptar"

    });


    // LIMPIAR EL FORMULARIO

    formulario.reset();

}


// EVENTO DEL FORMULARIO

formulario.addEventListener("submit", registrarTitulo);