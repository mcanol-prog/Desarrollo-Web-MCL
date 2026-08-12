const formulario = document.getElementById("formBuscar");
const empresa = document.getElementById("empresa");
const area = document.getElementById("area");
const modalidad = document.getElementById("modalidad");
const ubicacion = document.getElementById("ubicacion");
const resultados = document.getElementById("resultados");


function mostrarOportunidades(filtros) {

    const oportunidades =
        JSON.parse(
            localStorage.getItem("oportunidadesLaborales")
        ) || [];

    resultados.innerHTML = "";

    const encontradas =
        oportunidades.filter(function(oportunidad) {

            return (

                oportunidad.empresa
                    .toLowerCase()
                    .includes(filtros.empresa)

                &&

                oportunidad.area
                    .toLowerCase()
                    .includes(filtros.area)

                &&

                (
                    filtros.modalidad === "" ||
                    oportunidad.modalidad ===
                    filtros.modalidad
                )

                &&

                oportunidad.ubicacion
                    .toLowerCase()
                    .includes(filtros.ubicacion)

            );

        });


    if (encontradas.length === 0) {

        resultados.innerHTML =
            "<p>No se encontraron oportunidades.</p>";

        return;

    }


    for (let i = 0; i < encontradas.length; i++) {

        const oportunidad = encontradas[i];

        const elemento =
            document.createElement("article");

        elemento.innerHTML = `

            <h4>${oportunidad.puesto}</h4>

            <p>
                <strong>Empresa:</strong>
                ${oportunidad.empresa}
            </p>

            <p>
                <strong>Área:</strong>
                ${oportunidad.area}
            </p>

            <p>
                <strong>Modalidad:</strong>
                ${oportunidad.modalidad}
            </p>

            <p>
                <strong>Ubicación:</strong>
                ${oportunidad.ubicacion}
            </p>

            <a href="detalle-oportunidad.html">
                Ver detalle
            </a>

            <hr>

        `;

        resultados.appendChild(elemento);

    }

}


function buscar(e) {

    e.preventDefault();

    const filtros = {

        empresa: empresa.value.trim().toLowerCase(),
        area: area.value.trim().toLowerCase(),
        modalidad: modalidad.value,
        ubicacion: ubicacion.value.trim().toLowerCase()

    };

    mostrarOportunidades(filtros);

}


formulario.addEventListener("submit", buscar);

mostrarOportunidades({

    empresa: "",

    area: "",

    modalidad: "",

    ubicacion: ""

});