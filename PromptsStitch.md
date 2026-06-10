# Prompts Stitch — Interfaces KINETIC

Prompts para geração das telas restantes no **Stitch**, extraídos do design system das telas regentes (`App.js`, `TreinoMusculacao.js`, `CriarTreino.js`).

---

## Como usar no Stitch

1. **Anexe como referência visual** (screenshot ou export) estas telas já existentes:
   - Dashboard (`App.js`)
   - Detalhe de treino (`TreinoMusculacao.js`)
   - Criar treino (`CriarTreino.js`)

2. **Cole o Bloco Global** no início de cada prompt.

3. **Gere uma tela por vez** — não peça várias telas no mesmo prompt.

4. **Não precisa gerar** `DetalhesTreino` — será igual a `TreinoMusculacao`, só mudando título/cor.

5. **Formato:** mobile portrait, iPhone 14 Pro (390×844), sem moldura de dispositivo.

---

## Bloco Global — Design System KINETIC (copiar em todos os prompts)

```
DESIGN SYSTEM OBRIGATÓRIO — App fitness "KINETIC" (React Native, mobile portrait 390x844px):

TIPOGRAFIA: Fonte "Lexend" exclusivamente. Pesos: Regular (corpo), Bold (labels), ExtraBold (seções/tags), Black (títulos e números grandes). Títulos principais em MAIÚSCULAS.

PALETA DE CORES (usar APENAS estas):
- Fundo da tela: #F8F9FE (cinza-azulado muito claro)
- Fundo de cards: #FFFFFF
- Texto principal: #1A1C29
- Texto secundário/corpo: #6B7280
- Labels de seção/desabilitado: #9CA3AF
- Placeholder inputs: #D1D5DB
- Cor primária (botões, logo, destaques): #005CEE (azul royal)
- Cor secundária laranja: #FF6B22 / #F26522
- Cor verde: #82E53A
- Cor amarela: #FFB300
- Bordas/divisores: #F3F4F6
- Erro/cancelar: #EF4444

ESTILO VISUAL:
- Minimalista, limpo, muito espaço em branco
- Cards brancos com border-radius 16-24px e sombra suave (elevation leve)
- Botões primários: fundo #005CEE, texto branco, border-radius 16px (ou 100px se pill), sombra azul suave
- Labels de seção: texto pequeno (~12px), cor #9CA3AF, MAIÚSCULAS, letter-spacing largo
- Títulos de página: ~40-42px, Lexend Black, cor #1A1C29, MAIÚSCULAS
- Padding horizontal padrão: 20px
- Header fixo: linha com 3 colunas (ícone esquerda | logo "KINETIC" centralizado | espaço direita). Logo: Lexend Black 20px, cor #005CEE, letter-spacing 1

O QUE NÃO INCLUIR (proibido):
- Bottom navigation bar com FAB central (será removida do app)
- Tab bar inferior
- Gradientes coloridos no fundo
- Fontes diferentes de Lexend
- Cores fora da paleta acima
- Elementos de desktop ou web
- Ícones genéricos de outro estilo — usar ícones lineares/simples consistentes com fitness app
- Texto em idioma diferente de português brasileiro
- Dark mode
```

**Linha de validação** (adicionar ao final de cada prompt):

```
VALIDAÇÃO: A tela deve parecer que pertence ao MESMO app das referências anexadas. Se qualquer cor, fonte ou componente não corresponder ao design system KINETIC descrito acima, a geração está incorreta.
```

---

## Prompt 1 — Tela de Login / Registro

**Referências anexar:** Dashboard + CriarTreino

