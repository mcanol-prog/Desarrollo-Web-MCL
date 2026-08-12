const formulario = document.getElementById("formOportunidad");
const empresa = document.getElementById("empresa");
const puesto = document.getElementById("puesto");
const descripcion = document.getElementById("descripcion");
const area = document.getElementById("area");
const modalidad = document.getElementById("modalidad");
const ubicacion = document.getElementById("ubicacion");
const fechaPublicacion = document.getElementById("fechaPublicacion");
const fechaVencimiento = document.getElementById("fechaVencimiento");
const contacto = document.getElementById("contacto");
const estado = document.getElementById("estado");


function validarTexto(valor) {

    return valor.trim().length >= 2;

}


function validarFormulario() {

    let error = false;

    const campos = [

        empresa,
        puesto,
        descripcion,
        area,
        ubicacion,
        contacto

    ];

    for (let i = 0; i < campos.length; i++) {

        if (!validarTexto(campos[i].value)) {

            campos[i].classList.add("input-error");

            error = true;

        } else {

            campos[i].classList.remove("input-error");

        }

    }

    if (modalidad.value === "") {

        modalidad.classList.add("input-error");

        error = true;

    }

    if (fechaPublicacion.value === "") {

        fechaPublicacion.classList.add("input-error");

        error = true;

    }

    if (fechaVencimiento.value === "") {

        fechaVencimiento.classList.add("input-error");

        error = true;

    }

    if (estado.value === "") {

        estado.classList.add("input-error");

        error = true;

    }

    return error;

}


function guardarOportunidad(e) {

    e.preventDefault();

    if (validarFormulario()) {

        Swal.fire({

            title: "Registro incompleto",

            text: "Complete correctamente los campos.",

            icon: "warning",

            confirmButtonText: "Aceptar"

        });

        return;

    }

    let oportunidades = JSON.parse(localStorage.getItem("oportunidadesLaborales")) || [];

    const nuevaOportunidad = {

        empresa: empresa.value.trim(),
        puesto: puesto.value.trim(),
        descripcion: descripcion.value.trim(),
        area: area.value.trim(),
        modalidad: modalidad.value,
        ubicacion: ubicacion.value.trim(),
        fechaPublicacion: fechaPublicacion.value,
        fechaVencimiento: fechaVencimiento.value,
        contacto: contacto.value.trim(),
        estado: estado.value

    };

    oportunidades.push(nuevaOportunidad);

    localStorage.setItem("oportunidadesLaborales", JSON.stringify(oportunidades));

    formulario.reset();

    Swal.fire({

        title: "¡Oportunidad registrada!",

        text:
            "La oportunidad laboral fue registrada correctamente.",

        icon: "success",

        confirmButtonText: "Aceptar"

    });

}


formulario.addEventListener("submit", guardarOportunidad);