const formulario = document.getElementById("formMentoria");

const mentor = document.getElementById("mentor");
const fechaInicio =  document.getElementById("fechaInicio");
const fechaFinal = document.getElementById("fechaFinal");
const estado = document.getElementById("estado");
const observaciones = document.getElementById("observaciones");
const listaSolicitudes = document.getElementById("listaSolicitudes");
const listaMentorias = document.getElementById("listaMentorias");


function cargarSolicitudes() {

    const solicitudes =
        JSON.parse(
            localStorage.getItem("solicitudesMentoria")
        ) || [];

    listaSolicitudes.innerHTML = "";

    if (solicitudes.length === 0) {

        listaSolicitudes.innerHTML =
            "<p>No hay solicitudes registradas.</p>";

        return;

    }

    for (let i = 0; i < solicitudes.length; i++) {

        const solicitud = solicitudes[i];

        const elemento =
            document.createElement("article");

        elemento.innerHTML = `

            <p>
                <strong>Objetivo:</strong>
                ${solicitud.objetivo}
            </p>

            <p>
                <strong>Oportunidad:</strong>
                ${solicitud.oportunidad}
            </p>

            <p>
                <strong>Estado:</strong>
                ${solicitud.estado}
            </p>

        `;

        listaSolicitudes.appendChild(elemento);

    }

}


function validarMentoria() {

    let error = false;

    if (mentor.value.trim().length < 2) {

        mentor.classList.add("input-error");

        error = true;

    } else {

        mentor.classList.remove("input-error");

    }

    if (fechaInicio.value === "") {

        fechaInicio.classList.add("input-error");

        error = true;

    } else {

        fechaInicio.classList.remove("input-error");

    }

    if (fechaFinal.value === "") {

        fechaFinal.classList.add("input-error");

        error = true;

    } else {

        fechaFinal.classList.remove("input-error");

    }

    if (estado.value === "") {

        estado.classList.add("input-error");

        error = true;

    } else {

        estado.classList.remove("input-error");

    }

    return error;

}


function registrarMentoria(e) {

    e.preventDefault();

    if (validarMentoria()) {

        Swal.fire({

            title: "Registro incompleto",

            text: "Complete los campos obligatorios.",

            icon: "warning",

            confirmButtonText: "Aceptar"

        });

        return;

    }

    let mentorias =
        JSON.parse(
            localStorage.getItem("mentorias")
        ) || [];

    const nuevaMentoria = {

        mentor: mentor.value.trim(),

        fechaInicio: fechaInicio.value,

        fechaFinal: fechaFinal.value,

        estado: estado.value,

        observaciones:
            observaciones.value.trim()

    };

    mentorias.push(nuevaMentoria);

    localStorage.setItem(
        "mentorias",
        JSON.stringify(mentorias)
    );

    formulario.reset();

    mostrarMentorias();

    Swal.fire({

        title: "¡Mentoría registrada!",

        text: "La mentoría fue registrada correctamente.",

        icon: "success",

        confirmButtonText: "Aceptar"

    });

}


function mostrarMentorias() {

    const mentorias =
        JSON.parse(
            localStorage.getItem("mentorias")
        ) || [];

    listaMentorias.innerHTML = "";

    if (mentorias.length === 0) {

        listaMentorias.innerHTML =
            "<p>No hay mentorías registradas.</p>";

        return;

    }

    for (let i = 0; i < mentorias.length; i++) {

        const mentoria = mentorias[i];

        const elemento =
            document.createElement("article");

        elemento.innerHTML = `

            <p>
                <strong>Mentor:</strong>
                ${mentoria.mentor}
            </p>

            <p>
                <strong>Fecha de inicio:</strong>
                ${mentoria.fechaInicio}
            </p>

            <p>
                <strong>Fecha de finalización:</strong>
                ${mentoria.fechaFinal}
            </p>

            <p>
                <strong>Estado:</strong>
                ${mentoria.estado}
            </p>

            <p>
                <strong>Observaciones:</strong>
                ${mentoria.observaciones}
            </p>

            <hr>

        `;

        listaMentorias.appendChild(elemento);

    }

}


formulario.addEventListener("submit", registrarMentoria);

cargarSolicitudes();
mostrarMentorias();