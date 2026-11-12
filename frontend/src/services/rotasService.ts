// src/services/rotasService.ts
import type { Rota, RotaApi } from "../types/rota";

/* ============================================================================
   ⚠️⚠️⚠️  PLACEHOLDER  —  DADOS FALSOS, SÓ PARA TESTAR O VISUAL  ⚠️⚠️⚠️

   Estas rotas NÃO existem de verdade. Quando a API estiver pronta, troque
   apenas as linhas marcadas com "COM A API" e APAGUE este bloco.
   ============================================================================ */
const RESPOSTA_PLACEHOLDER: RotaApi[] = [
  { rota_id: 1, nome: "Da rua 1 a rua 55",    tipo: "City",    distancia_km: "12.50",  status: "Ativo" },
  { rota_id: 2, nome: "Da rua 10 a rua 80",   tipo: "Highway", distancia_km: "48.30",  status: "Ativo" },
  { rota_id: 3, nome: "Da rua 5 a rua 120",   tipo: "Dritell", distancia_km: "120.00", status: "Inativo" },
  { rota_id: 4, nome: "Da rua 20 a rua 33",   tipo: "City",    distancia_km: "7.80",   status: "Ativo" },
  { rota_id: 5, nome: "Da rua 2 a rua 90",    tipo: "Highway", distancia_km: "33.25",  status: "Ativo" },
  { rota_id: 6, nome: "Da rua 15 a rua 150",  tipo: "Dritell", distancia_km: "86.40",  status: "Inativo" },
  { rota_id: 7, nome: "Da rua 8 a rua 40",    tipo: "City",    distancia_km: "15.00",  status: "Ativo" },
  { rota_id: 8, nome: "Da rua 30 a rua 200",  tipo: "Highway", distancia_km: "64.90",  status: "Ativo" },
];
/* ===================== FIM DO PLACEHOLDER ===================== */

const ATRASO_MS = 600;      // simula a demora da rede (placeholder)
const SIMULAR_ERRO = false; // mude para true para testar a mensagem de erro (placeholder)

const esperar = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Converte o formato da API para o formato das telas
function mapearRota(dto: RotaApi): Rota {
  return {
    rotaId: dto.rota_id,
    nome: dto.nome,
    tipo: dto.tipo,
    distanciaKm: Number(dto.distancia_km), // aceita número ou texto
    status: dto.status,
  };
}

export async function listarRotas(): Promise<Rota[]> {
  await esperar(ATRASO_MS);
  if (SIMULAR_ERRO) throw new Error("Não foi possível carregar as rotas.");
  return RESPOSTA_PLACEHOLDER.map(mapearRota);
  // COM A API: const dados = await api.get<RotaApi[]>("/rotas");
  //            return dados.map(mapearRota);
}

export async function excluirRota(rotaId: number): Promise<void> {
  await esperar(ATRASO_MS);
  // COM A API: await api.delete(`/rotas/${rotaId}`); (⚠️ o api.ts atual só tem get)
  void rotaId;
}