```
[COLE O BLOCO GLOBAL ACIMA]

TELA: Login e Registro — app KINETIC fitness.
Anexe como referência visual o Dashboard e a tela Criar Treino do mesmo app para manter consistência.

LAYOUT (de cima para baixo, centralizado verticalmente na área útil):

1. HEADER: igual às outras telas — sem botão voltar. Apenas logo "KINETIC" centralizado em #005CEE, Lexend Black 20px. Fundo #F8F9FE.

2. ÁREA CENTRAL (padding horizontal 20px):
   - Título grande: "BEM-VINDO" — Lexend Black 40px, #1A1C29, MAIÚSCULAS
   - Subtítulo: "Entre na sua conta para continuar seus treinos" — Lexend Regular 16px, #6B7280, abaixo do título com 10px de margem

3. CARD DE FORMULÁRIO (fundo #FFFFFF, border-radius 16px, padding 20px, sombra suave, margin-top 30px):
   - Label "EMAIL" — 12px Bold, #9CA3AF, MAIÚSCULAS, letter-spacing
   - Campo de texto: placeholder "seu@email.com", texto 18px Bold #1A1C29, sem borda visível, apenas linha inferior ou fundo transparente dentro do card
   - Espaço 15px
   - Label "SENHA" — mesmo estilo
   - Campo de texto: placeholder "••••••••", texto mascarado

4. BOTÃO PRIMÁRIO (largura total, margin-top 24px):
   - Texto: "ENTRAR"
   - Fundo #005CEE, texto branco Lexend ExtraBold 16px, border-radius 16px, padding vertical 18px, sombra azul

5. LINK SECUNDÁRIO (centralizado, margin-top 20px):
   - Texto: "Não tem conta? Criar conta"
   - "Criar conta" em #005CEE Bold, resto em #6B7280 Regular 14px

6. RODAPÉ OPCIONAL (bem discreto, margin-top 40px, centralizado):
   - Texto pequeno #9CA3AF 12px: "Ao continuar, você concorda com os termos de uso"

ESTADO ALTERNATIVO (mostrar como segunda variação OU anotar no canto):
- Mesma tela com título "CRIAR CONTA" e botão "REGISTRAR" em vez de "ENTRAR"
- Link inferior: "Já tem conta? Entrar"

NÃO incluir: bottom nav, drawer, imagens de fundo, ilustrações grandes, login social (Google), biometria.

VALIDAÇÃO: A tela deve parecer que pertence ao MESMO app das referências anexadas. Se qualquer cor, fonte ou componente não corresponder ao design system KINETIC descrito acima, a geração está incorreta.
```

---

## Prompt 2 — Tela de Perfil / Configurações

**Referências anexar:** CriarTreino

```
[COLE O BLOCO GLOBAL ACIMA]

TELA: Perfil e Configurações — app KINETIC fitness.
Referência visual: tela Criar Treino (mesmos cards de input, switches e seções).

LAYOUT:

1. HEADER: ícone hamburger ☰ à esquerda em #005CEE (24px) | logo "KINETIC" centralizado #005CEE | espaço vazio à direita. Fundo #F8F9FE.

2. SCROLL (padding horizontal 20px):

   TÍTULO:
   - "MEU PERFIL" — Lexend Black 40px, #1A1C29, MAIÚSCULAS
   - Subtítulo: "Gerencie seus dados e preferências" — Regular 16px, #6B7280

   SEÇÃO AVATAR (card branco border-radius 16px, padding 20px, margin-top 20px, flexDirection row, alignItems center):
   - Círculo 64px fundo #E6F0FF com ícone de pessoa ou inicial "L" em #005CEE
   - À direita: nome "Lucas Silva" Bold 18px #1A1C29 + email "lucas@email.com" Regular 13px #9CA3AF

   SEÇÃO "DADOS PESSOAIS" (label seção 12px ExtraBold #9CA3AF MAIÚSCULAS letter-spacing, margin-top 30px):
   - Card input: label "NOME" + valor "Lucas Silva" em TextInput style (18px Bold #1A1C29)
   - Card input: label "NÍVEL DE EXPERIÊNCIA" + picker style igual CriarTreino: valor "Intermediário" em #005CEE Bold 20px + chevron ˅ à direita, card branco border-radius 16px padding 18px

   SEÇÃO "PREFERÊNCIAS" (label seção igual acima):
   - Card preferência (igual CriarTreino): título "Notificações de Treino" Bold 16px #1A1C29 + subtítulo "Me lembre de fazer meus treinos" 12px #9CA3AF + switch à direita ATIVO cor verde #82E53A
   - Card preferência: título "Treino com parceiro" + subtítulo "Compartilhe métricas" + switch INATIVO cinza #E5E7EB

   BOTÃO SALVAR (margin-top 20px, margin-bottom 40px):
   - "SALVAR ALTERAÇÕES" — fundo #005CEE, texto branco ExtraBold 16px, border-radius 16px, padding 18px, largura total, sombra azul

NÃO incluir: bottom nav, FAB, campos de senha, foto upload com câmera complexa.

VALIDAÇÃO: A tela deve parecer que pertence ao MESMO app das referências anexadas. Se qualquer cor, fonte ou componente não corresponder ao design system KINETIC descrito acima, a geração está incorreta.
```

