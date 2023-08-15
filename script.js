document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const submitButton = document.getElementById("submit-button");

    submitButton.addEventListener("click", function () {
        const name = document.getElementById("name").value;
        const event = document.getElementById("event").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;
        const pastor = document.getElementById("pastor").value;
        const number = document.getElementById("number").value;
        const purpose = document.getElementById("purpose").value;

        const message = `Nome: ${name}%0AEvento: ${event}%0AData: ${date}%0AHorário: ${time}%0APastor para Contato: ${pastor}%0ANúmero para Contato: ${number}%0APropósito: ${purpose}`;

        const whatsappURL = `https://api.whatsapp.com/send?phone=SEU_NUMERO_DE_TELEFONE&text=${message}`;

        window.open(whatsappURL, "_blank");
    });
});
