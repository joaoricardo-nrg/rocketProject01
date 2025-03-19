"use strict"

import "./scss/main.css"
import "./scss/header.css"

document.getElementById("botaoEnvio").addEventListener("click", function(event) {
    event.preventDefault(); 
    const idCliente = document.getElementById("idCartao").value.trim();
    console.log("ID DO CLIENTE >>",idCliente)
    if (!idCliente) {
        alert("Digite um ID válido!");
        return;
    }

    fetch(`http://localhost:3333/clients/${idCliente}`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Cliente não encontrado");
        }
        return response.json();
    })
    .then(data => {

        const nome = data.name;
        const dataInicioCliente = data.clientSince;
        const agendamentos = data.appointmentHistory;
        const totalDeCortesNecessarios = data.loyaltyCard.cutsNeeded;


        document.getElementById("nomeUsuario").textContent = nome;
        document.getElementById('clientSince').textContent = `Cliente desde ${dataInicioCliente}`;
        document.getElementById('cutsRemaining').textContent = `${data.loyaltyCard.cutsRemaining} `;
        document.getElementById('totalCuts').textContent = `${data.loyaltyCard.totalCuts} de ${totalDeCortesNecessarios}`;

        const listaAgendamentos = document.getElementById("listaAgendamentos");
        listaAgendamentos.innerHTML = "";

        agendamentos.forEach(agendamento => {
            const li = document.createElement("li");
                li.classList.add("historyList");

                li.innerHTML = `
                    <div class="liTitle">
                        <span>${agendamento.date}</span>
                        <p>${agendamento.time}</p>
                    </div>
                    <div class="liIcon">
                        <img src="./assets/icons/sealCheckedGreen.svg" alt="Ícone">
                    </div>
                `;

                listaAgendamentos.appendChild(li);
            
        });
    })
    .catch(error => {
        console.error("Erro:", error);
        alert("Cartão não encontrado!");
    });
});
