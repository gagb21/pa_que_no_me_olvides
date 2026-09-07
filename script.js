// Contador de tiempo
function updateCountdown() {
    const targetDate = new Date('2025-03-21T16:00:00-05:00'); // Hora de Colombia (UTC-5)
    const now = new Date();
    const timeDifference = targetDate - now;

    if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        document.getElementById('countdown').innerHTML = `
            Debes esperar: ${days} días, ${hours} horas, ${minutes} minutos y ${seconds} segundos
        `;
    } else {
        document.getElementById('countdown').innerHTML = "¡Ha llegado el momento!";
    }
}

// Actualizar el contador cada segundo
setInterval(updateCountdown, 1000);
updateCountdown(); // Llamar inmediatamente para evitar retraso inicial

function checkPassword() {
    let password = prompt("Ingrese la contraseña:");
    if (password === "GAGB") {
        document.getElementById("content").style.display = "flex";
        document.querySelector(".button-container").style.display = "none";
        document.getElementById("background-music").play();
    } else {
        alert("Contraseña incorrecta. Inténtalo de nuevo.");
    }
}

function showFullContent() {
    document.querySelector(".pre-opening").style.display = "none";
    document.querySelector(".full-content").style.display = "block";
}

function goBack() {
    document.querySelector(".full-content").style.display = "none";
    document.querySelector(".pre-opening").style.display = "flex";
}
