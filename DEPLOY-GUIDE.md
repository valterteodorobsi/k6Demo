# 🚀 Guia de Push para GitHub

## Próximos Passos

### 1. Fazer Push para o GitHub

```bash
cd /c/K6Demo/k6-tests
git push -u origin main
```

**Nota:** Se o repositório já existir no GitHub, pode ser necessário fazer um pull primeiro:

```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### 2. Configurar Secrets no GitHub

Acesse: `https://github.com/valterteodorobsi/k6Demo/settings/secrets/actions`

Adicione os seguintes secrets:

| Nome | Valor | Descrição |
|------|-------|-----------|
| `API_BASE_URL` | `http://sua-api.com` | URL da API a ser testada |
| `ADMIN_EMAIL` | `admin@teste.com` | Email do admin |
| `ADMIN_PASSWORD` | `Admin123` | Senha do admin |

**Opcional:** Se não configurar, usará API pública de mock (JSONPlaceholder)

### 3. Verificar Pipeline

Após o push, acesse:
`https://github.com/valterteodorobsi/k6Demo/actions`

O pipeline será executado automaticamente e você verá:
- ✅ Status da execução
- 📊 Métricas coletadas
- 📦 Artefatos com resultados

### 4. Executar Manualmente (Opcional)

1. Acesse: `https://github.com/valterteodorobsi/k6Demo/actions`
2. Clique em **K6 Performance Tests**
3. Clique em **Run workflow**
4. Selecione a branch **main**
5. Clique em **Run workflow**

### 5. Baixar Resultados

Após cada execução:
1. Entre na execução do workflow
2. Role até o final da página
3. Baixe os artefatos: **k6-results-{run_number}**

## 📋 Checklist de Deploy

- [ ] Repositório criado no GitHub: `valterteodorobsi/k6Demo`
- [ ] Push realizado com sucesso
- [ ] Pipeline executado automaticamente
- [ ] Secrets configurados (se necessário)
- [ ] Primeira execução bem-sucedida
- [ ] Artefatos gerados e baixados
- [ ] README.md visível no repositório

## 🔧 Troubleshooting

### Erro: "failed to push some refs"

```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### Erro: "Permission denied"

Certifique-se de que você está autenticado:
```bash
git config --global user.name "Valter Teodoro"
git config --global user.email "seu-email@github.com"
```

Use Personal Access Token (PAT) se necessário:
`Settings` → `Developer settings` → `Personal access tokens`

### Pipeline não executou

Verifique:
1. Branch está como `main` (não `master`)
2. Arquivo `.github/workflows/k6-tests.yml` existe
3. Commit foi feito corretamente

## 📊 Próximas Execuções

O pipeline executará automaticamente:
- ✅ A cada push na branch `main`
- ✅ A cada pull request
- ✅ Diariamente às 2h UTC (schedule)
- ✅ Manualmente via workflow_dispatch

## 🎯 Resultado Esperado

Após o push bem-sucedido, você terá:

1. ✅ Repositório público no GitHub
2. ✅ Pipeline CI/CD funcionando
3. ✅ Badge de status no README
4. ✅ Histórico de execuções
5. ✅ Artefatos com resultados JSON
6. ✅ Comentários automáticos em PRs

---

**Tudo pronto para o push!** 🚀

Execute: `git push -u origin main`
