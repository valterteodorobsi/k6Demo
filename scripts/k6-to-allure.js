#!/usr/bin/env node

/**
 * Converte resultados do K6 (JSON) para formato Allure
 * 
 * Uso:
 *   node scripts/k6-to-allure.js results/challenge-results.json
 */

const fs = require('fs');
const path = require('path');
const {AllureRuntime, InMemoryAllureWriter, AllureTest, Status} = require('allure-js-commons');

// Configuração
const K6_RESULTS_FILE = process.argv[2] || 'results/challenge-results.json';
const ALLURE_RESULTS_DIR = 'results/allure-results';

// Criar diretório de resultados Allure
if (!fs.existsSync(ALLURE_RESULTS_DIR)) {
  fs.mkdirSync(ALLURE_RESULTS_DIR, { recursive: true });
}

console.log('🔄 Convertendo resultados K6 para Allure...\n');
console.log(`📁 Arquivo K6: ${K6_RESULTS_FILE}`);
console.log(`📂 Saída Allure: ${ALLURE_RESULTS_DIR}\n`);

// Ler arquivo K6 linha por linha (NDJSON)
const content = fs.readFileSync(K6_RESULTS_FILE, 'utf-8');
const lines = content.trim().split('\n');

// Processar métricas
const metrics = {
  http_req_duration: [],
  http_req_failed: 0,
  http_reqs: 0,
  checks: { passed: 0, failed: 0 },
  vus: { max: 0, min: Infinity }
};

lines.forEach(line => {
  try {
    const data = JSON.parse(line);
    
    if (data.type === 'Point') {
      const metricName = data.metric;
      const value = data.data.value;
      
      if (metricName === 'http_req_duration') {
        metrics.http_req_duration.push(value);
      } else if (metricName === 'http_req_failed') {
        metrics.http_req_failed += value;
      } else if (metricName === 'http_reqs') {
        metrics.http_reqs++;
      } else if (metricName === 'vus') {
        metrics.vus.max = Math.max(metrics.vus.max, value);
        metrics.vus.min = Math.min(metrics.vus.min, value);
      } else if (metricName === 'checks') {
        if (value === 1) metrics.checks.passed++;
        else metrics.checks.failed++;
      }
    }
  } catch (e) {
    // Ignora linhas inválidas
  }
});

// Calcular estatísticas
const durations = metrics.http_req_duration.sort((a, b) => a - b);
const p95Index = Math.floor(durations.length * 0.95);
const p99Index = Math.floor(durations.length * 0.99);

const stats = {
  totalRequests: metrics.http_reqs,
  failedRequests: metrics.http_req_failed,
  successRate: ((1 - metrics.http_req_failed / metrics.http_reqs) * 100).toFixed(2),
  avgDuration: (durations.reduce((a, b) => a + b, 0) / durations.length).toFixed(2),
  p95Duration: durations[p95Index] ? durations[p95Index].toFixed(2) : 'N/A',
  p99Duration: durations[p99Index] ? durations[p99Index].toFixed(2) : 'N/A',
  checksPassRate: ((metrics.checks.passed / (metrics.checks.passed + metrics.checks.failed)) * 100).toFixed(2),
  maxVUs: metrics.vus.max
};

// Gerar resultado Allure
const allureResult = {
  uuid: `k6-test-${Date.now()}`,
  historyId: 'k6-challenge-test',
  fullName: 'K6 Challenge Test - 500 VUs por 5 minutos',
  name: 'Challenge Test',
  status: stats.successRate >= 95 && stats.p95Duration < 2000 ? 'passed' : 'failed',
  stage: 'finished',
  description: `Teste de carga com 500 usuários simultâneos`,
  descriptionHtml: `
    <h3>📊 Resultados do Teste K6</h3>
    <ul>
      <li><strong>Total de Requisições:</strong> ${stats.totalRequests}</li>
      <li><strong>Taxa de Sucesso:</strong> ${stats.successRate}%</li>
      <li><strong>Tempo Médio:</strong> ${stats.avgDuration}ms</li>
      <li><strong>P95:</strong> ${stats.p95Duration}ms</li>
      <li><strong>P99:</strong> ${stats.p99Duration}ms</li>
      <li><strong>VUs Máximo:</strong> ${stats.maxVUs}</li>
      <li><strong>Checks Passou:</strong> ${stats.checksPassRate}%</li>
    </ul>
  `,
  start: Date.now() - 420000, // 7 minutos atrás
  stop: Date.now(),
  labels: [
    { name: 'suite', value: 'Performance Tests' },
    { name: 'testClass', value: 'K6 Challenge' },
    { name: 'package', value: 'scenarios' },
    { name: 'framework', value: 'K6' }
  ],
  parameters: [
    { name: 'Virtual Users', value: String(stats.maxVUs) },
    { name: 'Duration', value: '7 minutes' },
    { name: 'Total Requests', value: String(stats.totalRequests) }
  ],
  steps: [],
  attachments: [],
  testCaseId: 'challenge-test'
};

// Salvar resultado
const resultFile = path.join(ALLURE_RESULTS_DIR, `${allureResult.uuid}-result.json`);
fs.writeFileSync(resultFile, JSON.stringify(allureResult, null, 2));

console.log('✅ Conversão concluída!\n');
console.log('📊 Estatísticas:');
console.log(`   - Total de Requisições: ${stats.totalRequests}`);
console.log(`   - Taxa de Sucesso: ${stats.successRate}%`);
console.log(`   - Tempo Médio: ${stats.avgDuration}ms`);
console.log(`   - P95: ${stats.p95Duration}ms`);
console.log(`   - P99: ${stats.p99Duration}ms`);
console.log(`   - VUs Máximo: ${stats.maxVUs}`);
console.log(`   - Checks Passou: ${stats.checksPassRate}%\n`);
console.log('🚀 Execute: npm run allure:serve\n');
