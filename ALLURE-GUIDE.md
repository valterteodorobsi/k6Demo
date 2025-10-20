# 📊 Visualizando Relatórios com Allure

## 🎯 O que é Allure?

Allure é uma ferramenta moderna de visualização de relatórios de testes que fornece:
- 📊 Gráficos interativos e dashboards
- 📈 Análise detalhada de métricas
- 🎨 Interface visual profissional
- 📁 Histórico de execuções

---

## 🚀 Quick Start

### 1. Executar o Teste K6

```bash
# Executar teste e gerar JSON
k6 run --out json=results/challenge-results.json scenarios/challenge.test.js

# OU usar npm script
npm test
```

### 2. Converter para Allure

```bash
# Converter resultados K6 para formato Allure
node scripts/k6-to-allure.js results/challenge-results.json

# OU usar npm script
npm run convert
```

### 3. Visualizar Relatório

```bash
# Abrir relatório interativo no navegador
npx allure serve results/allure-results

# OU usar npm script
npm run allure:serve
```

---

## 📋 Comandos Disponíveis

### Via NPM Scripts

```bash
# Executar teste completo
npm test

# Converter resultados
npm run convert

# Visualizar relatório (abre navegador)
npm run allure:serve

# Fazer tudo (testar + converter + visualizar)
npm run report
```

### Via Comandos Diretos

```bash
# Executar K6
k6 run --out json=results/challenge-results.json scenarios/challenge.test.js

# Converter para Allure
node scripts/k6-to-allure.js results/challenge-results.json

# Gerar relatório HTML estático
npx allure generate results/allure-results --clean -o results/allure-report

# Abrir relatório HTML
npx allure open results/allure-report

# Servir relatório (modo desenvolvimento)
npx allure serve results/allure-results
```

---

## 📊 O Que o Relatório Mostra

### Dashboard Principal
- ✅ **Overview**: Total de requisições, taxa de sucesso, duração
- 📈 **Trends**: Gráficos de evolução ao longo do tempo
- 🎯 **Categories**: Agrupamento de resultados por categoria
- ⏱️ **Timeline**: Linha do tempo de execução

### Métricas Detalhadas
- **Total de Requisições**: Quantidade total de HTTP requests
- **Taxa de Sucesso**: Percentual de requisições bem-sucedidas
- **Tempo Médio**: Latência média das requisições
- **P95/P99**: Percentis de tempo de resposta
- **VUs Máximo**: Pico de usuários virtuais simultâneos
- **Checks**: Percentual de validações que passaram

### Gráficos Disponíveis
- 📊 Distribuição de tempo de resposta
- 📈 Evolução de VUs ao longo do tempo
- 🎯 Taxa de sucesso/falha
- ⏱️ Timeline de execução

---

## 🎨 Exemplo de Saída

Após executar `npm run allure:serve`, você verá:

```
Generating report to temp directory...
Report successfully generated to C:\Users\...\AppData\Local\Temp\...
Starting web server...
Server started at <http://192.168.0.1:PORT>. Press <Ctrl+C> to exit
```

O navegador abrirá automaticamente mostrando:
- 📊 Dashboard com métricas principais
- 📈 Gráficos interativos
- 📋 Detalhes de cada teste
- 🎯 Análise de performance

---

## 🔧 Troubleshooting

### Allure não instala

```bash
# Instalar globalmente
npm install -g allure-commandline

# Ou usar via npx (recomendado)
npx allure serve results/allure-results
```

### Erro ao converter JSON

```bash
# Verificar se o arquivo existe
ls -lh results/challenge-results.json

# Verificar formato
head -5 results/challenge-results.json

# Tentar novamente
node scripts/k6-to-allure.js results/challenge-results.json
```

### Porta já em uso

```bash
# Allure tenta várias portas automaticamente
# Se precisar de uma porta específica:
npx allure serve results/allure-results --port 8080
```

---

## 📁 Estrutura de Arquivos

```
results/
├── challenge-results.json        # Dados brutos do K6 (NDJSON)
├── allure-results/              # Resultados convertidos para Allure
│   └── *-result.json            # Arquivos de resultado Allure
└── allure-report/               # Relatório HTML gerado
    ├── index.html               # Página principal
    ├── data/                    # Dados do relatório
    └── plugins/                 # Plugins Allure
```

---

## 🎯 Integração com CI/CD

### GitHub Actions

O pipeline já está configurado para gerar relatórios Allure automaticamente:

```yaml
- name: Convert to Allure
  run: node scripts/k6-to-allure.js results/challenge-results.json

- name: Generate Allure Report
  run: npx allure generate results/allure-results --clean

- name: Upload Allure Results
  uses: actions/upload-artifact@v4
  with:
    name: allure-report
    path: results/allure-report/
```

---

## 📚 Recursos Adicionais

- [Allure Documentation](https://docs.qameta.io/allure/)
- [Allure Report Examples](https://demo.qameta.io/allure/)
- [K6 Documentation](https://k6.io/docs/)

---

**Pronto para visualizar seus testes de performance! 🚀**

Execute: `npm run report` e veja a mágica acontecer! ✨
