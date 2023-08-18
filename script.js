document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const addButton = document.getElementById("add-button");
    const shareButton = document.getElementById("share-button");
    const entriesList = document.getElementById("entries-list");

    const entries = [];

    addButton.addEventListener("click", function () {
        const entry = {
            requester: document.getElementById("requester").value,
            name: document.getElementById("name").value,
            event: document.getElementById("event").value,
            date: document.getElementById("date").value,
            time: document.getElementById("time").value,
            pastor: document.getElementById("pastor").value,
            number: document.getElementById("number").value,
            congregation: document.getElementById("congregation").value,
            purpose: document.getElementById("purpose").value
        };

        entries.push(entry);

        resetForm();
        updateEntriesList();
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (entries.length === 0) {
            alert("Adicione pelo menos uma solicitação de convite antes de compartilhar.");
            return;
        }

        const currentDate = new Date();
        const formattedDate = formatDate(currentDate);
        
        const header = `Solicitação de Convite - ${formattedDate}`;
        
        const messages = entries.map(function (entry) {
            return `${header}%0A%0A*Solicitante:* ${entry.requester}%0A*Nome/Conjunto Solicitado:* ${entry.name}%0A*Evento:* ${entry.event}%0A*Data:* ${formatDate(entry.date)}%0A*Horário:* ${entry.time}%0A*Pastor para Contato:* ${entry.pastor}%0A*Número para Contato:* ${entry.number}%0A*Congregação - Setor/Campo do Convidado:* ${entry.congregation}%0A*Propósito:* ${entry.purpose}`;
        });

        const fullMessage = messages.join("%0A%0A");
        const whatsappURL = `https://wa.me/?text=${fullMessage}`;
        window.open(whatsappURL, "_blank");

        entries.length = 0;
        resetForm();
        updateEntriesList();
    });

    const numberInput = document.getElementById("number");
    const numberMask = new IMask(numberInput, {
        mask: '(00) 00000-0000'
    });

    function resetForm() {
        form.reset();
    }

    function updateEntriesList() {
        entriesList.innerHTML = "";
        entries.forEach(function (entry, index) {
            const entryElement = document.createElement("div");
            entryElement.className = "entry";
            entryElement.innerHTML = `
                <h3>Informação ${index + 1}</h3>
                <p><strong>Nome:</strong> ${entry.name}</p>
                <p><strong>Evento:</strong> ${entry.event}</p>
                <p><strong>Data:</strong> ${entry.date}</p>
                <p><strong>Horário:</strong> ${entry.time}</p>
                <p><strong>Pastor para Contato:</strong> ${entry.pastor}</p>
                <p><strong>Número para Contato:</strong> ${entry.number}</p>
                <p><strong>Congregação do Convidado:</strong> ${entry.congregation}</p>
                <p><strong>Propósito:</strong> ${entry.purpose}</p>
                <button class="edit-button" data-index="${index}">Editar</button>
            `;
            entriesList.appendChild(entryElement);
        });

        const editButtons = document.querySelectorAll(".edit-button");
        editButtons.forEach(function (button) {
            button.addEventListener("click", function (event) {
                const index = event.target.getAttribute("data-index");
                if (index !== null) {
                    editEntry(index);
                }
            });
        });
    }

    function editEntry(index) {
        const entry = entries[index];
        if (entry) {
            document.getElementById("name").value = entry.name;
            document.getElementById("event").value = entry.event;
            document.getElementById("date").value = entry.date;
            document.getElementById("time").value = entry.time;
            document.getElementById("pastor").value = entry.pastor;
            document.getElementById("number").value = entry.number;
            document.getElementById("congregation").value = entry.congregation;
            document.getElementById("purpose").value = entry.purpose;
            entries.splice(index, 1);
            updateEntriesList();
        }
    }
});


function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}