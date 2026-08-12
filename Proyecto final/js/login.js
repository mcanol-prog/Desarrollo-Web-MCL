//==================== Elementos del formulario ====================

const formulario = document.getElementById("formLogin");
const inputCorreo = document.getElementById("correo");
const inputPassword = document.getElementById("password");
const inputRol = document.getElementById("rol");

//==================== Validaciones ====================

function validarCorreo(correo){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
}

function validarPassword(password){
    return password.length > 0;
}

function validarRol(rol){
    return rol !== "";
}

//==================== Resaltar campos ====================

function resaltarCamposVacios(){
    let error = false;

    // Correo
    if(!validarCorreo(inputCorreo.value.trim())){
        inputCorreo.classList.add("input-error");
        error = true;
    }else{
        inputCorreo.classList.remove("input-error");
    }

    // Contraseña
    if(!validarPassword(inputPassword.value.trim())){
        inputPassword.classList.add("input-error");
        error = true;
    }else{
        inputPassword.classList.remove("input-error");
    }

    // Rol
    if(!validarRol(inputRol.value)){
        inputRol.classList.add("input-error");
        error = true;
    }else{
        inputRol.classList.remove("input-error");
    }

    return error;
}

//==================== Inicio de sesión ====================

function iniciarSesion(e){

    e.preventDefault();

    const error = resaltarCamposVacios();

    if(error){

        Swal.fire({
            title: "Campos incompletos",
            text: "Complete correctamente la información.",
            icon: "warning",
            confirmButtonText: "Aceptar"
        });

        return;
    }

    // Obtener usuarios del Local Storage
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Buscar usuario
    const usuarioEncontrado = usuarios.find(function(usuario){

        return usuario.correo === inputCorreo.value.trim() &&
               usuario.password === inputPassword.value.trim();

    });

    // Si no existe
    if(!usuarioEncontrado){

        Swal.fire({
            title: "Error",
            text: "Correo o contraseña incorrectos.",
            icon: "error",
            confirmButtonText: "Aceptar"
        });

        return;
    }

    // Bienvenida
    Swal.fire({
        title: "¡Bienvenido(a)!",
        text: "Bienvenido(a) " + usuarioEncontrado.nombre,
        icon: "success",
        confirmButtonText: "Aceptar"
    }).then(() => {

        if(inputRol.value === "registro"){

            window.location.href = "inicio-registro.html";

        }
        else if(inputRol.value === "bienestar"){

            window.location.href = "inicio-bienestar.html";

        }
        else if(inputRol.value === "egresado"){

            window.location.href = "inicio-egresado.html";

        }

    });

}

//==================== Evento ====================

formulario.addEventListener("submit", iniciarSesion);