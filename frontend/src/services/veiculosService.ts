// src/services/veiculosService.ts
import type { Veiculo, VeiculoApi } from "../types/veiculo";

/* ============================================================================
   ⚠️⚠️⚠️  PLACEHOLDER  —  DADOS FALSOS, SÓ PARA TESTAR O VISUAL  ⚠️⚠️⚠️

   Estes veículos NÃO existem de verdade. Quando a API estiver pronta, troque
   apenas as linhas marcadas com "COM A API" e APAGUE este bloco.
   ============================================================================ */
const RESPOSTA_PLACEHOLDER: VeiculoApi[] = [
  { placa: "ABC1D23", vin: "TESTE000000000001", marca: "Ford",       modelo: "Focus",    tipo_rota_exigido: "City",    projeto_id: 1 },
  { placa: "DEF4G56", vin: "TESTE000000000002", marca: "Volkswagen", modelo: "T-Cross",  tipo_rota_exigido: "Highway", projeto_id: 2 },
  { placa: "HIJ7K89", vin: "TESTE000000000003", marca: "Skoda",      modelo: "Octavia",  tipo_rota_exigido: "Dritell", projeto_id: 2 },
  { placa: "LMN0P12", vin: "TESTE000000000004", marca: "Fiat",       modelo: "Argo",     tipo_rota_exigido: "City",    projeto_id: 1 },
  { placa: "QRS3T45", vin: "TESTE000000000005", marca: "Chevrolet",  modelo: "Onix",     tipo_rota_exigido: "City",    projeto_id: 3 },
  { placa: "UVW6X78", vin: "TESTE000000000006", marca: "Toyota",     modelo: "Corolla",  tipo_rota_exigido: "Highway", projeto_id: 3 },
  { placa: "YZA9B01", vin: "TESTE000000000007", marca: "Honda",      modelo: "Civic",    tipo_rota_exigido: "Dritell", projeto_id: 1 },
  { placa: "CDE2F34", vin: "TESTE000000000008", marca: "Renault",    modelo: "Kwid",     tipo_rota_exigido: "City",    projeto_id: 2 },
];
/* ===================== FIM DO PLACEHOLDER ===================== */

const ATRASO_MS = 600;      // simula a demora da rede (placeholder)
const SIMULAR_ERRO = false; // mude para true para testar a mensagem de erro (placeholder)

const esperar = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Converte o formato da API para o formato das telas
function mapearVeiculo(dto: VeiculoApi): Veiculo {
  return {
    placa: dto.placa,
    vin: dto.vin,
    marca: dto.marca ?? "",
    modelo: dto.modelo ?? "",
    tipoRotaExigido: dto.tipo_rota_exigido,
    projetoId: dto.projeto_id,
    projetoNome: dto.projeto_nome,
  };
}

export async function listarVeiculos(): Promise<Veiculo[]> {
  await esperar(ATRASO_MS);
  if (SIMULAR_ERRO) throw new Error("Não foi possível carregar os veículos.");
  return RESPOSTA_PLACEHOLDER.map(mapearVeiculo);
  // COM A API: const dados = await api.get<VeiculoApi[]>("/veiculos");
  //            return dados.map(mapearVeiculo);
}

export async function excluirVeiculo(placa: string): Promise<void> {
  await esperar(ATRASO_MS);
  // COM A API: await api.delete(`/veiculos/${placa}`); (⚠️ o api.ts atual só tem get)
  void placa;
}