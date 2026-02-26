import Transaction from "../interfaces/transaction.js";
interface Resumo {
    totalReceitas: number;
    totalDespesas: number;
    saldo: number;
}
export declare function renderTrasacoes(transacoes: Transaction[], onDelete: (id: string) => void): void;
export declare function renderResumo(resumo: Resumo): void;
export declare function aplicarTema(tema: "light" | "dark"): void;
export {};
//# sourceMappingURL=ui.d.ts.map