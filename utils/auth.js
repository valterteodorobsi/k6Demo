import http from 'k6/http';
import { check } from 'k6';
import config from '../config.js';

/**
 * Autentica o admin e retorna o token JWT
 */
export function authenticateAdmin() {
  const url = `${config.baseURL}/api/auth/login`;
  
  const payload = JSON.stringify({
    email: config.admin.email,
    password: config.admin.password
  });
  
  const params = {
    headers: config.headers,
    timeout: config.timeouts.default
  };
  
  const response = http.post(url, payload, params);
  
  // Validações
  const loginSuccess = check(response, {
    'login status é 200': (r) => r.status === 200,
    'token retornado': (r) => r.json('token') !== undefined
  });
  
  if (!loginSuccess) {
    console.error(`Login falhou: ${response.status} - ${response.body}`);
    return null;
  }
  
  return response.json('token');
}

/**
 * Cria headers com autenticação
 */
export function getAuthHeaders(token) {
  return {
    ...config.headers,
    'Authorization': `Bearer ${token}`
  };
}

/**
 * Verifica se o token é válido
 */
export function validateToken(token) {
  const url = `${config.baseURL}/api/users`;
  
  const params = {
    headers: getAuthHeaders(token),
    timeout: config.timeouts.default
  };
  
  const response = http.get(url, params);
  
  return check(response, {
    'token válido': (r) => r.status === 200
  });
}

/**
 * Registra um novo admin (apenas para setup inicial)
 */
export function registerAdmin() {
  const url = `${config.baseURL}/api/admin/register`;
  
  const payload = JSON.stringify({
    name: 'Admin User',
    email: config.admin.email,
    password: config.admin.password,
    secret: config.admin.secret
  });
  
  const params = {
    headers: config.headers,
    timeout: config.timeouts.default
  };
  
  const response = http.post(url, payload, params);
  
  // Admin pode já existir (200) ou ser criado (201)
  check(response, {
    'admin criado ou já existe': (r) => r.status === 200 || r.status === 201
  });
  
  return response;
}
