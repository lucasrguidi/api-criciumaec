# API do Criciúma EC - Data Hub

<img src="https://github.com/lucasrguidi/api-criciumaec/assets/92928460/bf0e26ac-c2e7-4b43-abb0-3299a658f115" style="width: 100px"></img>


> Bem-vindo ao repositório da API do Criciúma EC Data! Esta é uma aplicação Node.js desenvolvida para fornecer dados atualizados e detalhados sobre o Criciúma Esporte Clube, um dos clubes de futebol mais queridos do Brasil. Através desta API, você poderá acessar informações essenciais sobre o desempenho do time na Série B do Campeonato Brasileiro, bem como os detalhes dos próximos jogos agendados.

### Recursos principais


### Tabela da Série B

A API varre fontes de dados futebolísticos confiáveis e traz para você uma tabela completa e atualizada da Série B. Cada entrada na tabela inclui:

Nome do time
Escudo do time
Número de pontos
Jogos disputados
Vitórias
Empates
Derrotas
Saldo de gols


### Próximos Jogos do Criciúma

Esta API também oferece uma rota dedicada para exibir os próximos jogos do Criciúma. As informações incluídas para cada partida são:

Nome e link para escudo do adversário
Data e horário do jogo

### Últimos Jogos do Criciúma

Esta API também oferece uma rota dedicada para exibir os últimos jogos do Criciúma. As informações incluídas para cada partida são:

Nome e link para escudo do adversário
Data e horário do jogo
Placar da partida

### Ajustes e melhorias

O projeto ainda está em desenvolvimento, tendo apenas funcionalidades iniciais. Tenho como objetivo implementar as seguintes tarefas no futuro:

- [X] Últimos jogos
- [ ] Retrospectiva com o adverśario
- [ ] Estatísticas de jogadores
- [ ] Estatísticas detalhadas dos jogos

## Instalar

    npm install

## Rodar a API

    node app.js

# REST API

## GET Tabela

`GET /tabela/`

## GET Próximos jogos

`GET /next-matches/`

## GET Últimos jogos

`GET /last-matches/`