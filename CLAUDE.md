# CLAUDE.md — KINETIC (FitnessApp)

Contexto do projeto para assistentes de IA. Leia este arquivo antes de implementar qualquer mudança.

---

## Visão geral

**KINETIC** é um app mobile de fitness desenvolvido em **React Native + Expo** para a disciplina de Programação para Dispositivos Móveis. O app permite escolher modalidades esportivas, visualizar treinos detalhados e criar treinos customizados.

| Item | Valor |
|---|---|
| Nome do pacote | `fitnessapp` |
| Expo SDK | 55 |
| React | 19.2.0 |
| React Native | 0.83.2 |
| Idioma da UI | Português brasileiro (PT-BR) |
| Plataforma alvo | Mobile (Expo Go / emulador) |

---

## Comandos

```bash
npm install              # Instalar dependências
npx expo start           # Dev server (QR Code / emulador)
npx expo start --android
npx expo start --ios
npx expo start --web
```

**Instalar dependências nativas/Expo** — sempre usar `npx expo install <pacote>`, nunca `npm install` direto para libs RN/Expo (garante compatibilidade com SDK 55).

**Não existe** script de testes, lint ou typecheck configurado. Não inventar tooling sem solicitação.

---

## Documentação de referência (ler antes de codar)

| Arquivo | Conteúdo |
|---|---|
| `PlanejamentoMudancas.md` | Roadmap de implementação por fases (ordem obrigatória) |
| `DESIGN.md` | Design system completo (cores, tipografia, componentes) |
| `PromptsStitch.md` | Referência visual das telas a criar |
| `README.md` | Visão geral e setup básico |

**Prioridade:** `PlanejamentoMudancas.md` define *o que* e *em que ordem* implementar. `DESIGN.md` define *como* deve parecer.

---

## Estado atual vs. estado alvo

### Já implementado

- Dashboard monolítico em `App.js` (~530 linhas)
- 6 telas de modalidade em `src/screens/Treino*.js` (código duplicado)
- Formulário `src/screens/CriarTreino.js`
- Navegação via `<Modal>` + estados booleanos no `App.js`
- Animação slide-in/out com `Animated` API (duplicada em cada tela de treino)
- Fonte Lexend via `@expo-google-fonts/lexend`
- Ícones SVG em `Icons/` (importados como componentes React)
- `firebaseConfig.js` existe mas está **vazio**
- **Sem** React Navigation, Firebase, API externa, Login, Perfil, Drawer

### Estado alvo (ver `PlanejamentoMudancas.md`)

```
App.js (enxuto)
├── Auth Stack → LoginScreen
└── App Drawer
    ├── Início → Home Stack (Dashboard, CriarTreino, DetalhesTreino)
    ├── Biblioteca → Biblioteca Stack (Lista, Detalhe)
    └── Perfil → PerfilScreen
```

Implementar **seguindo as fases 0→8** do planejamento. Não pular fases.

---

## Estrutura de arquivos

### Atual

```
FitnessApp/
├── App.js                    # Dashboard + modais (será refatorado)
├── firebaseConfig.js         # Config Firebase (vazio)
├── index.js                  # Entry point Expo
├── metro.config.js           # SVG transformer
├── Icons/                    # SVGs importados como componentes
├── assets/                   # Ícones/splash Expo
└── src/screens/              # Telas de treino e CriarTreino
```

### Alvo (criar conforme fases)

```
src/
├── hooks/          useScreenAnimation.js, useWgerExercises.js
├── navigation/     AuthStack, AppDrawer, HomeStack, BibliotecaStack
├── screens/        Dashboard, Login, Perfil, DetalhesTreino, Biblioteca...
├── components/     CustomDrawerContent, LoadingOverlay
├── data/           treinos.js, exerciciosPorEsporte.js
└── utils/          wgerApi.js, stripHtml.js
```

---

## Requisitos acadêmicos obrigatórios

Todo código deve cumprir estes critérios da disciplina:

| Requisito | Como cumprir |
|---|---|
| Componentes funcionais apenas | **Proibido** usar classes React |
| `useState` | Em telas e hooks |
| `useEffect` | Em telas e hooks (auth listener, fetch, animação) |
| Custom hook (≥1) | `useScreenAnimation`, `useWgerExercises` |
| React Navigation | Stack + Drawer, ≥3 telas principais |
| Loading | `ActivityIndicator` + estado booleano com `useState` |
| 4 telas mínimas | Login, Dashboard, Detalhes, Perfil |
| API pública | Wger (`/exercise/` + `/exerciseinfo/`) com lista e filtro |
| Firebase Auth | Email/senha (prioridade) |
| Firestore | Perfil, treinos customizados |

