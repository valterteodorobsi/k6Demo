# 🔐 Configurar Secrets do GitHub

## Informações para Configuração

Use as seguintes credenciais do projeto **web-playwright-demo**:

### Secrets Necessários

| Secret Name | Valor |
|-------------|-------|
| `API_BASE_URL` | `https://api-mobile-alfj.onrender.com` |
| `ADMIN_EMAIL` | `admin@teste.com` |
| `ADMIN_PASSWORD` | `Admin123` |

---

## 📋 Passo a Passo Manual

### Opção 1: Via Interface do GitHub (Recomendado)

1. **Acesse a página de secrets:**
   ```
   https://github.com/valterteodorobsi/k6Demo/settings/secrets/actions
   ```

2. **Para cada secret, clique em "New repository secret":**

   **Secret 1:**
   - Name: `API_BASE_URL`
   - Secret: `https://api-mobile-alfj.onrender.com`
   - Clique em **"Add secret"**

   **Secret 2:**
   - Name: `ADMIN_EMAIL`
   - Secret: `admin@teste.com`
   - Clique em **"Add secret"**

   **Secret 3:**
   - Name: `ADMIN_PASSWORD`
   - Secret: `Admin123`
   - Clique em **"Add secret"**

3. **Verificar configuração:**
   - Você deve ver 3 secrets listados
   - Os valores ficam ocultos (•••••) por segurança

---

## 🚀 Testar Pipeline

Após configurar as secrets:

### Método 1: Via Interface
1. Acesse: https://github.com/valterteodorobsi/k6Demo/actions
2. Clique em "K6 Performance Tests"
3. Clique em "Run workflow" → "Run workflow"

### Método 2: Via Push
```bash
# Faça qualquer pequena alteração e push
git commit --allow-empty -m "test: trigger pipeline"
git push origin main
```

---

## ✅ Como Verificar se Funcionou

Após executar o workflow:

1. **Acesse:** https://github.com/valterteodorobsi/k6Demo/actions
2. **Clique no workflow mais recente**
3. **Verifique:**
   - ✅ Step "Run K6 Challenge Test" deve executar (não pular)
   - ✅ Deve aparecer: "Running K6 tests against configured API..."
   - ✅ Resultados devem ser gerados
   - ❌ Se aparecer "Pulando execução do teste...", as secrets não estão configuradas

---

## 🔄 Atualizar Secrets

Para atualizar um secret existente:

1. Acesse: https://github.com/valterteodorobsi/k6Demo/settings/secrets/actions
2. Clique no secret que deseja atualizar
3. Clique em "Update secret"
4. Insira o novo valor
5. Clique em "Update secret"

---

## 🆘 Troubleshooting

### Problema: Pipeline ainda pula a execução
- **Causa:** Secrets não configurados ou nome incorreto
- **Solução:** Verifique se os nomes estão exatamente como especificado (case-sensitive)

### Problema: Teste falha com erro 401
- **Causa:** Credenciais inválidas
- **Solução:** Verifique email e senha em `ADMIN_EMAIL` e `ADMIN_PASSWORD`

### Problema: Teste falha com erro de conexão
- **Causa:** URL incorreta ou API fora do ar
- **Solução:** 
  1. Verifique se a API está online: `curl https://api-mobile-alfj.onrender.com/health`
  2. Confirme que a URL em `API_BASE_URL` está correta

---

## 📝 Notas de Segurança

- ✅ Secrets são criptografados pelo GitHub
- ✅ Valores nunca aparecem em logs
- ✅ Apenas workflows autorizados podem acessar
- ⚠️ Não commite secrets no código
- ⚠️ Não compartilhe os valores publicamente

---

## 🎯 Status Atual

- [ ] API_BASE_URL configurado
- [ ] ADMIN_EMAIL configurado
- [ ] ADMIN_PASSWORD configurado
- [ ] Pipeline testado e funcionando

**Após configurar todos os secrets, marque os itens acima e delete este arquivo (ou mantenha para referência).**
