import { randomString } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

/**
 * Gera dados aleatórios para usuários
 */
export function generateUser() {
  const randomId = randomString(8);
  
  return {
    name: `User ${randomId}`,
    email: `user.${randomId}@test.com`,
    password: `Pass${randomId}123!`,
    age: Math.floor(Math.random() * 50) + 18
  };
}

/**
 * Gera múltiplos usuários
 */
export function generateUsers(count) {
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push(generateUser());
  }
  return users;
}

/**
 * Gera dados de atualização de usuário
 */
export function generateUpdateData() {
  const randomId = randomString(8);
  
  return {
    name: `Updated ${randomId}`,
    age: Math.floor(Math.random() * 50) + 18
  };
}

/**
 * Seleciona um item aleatório de um array
 */
export function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}