---

## Decisões técnicas fixas (não alterar sem pedido explícito)

1. **Animação custom mantida** — Stack Navigator com `animationEnabled: false`; transição slide via `useScreenAnimation`
2. **Firebase SDK JS** (`firebase`) — compatível com Expo managed; **não** usar `@react-native-firebase`
3. **Auth email/senha** — Google Sign-In é opcional/baixa prioridade
4. **Wger API** — listagem em `/api/v2/exercise/`; descrições em `/api/v2/exerciseinfo/` (endpoints separados); `language=2` para PT-BR
5. **Sem bottom navigation bar** — navegação global via Drawer lateral
6. **DetalhesTreino unificada** — uma tela dinâmica com `route.params`, não 6 arquivos separados
7. **App.js enxuto** — apenas fonts, auth listener e navegador raiz

---

## Convenções de código

### Geral

- **Minimizar escopo** — mudanças focadas; não refatorar código não relacionado à tarefa
- **Reutilizar** padrões existentes antes de criar abstrações novas
- **Sem over-engineering** — não criar helpers de uma linha, wrappers desnecessários ou error handling excessivo
- **Comentários** — apenas para lógica não óbvia; código deve ser autoexplicativo
- **Sem testes** — não adicionar a menos que solicitado
- **Sem commits** — só commitar quando o usuário pedir explicitamente
- **Não criar arquivos .md** — a menos que solicitado

### React / React Native

- Componentes funcionais com `export default function NomeComponente`
- Estilos via `StyleSheet.create()` no final do arquivo (padrão do projeto)
- Importar SVGs como componentes: `import Icon from './Icons/Icon.svg'`
- Usar `SafeAreaView` como container de tela
- StatusBar: `barStyle="dark-content"`, `backgroundColor="#F8F9FE"`
- Listas longas: `FlatList`; conteúdo scrollável curto: `ScrollView`
- Navegação: `useNavigation()` e `route.params` — **não** usar props `fechar` após migração

### Nomenclatura

| Tipo | Convenção | Exemplo |
|---|---|---|
| Telas | PascalCase + sufixo descritivo | `LoginScreen.js`, `DetalhesTreino.js` |
| Hooks | camelCase com prefixo `use` | `useScreenAnimation.js` |
| Dados estáticos | camelCase | `exerciciosPorEsporte.js` |
| Componentes | PascalCase | `CustomDrawerContent.js` |
| Variáveis/funções | camelCase em português ou inglês técnico | `carregando`, `handleFechar` |
| Textos de UI | Português, MAIÚSCULAS em títulos | `"ESCOLHA SEU TREINO"` |

### Design (resumo — detalhes em `DESIGN.md`)

| Token | Valor |
|---|---|
| Fundo tela | `#F8F9FE` |
| Cards | `#FFFFFF`, border-radius 16–24px |
| Texto principal | `#1A1C29` |
| Texto secundário | `#6B7280` |
| Labels | `#9CA3AF` |
| Primária | `#005CEE` |
| Fonte | Lexend (400, 700, 800, 900) |
| Padding horizontal | 20px |

**Ao criar UI:** seguir `DESIGN.md` fielmente. Não inventar cores, fontes ou layouts.

---

## Padrões de implementação

### Header padrão (3 colunas)

```
[ ícone esquerda ]    [ KINETIC ]    [ espaço vazio ]
```

- Dashboard/Drawer: `☰` em `#005CEE`
- Telas empilhadas: `←` em `#1A1C29`
- Formulários: `✕` em `#1A1C29`
- Logo: Lexend Black 20px, `#005CEE`, letter-spacing 1

### Custom hook de animação

```js
// src/hooks/useScreenAnimation.js
// Retorna { slideAnim, handleClose }
// Slide-in: 320ms, slide-out: 260ms, useNativeDriver: true
// handleClose anima e depois chama onClose (navigation.goBack)
```

Usar em `DetalhesTreino` e `CriarTreino`. Stack com `animationEnabled: false`.

### Loading pattern

```js
const [carregando, setCarregando] = useState(true);

useEffect(() => {
  async function carregar() {
    setCarregando(true);
    try {
      // fetch / firebase
    } catch (e) {
      Alert.alert('Erro', '...');
    } finally {
      setCarregando(false);
    }
  }
  carregar();
}, []);

if (carregando) {
  return <ActivityIndicator size="large" color="#005CEE" />;
}
```

