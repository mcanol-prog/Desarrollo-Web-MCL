const formulario = document.getElementById("formConsultaPerfil");

const busqueda = document.getElementById("busqueda");

const informacionPersonal =
    document.getElementById("informacionPersonal");

const informacionProfesional =
    document.getElementById("informacionProfesional");

const titulosObtenidos =
    document.getElementById("titulosObtenidos");

const carrerasAsociadas =
    document.getElementById("carrerasAsociadas");

const escuelasAsociadas =
    document.getElementById("escuelasAsociadas");


// FUNCIÓN PARA LIMPIAR LA INFORMACIÓN

function limpiarInformacion() {

    informacionPersonal.innerHTML = "";

    informacionProfesional.innerHTML = "";

    titulosObtenidos.innerHTML = "";

    carrerasAsociadas.innerHTML = "";

    escuelasAsociadas.innerHTML = "";

}


// FUNCIÓN PARA CONSULTAR EL PERFIL

function consultarPerfil(event) {

    event.preventDefault();


    const datoBusqueda =
        busqueda.value.trim().toLowerCase();


    // VALIDAR QUE EL CAMPO NO ESTÉ VACÍO

    if (datoBusqueda === "") {

        Swal.fire({

            title: "Campo vacío",

            text: "Ingrese un correo electrónico o nombre completo.",

            icon: "warning",

            confirmButtonText: "Aceptar"

        });

        return;

    }


    // OBTENER LOS EGRESADOS DEL LOCALSTORAGE

    const egresados =
        JSON.parse(localStorage.getItem("egresados")) || [];


    // BUSCAR EL EGRESADO

    const egresado = egresados.find(function(persona) {

        return (

            persona.correo.toLowerCase() === datoBusqueda ||

            persona.nombre.toLowerCase() === datoBusqueda

        );

    });


    // SI NO SE ENCUENTRA

    if (!egresado) {

        limpiarInformacion();


        informacionPersonal.innerHTML = `

            <p>
                No se encontró ningún egresado con esa información.
            </p>

        `;


        informacionProfesional.innerHTML =
            "<p>Sin información.</p>";


        titulosObtenidos.innerHTML =
            "<p>Sin información.</p>";


        carrerasAsociadas.innerHTML =
            "<p>Sin información.</p>";


        escuelasAsociadas.innerHTML =
            "<p>Sin información.</p>";


        return;

    }


    // MOSTRAR INFORMACIÓN PERSONAL

    informacionPersonal.innerHTML = `

        <p>

            <strong>Nombre completo:</strong>

            ${egresado.nombre}

        </p>

        <p>

            <strong>Identificación:</strong>

            ${egresado.cedula}

        </p>

        <p>

            <strong>Correo electrónico:</strong>

            ${egresado.correo}

        </p>

        <p>

            <strong>Teléfono:</strong>

            ${egresado.telefono}

        </p>

    `;


    // BUSCAR INFORMACIÓN PROFESIONAL

    const informacion =
        JSON.parse(
            localStorage.getItem("informacionProfesional")
        );


    if (informacion) {

        informacionProfesional.innerHTML = `

            <p>

                <strong>Empresa actual:</strong>

                ${informacion.empresa}

            </p>

            <p>

                <strong>Puesto actual:</strong>

                ${informacion.puesto}

            </p>

            <p>

                <strong>Área profesional:</strong>

                ${informacion.area}

            </p>

            <p>

                <strong>LinkedIn:</strong>

                ${informacion.linkedin || "No registrado"}

            </p>

            <p>

                <strong>Portafolio:</strong>

                ${informacion.portafolio || "No registrado"}

            </p>

        `;

    } else {

        informacionProfesional.innerHTML = `

            <p>
                No hay información profesional registrada.
            </p>

        `;

    }


    // OBTENER LOS TÍTULOS

    const titulos =
        JSON.parse(
            localStorage.getItem("titulos")
        ) || [];


    // LIMPIAR LAS SECCIONES

    titulosObtenidos.innerHTML = "";

    carrerasAsociadas.innerHTML = "";

    escuelasAsociadas.innerHTML = "";


    // VALIDAR SI EXISTEN TÍTULOS

    if (titulos.length === 0) {

        titulosObtenidos.innerHTML = `

            <p>
                No hay títulos registrados.
            </p>

        `;

        carrerasAsociadas.innerHTML = `

            <p>
                No hay carreras asociadas.
            </p>

        `;

        escuelasAsociadas.innerHTML = `

            <p>
                No hay escuelas asociadas.
            </p>

        `;

        return;

    }


    // MOSTRAR LOS TÍTULOS

    for (let i = 0; i < titulos.length; i++) {

        const titulo = titulos[i];


        const elemento =
            document.createElement("article");


        elemento.innerHTML = `

            <p>

                <strong>Tipo de programa:</strong>

                ${titulo.tipo}

            </p>

            <p>

                <strong>Carrera:</strong>

                ${titulo.carrera}

            </p>

            <p>

                <strong>Escuela:</strong>

                ${titulo.escuela}

            </p>

            <p>

                <strong>Año de graduación:</strong>

                ${titulo.anio}

            </p>

            <p>

                <strong>Estado:</strong>

                ${titulo.estado}

            </p>

            <hr>

        `;


        titulosObtenidos.appendChild(elemento);

    }


    // MOSTRAR CARRERAS

    for (let i = 0; i < titulos.length; i++) {

        const carrera =
            document.createElement("p");


        carrera.textContent =
            titulos[i].carrera;


        carrerasAsociadas.appendChild(carrera);

    }


    // MOSTRAR ESCUELAS

    for (let i = 0; i < titulos.length; i++) {

        const escuela =
            document.createElement("p");


        escuela.textContent =
            titulos[i].escuela;


        escuelasAsociadas.appendChild(escuela);

    }


    Swal.fire({

        title: "Perfil encontrado",

        text: "La información del egresado se mostró correctamente.",

        icon: "success",

        confirmButtonText: "Aceptar"

    });

}


// EVENTO DEL FORMULARIO

formulario.addEventListener(
    "submit",
    consultarPerfil
);