// Alternância entre modo visual e terminal
const botao = document.getElementById("alternarModo");
const visual = document.getElementById("visual");
const terminal = document.getElementById("terminal");

botao.addEventListener("click", () => {
  const emModoVisual = visual.style.display !== "none";
  visual.style.display = emModoVisual ? "none" : "block";
  terminal.style.display = emModoVisual ? "block" : "none";
  botao.textContent = emModoVisual ? "🌐 Modo Visual" : "🖥️ Modo Terminal";
});

// Terminal de comandos
const terminalInput = document.getElementById("terminalInput");
const terminalOutput = document.getElementById("terminalOutput");

let estadoAtual = null;

terminalInput?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const entrada = terminalInput.value.trim();
    terminalOutput.innerHTML += `<div class="entrada-comando">&gt; ${entrada}</div>`;
    terminalInput.value = "";

    if (estadoAtual === "humor") {
      responderHumor(entrada);
    } else if (estadoAtual === "conversa") {
      responderConversa(entrada);
    } else {
      processarComando(entrada.toLowerCase());
    }
  }
});

function processarComando(cmd) {
  const respostas = {
   ajuda: `📜 Comandos disponíveis:
👉 doar - Registrar uma nova doação  
👉 ver-doacoes - Ver doações disponíveis  
👉 beneficios - Ver programas sociais  
👉 mais [nome] - Mais detalhes de um benefício  
👉 humor - Desabafar e receber apoio emocional  
👉 conversar - Falar com o bot solidário  
👉 respirar - Exercício guiado de respiração  
👉 meditar - Meditação breve e guiada  
👉 afirmacoes - Receber frases positivas  
👉 ajuda - Mostrar lista de comandos  
👉 sair - Encerrar o terminal`,

    doar: `📝 O que você deseja doar?<br>
[1] Comida<br>
[2] Roupas<br>
[3] Higiene<br>
[4] Outro<br><br>
Por favor, digite também o local da doação:`,

    "ver-doacoes": `📦 Doações disponíveis:<br>
- 🥫 Comida - CRAS Bairro Novo<br>
- 👚 Roupas - ONG Esperança<br>
- 🧼 Higiene - Centro Solidário`,

    beneficios: `🏛️ Programas sociais disponíveis:<br>
- Bolsa Família<br>
- Tarifa Social de Energia<br>
- Auxílio Gás<br>
Use: mais [nome] para detalhes.`,

    "mais bolsa família": `💬 O Bolsa Família é um programa de transferência de renda destinado a famílias em situação de pobreza.`,

    "mais tarifa social de energia": `🔌 A Tarifa Social concede desconto na conta de energia para famílias de baixa renda.`,

    "mais auxílio gás": `🛢️ O Auxílio Gás ajuda famílias de baixa renda a comprar o botijão de gás.`,

    humor: `😔 Como você está se sentindo? Pode desabafar.`,

    conversar: `🤖 Olá! Eu sou o bot solidário. Conte comigo para te ouvir. Como você está?`,

    apoio: `🧘‍♀️ Técnicas de apoio emocional:<br>
1️⃣ Respiração 4-7-8<br>
2️⃣ Diário de emoções<br>
3️⃣ Caminhada curta ou alongamento<br>
4️⃣ Ouvir uma música relaxante`,

    contato: `📞 Precisa de ajuda profissional?<br>
- CVV (Centro de Valorização da Vida): 188<br>
- CAPS mais próximo<br>
- CRAS da sua cidade`,

    sair: `👋 Terminal encerrado. Volte sempre!`,
    respirar: `🧘‍♀️ Vamos respirar juntos! Siga as instruções abaixo:<br>
1️⃣ Inspire pelo nariz por 4 segundos...<br>
2️⃣ Segure por 4 segundos...<br>
3️⃣ Expire pela boca por 6 segundos...<br>
4️⃣ Repita por 3 vezes. Você consegue!`,
    meditar: `🧘‍♂️ Sente-se confortavelmente, feche os olhos e foque em sua respiração.<br>
Imagine uma luz calma te envolvendo, trazendo segurança e tranquilidade.<br>
Fique assim por um minuto, sem pressa. Você merece esse momento.`,
    afirmacoes: `💬 Repita mentalmente ou em voz alta:<br>
- Eu sou capaz de enfrentar desafios.<br>
- Eu mereço paz e equilíbrio.<br>
- Estou aprendendo a me cuidar todos os dias.`
  };


  if (cmd === "humor") {
    terminalOutput.innerHTML += `<div class="resposta-terminal">${respostas["humor"]}</div>`;
    estadoAtual = "humor";
    return;
  }

  if (cmd === "conversar") {
    terminalOutput.innerHTML += `<div class="resposta-terminal">${respostas["conversar"]}</div>`;
    estadoAtual = "conversa";
    return;
  }

  if (respostas[cmd]) {
    terminalOutput.innerHTML += `<div class="resposta-terminal">${respostas[cmd]}</div>`;
  } else {
    terminalOutput.innerHTML += `<div class="resposta-terminal">❌ Comando não reconhecido: ${cmd}<br>Digite ajuda para ver os comandos.</div>`;
  }

  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function responderHumor(texto) {
  let resposta = "";

  if (texto.match(/(triste|mal|ansioso|ansiedade|depressivo|sozinho|frustrado|inseguro)/i)) {
    resposta += `🫂 Sinto muito que esteja se sentindo assim. Respire fundo, você não está sozinho.<br>`;
    resposta += `🧘 Quer tentar uma técnica de respiração ou conversar mais? Digite 'apoio' ou 'conversar'.`;
  } else if (texto.match(/(feliz|bem|alegre|animado|grato)/i)) {
    resposta += `😊 Que bom saber disso! Continue cuidando da sua saúde emocional.`;
  } else {
    resposta += `📝 Obrigado por compartilhar. Quer me contar mais?`;
  }

  terminalOutput.innerHTML += `<div class="resposta-terminal">${resposta}</div>`;
  estadoAtual = null;
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function responderConversa(texto) {
  let resposta = "";

  if (texto.match(/(triste|chateado|sozinho|decepcionado|culpado|criticável|horroroso|feio|desanimado|pessimo|pessimista|horroroso|burro|infeliz)/i)) {
    resposta = `💔 Sinto muito que você esteja se sentindo assim. Que tal me contar o que aconteceu? Às vezes, falar sobre isso pode ajudar a aliviar o peso.`;
    resposta ='😭 Às vezes a tristeza nos pega de surpresa. Posso te ouvir se quiser desabafar um pouco.';
  } else if (texto.match(/(feliz|bom|ótimo|grato|esperançoso|alegre|otimista|orgulhoso|animado|prospero|risonho|brilhante|festivo)/i)) {
    resposta = `🌞 Fico feliz em saber que você está bem! Agradecer pelos pequenos momentos é importante. O que te deixou tão contente?`;
    resposta = '🌞 Fico feliz em saber que você está bem! Agradecer pelos pequenos momentos é importante. O que te deixou tão contente?';
    resposta = '💛 Isso é maravilhoso! O que foi que te fez sentir tão grato hoje?';
  } else if (texto.match(/(ansioso|preocupado|tenso)/i)) {
    resposta = `😥 A ansiedade pode ser difícil. Vamos tentar uma respiração juntos? Inspire... expire...`;
  } else if (texto.match(/(não sei o que fazer|perdido|confuso|sem amigos|)/i)) {
    resposta = `🧭 Às vezes, sentir-se perdido é parte do caminho. Quer conversar sobre seus próximos passos?`;
  }
  else if (texto.match(/(raiva|furioso|irritado|bravo|estressado|irritante|estressante|frustrado)/i)) {
   resposta ='🔥 Entendo que a raiva pode ser difícil de lidar. Quer conversar sobre o que te irritou?';
   resposta = ' 💢 Parece que algo te deixou realmente frustrado. Eu estou aqui para ouvir, se quiser falar sobre isso.';

  } else {
    resposta = `🤖 Estou te ouvindo. Fale mais se quiser.`;
  }


  terminalOutput.innerHTML += `<div class="resposta-terminal">${resposta}</div>`;
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}
