// src/types/motorista.ts
export interface Motorista {
  id: string;
  nome: string;
  cnh: string;         // categoria, ex.: "D"
  validadeCnh: string; // formato "AAAA-MM-DD", ex.: "2027-10-20"
  turno: string;       // ex.: "T1"
  disponivel: boolean;
}