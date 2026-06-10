# KINETIC — Design System

Documento de referência visual para geração de interfaces do app **KINETIC**, um aplicativo mobile de fitness e treinos esportivos (React Native / Expo).

**Idioma da interface:** Português brasileiro (PT-BR)  
**Plataforma:** Mobile portrait — 390×844px (iPhone 14 Pro)  
**Estilo:** Minimalista, limpo, atlético, profissional

---

## 1. Identidade da marca

| Atributo | Valor |
|---|---|
| Nome do app | **KINETIC** |
| Logo | Texto "KINETIC" em Lexend Black, cor `#005CEE`, letter-spacing 1px, sempre centralizado no header |
| Tom visual | Moderno, energético, confiável — sem exageros visuais |
| Densidade | Espaçoso — muito respiro entre seções, nunca poluído |

---

## 2. Tipografia

**Fonte única:** [Lexend](https://fonts.google.com/specimen/Lexend) — não usar nenhuma outra fonte.

| Peso | Uso | Tamanhos típicos |
|---|---|---|
| **Lexend Black (900)** | Títulos de página, nomes de exercícios, valores numéricos grandes | 20–42px |
| **Lexend ExtraBold (800)** | Labels de seção, tags, botões, subtítulos de stats | 9–16px |
| **Lexend Bold (700)** | Labels de campos, stat labels, itens de menu | 10–18px |
| **Lexend Regular (400)** | Corpo de texto, descrições, subtítulos | 13–16px |

### Regras tipográficas

- Títulos de página: **MAIÚSCULAS**, Black 40–42px, cor `#1A1C29`, line-height ~110%
- Labels de seção: **MAIÚSCULAS**, ExtraBold 12px, cor `#9CA3AF`, letter-spacing 1.5–2px
- Subtítulos de página: Regular 16px, cor `#6B7280`, line-height 24px
- Labels de input: Bold 12px, cor `#9CA3AF`, MAIÚSCULAS, letter-spacing 1px
- Valores de input/picker: Bold 18–20px, cor `#1A1C29` ou cor de destaque do campo
- Texto de botão primário: ExtraBold 15–16px, branco, letter-spacing 0.5–1.2px, MAIÚSCULAS

---

## 3. Paleta de cores

### Cores base

| Token | Hex | Uso |
|---|---|---|
| `background` | `#F8F9FE` | Fundo de todas as telas |
| `surface` | `#FFFFFF` | Cards, inputs, painéis |
| `text-primary` | `#1A1C29` | Títulos, valores, texto principal |
| `text-secondary` | `#6B7280` | Descrições, subtítulos |
| `text-muted` | `#9CA3AF` | Labels, placeholders secundários, itens inativos |
| `text-placeholder` | `#D1D5DB` | Placeholders de inputs |
| `border` | `#F3F4F6` | Divisores, bordas internas de listas |
| `error` | `#EF4444` | Cancelar, sair, erros |

### Cores de marca e destaque

| Token | Hex | Uso |
|---|---|---|
| `primary` | `#005CEE` | Logo, botões primários, links, item ativo do menu, dicas de treinador |
| `primary-light` | `#E6F0FF` | Fundo de tags azuis, avatares, ícones circulares |
| `orange` | `#FF6B22` / `#F26522` | Destaque secundário, tags laranja, valores de picker |
| `orange-light` | `#FFF0E6` | Fundo de tags laranja |
| `green` | `#82E53A` | Tags verdes, switches ativos, stats de sequência |
| `green-light` | `#F2FCE8` | Fundo de tags verdes |
| `green-dark` | `#74D333` | Texto em tags verdes |
| `yellow` | `#FFB300` | Stats de intensidade, card customizado |

### Cores por modalidade esportiva

Usar como `mainColor` de cards, botões e ícones flutuantes:

| Esporte | Cor principal | Tag background | Tag texto |
|---|---|---|---|
| Musculação | `#005CEE` | `#E6F0FF` | `#005CEE` |
| Ciclismo | `#FF6B22` | `#FFF0E6` | `#FF6B22` |
| Corrida | `#82E53A` | `#F2FCE8` | `#74D333` |
| Futebol | `#005CEE` | `#E6F0FF` | `#005CEE` |
| Voleibol | `#FF6B22` | `#FFF0E6` | `#FF6B22` |
| Natação | `#82E53A` | `#F2FCE8` | `#74D333` |
| Customizado | `#FFB300` | — | — |

---

## 4. Espaçamento e layout

| Token | Valor | Uso |
|---|---|---|
| `screen-padding-x` | 20px | Padding horizontal padrão de telas |
| `screen-padding-bottom` | 30–40px | Padding inferior do scroll (sem bottom nav) |
| `section-gap` | 30px | Espaço entre seções de formulário |
| `card-gap` | 12–16px | Espaço entre cards em listas |
| `card-gap-large` | 22–35px | Espaço entre cards grandes do Dashboard |

### Grid

- Telas são **single-column** com scroll vertical
- Stat cards no Dashboard: grid 2 colunas (48% cada)
- Stat cards em detalhe de treino: row horizontal com 2 ou 3 cards iguais

---

## 5. Border radius

| Elemento | Radius |
|---|---|
| Cards grandes (Dashboard) | 24px |
| Cards médios (inputs, stats, exercícios) | 16–20px |
| Imagens dentro de cards | 14–20px |
| Botões primários retangulares | 16px |
| Botões pill (SELECIONAR nos cards) | 100px |
| Tags / chips de filtro | 12px (tag) / 100px (chip) |
| Ícone flutuante circular | 50% (círculo perfeito) |
| Switch track | 15px |
| Switch thumb | 12px (círculo) |
| Bottom sheet modal | 24px (topo) |
| Item ativo do drawer | 12px |

---

## 6. Sombras e elevação

Estilo: sombras **suaves e discretas** — nunca dramáticas.

| Elemento | Sombra |
|---|---|
| Card Dashboard | `0 10px 15px rgba(0,0,0,0.05)` |
| Card pequeno / stat | `0 4px 8px rgba(0,0,0,0.03)` |
| Botão primário | `0 6px 12px rgba(0,92,238,0.35)` — sombra azul |
| Drawer panel | Sombra lateral direita suave |

---

## 7. Componentes

### 7.1 Header padrão

Três colunas em `flexDirection: row`, `paddingHorizontal: 20`, `paddingVertical: 15`, fundo `#F8F9FE`:

```
[ Ícone esquerda ]    [ KINETIC ]    [ espaço vazio ]
```

| Variante | Ícone esquerda |
|---|---|
| Dashboard / telas com drawer | ☰ hamburger, 24px, `#005CEE` |
| Telas empilhadas (detalhe) | ← seta, 22px, `#1A1C29` |
| Telas modais/formulário | ✕ fechar, 24px, `#1A1C29` |

Logo sempre centralizado: Lexend Black 20px, `#005CEE`.

---

### 7.2 Título de página

```
TÍTULO PRINCIPAL          ← Black 40–42px, #1A1C29, MAIÚSCULAS
Subtítulo descritivo      ← Regular 16px, #6B7280
```

Margem inferior antes do conteúdo: 20–30px.

---

### 7.3 Card de treino (Dashboard)

```
┌─────────────────────────────┐
│      [imagem 180px]         │  border-radius top 24px
├─────────────────────────────┤
│  (○) ícone flutuante        │  círculo 50px, cor do esporte,
│                             │  borda branca 4px, sobrepõe imagem
│  TÍTULO DO ESPORTE          │  Black 24px
│  Descrição do treino...     │  Regular 15px, #6B7280
│  [TAG] [TAG]                │  pills coloridas
│  ┌─────────────────────┐    │
│  │     SELECIONAR      │    │  pill, cor do esporte, texto branco
│  └─────────────────────┘    │
└─────────────────────────────┘
```

- Fundo card: `#FFFFFF`, border-radius 24px, margin-bottom 35px
- Padding interno: 24px (top 40px por causa do ícone flutuante)

---

### 7.4 Stat card (Dashboard — grid 2×2)

```
┌──────────────────┐
│ ▌ LABEL          │  linha colorida 4px à esquerda (cor do stat)
│ ▌ 42.5k          │  valor Black 28px
│ ▌ KGS MOVIDOS    │  subtítulo na cor do stat, ExtraBold 10px
└──────────────────┘
```

- Fundo: `#FFFFFF`, border-radius 20px, padding 16px
- Largura: 48% do container

---

### 7.5 Stat card par (telas de detalhe)

Dois cards lado a lado, iguais, sem linha colorida lateral:

```
┌─────────────┐  ┌─────────────┐
│ DURAÇÃO     │  │ CALORIAS    │  label Bold 11px #9CA3AF
│ 60 min      │  │ 450 kcal    │  valor Black 28px, unidade Bold 14px #9CA3AF
└─────────────┘  └─────────────┘
```

---

### 7.6 Card de dica (Coach Tip)

- Fundo: `#005CEE` sólido
- Border-radius: 16px, padding 16–18px
- Header: ícone raio branco + "DICA DE TREINADOR" ExtraBold 11px branco 80% opacity
- Corpo: Regular 14px branco, line-height 22px

---

### 7.7 Card de aquecimento / lista agrupada

Card branco único contendo múltiplos itens separados por linha `#F3F4F6`:

```
┌─────────────────────────────┐
│ 01  Nome do exercício       │  número colorido (verde/laranja) Black 22px
│     2 Sets x 15 Reps        │  detalhe Regular 13px #9CA3AF
│─────────────────────────────│
│ 02  Nome do exercício       │
│     60 Seconds              │
└─────────────────────────────┘
```

---

### 7.8 Card de exercício (detalhe de treino)

```
┌─────────────────────────────┐
│  [imagem 190px, radius 14]  │
│  NOME DO EXERCÍCIO           │  Black 20px MAIÚSCULAS
│  TAG1 • TAG2                 │  ExtraBold 11px #005CEE
│  ┌────┐ ┌────┐ ┌──────────┐ │
│  │SETS│ │REPS│ │ DESCANSO │ │  mini cards #F8F9FE, radius 12px
│  │ 4  │ │8-10│ │   90s    │ │  primeiro com accent bar #005CEE 3px
│  └────┘ └────┘ └──────────┘ │
└─────────────────────────────┘
```

---

### 7.9 Botão primário

| Variante | Estilo |
|---|---|
| Retangular (CTA principal) | Fundo `#005CEE`, radius 16px, padding vertical 18px, texto branco ExtraBold 16px MAIÚSCULAS, sombra azul |
| Pill (cards do Dashboard) | Fundo = cor do esporte, radius 100px, padding vertical 16px, texto branco ExtraBold 15px |
| Começar treino | Igual retangular + ícone ▶ antes do texto |

---

### 7.10 Input card (formulários)

```
┌─────────────────────────────┐
│ LABEL DO CAMPO              │  Bold 12px #9CA3AF MAIÚSCULAS
│ Valor ou placeholder        │  Bold 18px #1A1C29 / placeholder #D1D5DB
└─────────────────────────────┘
```

- Fundo: `#FFFFFF`, border-radius 16px, padding 15px, sombra mínima
- Sem borda visível no input — o card é o container

---

### 7.11 Picker card

Igual input card, mas com valor colorido à esquerda e chevron `˅` cinza à direita:

- Modalidade: valor em `#005CEE` Bold 20px
- Dificuldade: valor em `#F26522` Bold 20px

---

### 7.12 Slider

- Container: card branco, border-radius 16px, padding 20px
- Header: label à esquerda + valor numérico à direita (azul `#005CEE` ou escuro `#1A1C29`)
- Track: altura 8px, fundo `#F3F4F6`, radius 4px
- Fill: cor ativa (azul ou laranja)
- Thumb: círculo 24px branco, borda 4px na cor ativa

---

### 7.13 Switch (preferências)

Card branco com título + subtítulo à esquerda, switch à direita:

```
┌─────────────────────────────────────┐
│ Título da preferência          [○─] │  Bold 16px #1A1C29
│ Subtítulo explicativo               │  Regular 12px #9CA3AF
└─────────────────────────────────────┘
```

- Switch ativo: track `#82E53A`
- Switch inativo: track `#E5E7EB`
- Thumb: círculo branco 24px

---

### 7.14 Tags / chips

**Tag de esporte (pill no card):**
- Padding: 6px 12px, border-radius 12px
- Texto: ExtraBold 10px, letter-spacing 0.5px
- Cores conforme tabela de modalidades

**Chip de filtro (Biblioteca):**
- Ativo: fundo `#005CEE`, texto branco Bold 12px, radius 100px
- Inativo: fundo `#FFFFFF`, borda `#F3F4F6`, texto `#6B7280`

---

### 7.15 Barra de busca

- Card branco, border-radius 16px, padding 14px 16px
- Ícone lupa `#9CA3AF` à esquerda
- Placeholder Regular 16px `#D1D5DB`

---

### 7.16 Card de lista (Biblioteca)

Row horizontal dentro de card branco:

```
┌─────────────────────────────────────┐
│ (○)  NOME DO EXERCÍCIO          >   │
│      Categoria                      │
└─────────────────────────────────────┘
```

- Ícone: círculo 44px `#E6F0FF` com haltere `#005CEE`
- Nome: Black 16px MAIÚSCULAS
- Categoria: Regular 12px `#9CA3AF`
- Chevron: `>` cinza `#9CA3AF`

---

### 7.17 Drawer (menu lateral)

Painel branco ~70% da largura, deslizando da esquerda:

**Cabeçalho** (fundo `#F8F9FE`, border-bottom `#F3F4F6`):
- Avatar círculo 48px `#005CEE` com inicial branca
- "Olá, Atleta!" Regular 14px `#6B7280`
- Nome do usuário Black 18px `#1A1C29`

**Itens de menu:**
- Ativo: fundo `#005CEE`, radius 12px, ícone + texto brancos Bold 16px
- Inativo: sem fundo, ícone `#9CA3AF`, texto `#6B7280` Bold 16px
- Sair: ícone + texto `#EF4444` (sem fundo)

**Rodapé:** "KINETIC v1.0" 10px `#9CA3AF` centralizado

---

### 7.18 Bottom sheet (picker modal)

- Overlay: `rgba(0,0,0,0.5)`
- Painel: fundo branco, border-top-radius 24px, padding 20px
- Título: Bold 18px `#1A1C29` centralizado
- Opções: texto `#005CEE` Bold 18px, separadas por linha `#F3F4F6`
- Cancelar: fundo `#F3F4F6`, radius 12px, texto `#EF4444` Bold 16px

---

### 7.19 Loading

- `ActivityIndicator` tamanho large, cor `#005CEE`
- Centralizado na área de conteúdo
- Texto opcional abaixo: Regular 14px `#9CA3AF` ("Carregando...")
- Fundo da tela permanece `#F8F9FE` — sem overlay escuro

---

## 8. Padrões de tela

### 8.1 Dashboard (Tela Principal)

1. Header ☰ + KINETIC
2. Título "ESCOLHA SEU TREINO" + subtítulo
3. Lista vertical de cards de esporte (com imagem)
4. Seção "ESTATÍSTICAS ÚLTIMOS 7 DIAS" + grid 2×2
5. **Sem bottom navigation bar**

### 8.2 Detalhe de treino

1. Header ← + KINETIC
2. Título do esporte + subtítulo
3. Row 2 stat cards (duração, calorias)
4. Card dica do treinador (azul)
5. Seção AQUECIMENTO (lista agrupada)
6. Cards de exercícios (repetidos)
7. Botão "▶ COMEÇAR TREINO"
8. **Sem bottom navigation bar**

### 8.3 Formulário (Criar Treino / Perfil)

1. Header ✕ ou ☰ + KINETIC
2. Título + subtítulo
3. Seções com label MAIÚSCULA cinza
4. Input cards, pickers, sliders, switches
5. Botão SALVAR no final

### 8.4 Login / Registro

1. Header apenas KINETIC (sem ícone lateral)
2. Título "BEM-VINDO" + subtítulo
3. Card com campos email e senha
4. Botão ENTRAR
5. Link "Criar conta" / "Entrar"

### 8.5 Biblioteca de exercícios

1. Header ☰ + KINETIC
2. Título "BIBLIOTECA" + subtítulo
3. Barra de busca
4. Chips de filtro horizontal
5. Label "EXERCÍCIOS"
6. Lista de cards compactos

### 8.6 Detalhe de exercício (API)

1. Header ← + KINETIC
2. Imagem ou placeholder
3. Nome + tags
4. Card de instruções (azul, igual dica de treinador)
5. Row 2 stat cards (categoria, equipamento)

---

## 9. Navegação

| Padrão | Status |
|---|---|
| Drawer lateral (☰) | **Usar** — navegação principal entre Início, Biblioteca, Perfil |
| Stack (empilhamento) | **Usar** — Dashboard → detalhes, Biblioteca → detalhe |
| Bottom tab bar com FAB | **Não usar** — removido do app |
| Tab bar inferior | **Não usar** |

---

## 10. Ícones

- Estilo: **lineares/simples**, consistentes com app fitness
- Tamanhos: 16px (inline), 22–24px (header/ações), 44–50px (círculos de destaque)
- Cores: seguem contexto (`#005CEE` ativo, `#9CA3AF` inativo, `#1A1C29` ações neutras, `#FFFFFF` sobre fundos coloridos)
- Ícones do projeto: haltere, corrida, ciclismo, futebol, vôlei, natação, raio, seta, perfil, adicionar

---

## 11. O que NÃO fazer

- Não usar dark mode
- Não usar gradientes no fundo
- Não usar fontes além de Lexend
- Não usar cores fora da paleta definida
- Não adicionar bottom navigation bar ou tab bar
- Não usar ilustrações grandes ou mascotes
- Não usar login social (Google/Apple) nas telas — apenas email/senha
- Não usar skeleton screens elaborados — apenas ActivityIndicator simples
- Não misturar estilos de ícones (filled vs outline) na mesma tela
- Não usar texto em inglês — tudo em português brasileiro
- Não adicionar elementos de desktop (sidebars largas, hover states)
- Não usar avaliações por estrelas, comentários ou feeds sociais

---

## 12. Checklist de validação

Ao gerar qualquer tela, verificar:

- [ ] Fundo `#F8F9FE`
- [ ] Fonte Lexend em todos os textos
- [ ] Logo "KINETIC" no header quando aplicável
- [ ] Títulos em MAIÚSCULAS com Lexend Black
- [ ] Cards brancos com border-radius 16–24px
- [ ] Botões primários `#005CEE` com sombra azul suave
- [ ] Labels de seção cinza `#9CA3AF` MAIÚSCULAS
- [ ] Padding horizontal 20px
- [ ] Textos em português brasileiro
- [ ] Sem bottom navigation bar
- [ ] Visual consistente com as telas regentes do projeto

---

## 13. Telas regentes (referência visual)

Estas telas já existem no código e definem o padrão visual. Toda tela nova deve parecer pertencer ao mesmo app:

| Tela | Arquivo | Papel |
|---|---|---|
| Dashboard | `App.js` | Cards de esporte, stats, header |
| Detalhe de treino | `TreinoMusculacao.js` | Exercícios, dicas, stats, aquecimento |
| Criar treino | `CriarTreino.js` | Formulários, inputs, sliders, switches |

**Telas a gerar** (seguir este design system): Login, Perfil, Drawer, Biblioteca, Detalhe de exercício.

**Telas que não precisam ser geradas:** DetalhesTreino (cópia de TreinoMusculacao), CriarTreino (já existe).
