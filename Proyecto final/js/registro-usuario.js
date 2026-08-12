
const correo = document.getElementById("correo");
const nombreUsuario = document.getElementById("nombre-usuario");
const contrasennia = document.getElementById("contrasenna");

const formulario = document.getElementById("formRegistro");
const btnRegistrarUsuario = document.getElementById("crear-cuenta");


//==================== Validaciones ====================

function validarNombre(nombre){
    return nombre.trim().length >= 2;
}

function validarCorreo(correo){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
}

function validarContrasenna(password){
    return password.trim().length >= 4;
}


//==================== Resaltar errores ====================

function resaltarCamposVacios(){

    let error = false;

    // Nombre
    if(!validarNombre(nombreUsuario.value)){
        nombreUsuario.classList.add("input-error");
        error = true;
    }else{
        nombreUsuario.classList.remove("input-error");
    }

    // Correo
    if(!validarCorreo(correo.value)){
        correo.classList.add("input-error");
        error = true;
    }else{
        correo.classList.remove("input-error");
    }

    // Contraseña
    if(!validarContrasenna(contrasennia.value)){
        contrasennia.classList.add("input-error");
        error = true;
    }else{
        contrasennia.classList.remove("input-error");
    }

    return error;
}


//==================== Registrar usuario ====================

function registrarUsuario(e){

    e.preventDefault();

    const error = resaltarCamposVacios();

    if(error){

        Swal.fire({
            title: "No se pudo crear la cuenta",
            text: "Complete correctamente los campos resaltados.",
            icon: "warning",
            confirmButtonText: "Aceptar"
        });

        return;
    }

    // Obtener la lista de usuarios
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verificar si el correo ya existe
    const existeCorreo = usuarios.find(function(usuario){

        return usuario.correo === correo.value.trim();

    });

    if(existeCorreo){

        Swal.fire({
            title: "Correo existente",
            text: "Ya existe una cuenta registrada con ese correo.",
            icon: "error",
            confirmButtonText: "Aceptar"
        });

        return;
    }

    // Crear el nuevo usuario
    const nuevoUsuario = {

        nombre: nombreUsuario.value.trim(),
        correo: correo.value.trim(),
        password: contrasennia.value.trim()

    };

    // Agregar al arreglo
    usuarios.push(nuevoUsuario);

    // Guardar en Local Storage
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Mostrar en consola
    console.log("===== LISTA DE USUARIOS =====");

    for(let i = 0; i < usuarios.length; i++){

        console.log("Usuario " + (i + 1));
        console.log("Nombre: " + usuarios[i].nombre);
        console.log("Correo: " + usuarios[i].correo);
        console.log("Contraseña: " + usuarios[i].password);
        console.log("-----------------------------");

    }

    Swal.fire({
        title: "¡Cuenta creada!",
        text: "El usuario fue registrado correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar"
    });

    formulario.reset();

}


//==================== Evento ====================

formulario.addEventListener("submit", registrarUsuario);