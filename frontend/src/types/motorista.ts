// src/types/motorista.ts

// Formato que a API devolve (espelha a tabela "motorista")
// ⚠️ Confirmar com o back se vem em snake_case ou camelCase
export interface MotoristaApi {
  chapa: string;
  nome: string;
  foto_url: string | null;
  cnh_numero: string;
  cnh_classe: string | null;
  cnh_validade: string; // "AAAA-MM-DD"
  pode_dirigir: "Manual" | "Automatico" | "Ambos";
  status_disponibilidade: string;
}

// Formato usado nas telas
export interface Motorista {
  chapa: string;
  nome: string;
  fotoUrl: string | null;
  cnhNumero: string;
  cnhClasse: string;
  cnhValidade: string;
  podeDirigir: "Manual" | "Automatico" | "Ambos";
  statusDisponibilidade: string;
  turno?: string; // ⚠️ não existe na tabela, a confirmar
}

// Valor do status que significa "disponível" (⚠️ confirmar com o back)
export const STATUS_DISPONIVEL = "Disponivel";