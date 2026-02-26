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

interface Resumo {
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

const lista = document.querySelector(".lista-transacoes") as HTMLElement | null;

const cardReceitas = document.querySelector(".valor-receita") as HTMLElement | null;
const cardDespesas = document.querySelector(".valor-despesa") as HTMLElement | null;
const cardSaldo = document.querySelector(".valor-saldo") as HTMLElement | null;
const main = document.querySelector(".main") as HTMLElement | null;

export function renderTrasacoes(
  transacoes: Transaction[],
  onDelete: (id: string) => void
): void {
  if (!lista) return;

  lista.innerHTML = "";

  transacoes.forEach((transacao) => {
    const li = document.createElement("li");
    li.classList.add("item-transacao");

    li.innerHTML = `
      <div class="nome-transacao">${transacao.descricao}</div>
      <div class="etiqueta ${transacao.categoria === "Despesa"? "etiqueta-despesa": "etiqueta-receita"}">
        ${transacao.categoria}
      </div>
      <div class="data-transacao">${transacao.data}</div>
      <div class="valor-transacao ${transacao.categoria === "Despesa" ? "negativo" : "positivo"}">
        ${transacao.valor.toFixed(2)}€
      </div>
      <button class="btn-delete">🗑️</button>
    `;

    li.querySelector(".btn-delete")?.addEventListener("click", () =>
      onDelete(transacao.id)
    );

    lista.appendChild(li);
  });
}

export function renderResumo(resumo: Resumo): void {
  if (!cardReceitas || !cardDespesas || !cardSaldo) return;

  cardReceitas.textContent = `${resumo.totalReceitas.toFixed(2)}€`;
  cardDespesas.textContent = `${resumo.totalDespesas.toFixed(2)}€`;
  cardSaldo.textContent = `${resumo.saldo.toFixed(2)}€`;

  cardSaldo.classList.remove("neutro", "positivo", "negativo");

  if (resumo.saldo === 0) {
    cardSaldo.classList.add("neutro");
  } else if (resumo.saldo >= 0) {
    cardSaldo.classList.add("positivo");
  } else {
    cardSaldo.classList.add("negativo");
  }
}

export function aplicarTema(tema: "light" | "dark"): void {
  if (!main) return;
  main.classList.toggle("dark", tema === "dark");
}