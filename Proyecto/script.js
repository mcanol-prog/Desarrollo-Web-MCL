// Obtener el formulario

const formulario = document.getElementById("formLogin");

// Escuchar cuando el usuario presiona el botón Ingresar

formulario.addEventListener("submit", function(event){

    event.preventDefault();

    let correo = document.getElementById("correo").value.trim();

    let password = document.getElementById("password").value.trim();

    let rol = document.getElementById("rol").value;

    if(correo === ""){

        alert("Debe ingresar el correo electrónico.");

        return;

    }

    if(password === ""){

        alert("Debe ingresar la contraseña.");

        return;

    }

    if(rol === ""){

        alert("Debe seleccionar un rol.");

        return;

    }

    alert("Inicio de sesión correcto.");

    window.location.href = "perfil.html";

});