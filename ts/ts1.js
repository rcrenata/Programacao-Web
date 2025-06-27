document.addEventListener("DOMContentLoaded", function () {
    var appContainer = document.createElement("div");
    appContainer.classList.add("container");
    document.body.appendChild(appContainer);
    // Group 1: Raio Input
    var raioGroup = document.createElement("div");
    raioGroup.classList.add("input-group");
    var raioLabel = document.createElement("label");
    raioLabel.setAttribute("for", "raioInput");
    raioLabel.textContent = "Informe o raio";
    var inputButtonDiv = document.createElement("div");
    inputButtonDiv.classList.add("input-and-button");
    var raioInput = document.createElement("input");
    raioInput.setAttribute("type", "number");
    raioInput.setAttribute("id", "raioInput");
    var calcularBtn = document.createElement("button");
    calcularBtn.setAttribute("id", "calcularBtn");
    calcularBtn.textContent = "OK";
    inputButtonDiv.appendChild(raioInput);
    inputButtonDiv.appendChild(calcularBtn);
    raioGroup.appendChild(raioLabel);
    raioGroup.appendChild(inputButtonDiv);
    appContainer.appendChild(raioGroup);
    // Group 2: Area Output
    var areaGroup = document.createElement("div");
    areaGroup.classList.add("input-group", "middle-label"); // Adiciona middle-label
    var areaLabel = document.createElement("label");
    areaLabel.setAttribute("for", "areaOutput");
    areaLabel.textContent = "Área do círculo";
    var areaOutput = document.createElement("input");
    areaOutput.setAttribute("type", "text");
    areaOutput.setAttribute("id", "areaOutput");
    areaOutput.setAttribute("readonly", "true");
    areaGroup.appendChild(areaLabel);
    areaGroup.appendChild(areaOutput);
    appContainer.appendChild(areaGroup);
    // Group 3: Circunferencia Output
    var circunferenciaGroup = document.createElement("div");
    circunferenciaGroup.classList.add("input-group");
    var circunferenciaLabel = document.createElement("label");
    circunferenciaLabel.setAttribute("for", "circunferenciaOutput");
    circunferenciaLabel.textContent = "Circunferência";
    var circunferenciaOutput = document.createElement("input");
    circunferenciaOutput.setAttribute("type", "text");
    circunferenciaOutput.setAttribute("id", "circunferenciaOutput");
    circunferenciaOutput.setAttribute("readonly", "true");
    circunferenciaGroup.appendChild(circunferenciaLabel);
    circunferenciaGroup.appendChild(circunferenciaOutput);
    appContainer.appendChild(circunferenciaGroup);
    // Add event listener to the button
    calcularBtn.addEventListener("click", function () {
        var valor = raioInput.value.trim();
        if (!valor) {
            alert("Por favor, insira o raio.");
            return;
        }
        var raio = parseFloat(valor);
        if (isNaN(raio) || raio <= 0) {
            alert("Digite um valor numérico válido maior que zero.");
            return;
        }
        var area = Math.PI * raio * raio;
        var circunferencia = 2 * Math.PI * raio;
        areaOutput.value = area.toFixed(2);
        circunferenciaOutput.value = circunferencia.toFixed(2);
    });
});
