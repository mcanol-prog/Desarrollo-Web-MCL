const detalle = document.getElementById("detalle");

const oportunidades =
    JSON.parse(
        localStorage.getItem("oportunidadesLaborales")
    ) || [];


if (oportunidades.length === 0) {

    detalle.innerHTML = `

        <p>
            No hay oportunidades laborales registradas.
        </p>

    `;

} else {

    const oportunidad =
        oportunidades[oportunidades.length - 1];

    detalle.innerHTML = `

        <h3>${oportunidad.puesto}</h3>

        <p>
            <strong>Empresa:</strong>
            ${oportunidad.empresa}
        </p>

        <p>
            <strong>Descripción:</strong>
            ${oportunidad.descripcion}
        </p>

        <p>
            <strong>Área profesional:</strong>
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

        <p>
            <strong>Fecha de publicación:</strong>
            ${oportunidad.fechaPublicacion}
        </p>

        <p>
            <strong>Fecha de vencimiento:</strong>
            ${oportunidad.fechaVencimiento}
        </p>

        <p>
            <strong>Contacto:</strong>
            ${oportunidad.contacto}
        </p>

        <p>
            <strong>Estado:</strong>
            ${oportunidad.estado}
        </p>

    `;

}