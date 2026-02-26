/*
OBJETIVO:
Calcular saldo total, total de receitas e total de despesas.

PENSAMENTO:

1) O saldo começa em 0.
2) Para cada transação:
   - Se for receita, soma.
   - Se for despesa, subtrai.
3) Para calcular totais separados:
   - Filtrar por tipo.
   - Somar valores.

DICA IMPORTANTE:
Use reduce().

Pergunta:
- O que é o acumulador?
- Qual deve ser o valor inicial?

Exemplo mental:
[100, -50, 200]
Resultado esperado: 250

Não escreva loops tradicionais.
*/

import Transaction from "../interfaces/transaction.js";


export function calcularResumo(transacoes: Transaction[]) {

  const totalReceitas: number = transacoes
    .filter(transacao => transacao.categoria === "Receita")
    .reduce((acumulador, transacao) => acumulador + transacao.valor, 0);

  const totalDespesas: number = transacoes
    .filter(transacao => transacao.categoria === "Despesa")
    .reduce((acumulador, transacao) => acumulador + transacao.valor, 0);

  const saldo: number = totalReceitas - totalDespesas;

  return {
    totalReceitas,
    totalDespesas,
    saldo
  };
}

