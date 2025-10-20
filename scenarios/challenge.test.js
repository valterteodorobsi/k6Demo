import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { config } from '../config.js';
import { authenticateAdmin, getAuthHeaders } from '../utils/auth.js';
import { validateResponse } from '../utils/helpers.js';

// Configuração do teste: 500 usuários simultâneos por 5 minutos
export const options = {
  stages: config.scenarios.challenge.stages,
  thresholds: config.thresholds,
  summaryTrendStats: ['avg', 'min', 'med', 'max', 'p(90)', 'p(95)', 'p(99)'],
};

// Setup: Executa uma vez antes do teste (autentica admin)
export function setup() {
  console.log('📊 Iniciando Challenge Test - 500 Usuários por 5 Minutos');
  console.log(`📍 API: ${config.baseURL}`);
  console.log('👥 Usuários: 0 -> 500 -> 0 (7 minutos)');
  
  const token = authenticateAdmin();
  
  if (!token) {
    throw new Error('Falha na autenticação durante setup');
  }
  
  return { token };
}

// Função principal: Executa para cada usuário virtual
export default function(data) {
  const headers = getAuthHeaders(data.token);

  // Grupo 1: Listar Usuários (operação mais comum)
  group('📋 Listar Usuários', () => {
    const listResponse = http.get(`${config.baseURL}/api/users`, { headers });
    
    validateResponse(listResponse, {
      'status é 200': (r) => r.status === 200,
      'tempo de resposta < 5s': (r) => r.timings.duration < 5000,
      'lista de usuários retornada': (r) => r.json('data') !== undefined,
    });
  });

  sleep(1); // Pausa de 1 segundo entre requisições
  
  // Grupo 2: Buscar Usuário Específico (operação de leitura)
  group('🔍 Buscar Usuário', () => {
    // Busca o próprio usuário logado
    const searchResponse = http.get(`${config.baseURL}/api/users?email=${config.admin.email}`, { headers });
    
    validateResponse(searchResponse, {
      'status é 200': (r) => r.status === 200,
      'tempo de resposta < 3s': (r) => r.timings.duration < 3000,
      'usuário encontrado': (r) => r.json('data') !== undefined,
    });
  });

  sleep(2); // Pausa de 2 segundos entre grupos de operações
}

// Teardown: Executa uma vez após o teste
export function teardown(data) {
  console.log('✅ Challenge Test finalizado');
  console.log('📊 Verifique as métricas abaixo para análise de performance');
}