---

## Prompt 3 — Menu Drawer Lateral (parcial, sobre o Dashboard)

**Referências anexar:** Dashboard

```
[COLE O BLOCO GLOBAL ACIMA]

TELA: Menu Drawer lateral aberto — app KINETIC fitness.
IMPORTANTE: mostrar o Dashboard parcialmente visível à direita (~30% da tela) com overlay escuro sutil, e o drawer ocupando ~70% da largura deslizando da esquerda.

REFERÊNCIA: anexar screenshot do Dashboard como fundo parcial.

DRAWER PANEL (fundo #FFFFFF, largura ~70%, altura total, sombra à direita):

1. CABEÇALHO DO DRAWER (padding 24px, fundo #F8F9FE, border-bottom #F3F4F6):
   - Círculo avatar 48px fundo #005CEE com inicial branca "L"
   - Texto "Olá, Atleta!" Regular 14px #6B7280
   - Nome "Lucas Silva" Black 18px #1A1C29 abaixo

2. ITENS DE MENU (padding horizontal 16px, margin-top 20px):

   ITEM ATIVO "Início":
   - Fundo #005CEE, border-radius 12px, padding vertical 14px padding horizontal 16px
   - Ícone casa branco à esquerda + texto "Início" Bold 16px branco

   ITEM INATIVO "Biblioteca":
   - Sem fundo colorido, padding igual
   - Ícone haltere/crossfit cinza #9CA3AF + texto "Biblioteca" Bold 16px #6B7280

   ITEM INATIVO "Perfil":
   - Ícone pessoa cinza #9CA3AF + texto "Perfil" Bold 16px #6B7280

   DIVISOR linha #F3F4F6 margin vertical 16px

   ITEM "Sair":
   - Ícone porta/saída cor #EF4444 + texto "Sair" Bold 16px #EF4444
   - SEM fundo colorido

3. RODAPÉ DO DRAWER (absolute bottom, padding 24px):
   - Texto "KINETIC v1.0" 10px #9CA3AF centralizado

À DIREITA (área não coberta): fragmento visível do Dashboard — header com ☰, parte do título "ESCOLHA SEU TREINO", topo de um card de treino com imagem.

NÃO incluir: bottom navigation bar, mais de 4 itens de menu, ícones coloridos diferentes por item (exceto Sair em vermelho).

VALIDAÇÃO: A tela deve parecer que pertence ao MESMO app das referências anexadas. Se qualquer cor, fonte ou componente não corresponder ao design system KINETIC descrito acima, a geração está incorreta.
```

---

## Prompt 4 — Biblioteca de Exercícios (Lista + Filtro)

**Referências anexar:** Dashboard + TreinoMusculação

