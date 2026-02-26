export default interface Transaction{
  id : string;
  descricao : string;
  valor : number;
  categoria : string; // "Receita" ou "Despesa"
  data:string;
}
