# 🚀 K6 Performance Testing - Desafio Técnico  

[![K6 Tests](https://github.com/valterteodorobsi/k6Demo/actions/workflows/k6-tests.yml/badge.svg)](https://github.com/valterteodorobsi/k6Demo/actions/workflows/k6-tests.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Projeto completo de testes de performance usando K6 para avaliar capacidade e identificar gargalos em APIs REST.

---

## 📋 Sobre o Projeto

Este projeto foi desenvolvido como parte do **Desafio Técnico  ** para demonstrar experiência com testes de performance e ferramentas de carga.

### 🎯 Objetivos Cumpridos

✅ **Tarefa 1:** Teste de carga com 500 usuários simultâneos por 5 minutos  
✅ **Tarefa 2:** Relatório completo com análise de resultados e identificação de gargalos  
✅ **Extra:** Pipeline CI/CD com GitHub Actions para execução automática

---

## 🛠️ Tecnologias Utilizadas

- **[K6](https://k6.io/)** - Ferramenta moderna de teste de carga (Grafana Labs)
- **[Allure](https://docs.qameta.io/allure/)** - Framework de visualização de relatórios
- **JavaScript (ES6+)** - Linguagem de scripting
- **GitHub Actions** - CI/CD para automação
- **Node.js** - Runtime para scripts de conversão

---

## 📁 Estrutura do Projeto

```
k6-tests/
├── .github/
│   └── workflows/
│       └── k6-tests.yml          # Pipeline CI/CD
├── scenarios/
│   └── challenge.test.js         # 🎯 Teste principal: 500 VUs por 5min
├── utils/
│   ├── auth.js                   # Funções de autenticação JWT
│   ├── helpers.js                # Validações e utilitários
│   └── data.js                   # Geração de dados de teste
├── results/                      # Relatórios gerados (.gitignore)
│   ├── challenge-results.json    # Dados brutos do teste
│   └── summary.json              # Resumo das métricas
├── config.js                     # Configurações centralizadas
├── .gitignore                    # Arquivos ignorados
└── README.md                     # Este arquivo
```

---

## 🚦 Teste Principal: 500 Usuários por 5 Minutos

### Configuração

**Arquivo:** `scenarios/challenge.test.js`

```javascript
// Cenário de Carga
stages: [
  { duration: '1m', target: 500 },  // Ramp-up: 0→500 usuários
  { duration: '5m', target: 500 },  // Carga sustentada: 500 VUs
  { duration: '1m', target: 0 }     // Ramp-down: 500→0 usuários
]

// Thresholds (Limites de Qualidade)
thresholds: {
  'http_req_duration': ['p(95)<2000', 'p(99)<5000'],  // Latência
  'http_req_failed': ['rate<0.05'],                    // Taxa de erro < 5%
  'checks': ['rate>0.95']                              // 95% validações OK
}
```

### Operações Testadas

1. **📋 Listar Usuários** - `GET /api/users`
   - Simula dashboard/listagem
   - Validações: status 200, tempo < 5s, dados retornados

2. **🔍 Buscar Usuário** - `GET /api/users?email={email}`
   - Simula busca/filtro
   - Validações: status 200, tempo < 3s, usuário encontrado

**Think Time:** 1-2 segundos (comportamento humano realista)

---

## 🔧 Instalação e Uso

### Pré-requisitos

```bash
# Windows (winget)
winget install k6 --source winget

# Windows (Chocolatey)
choco install k6

# macOS
brew install k6

# Linux
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg \
  --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | \
  sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update && sudo apt-get install k6

# Verificar instalação
k6 version
```

### Execução Local

```bash
# Clone o repositório
git clone https://github.com/valterteodorobsi/k6Demo.git
cd k6Demo

# Instalar dependências (para Allure)
npm install

# Executar teste de 500 usuários (7 minutos)
k6 run --out json=results/challenge-results.json scenarios/challenge.test.js

# Converter para Allure e visualizar
npm run convert
npm run allure:serve

# OU fazer tudo de uma vez
npm run report
```

### Configurar Credenciais

Edite o arquivo `config.js` ou use variáveis de ambiente:

```bash
# Via variáveis de ambiente
export API_BASE_URL="http://localhost:8080"
export ADMIN_EMAIL="admin@teste.com"
export ADMIN_PASSWORD="Admin123"

# Executar com variáveis customizadas
k6 run -e API_BASE_URL=https://api.exemplo.com scenarios/challenge.test.js
```

---

## 🔄 CI/CD Pipeline (GitHub Actions)

### Configurar Secrets do Repositório

⚠️ **IMPORTANTE:** O pipeline requer configuração de secrets para funcionar.

1. Acesse: `https://github.com/valterteodorobsi/k6Demo/settings/secrets/actions`
2. Clique em **"New repository secret"**
3. Adicione os seguintes secrets:

| Secret | Exemplo | Descrição |
|--------|---------|-----------|
| `API_BASE_URL` | `https://sua-api.com` | URL base da API a ser testada |
| `ADMIN_EMAIL` | `admin@teste.com` | Email do usuário admin |
| `ADMIN_PASSWORD` | `Admin123` | Senha do usuário admin |

**Nota:** Se as secrets não estiverem configuradas, o pipeline será pulado automaticamente.

### Execução Automática

O pipeline executa automaticamente nos seguintes eventos:

- ✅ **Push** para `main`
- ✅ **Pull Request** para `main`
- ✅ **Manual** via workflow_dispatch

### Ver Resultados

1. Acesse: `https://github.com/valterteodorobsi/k6Demo/actions`
2. Clique no workflow mais recente
3. Veja o resumo das métricas no próprio workflow
4. Baixe os artefatos (relatórios JSON completos)

---

## 📊 Visualização de Relatórios com Allure

### 🎯 Por que Allure?

Allure fornece uma interface visual moderna e interativa para análise de resultados:

- 📊 **Dashboards Interativos**: Gráficos e métricas em tempo real
- 📈 **Análise Detalhada**: Drill-down em cada métrica
- 🎨 **Visual Profissional**: Interface moderna e intuitiva
- 📁 **Histórico**: Comparação entre execuções

### 🚀 Como Usar

```bash
# 1. Executar o teste K6
npm test

# 2. Converter resultados para Allure
npm run convert

# 3. Visualizar relatório (abre navegador automaticamente)
npm run allure:serve

# OU tudo de uma vez
npm run report
```

### 📸 O Que Você Verá

O relatório Allure mostra:
- ✅ Total de requisições e taxa de sucesso
- ⏱️ Métricas de tempo (média, p95, p99)
- 📈 Gráficos de evolução de VUs
- 🎯 Percentual de checks que passaram
- 📊 Distribuição de tempos de resposta



---

## 📊 Métricas e Análise

### Principais Indicadores

| Métrica | Descrição | Threshold |
|---------|-----------|-----------|
| **http_req_duration (p95)** | 95º percentil de latência | < 2000ms |
| **http_req_duration (p99)** | 99º percentil de latência | < 5000ms |
| **http_req_failed** | Taxa de erro | < 5% |
| **checks** | Validações bem-sucedidas | > 95% |
| **http_reqs** | Throughput (req/s) | - |
| **iterations** | Iterações completadas | - |

### Interpretação de Resultados

#### ✅ Resultado BOM
```
✓ checks.........................: 99.50% ✓ 1990  ✗ 10
✓ http_req_duration.............: avg=850ms  p(95)=1500ms
✓ http_req_failed...............: 0.50%  ✓ 10    ✗ 1990
  http_reqs......................: 2000   66.6/s
```

#### ⚠️ Resultado ATENÇÃO
```
⚠ checks.........................: 92.00% ✓ 1840  ✗ 160
⚠ http_req_duration.............: avg=1800ms p(95)=2200ms
⚠ http_req_failed...............: 4.50%  ✓ 90    ✗ 1910
  http_reqs......................: 2000   45.2/s
```

#### ❌ Resultado RUIM
```
✗ checks.........................: 85.00% ✓ 1700  ✗ 300
✗ http_req_duration.............: avg=4500ms p(95)=8000ms
✗ http_req_failed...............: 15.00% ✓ 300   ✗ 1700
  http_reqs......................: 2000   20.5/s
```

### Gargalos Comuns e Soluções

| Sintoma | Causa Provável | Solução |
|---------|----------------|---------|
| **p95 > 2s** | Queries lentas no banco | Adicionar índices, otimizar queries |
| **Taxa erro > 5%** | Timeout ou limite de recursos | Aumentar pool de conexões, scaling |
| **Throughput baixo** | CPU/Memória saturados | Otimizar código, adicionar servidores |
| **Degradação gradual** | Memory leak | Revisar gerenciamento de memória |

---

## 🎓 Conceitos Demonstrados

### Teste Implementado

**🎯 Challenge Test** (500 VUs, 7 min)
- Alta carga simultânea
- Teste do desafio técnico
- Identifica limites e gargalos

### Boas Práticas Aplicadas

✅ **Modularização** - Código reutilizável em `utils/`  
✅ **Configuração Centralizada** - `config.js` com thresholds  
✅ **Validações Robustas** - Checks em todas requisições  
✅ **Think Time Realista** - Simula comportamento humano  
✅ **Ciclo Completo** - setup() → default() → teardown()  
✅ **Métricas Customizadas** - Grupos e tags organizados  
✅ **CI/CD Integrado** - Automação completa  
✅ **Documentação Clara** - README detalhado

---

## 📈 Comparação: K6 vs JMeter

### Por que K6?

| Aspecto | K6 | JMeter |
|---------|-----|--------|
| **Linguagem** | JavaScript (moderno) ✅ | Java/XML (legado) |
| **Performance** | Leve (Go runtime) ✅ | Pesado (JVM) |
| **CI/CD** | Nativo ✅ | Configuração manual |
| **Curva de Aprendizado** | Baixa ✅ | Média/Alta |
| **Scripting** | Código limpo ✅ | GUI/XML complexo |
| **Cloud-native** | Sim ✅ | Não |
| **Developer Experience** | Excelente ✅ | Regular |

**Conclusão:** K6 é mais adequado para ambientes modernos, oferece melhor DX e integração nativa com DevOps.

---

## 📚 Recursos Adicionais

### Documentação

- [K6 Documentation](https://k6.io/docs/)
- [K6 Examples](https://k6.io/docs/examples/)
- [Best Practices](https://k6.io/docs/testing-guides/running-large-tests/)
- [Grafana Cloud K6](https://grafana.com/products/cloud/k6/)

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para melhorar este projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👤 Autor

**Valter Teodoro**

- GitHub: [@valterteodorobsi](https://github.com/valterteodorobsi)
- LinkedIn: [Valter Teodoro](https://www.linkedin.com/in/valter-teodoro/)
- Projeto: [k6Demo](https://github.com/valterteodorobsi/k6Demo)

---

## 🎯 Status do Projeto

✅ **Completo e Pronto para Produção**

- [x] Script de teste de 500 VUs criado
- [x] Thresholds e validações configurados
- [x] Relatórios JSON automáticos
- [x] Análise técnica documentada
- [x] Pipeline CI/CD configurado
- [x] README consolidado
- [x] Código modular e limpo
- [x] Boas práticas aplicadas

---