```
[COLE O BLOCO GLOBAL ACIMA]

TELA: Biblioteca de Exercícios — lista com busca e filtro — app KINETIC fitness.
Referência: cards brancos do Dashboard e lista de aquecimento da tela Treino Musculação.

LAYOUT:

1. HEADER: ☰ hamburger #005CEE esquerda | "KINETIC" centro #005CEE | espaço direita

2. TÍTULO (padding 20px):
   - "BIBLIOTECA" — Black 40px #1A1C29 MAIÚSCULAS
   - Subtítulo: "Explore exercícios reais para complementar seus treinos" — Regular 16px #6B7280

3. BARRA DE BUSCA (margin horizontal 20px, margin-bottom 16px):
   - Card branco border-radius 16px, padding 14px 16px, ícone lupa cinza #9CA3AF à esquerda
   - Placeholder "Buscar exercício..." Regular 16px #D1D5DB

4. CHIPS DE FILTRO POR CATEGORIA (scroll horizontal, padding horizontal 20px, margin-bottom 20px):
   - Chip ATIVO: "Todos" — fundo #005CEE, texto branco Bold 12px, border-radius 100px, padding 8px 16px
   - Chips inativos: "Peito", "Pernas", "Costas", "Ombros" — fundo #FFFFFF, borda #F3F4F6, texto #6B7280 Bold 12px, border-radius 100px

5. LABEL SEÇÃO: "EXERCÍCIOS" — 12px ExtraBold #9CA3AF MAIÚSCULAS letter-spacing, padding horizontal 20px, margin-bottom 12px

6. LISTA DE CARDS (3 itens visíveis, padding horizontal 20px):

   Cada card (fundo #FFFFFF, border-radius 16px, padding 16px, margin-bottom 12px, sombra suave, flexDirection row, alignItems center):
   - À esquerda: círculo 44px fundo #E6F0FF com ícone haltere #005CEE
   - Centro (flex 1): nome exercício Black 16px #1A1C29 MAIÚSCULAS + categoria "Peito" Regular 12px #9CA3AF abaixo
   - À direita: chevron > cinza #9CA3AF

   Itens de exemplo (usar EXATAMENTE estes textos):
   - "SUPINO RETO" / "Peito"
   - "AGACHAMENTO LIVRE" / "Pernas"
   - "REMADA CURVADA" / "Costas"

7. NÃO mostrar estado de loading nesta imagem — apenas lista populada.

NÃO incluir: imagens grandes por exercício na lista, bottom nav, FAB, paginação, estrelas de avaliação.

VALIDAÇÃO: A tela deve parecer que pertence ao MESMO app das referências anexadas. Se qualquer cor, fonte ou componente não corresponder ao design system KINETIC descrito acima, a geração está incorreta.
```

---

## Prompt 5 — Biblioteca: Estado de Loading

**Referências anexar:** nenhuma obrigatória

```
[COLE O BLOCO GLOBAL ACIMA]

TELA: Estado de carregamento — Biblioteca de Exercícios — app KINETIC.

Mesmo header e título da tela Biblioteca:
- Header com ☰ e "KINETIC"
- Título "BIBLIOTECA" + subtítulo visíveis no topo

ÁREA CENTRAL (ocupando o restante da tela, centralizado vertical e horizontalmente):
- ActivityIndicator circular grande cor #005CEE
- Abaixo (margin-top 16px): texto "Carregando exercícios..." Regular 14px #9CA3AF

O restante da tela vazio — fundo #F8F9FE. Sem lista, sem cards, sem skeleton screens elaborados.

NÃO incluir: bottom nav, barra de progresso linear, animações complexas.

VALIDAÇÃO: A tela deve parecer que pertence ao MESMO app das referências anexadas. Se qualquer cor, fonte ou componente não corresponder ao design system KINETIC descrito acima, a geração está incorreta.
```

---

## Prompt 6 — Detalhe do Exercício (API Wger)

**Referências anexar:** TreinoMusculação

