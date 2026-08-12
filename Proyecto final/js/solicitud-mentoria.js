const formulario =
    document.getElementById("formSolicitud");

const objetivo =
    document.getElementById("objetivo");

const oportunidad =
    document.getElementById("oportunidad");

const comentarios =
    document.getElementById("comentarios");


function validarSolicitud() {

    let error = false;

    if (objetivo.value.trim().length < 3) {

        objetivo.classList.add("input-error");

        error = true;

    } else {

        objetivo.classList.remove("input-error");

    }

    if (oportunidad.value === "") {

        oportunidad.classList.add("input-error");

        error = true;

    } else {

        oportunidad.classList.remove("input-error");

    }

    return error;

}


function guardarSolicitud(e) {

    e.preventDefault();

    if (validarSolicitud()) {

        Swal.fire({

            title: "Solicitud incompleta",

            text: "Complete los campos obligatorios.",

            icon: "warning",

            confirmButtonText: "Aceptar"

        });

        return;

    }

    let solicitudes =
        JSON.parse(
            localStorage.getItem("solicitudesMentoria")
        ) || [];

    const nuevaSolicitud = {

        objetivo: objetivo.value.trim(),

        oportunidad: oportunidad.value,

        comentarios: comentarios.value.trim(),

        estado: "Pendiente"

    };

    solicitudes.push(nuevaSolicitud);

    localStorage.setItem(
        "solicitudesMentoria",
        JSON.stringify(solicitudes)
    );

    formulario.reset();

    Swal.fire({

        title: "¡Solicitud enviada!",

        text:
            "Su solicitud quedó registrada como pendiente.",

        icon: "success",

        confirmButtonText: "Aceptar"

    });

}


formulario.addEventListener("submit", guardarSolicitud);