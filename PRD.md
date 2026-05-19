# PRD — bag-beer

> Versão: 1.0 · Data: 2026-05-18

## Visão geral

bag-beer (babi amoreira game beer) é um web app que simula um baralho digital para jogo de bebida em roda de amigos. Cada carta virada exibe seu significado diretamente na tela, eliminando a necessidade de um baralho físico e de memorizar as regras.

## Problema

Para jogar, é preciso ter um baralho físico em mãos — o que nem sempre acontece em encontros espontâneos. Além disso, jogadores novos precisam aprender o significado de cada carta antes de jogar. O app resolve os dois problemas: substitui o baralho e ensina as regras em tempo real.

## Usuário-alvo

Qualquer pessoa em uma roda de amigos que queira jogar o jogo de bebida. Hoje resolve com um baralho físico de cartas. Muda para este app porque o celular está sempre no bolso — o baralho, não.

## MVP — Funcionalidades

| # | Funcionalidade | Descrição | Prioridade |
|---|---|---|---|
| 1 | Virar carta | Toque na tela vira uma carta aleatória do baralho, sem repetição | Must |
| 2 | Exibição da carta | Mostra visualmente a carta (rank + naipe) de forma clara | Must |
| 3 | Instrução da carta | Exibe o significado da carta virada logo abaixo (ex: "Distribua 2 goles") | Must |
| 4 | Controle do baralho | 88 cartas (11 ranks × 4 naipes × 2 cópias). Ao esgotar, embaralha automaticamente | Must |

### Ranks e significados

| Carta | Significado |
|-------|-------------|
| A | Distribua 1 gole |
| 2 | Distribua 2 goles |
| 3 | Distribua 3 goles |
| 4 | Beba 2 goles |
| 5 | Eu nunca |
| 6 | Crie uma regra |
| 7 | Quebra regras |
| 8 | Mão na mesa (último a colocar a mão na mesa bebe) |
| J | Todos bebem |
| Q | Mulheres bebem |
| K | Homens bebem |

> Cartas 9 e 10 não existem neste jogo. O baralho tem 11 ranks, 4 naipes, 2 cópias de cada combinação = **88 cartas**.

## Fora do escopo (V1)

- Cadastro ou autenticação de usuários
- Histórico de partidas
- Personalização de regras
- Multiplayer online / salas
- Placar ou contagem de goles

## Arquitetura e stack

- **Tipo:** Web app PWA (instalável no celular, funciona offline)
- **Stack:** React + Vite + TypeScript + Tailwind CSS + vite-plugin-pwa
- **Restrições técnicas:** deve funcionar 100% offline — sem backend, sem banco de dados, toda lógica roda no browser

## Fluxos principais

### Fluxo 1 — Jogar

1. Usuário abre o app (ou PWA instalada no celular)
2. Tela exibe a pilha do baralho (cartas viradas para baixo) e um convite para tocar
3. Usuário toca na tela
4. Uma carta aleatória é virada: exibe rank, naipe e o significado da jogada
5. Usuário toca novamente para a próxima carta
6. Processo se repete até as 88 cartas serem usadas

### Fluxo 2 — Baralho esgotado

1. Última carta é virada e exibida
2. App detecta que o baralho está vazio
3. Embaralha automaticamente as 88 cartas
4. Próximo toque retira a primeira carta do novo baralho embaralhado
5. Jogo continua sem interrupção

## Critérios de sucesso do MVP

- [ ] Ao tocar na tela, uma carta é exibida com rank, naipe e instrução correta
- [ ] Nenhuma carta se repete antes de o baralho ser totalmente esgotado
- [ ] Ao esgotar o baralho, ele é embaralhado automaticamente e o jogo continua
- [ ] O app funciona offline após o primeiro acesso
- [ ] O app pode ser instalado como PWA no celular

## Prazo / milestone

Sem prazo definido.
