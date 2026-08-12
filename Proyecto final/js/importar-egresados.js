const formulario = document.getElementById("formImportar");
const archivo = document.getElementById("archivo");

function validarArchivo() {

    if (archivo.files.length === 0) {

        archivo.classList.add("input-error");

        return false;

    }

    const nombreArchivo = archivo.files[0].name.toLowerCase();

    if (!nombreArchivo.endsWith(".csv")) {

        archivo.classList.add("input-error");

        return false;

    }

    archivo.classList.remove("input-error");

    return true;
}


function importarEgresados(e) {

    e.preventDefault();

    if (!validarArchivo()) {

        Swal.fire({

            title: "Archivo no válido",

            text: "Seleccione un archivo CSV válido.",

            icon: "warning",

            confirmButtonText: "Aceptar"

        });

        return;

    }

    const archivoSeleccionado = archivo.files[0];

    const lector = new FileReader();

    lector.onload = function(event) {

        const contenido = event.target.result;

        const filas = contenido.trim().split("\n");

        if (filas.length < 2) {

            Swal.fire({

                title: "Archivo vacío",

                text: "El archivo debe contener registros.",

                icon: "warning",

                confirmButtonText: "Aceptar"

            });

            return;

        }

        let egresados =
            JSON.parse(localStorage.getItem("egresados")) || [];

        let nuevos = 0;
        let duplicados = 0;

        for (let i = 1; i < filas.length; i++) {

            const datos = filas[i].split(",");

            if (datos.length < 7) {

                continue;

            }

            const nuevoEgresado = {

                cedula: datos[0].trim(),

                nombre: datos[1].trim(),

                correo: datos[2].trim(),

                telefono: datos[3].trim(),

                carrera: datos[4].trim(),

                fecha: datos[5].trim(),

                empresa: datos[6].trim()

            };

            const existe = egresados.find(function(egresado) {

                return egresado.cedula === nuevoEgresado.cedula;

            });

            if (existe) {

                duplicados++;

            } else {

                egresados.push(nuevoEgresado);

                nuevos++;

            }

        }

        localStorage.setItem(
            "egresados",
            JSON.stringify(egresados)
        );

        Swal.fire({

            title: "Importación completada",

            text:
                "Registros nuevos: " + nuevos +
                ". Duplicados: " + duplicados,

            icon: "success",

            confirmButtonText: "Aceptar"

        });

        formulario.reset();

    };

    lector.readAsText(archivoSeleccionado);

}


formulario.addEventListener("submit", importarEgresados);