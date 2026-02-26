let transacoes = [];
// Função para obter transações atuais
export function getTransacoes() {
    return transacoes;
}
// Função para definir transações (usada ao carregar do storage)
export function setTransacoes(novas) {
    transacoes = novas;
}
// Função para adicionar nova transação
export function addTransacao(transacao) {
    transacoes.push(transacao);
}
// Função para remover transação por ID
export function removeTransacao(id) {
    transacoes = transacoes.filter(transacao => transacao.id !== id);
}
//# sourceMappingURL=state.js.map