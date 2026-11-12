// src/services/motoristasService.ts
import type { Motorista, MotoristaApi } from "../types/motorista";

/* ============================================================================
   ⚠️⚠️⚠️  PLACEHOLDER  —  DADOS FALSOS, SÓ PARA TESTAR O VISUAL  ⚠️⚠️⚠️

   Quando a API estiver pronta, troque apenas as duas linhas marcadas com
   "COM A API" mais abaixo e APAGUE este bloco (RESPOSTA_PLACEHOLDER).
   ============================================================================ */
const RESPOSTA_PLACEHOLDER: MotoristaApi[] = [
  { chapa: "12345", nome: "João Souza",     foto_url: null, cnh_numero: "00000000001", cnh_classe: "D", cnh_validade: "2027-10-20", pode_dirigir: "Ambos",      status_disponibilidade: "Disponivel" },
  { chapa: "34567", nome: "Pedro Silva",    foto_url: null, cnh_numero: "00000000002", cnh_classe: "D", cnh_validade: "2025-10-20", pode_dirigir: "Manual",     status_disponibilidade: "Indisponivel" },
  { chapa: "67890", nome: "Sandra Dias",    foto_url: null, cnh_numero: "00000000003", cnh_classe: "D", cnh_validade: "2027-10-20", pode_dirigir: "Automatico", status_disponibilidade: "Disponivel" },
  { chapa: "45678", nome: "Mariana Lopes",  foto_url: null, cnh_numero: "00000000004", cnh_classe: "E", cnh_validade: "2028-03-15", pode_dirigir: "Ambos",      status_disponibilidade: "Disponivel" },
  { chapa: "56789", nome: "Carlos Almeida", foto_url: null, cnh_numero: "00000000005", cnh_classe: "D", cnh_validade: "2026-12-01", pode_dirigir: "Manual",     status_disponibilidade: "Indisponivel" },
  { chapa: "78901", nome: "Fernanda Rocha", foto_url: null, cnh_numero: "00000000006", cnh_classe: "C", cnh_validade: "2029-06-30", pode_dirigir: "Ambos",      status_disponibilidade: "Disponivel" },
  { chapa: "89012", nome: "Ricardo Nunes",  foto_url: null, cnh_numero: "00000000007", cnh_classe: "D", cnh_validade: "2027-08-10", pode_dirigir: "Automatico", status_disponibilidade: "Disponivel" },
  { chapa: "90123", nome: "Patrícia Gomes", foto_url: null, cnh_numero: "00000000008", cnh_classe: "E", cnh_validade: "2028-11-25", pode_dirigir: "Ambos",      status_disponibilidade: "Indisponivel" },
];
/* ===================== FIM DO PLACEHOLDER ===================== */

const ATRASO_MS = 600;      // simula a demora da rede (placeholder)
const SIMULAR_ERRO = false; // mude para true para testar a mensagem de erro (placeholder)

const esperar = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Converte o formato da API para o formato das telas
function mapearMotorista(dto: MotoristaApi): Motorista {
  return {
    chapa: dto.chapa,
    nome: dto.nome,
    fotoUrl: dto.foto_url,
    cnhNumero: dto.cnh_numero,
    cnhClasse: dto.cnh_classe ?? "",
    cnhValidade: dto.cnh_validade,
    podeDirigir: dto.pode_dirigir,
    statusDisponibilidade: dto.status_disponibilidade,
  };
}

export async function listarMotoristas(): Promise<Motorista[]> {
  await esperar(ATRASO_MS);
  if (SIMULAR_ERRO) throw new Error("Não foi possível carregar os motoristas.");
  return RESPOSTA_PLACEHOLDER.map(mapearMotorista);
  // COM A API: const dados = await api.get<MotoristaApi[]>("/motoristas");
  //            return dados.map(mapearMotorista);
}

export async function excluirMotorista(chapa: string): Promise<void> {
  await esperar(ATRASO_MS);
  // COM A API: await api.delete(`/motoristas/${chapa}`); (⚠️ conferir os métodos do services/api)
  void chapa;
}