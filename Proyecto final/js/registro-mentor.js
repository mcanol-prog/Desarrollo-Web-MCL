const formulario = document.getElementById("formMentor");

const area = document.getElementById("area");
const especialidades = document.getElementById("especialidades");
const experiencia = document.getElementById("experiencia");
const disponibilidad = document.getElementById("disponibilidad");


function validarTexto(valor) {

    return valor.trim().length >= 2;

}


function validarMentor() {

    let error = false;

    if (!validarTexto(area.value)) {

        area.classList.add("input-error");

        error = true;

    } else {

        area.classList.remove("input-error");

    }

    if (!validarTexto(especialidades.value)) {

        especialidades.classList.add("input-error");

        error = true;

    } else {

        especialidades.classList.remove("input-error");

    }

    if (experiencia.value === "" || Number(experiencia.value) < 0) {

        experiencia.classList.add("input-error");

        error = true;

    } else {

        experiencia.classList.remove("input-error");

    }

    if (disponibilidad.value === "") {

        disponibilidad.classList.add("input-error");

        error = true;

    } else {

        disponibilidad.classList.remove("input-error");

    }

    return error;

}


function registrarMentor(e) {

    e.preventDefault();

    if (validarMentor()) {

        Swal.fire({

            title: "Registro incompleto",

            text: "Complete correctamente los campos.",

            icon: "warning",

            confirmButtonText: "Aceptar"

        });

        return;

    }

    let mentores =
        JSON.parse(localStorage.getItem("mentores")) || [];

    const nuevoMentor = {

        area: area.value.trim(),

        especialidades: especialidades.value.trim(),

        experiencia: experiencia.value,

        disponibilidad: disponibilidad.value

    };

    mentores.push(nuevoMentor);

    localStorage.setItem(
        "mentores",
        JSON.stringify(mentores)
    );

    formulario.reset();

    Swal.fire({

        title: "¡Registro exitoso!",

        text: "Se registró como mentor correctamente.",

        icon: "success",

        confirmButtonText: "Aceptar"

    });

}


formulario.addEventListener("submit", registrarMentor);