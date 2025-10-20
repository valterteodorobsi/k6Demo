import { check, sleep } from 'k6';

/**
 * Valida resposta HTTP com checks customizados
 */
export function validateResponse(response, expectedStatus, checks = {}) {
  const baseChecks = {
    [`status é ${expectedStatus}`]: (r) => r.status === expectedStatus,
    'tempo de resposta < 5s': (r) => r.timings.duration < 5000
  };
  
  return check(response, { ...baseChecks, ...checks });
}

/**
 * Sleep aleatório para simular comportamento humano
 */
export function randomSleep(min = 1, max = 3) {
  const duration = Math.random() * (max - min) + min;
  sleep(duration);
}

/**
 * Retry de uma operação
 */
export function retry(fn, maxAttempts = 3, delayMs = 1000) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const result = fn();
      if (result) {
        return result;
      }
    } catch (error) {
      console.warn(`Tentativa ${attempt}/${maxAttempts} falhou: ${error.message}`);
    }
    
    if (attempt < maxAttempts) {
      sleep(delayMs / 1000);
    }
  }
  
  console.error(`Todas as ${maxAttempts} tentativas falharam`);
  return null;
}

/**
 * Log formatado com timestamp
 */
export function log(message, level = 'INFO') {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${level}] ${message}`);
}

/**
 * Extrai IDs de uma lista de usuários
 */
export function extractUserIds(users) {
  if (!Array.isArray(users)) {
    return [];
  }
  return users.map(user => user._id || user.id).filter(id => id);
}
