// src/services/escalasService.ts
import type { Escala, EscalaApi } from "../types/escala";

/* ============================================================================
   ⚠️⚠️⚠️  PLACEHOLDER  —  DADOS FALSOS, SÓ PARA TESTAR O VISUAL  ⚠️⚠️⚠️

   Estas escalas NÃO existem de verdade, e os nomes (motorista_nome,
   veiculo_modelo, rota_nome) simulam uma API que já faz o JOIN.
   Quando a API estiver pronta, troque apenas as linhas marcadas com
   "COM A API" e APAGUE este bloco.
   ============================================================================ */
const RESPOSTA_PLACEHOLDER: EscalaApi[] = [
  { escala_id: 1,  data: "2026-11-09", turno: "T1", motorista_chapa: "12345", motorista_nome: "João Souza",    veiculo_placa: "ABC1D23", veiculo_modelo: "Focus",   rota_id: 1, rota_nome: "Da rua 1 a rua 55" },
  { escala_id: 2,  data: "2026-11-09", turno: "T1", motorista_chapa: "89012", motorista_nome: "Ricardo Nunes", veiculo_placa: "DEF4G56", veiculo_modelo: "T-Cross", rota_id: 2, rota_nome: "Da rua 10 a rua 80" },
  { escala_id: 3,  data: "2026-11-09", turno: "T2", motorista_chapa: "67890", motorista_nome: "Sandra Dias",   veiculo_placa: "HIJ7K89", veiculo_modelo: "Octavia", rota_id: 4, rota_nome: "Da rua 20 a rua 33" },
  { escala_id: 4,  data: "2026-11-10", turno: "T1", motorista_chapa: "45678", motorista_nome: "Mariana Lopes", veiculo_placa: "LMN0P12", veiculo_modelo: "Argo",    rota_id: 5, rota_nome: "Da rua 2 a rua 90" },
  { escala_id: 5,  data: "2026-11-10", turno: "T2", motorista_chapa: "12345", motorista_nome: "João Souza",    veiculo_placa: "ABC1D23", veiculo_modelo: "Focus",   rota_id: 7, rota_nome: "Da rua 8 a rua 40" },
  { escala_id: 6,  data: "2026-11-10", turno: "T2", motorista_chapa: "78901", motorista_nome: "Fernanda Rocha", veiculo_placa: "QRS3T45", veiculo_modelo: "Onix",   rota_id: 8, rota_nome: "Da rua 30 a rua 200" },
  { escala_id: 7,  data: "2026-11-11", turno: "T1", motorista_chapa: "67890", motorista_nome: "Sandra Dias",   veiculo_placa: "HIJ7K89", veiculo_modelo: "Octavia", rota_id: 1, rota_nome: "Da rua 1 a rua 55" },
  { escala_id: 8,  data: "2026-11-11", turno: "T1", motorista_chapa: "89012", motorista_nome: "Ricardo Nunes", veiculo_placa: "UVW6X78", veiculo_modelo: "Corolla", rota_id: 2, rota_nome: "Da rua 10 a rua 80" },
  { escala_id: 9,  data: "2026-11-12", turno: "T2", motorista_chapa: "45678", motorista_nome: "Mariana Lopes", veiculo_placa: "LMN0P12", veiculo_modelo: "Argo",    rota_id: 4, rota_nome: "Da rua 20 a rua 33" },
  { escala_id: 10, data: "2026-11-12", turno: "T2", motorista_chapa: "78901", motorista_nome: "Fernanda Rocha", veiculo_placa: "QRS3T45", veiculo_modelo: "Onix",   rota_id: 5, rota_nome: "Da rua 2 a rua 90" },
];
/* ===================== FIM DO PLACEHOLDER ===================== */

const ATRASO_MS = 600;      // simula a demora da rede (placeholder)
const SIMULAR_ERRO = false; // mude para true para testar a mensagem de erro (placeholder)

const esperar = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Converte o formato da API para o formato das telas
function mapearEscala(dto: EscalaApi): Escala {
  return {
    escalaId: dto.escala_id,
    data: dto.data.slice(0, 10), // aceita "2026-11-09" e "2026-11-09T03:00:00.000Z"
    turno: dto.turno,
    motoristaChapa: dto.motorista_chapa,
    motoristaNome: dto.motorista_nome,
    veiculoPlaca: dto.veiculo_placa,
    veiculoModelo: dto.veiculo_modelo,
    rotaId: dto.rota_id,
    rotaNome: dto.rota_nome,
  };
}

export async function listarEscalas(): Promise<Escala[]> {
  await esperar(ATRASO_MS);
  if (SIMULAR_ERRO) throw new Error("Não foi possível carregar as escalas.");
  return RESPOSTA_PLACEHOLDER.map(mapearEscala);
  // COM A API: const dados = await api.get<EscalaApi[]>("/escalas");
  //            return dados.map(mapearEscala);
}

export async function excluirEscala(escalaId: number): Promise<void> {
  await esperar(ATRASO_MS);
  // COM A API: await api.delete(`/escalas/${escalaId}`); (⚠️ o api.ts atual só tem get)
  void escalaId;
}