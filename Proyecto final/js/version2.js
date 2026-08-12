const formulario = document.getElementById("formEgresados");
const inputCedula = document.getElementById("identificacion");
const inputNombre = document.getElementById("nombre");
const inputCorreo = document.getElementById("correo");
const inputTelefono = document.getElementById("telefono");
const inputLugarTrabajo = document.getElementById("empresa");
const inputFechaRegistro = document.getElementById("fecha");
const inputOpciones = document.getElementById("opciones");
const btnregistro = document.getElementById("guardar-registro");

const inputsRequeridos = document.querySelectorAll("input[required]");

function validarCedula(numeroCedula) {
    return /^[0-9]{9}$/.test(numeroCedula);
}
function validarNombreCompleto(nombre) {
    return nombre.length >= 2;
}
function validarCorreo(correo) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo); // Uno o más caracteres que no sean espacios ni arrobas, seguido de una arroba, otro bloque similar, un punto y otro bloque final sin espacios ni arrobas.
}
function validarTelefono(telefono) {
    return /^[0-9]{8,12}$/.test(telefono); // Dígitos numéricos, con una longitud total de entre 8 y 12 caracteres, desde el inicio hasta el final
}
function validarLugarTrabajo(lugarTrabajo) {
    return lugarTrabajo.length >= 2;
}
function validarCarrera(carrera){
    return carrera !== "";
}
//===========Funcion para resaltar campos vacios
function resaltarCamposVacios(){
    let error = false;
    //Cédula
    if(!validarCedula(inputCedula.value.trim())){
        inputCedula.classList.add("input-error");
        error = true;
    }else{
        inputCedula.classList.remove("input-error");
    }

    //nombre completo
    if(!validarNombreCompleto(inputNombre.value.trim())){
        inputNombre.classList.add("input-error");
        error = true;
    }else{
        inputNombre.classList.remove("input-error");
    }

    //correo
    if(!validarCorreo(inputCorreo.value.trim())){
        inputCorreo.classList.add("input-error");
        error = true;
    }else{
        inputCorreo.classList.remove("input-error");
    }

    //telefono
    if(!validarTelefono(inputTelefono.value.trim())){
        inputTelefono.classList.add("input-error");
        error = true;
    }else{
        inputTelefono.classList.remove("input-error");
    }

    //Trabajo
    if(!validarLugarTrabajo(inputLugarTrabajo.value.trim())){
        inputLugarTrabajo.classList.add("input-error");
        error = true;
    }else{
        inputLugarTrabajo.classList.remove("input-error");
    }

    //Carrera
    if(!validarCarrera(inputOpciones.value)){
        inputOpciones.classList.add("input-error");
        error = true;
    }else{
        inputOpciones.classList.remove("input-error");
    }
    return error;
}



//=======Funcion para validar campos vacios===========
function validarCamposVacios(e) {
    e.preventDefault();

    const error = resaltarCamposVacios();

    if (error) {
        Swal.fire({
            title: "No se puede registrar el egresado",
            text: "Complete los campos resaltados.",
            icon: "warning",
            confirmButtonText: "Aceptar"
        });
    } else {
        Swal.fire({
            title: "Egresado registrado correctamente",
            text: "Los datos han sido guardados correctamente.",
            icon: "success",
            confirmButtonText: "Aceptar"
        });
    }
}

//============Coloca la fecha actual en el campo=======
function establecerFechaActual() {
    const hoy = new Date(); // Objeto Date que representa la fecha y hora actual 
    const anio = hoy.getFullYear();
    /* 
    getMonth(): Devuelve el mes como un número de 0 al 11
              + 1: Mes del 1 al 12
    padStart(2, "0"): en los meses de solo un número (1 - 9) agrega un 0 antes (01 - 09)
    */
    const mes = String(hoy.getMonth() + 1).padStart(2, '0'); 
    const dia = String(hoy.getDate()).padStart(2, '0');
    /*
    A inputFechaRegistro se le asigna el atributo value interpolando las variables
    */
    inputFechaRegistro.value = `${anio}-${mes}-${dia}`;
}

//========Funcion para guardar en Local Storage=======
function guardarListaEgresados(e) {
    e.preventDefault();

    // Validar los campos
    const error = resaltarCamposVacios();

    if (error) {
        Swal.fire({
            title: "No se puede registrar el egresado",
            text: "Complete correctamente los campos resaltados.",
            icon: "warning",
            confirmButtonText: "Aceptar"
        });
        return;
    }

    // Obtener la lista almacenada o crear una nueva
    let egresados = JSON.parse(localStorage.getItem("egresados")) || [];

    // Crear el objeto con todos los datos del formulario
    const nuevoEgresado = {
        cedula: inputCedula.value.trim(),
        nombre: inputNombre.value.trim(),
        correo: inputCorreo.value.trim(),
        telefono: inputTelefono.value.trim(),
        carrera: document.getElementById("opciones").value,
        fecha: inputFechaRegistro.value,
        empresa: document.getElementById("empresa").value.trim()
    };

    // Agregar el nuevo egresado al arreglo
    egresados.push(nuevoEgresado);

    // Guardar nuevamente la lista en LocalStorage
    localStorage.setItem("egresados", JSON.stringify(egresados));

    // Limpiar el formulario
    formulario.reset();

    // Colocar nuevamente la fecha actual
    establecerFechaActual();

    Swal.fire({
        title: "¡Registro exitoso!",
        text: "El egresado fue registrado correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar"
    });

    // Mostrar la lista en consola
    console.log("===== LISTA DE EGRESADOS =====");

    for (let i = 0; i < egresados.length; i++) {

        console.log("Egresado " + (i + 1));
        console.log("Cédula: " + egresados[i].cedula);
        console.log("Nombre: " + egresados[i].nombre);
        console.log("Correo: " + egresados[i].correo);
        console.log("Teléfono: " + egresados[i].telefono);
        console.log("Carrera: " + egresados[i].carrera);
        console.log("Fecha: " + egresados[i].fecha);
        console.log("Empresa: " + egresados[i].empresa);
        console.log("--------------------------------");
    }
}

establecerFechaActual();
formulario.addEventListener("submit", guardarListaEgresados);