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
import Transaction from "../interfaces/transaction.js";

let transacoes: Transaction[] = []; 

// Função para obter transações atuais
export function getTransacoes() {
  return transacoes;
}

// Função para definir transações (usada ao carregar do storage)
export function setTransacoes(novas: Transaction[]) {
  transacoes = novas;
}

// Função para adicionar nova transação
export function addTransacao(transacao: Transaction): void {
  transacoes.push(transacao);
}

// Função para remover transação por ID
export function removeTransacao(id: string): void {
  transacoes = transacoes.filter(transacao => transacao.id !== id);
}