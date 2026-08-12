const formulario = document.getElementById("formActualizar");

const correo = document.getElementById("correo");
const telefono = document.getElementById("telefono");
const empresa = document.getElementById("empresa");
const puesto = document.getElementById("puesto");
const area = document.getElementById("area");
const linkedin = document.getElementById("linkedin");
const portafolio = document.getElementById("portafolio");


function validarCorreo(valor) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);

}


function validarTelefono(valor) {

    return /^[0-9]{8,12}$/.test(valor);

}


function validarTexto(valor) {

    return valor.trim().length >= 2;

}


function resaltarCampos() {

    let error = false;

    if (!validarCorreo(correo.value.trim())) {

        correo.classList.add("input-error");

        error = true;

    } else {

        correo.classList.remove("input-error");

    }

    if (!validarTelefono(telefono.value.trim())) {

        telefono.classList.add("input-error");

        error = true;

    } else {

        telefono.classList.remove("input-error");

    }

    if (!validarTexto(empresa.value)) {

        empresa.classList.add("input-error");

        error = true;

    } else {

        empresa.classList.remove("input-error");

    }

    if (!validarTexto(puesto.value)) {

        puesto.classList.add("input-error");

        error = true;

    } else {

        puesto.classList.remove("input-error");

    }

    if (!validarTexto(area.value)) {

        area.classList.add("input-error");

        error = true;

    } else {

        area.classList.remove("input-error");

    }

    return error;

}


function actualizarInformacion(e) {

    e.preventDefault();

    const error = resaltarCampos();

    if (error) {

        Swal.fire({

            title: "No se pudo actualizar",

            text: "Complete correctamente los campos.",

            icon: "warning",

            confirmButtonText: "Aceptar"

        });

        return;

    }

    const informacion = {

        correo: correo.value.trim(),

        telefono: telefono.value.trim(),

        empresa: empresa.value.trim(),

        puesto: puesto.value.trim(),

        area: area.value.trim(),

        linkedin: linkedin.value.trim(),

        portafolio: portafolio.value.trim()

    };

    localStorage.setItem(
        "informacionProfesional",
        JSON.stringify(informacion)
    );

    Swal.fire({

        title: "¡Información actualizada!",

        text: "Los datos fueron guardados correctamente.",

        icon: "success",

        confirmButtonText: "Aceptar"

    });

}


formulario.addEventListener("submit", actualizarInformacion);