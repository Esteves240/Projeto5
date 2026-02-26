const lista = document.querySelector(".lista-transacoes");
const cardReceitas = document.querySelector(".valor-receita");
const cardDespesas = document.querySelector(".valor-despesa");
const cardSaldo = document.querySelector(".valor-saldo");
const main = document.querySelector(".main");
export function renderTrasacoes(transacoes, onDelete) {
    if (!lista)
        return;
    lista.innerHTML = "";
    transacoes.forEach((transacao) => {
        const li = document.createElement("li");
        li.classList.add("item-transacao");
        li.innerHTML = `
      <div class="nome-transacao">${transacao.descricao}</div>
      <div class="etiqueta ${transacao.categoria === "Despesa" ? "etiqueta-despesa" : "etiqueta-receita"}">
        ${transacao.categoria}
      </div>
      <div class="data-transacao">${transacao.data}</div>
      <div class="valor-transacao ${transacao.categoria === "Despesa" ? "negativo" : "positivo"}">
        ${transacao.valor.toFixed(2)}€
      </div>
      <button class="btn-delete">🗑️</button>
    `;
        li.querySelector(".btn-delete")?.addEventListener("click", () => onDelete(transacao.id));
        lista.appendChild(li);
    });
}
export function renderResumo(resumo) {
    if (!cardReceitas || !cardDespesas || !cardSaldo)
        return;
    cardReceitas.textContent = `${resumo.totalReceitas.toFixed(2)}€`;
    cardDespesas.textContent = `${resumo.totalDespesas.toFixed(2)}€`;
    cardSaldo.textContent = `${resumo.saldo.toFixed(2)}€`;
    cardSaldo.classList.remove("neutro", "positivo", "negativo");
    if (resumo.saldo === 0) {
        cardSaldo.classList.add("neutro");
    }
    else if (resumo.saldo >= 0) {
        cardSaldo.classList.add("positivo");
    }
    else {
        cardSaldo.classList.add("negativo");
    }
}
export function aplicarTema(tema) {
    if (!main)
        return;
    main.classList.toggle("dark", tema === "dark");
    document.body.classList.toggle("dark", tema === "dark");
}
//# sourceMappingURL=ui.js.map