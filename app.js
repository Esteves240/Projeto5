/*
OBJETIVO:
Conectar tudo.

PASSO A PASSO:

1) Capturar inputs do formulário.
2) Escutar clique do botão.
3) Validar dados.
4) Criar objeto transação.
5) Atualizar estado.
6) Re-renderizar UI.
7) Limpar formulário.

IMPORTANTE:
Sempre que adicionar uma transação:
- Atualizar lista
- Atualizar cards

Pergunta:
O que deve acontecer quando a página recarrega?
*/


import { renderTrasacoes } from "./modules/ui.js";
import { saveToStorage, loadFromStorage, guardarTema, lerTema } from "./modules/storage.js";
import { getTransacoes, setTransacoes, addTransacao, removeTransacao} from "./modules/state.js";

import { calcularResumo } from "./modules/transactions.js";
import { renderResumo, aplicarTema } from "./modules/ui.js";


// Seleção de elementos do DOM
const btnAdicionar = document.querySelector(".adiciona-historia");// Botão para adicionar transação
const descricaoInput = document.getElementById("descricao");// Input para descrição da transação
const valorInput = document.getElementById("quantidade");// Input para valor da transação
const tipoSelect = document.getElementById("tipo-transacao");// Select para tipo de transação (receita ou despesa)

const btnTema = document.querySelector(".theme");// Botão para alternar tema


function atualizarUI() {
  const transacoes = getTransacoes();

  renderTrasacoes(transacoes, handleDelete);

  const resumo = calcularResumo(transacoes);
  renderResumo(resumo);

  saveToStorage(transacoes);
}


function handleDelete(id) {
  removeTransacao(id);
  atualizarUI();
}


//Ao iniciar app -> carregar do storage
const dadosGuardados = loadFromStorage();
setTransacoes(dadosGuardados);
//renderTrasacoes(getTransacoes());
atualizarUI()

let temaAtual = lerTema();

// aplicar tema guardado
aplicarTema(temaAtual);



btnAdicionar.addEventListener("click", () => {
  
  const descricao = descricaoInput.value.trim();
  const valor = Number(valorInput.value);
  const tipo = tipoSelect.value;

  if (!descricao || !valor) {
    alert("Preencha todos os campos!");
    return;
  }

  if (valor <= 0) {
    alert("Valor deve ser positivo!");
    return;
  }

  const novaTransacao = {
    id: Date.now(),
    transacao: descricao,
    categoria: tipo === "receita" ? "Receita" : "Despesa",
    data: new Date().toLocaleDateString(),
    valor: valor
  };

  addTransacao(novaTransacao);
  atualizarUI();


  // limpar campos do form depois de adicionar
  descricaoInput.value = "";
  valorInput.value = "";
});



// Alternar tema
btnTema.addEventListener("click", () => {
  temaAtual = temaAtual === "light" ? "dark" : "light";
  guardarTema(temaAtual);
  aplicarTema(temaAtual);
});
