/*
OBJETIVO:
Salvar e recuperar as transações no localStorage.

PENSAMENTO:

1) Precisamos definir uma chave fixa para armazenar os dados.
2) Quando salvar:
   - Converter array de objetos para JSON.
   - Usar localStorage.setItem().
3) Quando carregar:
   - Buscar com localStorage.getItem().
   - Se existir, converter de volta com JSON.parse().
   - Se não existir, retornar array vazio.

PERGUNTAS PARA VOCÊ:
- O que acontece se não existir nada salvo?
- Por que precisamos usar JSON.stringify?
- O que localStorage realmente armazena?

DICA:
localStorage só aceita strings.
*/


import Transaction from "../interfaces/transaction.js";

const STORAGE_KEY = "transacoes";// Chave fixa para armazenar as transações

//Guardar transações no localStorage
export function saveToStorage(transacoes: Transaction[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transacoes));
}

// Carregar transações do localStorage
export function loadFromStorage(): Transaction[] {
  const dados = localStorage.getItem(STORAGE_KEY);

  return dados ? JSON.parse(dados) : [];// Retorna array vazio se não houver dados
}



// TEMA (sessionStorage)
// Guardar o tema (light ou dark)
export function guardarTema(tema: string) {
  sessionStorage.setItem("tema", tema);
}

// Ler o tema (light ou dark)
export function lerTema(): string {
  return sessionStorage.getItem("tema") || "light";
}
