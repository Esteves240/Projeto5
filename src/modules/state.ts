/*
OBJETIVO:
Centralizar o controle das transações em memória.

PENSAMENTO:

1) Carregar as transações salvas quando o sistema iniciar.
2) Criar função para:
   - Retornar lista atual.
   - Adicionar nova transação.
   - (Opcional) remover transação.
3) Sempre que alterar o estado:
   - Atualizar o localStorage.

REFLEXÃO:
- Por que não manipular o localStorage diretamente no UI?
- O que significa separar responsabilidade?

DESAFIO:
Como garantir que o array nunca fique fora de sincronia?
*/


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