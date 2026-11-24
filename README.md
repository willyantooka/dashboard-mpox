# Mpox no Brasil — Dashboard Epidemiológico

Dashboard interativo para análise das notificações de Mpox no Brasil, desenvolvido com React e consumo de dados da API de Dados Abertos do Ministério da Saúde.

🔗 **[Acessar o dashboard online](https://dashboard-mpox.onrender.com)**

---

## Sobre o projeto

O projeto busca analisar a evolução das notificações de Mpox no Brasil entre 2022 e 2026, explorando a distribuição dos registros por estado, sexo, idade e classificação final.

A aplicação permite visualizar os dados de maneira interativa, facilitando a identificação de padrões, tendências e diferenças na distribuição das notificações.

## Funcionalidades

- Consumo de dados de uma API pública do Ministério da Saúde.
- Carregamento paginado dos registros.
- Filtros interativos por UF, sexo, ano e classificação final.
- Indicadores estatísticos calculados dinamicamente.
- Visualização de notificações por mês.
- Ranking das UFs com maior número de notificações.
- Análise da idade por sexo.
- Tabelas de cruzamento e resumo anual.
- Conclusões e limitações da análise.

## Visualizações

| Visualização | Objetivo |
|---|---|
| Indicadores | Apresentar o total de notificações, idade média, mediana e percentual de internados. |
| Gráfico de linha | Visualizar a evolução das notificações ao longo dos meses. |
| Gráfico de barras | Comparar o número de notificações entre as UFs. |
| Tabela de idade por sexo | Comparar medidas estatísticas de idade entre os grupos. |
| Tabela cruzada | Relacionar classificação final e resultado laboratorial. |
| Resumo por ano | Comparar notificações, confirmações, descartes e internações ao longo dos anos. |

## Indicadores

- **Total de notificações:** contagem dos registros disponíveis após a aplicação dos filtros.
- **Idade média e mediana:** medidas de tendência central para descrever a idade dos registros.
- **Percentual de internações:** proporção de registros com informação de hospitalização, conforme os critérios utilizados no painel.
- **Comparação de idade por sexo:** análise descritiva e teste t de Welch.

## Tecnologias utilizadas

- React
- JavaScript
- Vite
- Chart.js
- CSS
- API de Dados Abertos do Ministério da Saúde

## Fonte dos dados

Os dados são obtidos por meio da API de Dados Abertos do Ministério da Saúde, referente às notificações de Mpox.

- [API de Dados Abertos do Ministério da Saúde](https://apidadosabertos.saude.gov.br/)

## Como executar o projeto localmente

### Pré-requisitos

- Node.js
- npm

### Instalação

```bash
git clone https://github.com/willyantooka/dashboard-mpox.git
cd dashboard-mpox
npm install
npm run dev
