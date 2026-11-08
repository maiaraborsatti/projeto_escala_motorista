// src/types/escala.ts
export type TurnoEscala = "T1" | "T2";

// Formato que a API devolve (espelha a tabela "escala")
// ⚠️ Confirmar com o back se vem em snake_case ou camelCase
export interface EscalaApi {
  escala_id: number;
  data: string; // ⚠️ pode vir "2026-11-09" ou "2026-11-09T03:00:00.000Z"
  turno: TurnoEscala;
  motorista_chapa: string;
  veiculo_placa: string;
  rota_id: number;
  // ⚠️ estes três ainda NÃO existem na tabela: o back precisa trazê-los (JOIN),
  // senão o card mostra só chapa, placa e ID
  motorista_nome?: string;
  veiculo_modelo?: string;
  rota_nome?: string;
}

// Formato usado nas telas
export interface Escala {
  escalaId: number;
  data: string; // sempre "AAAA-MM-DD"
  turno: TurnoEscala;
  motoristaChapa: string;
  motoristaNome?: string;
  veiculoPlaca: string;
  veiculoModelo?: string;
  rotaId: number;
  rotaNome?: string;
}