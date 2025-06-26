document.addEventListener("DOMContentLoaded", () => {
    const appContainer = document.createElement("div");
    appContainer.classList.add("container");
    document.body.appendChild(appContainer);

    // Group 1: Raio Input
    const raioGroup = document.createElement("div");
    raioGroup.classList.add("input-group");
    const raioLabel = document.createElement("label");
    raioLabel.setAttribute("for", "raioInput");
    raioLabel.textContent = "Informe o raio";
    const inputButtonDiv = document.createElement("div");
    inputButtonDiv.classList.add("input-and-button");
    const raioInput = document.createElement("input");
    raioInput.setAttribute("type", "number");
    raioInput.setAttribute("id", "raioInput");
    const calcularBtn = document.createElement("button");
    calcularBtn.setAttribute("id", "calcularBtn");
    calcularBtn.textContent = "OK";

    inputButtonDiv.appendChild(raioInput);
    inputButtonDiv.appendChild(calcularBtn);
    raioGroup.appendChild(raioLabel);
    raioGroup.appendChild(inputButtonDiv);
    appContainer.appendChild(raioGroup);

    // Group 2: Area Output
    const areaGroup = document.createElement("div");
    areaGroup.classList.add("input-group", "middle-label"); // Adiciona middle-label
    const areaLabel = document.createElement("label");
    areaLabel.setAttribute("for", "areaOutput");
    areaLabel.textContent = "Área do círculo";
    const areaOutput = document.createElement("input");
    areaOutput.setAttribute("type", "text");
    areaOutput.setAttribute("id", "areaOutput");
    areaOutput.setAttribute("readonly", "true");

    areaGroup.appendChild(areaLabel);
    areaGroup.appendChild(areaOutput);
    appContainer.appendChild(areaGroup);

    // Group 3: Circunferencia Output
    const circunferenciaGroup = document.createElement("div");
    circunferenciaGroup.classList.add("input-group");
    const circunferenciaLabel = document.createElement("label");
    circunferenciaLabel.setAttribute("for", "circunferenciaOutput");
    circunferenciaLabel.textContent = "Circunferência";
    const circunferenciaOutput = document.createElement("input");
    circunferenciaOutput.setAttribute("type", "text");
    circunferenciaOutput.setAttribute("id", "circunferenciaOutput");
    circunferenciaOutput.setAttribute("readonly", "true");

    circunferenciaGroup.appendChild(circunferenciaLabel);
    circunferenciaGroup.appendChild(circunferenciaOutput);
    appContainer.appendChild(circunferenciaGroup);

    // Add event listener to the button
    calcularBtn.addEventListener("click", () => {
        const valor = raioInput.value.trim();

        if (!valor) {
            alert("Por favor, insira o raio.");
            return;
        }

        const raio = parseFloat(valor);

        if (isNaN(raio) || raio <= 0) {
            alert("Digite um valor numérico válido maior que zero.");
            return;
        }

        const area = Math.PI * raio * raio;
        const circunferencia = 2 * Math.PI * raio;

        areaOutput.value = area.toFixed(2);
        circunferenciaOutput.value = circunferencia.toFixed(2);
    });
});