```
[COLE O BLOCO GLOBAL ACIMA]

TELA: Detalhe de um exercício — app KINETIC fitness.
Referência visual: cards de exercício da tela Treino Musculação (imagem arredondada no topo, tags, layout limpo).

LAYOUT:

1. HEADER: seta ← voltar à esquerda (ícone seta #1A1C29, 22px) | logo "KINETIC" centro #005CEE | espaço direita

2. SCROLL (padding 20px):

   IMAGEM PLACEHOLDER (opcional, pode ser ícone grande):
   - Retângulo border-radius 20px, altura 200px, fundo #E6F0FF centralizado com ícone haltere grande #005CEE
   - OU foto genérica de academia em border-radius 20px

   NOME DO EXERCÍCIO:
   - "SUPINO RETO" — Black 28px #1A1C29 MAIÚSCULAS, margin-top 16px

   TAGS (flexDirection row):
   - Tag pill: fundo #E6F0FF, texto "PEITO" ExtraBold 10px #005CEE, border-radius 12px, padding 6px 12px
   - Tag pill: fundo #FFF0E6, texto "BARRA" ExtraBold 10px #FF6B22

   CARD DICA (igual "Dica de Treinador" da tela Musculação):
   - Fundo #005CEE, border-radius 16px, padding 16px
   - Header: ícone raio branco + "INSTRUÇÕES" ExtraBold 11px branco 80% opacity letter-spacing
   - Texto corpo branco Regular 14px line-height 22px:
     "Deite no banco com os pés apoiados no chão. Desça a barra controladamente até o peito e empurre de volta à posição inicial mantendo os cotovelos em ângulo de 45 graus."

   SEÇÃO "DETALHES" (label 12px ExtraBold #9CA3AF MAIÚSCULAS letter-spacing, margin-top 24px):

   Row de 2 mini stat cards (igual DURAÇÃO/CALORIAS da tela Musculação):
   - Card 1: label "CATEGORIA" + valor "Peito" Black 28px
   - Card 2: label "EQUIPAMENTO" + valor "Barra" Black 28px
   - Cards: fundo #FFFFFF, border-radius 16px, padding 16px, sombra suave

NÃO incluir: botão "Começar Treino", bottom nav, vídeo, comentários, avaliações por estrelas, botão favoritar.

VALIDAÇÃO: A tela deve parecer que pertence ao MESMO app das referências anexadas. Se qualquer cor, fonte ou componente não corresponder ao design system KINETIC descrito acima, a geração está incorreta.
```

---

## Prompt 7 — Dashboard atualizado (sem bottom nav) — OPCIONAL

**Referências anexar:** Dashboard atual

```
[COLE O BLOCO GLOBAL ACIMA]

TELA: Dashboard principal — app KINETIC fitness.
COPIAR FIELMENTE a tela Dashboard existente (anexar como referência) com UMA ÚNICA MUDANÇA:

REMOVER completamente a bottom navigation bar (barra inferior branca com TRAIN, FAB +, PROFILE).

Manter exatamente:
- Header ☰ + KINETIC
- Título "ESCOLHA SEU TREINO" + subtítulo
- Cards de treino com imagem, ícone flutuante colorido, tags pill, botão SELECIONAR pill colorido
- Seção "ESTATÍSTICAS ÚLTIMOS 7 DIAS" com grid 2x2 de stat cards com linha colorida lateral

Ajustar padding inferior do scroll para ~30px já que não há mais bottom nav.

NÃO adicionar: drawer aberto, bottom nav, tab bar, novos elementos.

VALIDAÇÃO: A tela deve parecer que pertence ao MESMO app das referências anexadas. Se qualquer cor, fonte ou componente não corresponder ao design system KINETIC descrito acima, a geração está incorreta.
```

---

## Tabela de referência rápida

| Tela a gerar | Prompt | Referência anexar no Stitch |
|---|---|---|
| Login/Registro | #1 | Dashboard + CriarTreino |
| Perfil | #2 | CriarTreino |
| Drawer | #3 | Dashboard |
| Biblioteca (lista) | #4 | Dashboard + TreinoMusculação |
| Biblioteca (loading) | #5 | — |
| Detalhe exercício | #6 | TreinoMusculação |
| Dashboard sem bottom nav | #7 (opcional) | Dashboard atual |

### Telas que NÃO precisam ser geradas

| Tela | Motivo |
|---|---|
| DetalhesTreino | Idêntica a `TreinoMusculacao.js` |
| CriarTreino | Já existe |
| Dashboard com bottom nav | Bottom nav será removida na Fase 1 |
