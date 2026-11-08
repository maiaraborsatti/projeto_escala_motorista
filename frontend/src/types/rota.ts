// src/types/rota.ts
export type TipoRota = "City" | "Dritell" | "Highway";
export type StatusRota = "Ativo" | "Inativo";

// Formato que a API devolve (espelha a tabela "rota")
// ⚠️ Confirmar com o back se vem em snake_case ou camelCase
export interface RotaApi {
  rota_id: number;
  nome: string;
  tipo: TipoRota;
  // ⚠️ colunas DECIMAL costumam chegar como TEXTO ("12.50") em Node + MySQL
  distancia_km: number | string;
  status: StatusRota;
}

// Formato usado nas telas
export interface Rota {
  rotaId: number;
  nome: string;
  tipo: TipoRota;
  distanciaKm: number;
  status: StatusRota;
}