// Configuração centralizada para testes K6 basicas
export const config = {
  // URLs da API
  baseURL: __ENV.API_BASE_URL || 'https://api-mobile-alfj.onrender.com',
  
  // Credenciais
  admin: {
    email: __ENV.ADMIN_EMAIL || 'admin@teste.com',
    password: __ENV.ADMIN_PASSWORD || 'Admin123',
    secret: __ENV.ADMIN_SECRET || 'create-admin-2025'
  },
  
  // Thresholds (limites aceitáveis)
  thresholds: {
    // 95% das requisições devem ser < 2000ms
    http_req_duration: ['p(95)<2000'],
    // 99% das requisições devem ser < 5000ms
    'http_req_duration{expected_response:true}': ['p(99)<5000'],
    // Taxa de erro deve ser < 5%
    http_req_failed: ['rate<0.05'],
    // Checks devem passar em > 95%
    checks: ['rate>0.95']
  },
  
  // Cenários de carga
  scenarios: {
    smoke: {
      vus: 1,
      duration: '30s',
      description: 'Smoke test - validar funcionalidade básica'
    },
    load: {
      stages: [
        { duration: '2m', target: 10 },  // Ramp up
        { duration: '5m', target: 10 },  // Carga constante
        { duration: '2m', target: 0 }    // Ramp down
      ],
      description: 'Load test - carga normal'
    },
    challenge: {
      stages: [
        { duration: '1m', target: 500 },  // Ramp up para 500 usuários
        { duration: '5m', target: 500 },  // Mantém 500 usuários por 5 minutos
        { duration: '1m', target: 0 }     // Ramp down
      ],
      description: 'Challenge test - 500 usuários por 5 minutos'
    },
    stress: {
      stages: [
        { duration: '2m', target: 20 },
        { duration: '5m', target: 20 },
        { duration: '2m', target: 40 },
        { duration: '5m', target: 40 },
        { duration: '2m', target: 0 }
      ],
      description: 'Stress test - encontrar limites'
    },
    spike: {
      stages: [
        { duration: '10s', target: 100 },  // Spike rápido
        { duration: '1m', target: 100 },   // Mantém
        { duration: '10s', target: 0 }     // Drop rápido
      ],
      description: 'Spike test - picos súbitos'
    },
    soak: {
      stages: [
        { duration: '2m', target: 5 },
        { duration: '3h', target: 5 },   // 3 horas de carga constante
        { duration: '2m', target: 0 }
      ],
      description: 'Soak test - resistência prolongada'
    }
  },
  
  // Headers padrão
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  
  // Timeouts
  timeouts: {
    default: 90000,  // 90s para cold start da Render
    short: 5000,     // 5s para operações rápidas
    long: 120000     // 2min para operações longas
  }
};

export default config;
