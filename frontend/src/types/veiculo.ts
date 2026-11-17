// src/types/veiculo.ts
export type TipoRotaExigido = "City" | "Dritell" | "Highway";

// Formato que a API devolve (espelha a tabela "veiculo")
// ⚠️ Confirmar com o back se vem em snake_case ou camelCase
export interface VeiculoApi {
  placa: string;
  vin: string;
  marca: string | null;
  modelo: string | null;
  tipo_rota_exigido: TipoRotaExigido;
  projeto_id: number;
  projeto_nome?: string; // ⚠️ ainda não existe: o back vai criar depois
}

// Formato usado nas telas
export interface Veiculo {
  placa: string;
  vin: string;
  marca: string;
  modelo: string;
  tipoRotaExigido: TipoRotaExigido;
  projetoId: number;
  projetoNome?: string;
}