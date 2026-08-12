
//console.log("Hola Marianela"); prueba de consola
//ELEMENTOS DEL DOM
/**  @type {HTMLInputElement} */
const inputCarrera = document.getElementById("carrera");
const inputEscuela = document.getElementById("nombreEscuela");

//botones
const btnRegistrarCarrera = document.getElementById("guardar-carrera");
const btnRegistrarEscuela = document.getElementById("guargar-escuela");

const formularioCarrera = document.getElementById("formCarrera");
const formularioEscuela = document.getElementById("formEscuela");

//Validaciones por campos obligatorio
const inputsRequeridos = document.querySelectorAll("input[required]");//trabaja con todos los elementos que tengan required del html

//Valida el input vacío
function ValidarIngreso(palabra) {//valida lo que se ingresa en el input
    return palabra.length >= 3;
}

/*======= Exclusivo para  
function resaltarCamposVacios(){
    let error = false; //asume que no hay error

    //carrera
    const especialidad = inputCarrera.value.trim();
    if(!ValidarIngreso(especialidad)){
        inputCarrera.classList.add("input-error");
        error = true;
    }else{
        inputCarrera.classList.remove("input-error");
    }

    //Escuela
     const institucion = inputEscuela.value.trim();
    if(!ValidarIngreso(institucion)){
        inputEscuela.classList.add("input-error");
        error = true;
    }else{
        inputEscuela.classList.remove("input-error");
    }
}

function validarCamposVacios(){
    /*console.log(ValidarIngreso(inputCarrera.value.trim()));//prueba por consola si el boton funciona
    const error = resaltarCamposVacios();
    if (error){
        alert("Error")
    }else{
        alert("¡Registro exitoso!")
    }

}*/

// FUNCIÓN DE RESALTAR (Ahora recibe el input dinámicamente)
function resaltarCamposVacios(inputAValidar) {
    let error = false;

    const especialidad = inputAValidar.value.trim();
    if (!ValidarIngreso(especialidad)) {
        inputAValidar.classList.add("input-error");
        error = true; // Cambia a true si hay un fallo
    } else {
        inputAValidar.classList.remove("input-error");
    }

    return error; // Le regresa el resultado (true/false) a la función de la alerta
}

// 3.FUNCIÓN PRINCIPAL DE ALERTA
function validarCamposVacios(e) {
    e.preventDefault(); // Detiene la recarga del formulario

    let inputSeleccionado;

    // Evaluamos cuál botón disparó el click para elegir su input correspondiente
    if (e.target === btnRegistrarCarrera) {
        inputSeleccionado = inputCarrera;
    } else if (e.target === btnRegistrarEscuela) {
        inputSeleccionado = inputEscuela;
    }

    // Ejecuta la función de resaltar pasándole el input correcto
    const error = resaltarCamposVacios(inputSeleccionado);

    if (error) {
        //alert("Error: El campo no cumple con los requisitos mínimos.");
        Swal.fire({
            title: "¡Error!",
            text: "Complete el campo resaltado",
            icon: "error",
            confirmButtonText: "Aceptar"
        });
    } else {
        //alert("¡Registro exitoso!");
        Swal.fire({
            title: "¡Registro exitoso!",
            text: "Los datos han sido registrados correctamente",
            icon: "success",
            draggable: true,
            confirmButtonText: "Aceptar"
        });
        inputSeleccionado.value = ""; // Opcional: limpia el campo al tener éxito
    }
}



function guardarDato(){

    const registro1 ={
        car : inputCarrera.value
    }
    //objeto con la información a guardar
    localStorage.setItem("registro1", JSON.stringify(registro1));
    //muestra dato guardado
    const muestraRegistro = JSON.parse(localStorage.getItem(registro1));

    if(registro1){
        console.log(muestraRegistro.car);
    }
}

function guardarLista(e) {
    e.preventDefault();

    const error = resaltarCamposVacios(inputCarrera);

    if (error) {
        Swal.fire({
            title: "¡Error!",
            text: "Complete correctamente el campo.",
            icon: "error"
        });
        return; // Detiene la función y no guarda nada
    }

    let datos = JSON.parse(localStorage.getItem("datos")) || [];

    const nuevoDato = {
        carrera: inputCarrera.value.trim()
    };

    datos.push(nuevoDato);

    localStorage.setItem("datos", JSON.stringify(datos));

    formularioCarrera.reset();

    Swal.fire({
        title: "¡Registro exitoso!",
        text: "La carrera fue registrada correctamente.",
        icon: "success"
    });

     //muestra todos los datos ingresados
    console.log("Lista de Carreras: ");

    for(let i = 0; i < datos.length; i++){

        console.log("Datos " + (i + 1));
        console.log("Carrera: " + datos[i].carrera);
        console.log("---------------------------------");
    }
}

//Guardar lista para escuelas
function guardarLista2(e) {
    e.preventDefault();

    const error2 = resaltarCamposVacios(inputEscuela);

    if (error2) {
        Swal.fire({
            title: "¡Error!",
            text: "Complete correctamente el campo.",
            icon: "error"
        });
        return; // Detiene la función y no guarda nada
    }

    let datos2 = JSON.parse(localStorage.getItem("datos2")) || [];

    const nuevoDato2 = {
        escuela: inputEscuela.value.trim()
    };

    datos2.push(nuevoDato2);

    localStorage.setItem("datos2", JSON.stringify(datos2));

    formularioEscuela.reset();

    Swal.fire({
        title: "¡Registro exitoso!",
        text: "La Escuela fue registrada correctamente.",
        icon: "success"
    });

     //muestra todos los datos ingresados
    console.log("Lista de Escuelas: ");

    for(let i = 0; i < datos2.length; i++){

        console.log("Datos " + (i + 1));
        console.log("Escuela: " + datos2[i].escuela);
        console.log("---------------------------------");
    }
}

/*
function guardarLista(){

    let datos = JSON.parse(localStorage.getItem("datos")) || [];

    if (!Array.isArray(datos)){//crea la lista en caso de no existir
        datos = [];
    }

    //se crea el objeto
    const nuevoDato = {
        carrera : inputCarrera.value
    };

    //se agrega al arreglo
    datos.push(nuevoDato);

    //se guarda en la lista
    localStorage.setItem("datos", JSON.stringify(datos));

    //limpiar el formulario
    formularioCarrera.reset();

    //muestra todos los datos ingresados
    console.log("Lista de Carreras: ");

    for(let i = 0; i < datos.length; i++){

        console.log("Datos " + (i + 1));
        console.log("Carrera: " + datos[i].carrera);
        console.log("---------------------------------");

    }
}
*/


//Evento del boton, con esto el boton reaccionará al click del usuario
//btnRegistrarCarrera.addEventListener("click", validarCamposVacios);
btnRegistrarCarrera.addEventListener("click", guardarLista);//funciona al hacer click y llama a la funcion validarCamposVacios
btnRegistrarEscuela.addEventListener("click", guardarLista2);//funciona al hacer click y llama a la funcion validarCamposVacios