### Firebase Auth no App.js

```js
const [usuario, setUsuario] = useState(null);
const [authCarregando, setAuthCarregando] = useState(true);

useEffect(() => {
  return onAuthStateChanged(auth, (user) => {
    setUsuario(user);
    setAuthCarregando(false);
  });
}, []);
```

### Wger API

```js
// Listagem
GET https://wger.de/api/v2/exercise/?language=2&limit=50

// Descrição (por exercício)
GET https://wger.de/api/v2/exerciseinfo/?exercise={id}&language=2

// Categorias
GET https://wger.de/api/v2/exercisecategory/
```

Descrições vêm com HTML — limpar com `stripHtml.js` antes de exibir em `<Text>`.

### Importação de SVG

Metro está configurado em `metro.config.js` com `react-native-svg-transformer`. SVGs em `Icons/` são importados como componentes React:

```js
import DumbellIcon from './Icons/DumbellIcon.svg';
<DumbellIcon width={24} height={24} fill="#FFFFFF" />
```

---

## Anti-padrões (não fazer)

- Usar classes React
- Adicionar bottom tab bar ou FAB central
- Usar `@react-native-firebase` (incompatível com Expo managed sem eject)
- Assumir que `/exercise/` retorna `description` (vem de `/exerciseinfo/`)
- Manter 6 arquivos `Treino*.js` após unificação em `DetalhesTreino`
- Deixar `App.js` monolítico após Fase 0
- Usar `npm install` para pacotes Expo/RN (usar `npx expo install`)
- Commitar `firebaseConfig.js` com chaves reais se o usuário não pediu
- Inventar telas, cores ou componentes fora do `DESIGN.md`
- Adicionar TypeScript (projeto é JavaScript puro)
- Criar testes, Storybook, CI ou lint sem solicitação

---

## Fluxo de trabalho recomendado para IA

1. **Identificar a fase** atual em `PlanejamentoMudancas.md`
2. **Ler** `DESIGN.md` se a tarefa envolve UI
3. **Ler** arquivos existentes similares antes de criar novos (ex: `TreinoMusculacao.js` antes de `DetalhesTreino.js`)
4. **Implementar** apenas as etapas da fase atual
5. **Verificar** requisitos acadêmicos da tabela acima
6. **Marcar** checkboxes no `PlanejamentoMudancas.md` se o usuário pedir
7. **Não commitar** a menos que solicitado

---

## Dependências planejadas (ainda não instaladas)

Instalar na Fase 0 via `npx expo install`:

```
@react-navigation/native
@react-navigation/stack
@react-navigation/drawer
react-native-screens
react-native-safe-area-context
react-native-gesture-handler
react-native-reanimated
firebase
```

Após instalar `react-native-reanimated`, adicionar em `babel.config.js`:

```js
plugins: ['react-native-reanimated/plugin']
```

Importar no topo de `index.js`:

```js
import 'react-native-gesture-handler';
```

---

## Arquivos sensíveis

- `firebaseConfig.js` — chaves públicas do Firebase (ok versionar chaves públicas do client SDK, mas `.env*.local` está no `.gitignore`)
- Não commitar credenciais privadas, service accounts ou `.env` com secrets

---

## Telas regentes (referência visual e de código)

Ao implementar telas novas, usar estas como modelo de estrutura e estilo:

| Tela | Arquivo | Referência para |
|---|---|---|
| Dashboard | `App.js` | Cards, stats, header, lista de esportes |
| Detalhe de treino | `src/screens/TreinoMusculacao.js` | Exercícios, dicas, aquecimento, animação |
| Formulário | `src/screens/CriarTreino.js` | Inputs, sliders, switches, pickers, seções |

Telas novas a criar: `LoginScreen`, `PerfilScreen`, `DetalhesTreino`, `BibliotecaScreen`, `DetalheExercicioScreen`, `CustomDrawerContent`.

---

## Checklist rápido antes de entregar código

- [ ] Componentes funcionais (sem classes)
- [ ] `useState` e `useEffect` presentes onde necessário
- [ ] UI segue `DESIGN.md` (cores, fontes, espaçamentos)
- [ ] Textos em português brasileiro
- [ ] Sem bottom nav bar
- [ ] Mudança mínima e focada na tarefa
- [ ] Padrão de código consistente com arquivos existentes
- [ ] `npx expo install` para novas dependências nativas
