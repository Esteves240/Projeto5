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
import { renderTrasacoes, renderResumo, aplicarTema } from "./modules/ui.js";
import { saveToStorage, loadFromStorage, guardarTema, lerTema, } from "./modules/storage.js";
import { getTransacoes, setTransacoes, addTransacao, removeTransacao, } from "./modules/state.js";
import { calcularResumo } from "./modules/transactions.js";
const btnAdicionar = document.querySelector(".adiciona-historia");
const descricaoInput = document.getElementById("descricao");
const valorInput = document.getElementById("quantidade");
const tipoSelect = document.getElementById("tipo-transacao");
const btnTema = document.querySelector(".theme");
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
// Carregar dados do storage
const dadosGuardados = loadFromStorage();
setTransacoes(dadosGuardados);
atualizarUI();
let temaAtual = lerTema();
aplicarTema(temaAtual);
btnAdicionar?.addEventListener("click", () => {
    if (!descricaoInput || !valorInput || !tipoSelect)
        return;
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
        id: Date.now().toString(),
        descricao,
        categoria: tipo === "receita" ? "Receita" : "Despesa",
        data: new Date().toLocaleDateString(),
        valor,
    };
    addTransacao(novaTransacao);
    atualizarUI();
    descricaoInput.value = "";
    valorInput.value = "";
});
btnTema?.addEventListener("click", () => {
    temaAtual = temaAtual === "light" ? "dark" : "light";
    guardarTema(temaAtual);
    aplicarTema(temaAtual);
});
//# sourceMappingURL=app.js.map