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
import { saveToStorage, loadFromStorage } from "./modules/storage.js";
import { getTransacoes, setTransacoes, addTransacao } from "./modules/state.js";

// Seleção de elementos do DOM
const btnAdicionar = document.querySelector(".adiciona-historia");// Botão para adicionar transação
const descricaoInput = document.getElementById("descricao");// Input para descrição da transação
const valorInput = document.getElementById("quantidade");// Input para valor da transação
const tipoSelect = document.getElementById("tipo-transacao");// Select para tipo de transação (receita ou despesa)


//Ao iniciar app -> carregar do storage
const dadosGuardados = loadFromStorage();
setTransacoes(dadosGuardados);
renderTrasacoes(getTransacoes());


btnAdicionar.addEventListener("click", () => {
  
  const descricao = descricaoInput.value.trim();
  const valor = Number(valorInput.value);
  const tipo = tipoSelect.value;

  if (!descricao || !valor) {
    alert("Preenche todos os campos!");
    return;
  }

  const novaTransacao = {
    transacao: descricao,
    categoria: tipo === "receita" ? "Receita" : "Despesa",
    data: new Date().toLocaleDateString(),
    valor: valor
  };

  addTransacao(novaTransacao);

  renderTrasacoes(getTransacoes());
  saveToStorage(getTransacoes()); //guardar sempre após alteração

  // limpar campos do form depois de adicionar
  descricaoInput.value = "";
  valorInput.value = "";
});