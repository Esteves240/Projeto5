/*
OBJETIVO:
Atualizar a interface sempre que o estado mudar.

PENSAMENTO:

1) Selecionar o container da lista.
2) Limpar o conteúdo antes de renderizar novamente.
3) Para cada transação:
   - Criar elemento HTML dinamicamente.
   - Inserir no DOM.
4) Atualizar os cards com os valores calculados.

REFLEXÃO:
- Por que limpar antes de renderizar?
- O que acontece se não limpar?

DESAFIO:
Como aplicar classes diferentes para receita e despesa?
*/
import Transaction from "../interfaces/transaction.js";
const lista = document.querySelector(".lista-transacoes");// Lista onde as trasações serão renderizados

export function renderTrasacoes(transacoes: Transaction[], onDelete) { 
  if(!lista){
    return
  }
lista.innerHTML = ""; // Limpar lista antes de renderizar

// Criar <li> para cada transação
  transacoes.forEach(transacao => {
    const li = document.createElement("li");
    li.classList.add("item-transacao");
    
       li.innerHTML = `
      <div class="nome-transacao">${transacao.transacao}</div>
      <div class="etiqueta ${transacao.categoria === "Despesa" ? "etiqueta-despesa" : "etiqueta-receita"}">
        ${transacao.categoria}
      </div>
      <div class="data-transacao">${transacao.data}</div>
      <div class="valor-transacao ${transacao.categoria === "Despesa" ? "negativo" : "positivo"}">
        ${transacao.valor.toFixed(2)}€
      </div>

      <button class="btn-delete">🗑️</button>
    `;

   li.querySelector(".btn-delete")
      .addEventListener("click", () => onDelete(transacao.id));

    lista.appendChild(li);
  });
}


const cardReceitas = document.querySelector(".valor-receita");
const cardDespesas = document.querySelector(".valor-despesa");
const cardSaldo = document.querySelector(".valor-saldo");
const main = document.querySelector(".main");


export function renderResumo(resumo: number) {
  cardReceitas.textContent = `${resumo.totalReceitas.toFixed(2)}€`;
  cardDespesas.textContent = `${resumo.totalDespesas.toFixed(2)}€`;
  cardSaldo.textContent = `${resumo.saldo.toFixed(2)}€`;


  cardSaldo.classList.remove("neutro", "positivo", "negativo");

   if(resumo.saldo === 0) {
    cardSaldo.classList.add('neutro');
   }else if(resumo.saldo >= 0){
    cardSaldo.classList.add('positivo');
  } else {
    cardSaldo.classList.add('negativo');
  }
}



export function aplicarTema(tema) {
  main.classList.toggle("dark", tema === "dark");
}