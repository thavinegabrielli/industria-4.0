let contadorEmergencia = 0;
let painelBloqueado = false;

function validarAcesso() {
  if (painelBloqueado) return; // Bloqueia se emergência ativada

  const nome = document.getElementById("operador").value;
  const msg = document.getElementById("msgAcesso");
  const painel = document.getElementById("painel");

  if (nome === "") {
    msg.textContent = "Erro: Nome obrigatório!";
    msg.style.color = "red";
    painel.style.display = "none";
  } else {
    msg.textContent = "Acesso liberado. Bem-vindo, " + nome + "!";
    msg.style.color = "green";
    painel.style.display = "block";
    gerarListaMaquinas();
  }
}

function gerarListaMaquinas() {
  if (painelBloqueado) return;

  const lista = document.getElementById("listaMaquinas");
  lista.innerHTML = "";
  const maquinas = ["Prensa 1", "Torno 2", "CNC 3", "Esteira 4", "Robô 5"];

  for (let i = 0; i < maquinas.length; i++) {
    const option = document.createElement("option");
    option.value = maquinas[i];
    option.textContent = maquinas[i];
    lista.appendChild(option);
  }
}

function verificarStatus(maquina) {
  if (painelBloqueado) return;

  const status = document.getElementById("statusMaquina");
  switch (maquina) {
    case "Prensa 1":
      status.textContent = "Em operação";
      break;
    case "Torno 2":
      status.textContent = "Manutenção necessária";
      break;
    case "CNC 3":
      status.textContent = "Desligada";
      break;
    case "Esteira 4":
      status.textContent = "Operando em baixa velocidade";
      break;
    case "Robô 5":
      status.textContent = "Em calibração";
      break;
    default:
      status.textContent = "Selecione uma máquina.";
  }
}

function monitorarSensor() {
  if (painelBloqueado) return;

  const sensor = document.getElementById("sensor");
  const temp = Math.floor(Math.random() * 120); // valor aleatório até 120°C

  if (temp < 50) {
    sensor.textContent = temp + "°C - Normal";
    sensor.className = "normal";
    contadorEmergencia = 0; // reset
  } else if (temp >= 50 && temp < 80) {
    sensor.textContent = temp + "°C - Alerta";
    sensor.className = "alerta";
    contadorEmergencia = 0; // reset
  } else {
    sensor.textContent = temp + "°C - PERIGO - SUPERAQUECIMENTO";
    sensor.className = "perigo";

    // Se acima de 95°C, incrementa contador
    if (temp > 95) {
      contadorEmergencia++;
      if (contadorEmergencia >= 3) { // 3 ciclos de 2s ≈ 6 segundos
        ativarEmergencia();
      }
    } else {
      contadorEmergencia = 0;
    }
  }
}

function ativarEmergencia() {
  painelBloqueado = true;
  alert("PARADA DE EMERGÊNCIA ATIVADA!");
  document.getElementById("painel").style.display = "none";
}

// Atualiza o sensor a cada 2 segundos
setInterval(monitorarSensor, 2000);