document.getElementById('gerar-btn').addEventListener('click', async () => {
    const numeroDeParagrafos = document.getElementById('paragrafos').value;
    const resultadoDiv = document.getElementById('resultado');

    try {
        const response = await fetch(`/lorem?paragrafos=${numeroDeParagrafos}`);
        const data = await response.json();

        resultadoDiv.innerHTML = '';

        data.paragrafos.forEach(p_text => {
            const p_element = document.createElement('p');
            p_element.textContent = p_text;
            resultadoDiv.appendChild(p_element);
        });

    } catch (error) {
        resultadoDiv.innerHTML = '<p>Erro ao gerar o texto. Tente novamente.</p>';
        console.error('Erro:', error);
    }
});