const formulario = document.getElementById("formConsulta");

const resultados = document.getElementById("resultados");

const nombre = document.getElementById("nombre");
const carrera = document.getElementById("carrera");
const escuela = document.getElementById("escuela");
const tipo = document.getElementById("tipo");
const anio = document.getElementById("anio");


function consultarEgresados(e) {

    e.preventDefault();

    const egresados =
        JSON.parse(localStorage.getItem("egresados")) || [];

    const filtroNombre = nombre.value.trim().toLowerCase();
    const filtroCarrera = carrera.value.trim().toLowerCase();
    const filtroEscuela = escuela.value.trim().toLowerCase();
    const filtroTipo = tipo.value;
    const filtroAnio = anio.value;

    const encontrados = egresados.filter(function(egresado) {

        const coincideNombre =
            egresado.nombre.toLowerCase()
            .includes(filtroNombre);

        const coincideCarrera =
            egresado.carrera.toLowerCase()
            .includes(filtroCarrera);

        /*
        En los registros actuales de egresados todavía
        no tenemos escuela ni tipo de programa.
        Por eso solo filtramos esos campos cuando
        posteriormente existan en el registro.
        */

        const coincideEscuela =
            filtroEscuela === "" ||
            (egresado.escuela &&
            egresado.escuela.toLowerCase()
            .includes(filtroEscuela));

        const coincideTipo =
            filtroTipo === "" ||
            egresado.tipo === filtroTipo;

        const coincideAnio =
            filtroAnio === "" ||
            egresado.anio === filtroAnio;

        return coincideNombre &&
               coincideCarrera &&
               coincideEscuela &&
               coincideTipo &&
               coincideAnio;

    });

    resultados.innerHTML = "";

    if (encontrados.length === 0) {

        resultados.innerHTML =
            "<p>No se encontraron egresados.</p>";

        return;

    }

    for (let i = 0; i < encontrados.length; i++) {

        const egresado = encontrados[i];

        const registro = document.createElement("article");

        registro.innerHTML = `

            <h4>${egresado.nombre}</h4>

            <p>
                <strong>Identificación:</strong>
                ${egresado.cedula}
            </p>

            <p>
                <strong>Correo:</strong>
                ${egresado.correo}
            </p>

            <p>
                <strong>Teléfono:</strong>
                ${egresado.telefono}
            </p>

            <p>
                <strong>Carrera:</strong>
                ${egresado.carrera}
            </p>

        `;

        resultados.appendChild(registro);

    }

}


formulario.addEventListener(
    "submit",
    consultarEgresados
);