

function mostrarjogos() {
  const lista = document.getElementById("lista-jogos");
  lista.style.display = (lista.style.display === "none") ? "block" : "none";
}
function mostrarapostas(id) {
  const selecionada = document.getElementById(id);
  if (selecionada.style.display === "block") {
    selecionada.style.display = "none";
  } else {
    const todas = document.querySelectorAll('[id^="apostas"]');
    todas.forEach(div => {
      div.style.display = "none";
    });
    selecionada.style.display = "block";
  }
}
let totalAcumulado = 0;
let cotacaoAtual = null;
let valorAnterior = null;
let botaoAtual = null;
function contar(event) {

  const botaoClicado = event.target;
  const textoBotao = botaoClicado.innerText.trim();
  const partes = textoBotao.split(" ");
  const cotacao = parseFloat(partes[1]);
  const valorInput = document.getElementById("valor");
  const resultado = document.getElementById("resultado");
  const valor = parseFloat(valorInput.value);


  if (isNaN(valor) || valor <= 0) {
    resultado.innerText = "Digite o valor da aposta.";
    return;
  }

  if (botaoAtual === botaoClicado) {
    const ganhoAnterior = valorAnterior * cotacaoAtual;
    totalAcumulado -= ganhoAnterior;
    botaoAtual = null;
    cotacaoAtual = null;
    valorAnterior = null;
    resultado.innerText = `Total acumulado: R$ ${totalAcumulado.toFixed(2)}`;


    if (totalAcumulado <= 0) {
      resultado.innerText = "Total acumulado: R$ 0,00";
    }
    return;
  }
  const ganhoNovo = valor * cotacao;
  totalAcumulado += ganhoNovo;
  cotacaoAtual = cotacao
  valorAnterior = valor;
  botaoAtual = botaoClicado;
  resultado.innerText = `Total acumulado: R$ ${totalAcumulado.toFixed(2)}`;
}
document.getElementById("valor").addEventListener("input", function () {
  const valor = parseFloat(this.value);
  const resultado = document.getElementById("resultado");



  if (cotacaoAtual !== null && (isNaN(valor) || valor <= 0)) {
    if (valorAnterior !== null) {
      const ganhoAnterior = valorAnterior * cotacaoAtual;
      totalAcumulado -= ganhoAnterior;
    }

    valorAnterior = null;
    cotacaoAtual = null;
    botaoAtual = null;

    resultado.innerText = "Total acumulado: 0,00";
    return;
  }
  if (cotacaoAtual !== null && !isNaN(valor) && valor > 0) {
    if (valorAnterior !== null) {
      const ganhoAnterior = valorAnterior * cotacaoAtual;
      totalAcumulado -= ganhoAnterior;
    }

    const ganhoNovo = valor * cotacaoAtual;
    totalAcumulado += ganhoNovo;
    valorAnterior = valor;

    resultado.innerText = `Total acumulado: R$ ${totalAcumulado.toFixed(2)}`;
  }

});



function calcularganho() {
  const valor = parseFloat(document.getElementById("valor").value);
  const cotacao = parseFloat(document.getElementById("cotacao").value);
  const resultado = document.getElementById("resultado");


  if (isNaN(valor) || isNaN(cotacao)) {
    resultado.innerText = "";
    return;
  }

  const ganho = valor * cotacao;
  document.getElementById("resultado").innerText = `Você pode ganhar R$ ${ganho.toFixed(2)}.`;
} 