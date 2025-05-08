document.getElementById("formIMC").addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Obtém elementos
    const pesoInput = document.getElementById("peso");
    const alturaInput = document.getElementById("altura");
    const resultadoDiv = document.getElementById("resultado");
    
    // Limpa estados anteriores
    resultadoDiv.className = "";
    pesoInput.classList.remove("campo-invalido");
    alturaInput.classList.remove("campo-invalido");
    
    // Obtém valores (substitui vírgula por ponto para parseFloat)
    const peso = parseFloat(pesoInput.value.replace(',', '.'));
    const altura = parseFloat(alturaInput.value.replace(',', '.'));
    
    // Validações
    if (!pesoInput.value || isNaN(peso)) {
        mostrarErro("Por favor, digite um peso válido!", pesoInput);
        return;
    }
    
    if (!alturaInput.value || isNaN(altura)) {
        mostrarErro("Por favor, digite uma altura válida!", alturaInput);
        return;
    }
    
    if (peso <= 0) {
        mostrarErro("O peso deve ser maior que zero!", pesoInput);
        return;
    }
    
    if (altura <= 0) {
        mostrarErro("A altura deve ser maior que zero!", alturaInput);
        return;
    }
    
    if (altura > 3) { // Verifica se a altura foi digitada em metros
        mostrarErro("Digite a altura em metros (ex: 1.70)", alturaInput);
        return;
    }
    
    // Cálculo do IMC
    const imc = peso / (altura * altura);
    let mensagem;
    
    if (imc <= 18.5) {
        mensagem = `Seu IMC foi de ${imc.toFixed(2)}. Você está ABAIXO DO PESO.`;
    } else if (imc <= 24.9) {
        mensagem = `Seu IMC foi de ${imc.toFixed(2)}. Você está no peso IDEAL.`;
    } else if (imc <= 29.9) {
        mensagem = `Seu IMC foi de ${imc.toFixed(2)}. Você está com SOBREPESO.`;
    } else if (imc <= 34.9) {
        mensagem = `Seu IMC foi de ${imc.toFixed(2)}. Você está com OBESIDADE GRAU I.`;
    } else if (imc <= 39.9) {
        mensagem = `Seu IMC foi de ${imc.toFixed(2)}. Você está com OBESIDADE GRAU II.`;
    } else {
        mensagem = `Seu IMC foi de ${imc.toFixed(2)}. Você está com OBESIDADE GRAU III.`;
    }
    
    // Exibe resultado
    resultadoDiv.textContent = mensagem;
    resultadoDiv.className = "sucesso";
});

// Função para mostrar erros
function mostrarErro(mensagem, elemento) {
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.textContent = mensagem;
    resultadoDiv.className = "erro";
    
    if (elemento) {
        elemento.focus();
        elemento.classList.add("campo-invalido");
        
        // Remove a classe quando o usuário começar a digitar
        elemento.addEventListener('input', function() {
            elemento.classList.remove("campo-invalido");
        }, { once: true });
    }
}

// Botão de reset
document.getElementById("resetButton").addEventListener("click", function() {
    document.getElementById("peso").value = "";
    document.getElementById("altura").value = "";
    
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.textContent = "Resultado";
    resultadoDiv.className = "";
    
    // Remove classes de erro dos campos
    document.getElementById("peso").classList.remove("campo-invalido");
    document.getElementById("altura").classList.remove("campo-invalido");
    
    document.getElementById("peso").focus();
});