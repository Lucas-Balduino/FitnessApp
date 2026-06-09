# Planejamento de Mudanças — Kinetic (FitnessApp)

> Documento de referência de tarefas, organizado na **ordem de implementação**.
> Cada fase depende da anterior. Marque `[x]` conforme concluir.

---

## Visão geral da arquitetura final

```
App.js (ponto de entrada enxuto)
├── Auth Stack (usuário deslogado)
│   └── LoginScreen
│
└── App Drawer (usuário logado)
    ├── Início → Home Stack
    │   ├── Dashboard
    │   ├── CriarTreino
    │   └── DetalhesTreino (com animação custom via useScreenAnimation)
    ├── Biblioteca → Biblioteca Stack
    │   ├── ListaExercicios
    │   └── DetalheExercicio
    └── Perfil → PerfilScreen
```

### Mapa de requisitos × fases

| Requisito | Fase(s) que atendem |
|---|---|
| `useState`, `useEffect`, custom hook | Fase 3 (`useScreenAnimation`), Fase 6 (`useWgerExercises`) |
| React Navigation (Stack + Drawer, ≥3 telas) | Fase 1, 2, 4 |
| Loading com `ActivityIndicator` + `useState` | Fase 5, 6, 7 |
| Login, Dashboard, Detalhes, Perfil | Fase 2, 4 |
| API pública (lista + filtro + detalhes) | Fase 6 |
| Firebase Auth + Firestore | Fase 5 |
| Drawer com ícones e nomes claros | Fase 1 (etapa 1.4) |

### Decisões técnicas fixas

- **Animação custom mantida:** o Stack Navigator terá `animationEnabled: false` nas telas que usam slide-in/out. A transição visual fica 100% no hook `useScreenAnimation`.
- **Firebase Auth:** priorizar **email/senha** (compatível com Expo managed). Login com Google fica como melhoria opcional.
- **Wger API:** listagem via `/exercise/`; descrições via `/exerciseinfo/` (endpoint separado).
- **App.js enxuto:** lógica de UI, dados e navegação extraídos para `src/`.

---

## Fase 0 — Infraestrutura e reorganização de pastas

**Objetivo:** preparar o terreno antes de qualquer feature nova.
**Requisitos atendidos:** base para todos os demais.

### Etapa 0.1 — Instalar dependências de navegação

- [ ] Executar via Expo (garante versões compatíveis com SDK 55):
  ```bash
  npx expo install @react-navigation/native @react-navigation/stack @react-navigation/drawer
  npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated
  ```
- [ ] Adicionar plugin do Reanimated em `babel.config.js`:
  ```js
  plugins: ['react-native-reanimated/plugin']
  ```
- [ ] Importar `react-native-gesture-handler` no topo de `index.js` (antes de tudo).

### Etapa 0.2 — Instalar Firebase (SDK JS para Expo)

- [ ] Instalar: `npx expo install firebase`
- [ ] Criar projeto no [Firebase Console](https://console.firebase.google.com)
- [ ] Habilitar **Authentication → Email/Senha**
- [ ] Criar banco **Firestore** (modo teste inicialmente)
- [ ] Preencher `firebaseConfig.js` com as chaves públicas e exportar `auth` e `db`

### Etapa 0.3 — Criar estrutura de pastas

```
src/
├── hooks/
│   ├── useScreenAnimation.js      (Fase 3)
│   └── useWgerExercises.js        (Fase 6)
├── navigation/
│   ├── AuthStack.js
│   ├── AppDrawer.js
│   ├── HomeStack.js
│   └── BibliotecaStack.js
├── screens/
│   ├── Dashboard.js               (extraído do App.js)
│   ├── LoginScreen.js             (Fase 4)
│   ├── PerfilScreen.js            (Fase 4)
│   ├── DetalhesTreino.js          (Fase 2 — unificação)
│   ├── BibliotecaScreen.js        (Fase 6)
│   ├── DetalheExercicioScreen.js  (Fase 6)
│   ├── CriarTreino.js             (já existe)
│   └── Treino*.js                 (manter temporariamente; remover na Fase 2)
├── components/
│   └── CustomDrawerContent.js     (Fase 1)
├── data/
│   ├── treinos.js                 (array de cards do Dashboard)
│   ├── estatisticas.js
│   └── exerciciosPorEsporte.js    (dados das 6 modalidades unificados)
└── utils/
    ├── stripHtml.js               (limpeza de HTML da Wger)
    └── wgerApi.js                 (funções fetch centralizadas)
```

### Etapa 0.4 — Extrair conteúdo do App.js

- [ ] Mover array `treinos` para `src/data/treinos.js`
- [ ] Mover array `estatisticas` para `src/data/estatisticas.js`
- [ ] Mover JSX + estilos do Dashboard para `src/screens/Dashboard.js`
- [ ] Deixar `App.js` responsável apenas por: carregar fontes, listener de auth e renderizar o navegador raiz

**Critério de conclusão:** app continua funcionando como antes (ainda com modais), mas com `App.js` < 80 linhas e dados em arquivos separados.

---

## Fase 1 — Navegação (Stack + Drawer unificados)

**Objetivo:** substituir modais e bottom nav por React Navigation.
**Requisitos atendidos:** React Navigation, Stack, Drawer, ≥3 telas principais, Drawer com ícones.

### Etapa 1.1 — Criar Home Stack

- [ ] Criar `src/navigation/HomeStack.js` com `@react-navigation/stack`
- [ ] Registrar rotas:
  - `Dashboard` → `src/screens/Dashboard.js`
  - `CriarTreino` → `src/screens/CriarTreino.js`
  - `DetalhesTreino` → placeholder inicial (pode apontar para `TreinoMusculacao` até Fase 2)
- [ ] Configurar **todas** as telas do Stack com:
  ```js
  options={{ headerShown: false, animationEnabled: false }}
  ```
  > Isso desativa a transição nativa do Stack e preserva espaço para `useScreenAnimation`.

### Etapa 1.2 — Criar App Drawer

- [ ] Criar `src/navigation/AppDrawer.js` com `@react-navigation/drawer`
- [ ] Registrar rotas do Drawer (mínimo 3):
  | Rota interna | Label no menu | Ícone |
  |---|---|---|
  | `Inicio` | Início | ícone casa (criar ou reutilizar) |
  | `Biblioteca` | Biblioteca | `DumbellIcon` |
  | `Perfil` | Perfil | `ProfileIcon` |
- [ ] Item **Sair** não é rota — é botão no Custom Drawer Content (Fase 1.4)

### Etapa 1.3 — Criar Auth Stack (estrutura vazia por enquanto)

- [ ] Criar `src/navigation/AuthStack.js` com rota `Login` apontando para placeholder
- [ ] Em `App.js`, renderizar `AuthStack` fixo (auth real vem na Fase 5)
- [ ] Alternar manualmente entre Auth e App Drawer para testar (flag temporária `const isLoggedIn = true`)

### Etapa 1.4 — Custom Drawer Content

- [ ] Criar `src/components/CustomDrawerContent.js`
- [ ] Cabeçalho: saudação "Olá, Atleta!" (nome dinâmico na Fase 5)
- [ ] Cada item: ícone SVG + label com fonte Lexend
- [ ] Item ativo: fundo `#005CEE`, texto branco; inativos: cinza `#9CA3AF`
- [ ] Botão **Sair**: chama `signOut` do Firebase (implementar na Fase 5; por ora, `console.log`)
- [ ] Passar `drawerContent` prop no `Drawer.Navigator`

### Etapa 1.5 — Migrar modais para rotas

- [ ] Remover do `App.js` / `Dashboard.js`:
  - Estados: `modalVisible`, `modalMusculacao`, `modalCiclismo`, etc.
  - Todos os componentes `<Modal>`
- [ ] No Dashboard, substituir `setModalX(true)` por `navigation.navigate('DetalhesTreino', { esporte: '...' })` (params completos na Fase 2)
- [ ] Card "CUSTOMIZADO" → `navigation.navigate('CriarTreino')`
- [ ] FAB (+) → `navigation.navigate('CriarTreino')`

### Etapa 1.6 — Conectar botão hamburger

- [ ] No header do Dashboard, vincular `☰` a `navigation.openDrawer()`
- [ ] Gesto de arrastar da esquerda já funciona nativamente no Drawer

### Etapa 1.7 — Remover bottom nav manual

- [ ] Remover `styles.bottomNav` e todo o JSX da barra inferior do Dashboard
- [ ] Remover bottom nav duplicada das telas `Treino*.js` (se existir)
- [ ] Ajustar `paddingBottom` do `ScrollView` (de 100 para ~30)

### Etapa 1.8 — Adaptar prop `fechar` para navegação

- [ ] Nas telas de treino e `CriarTreino`, trocar prop `fechar` por hook de navegação:
  ```js
  import { useNavigation } from '@react-navigation/native';
  const navigation = useNavigation();
  const fechar = () => navigation.goBack();
  ```
- [ ] Manter assinatura interna `fechar` para compatibilidade com `useScreenAnimation` (Fase 3)

**Critério de conclusão:** navegar entre Dashboard → treino → voltar, e Dashboard → CriarTreino → voltar, tudo sem modais. Drawer abre por gesto e por botão.

---

## Fase 2 — Tela de Detalhes unificada

**Objetivo:** uma rota `DetalhesTreino` dinâmica (requisito de Tela de Detalhes).
**Requisitos atendidos:** Tela de Detalhes, passagem de parâmetros via rota.

### Etapa 2.1 — Centralizar dados dos treinos

- [ ] Criar `src/data/exerciciosPorEsporte.js` com estrutura:
  ```js
  export const exerciciosPorEsporte = {
    musculacao: { titulo: 'MUSCULAÇÃO', cor: '#005CEE', aquecimento: [...], exercicios: [...] },
    ciclismo:   { titulo: 'CICLISMO',   cor: '#FF6B22', ... },
    // corrida, futebol, volei, natacao
  };
  ```
- [ ] Copiar arrays `aquecimento` e `exercicios` de cada `Treino*.js` para esse arquivo

### Etapa 2.2 — Criar DetalhesTreino.js

- [ ] Criar `src/screens/DetalhesTreino.js` baseado no layout de `TreinoMusculacao.js`
- [ ] Ler parâmetros: `const { esporte } = route.params`
- [ ] Buscar dados: `const dados = exerciciosPorEsporte[esporte]`
- [ ] Aplicar `dados.cor` dinamicamente nos estilos
- [ ] Registrar no `HomeStack` como rota `DetalhesTreino`

### Etapa 2.3 — Atualizar navegação no Dashboard

- [ ] Mapear cada card para `{ esporte: 'musculacao' }`, `{ esporte: 'ciclismo' }`, etc.
- [ ] Passar também `cor` e `titulo` nos params se necessário para header

### Etapa 2.4 — Remover arquivos antigos

- [ ] Deletar (ou arquivar) `TreinoMusculacao.js`, `TreinoCiclismo.js`, `TreinoCorrida.js`, `TreinoFutebol.js`, `TreinoVolei.js`, `TreinoNatacao.js`
- [ ] Remover imports órfãos

**Critério de conclusão:** os 6 esportes abrem a mesma tela com conteúdo diferente via `route.params`.

---

## Fase 3 — Custom Hook `useScreenAnimation`

**Objetivo:** cumprir requisito de custom hook; eliminar código duplicado.
**Requisitos atendidos:** custom hook, `useEffect` interno ao hook.

### Etapa 3.1 — Criar o hook

- [ ] Criar `src/hooks/useScreenAnimation.js`
- [ ] Assinatura: `function useScreenAnimation(onClose)`
- [ ] Internamente:
  - `useRef(new Animated.Value(SCREEN_WIDTH))` para `slideAnim`
  - `useEffect` → slide-in (320ms, `toValue: 0`) ao montar
  - `handleClose` → slide-out (260ms, `toValue: SCREEN_WIDTH`) → chama `onClose()` no callback `.start()`
- [ ] Retornar `{ slideAnim, handleClose }`

### Etapa 3.2 — Aplicar em DetalhesTreino

- [ ] Importar hook em `DetalhesTreino.js`
- [ ] Substituir lógica inline de animação:
  ```js
  const navigation = useNavigation();
  const { slideAnim, handleClose } = useScreenAnimation(() => navigation.goBack());
  ```
- [ ] Envolver conteúdo em `<Animated.View style={{ transform: [{ translateX: slideAnim }] }}>`
- [ ] Botão voltar chama `handleClose` (não `navigation.goBack()` direto)

### Etapa 3.3 — Aplicar em CriarTreino (opcional, recomendado)

- [ ] `CriarTreino.js` hoje não tem animação slide — adicionar o mesmo hook para consistência visual

### Etapa 3.4 — Garantir convivência com Stack

- [ ] Confirmar que `HomeStack` mantém `animationEnabled: false` em `DetalhesTreino` e `CriarTreino`
- [ ] Testar: entrar na tela (slide-in da direita) → voltar (slide-out para direita) → `goBack` no Stack

**Critério de conclusão:** animação idêntica à atual, mas em um único arquivo reutilizável.

---

## Fase 4 — Telas de Login e Perfil

**Objetivo:** completar as 4 telas obrigatórias.
**Requisitos atendidos:** Login/Registro, Perfil/Configurações.

### Etapa 4.1 — Tela de Login/Registro

- [ ] Criar `src/screens/LoginScreen.js`
- [ ] Campos: `TextInput` para email e senha
- [ ] Estados locais: `email`, `senha`, `carregando`, `modoRegistro` (toggle login ↔ criar conta)
- [ ] Botão **Entrar** → chama Firebase (Fase 5; por ora, navega manualmente)
- [ ] Botão **Criar Conta** → alterna para modo registro
- [ ] Design: fundo `#F8F9FE`, logo KINETIC, botões `#005CEE`, fonte Lexend
- [ ] Loading: `ActivityIndicator` sobre o botão enquanto `carregando === true`

### Etapa 4.2 — Tela de Perfil/Configurações

- [ ] Criar `src/screens/PerfilScreen.js`
- [ ] Seções:
  - Avatar placeholder + nome do usuário
  - Campo editável: nome, nível de experiência
  - Switch: notificações de treino (reutilizar lógica visual do `CriarTreino.js`)
  - Botão **Salvar alterações** (Firestore na Fase 5)
- [ ] Estados: `nome`, `nivel`, `notificacoes`, `carregando`, `salvando`
- [ ] Registrar rota `Perfil` no `AppDrawer`

### Etapa 4.3 — Conectar ao Drawer

- [ ] Confirmar que Perfil abre pelo menu lateral
- [ ] Remover qualquer referência residual a "PROFILE" na bottom nav (já removida na Fase 1)

**Critério de conclusão:** as 4 telas existem e são acessíveis — Login (Auth Stack), Dashboard, DetalhesTreino, Perfil.

---

## Fase 5 — Firebase (Auth + Firestore)

**Objetivo:** autenticação real e persistência de dados.
**Requisitos atendidos:** Firebase Auth (email/senha), Firestore, app funcional com dados remotos.

### Etapa 5.1 — Configurar firebaseConfig.js

- [ ] Inicializar app Firebase com `initializeApp(firebaseConfig)`
- [ ] Exportar `auth = getAuth(app)` e `db = getFirestore(app)`

### Etapa 5.2 — Listener de autenticação no App.js

- [ ] Estado: `const [usuario, setUsuario] = useState(null)` e `const [authCarregando, setAuthCarregando] = useState(true)`
- [ ] `useEffect` com `onAuthStateChanged(auth, (user) => { setUsuario(user); setAuthCarregando(false); })`
- [ ] Renderização:
  - `authCarregando` → `ActivityIndicator` centralizado
  - `!usuario` → `<AuthStack />`
  - `usuario` → `<AppDrawer />`

### Etapa 5.3 — Integrar LoginScreen com Firebase Auth

- [ ] **Entrar:** `signInWithEmailAndPassword(auth, email, senha)`
- [ ] **Criar conta:** `createUserWithEmailAndPassword(auth, email, senha)` + criar doc em `usuarios/{uid}`
- [ ] Tratar erros com `Alert.alert` (senha fraca, email inválido, etc.)
- [ ] `carregando = true` antes da chamada; `false` no `finally`

### Etapa 5.4 — Modelagem Firestore

**Coleção `usuarios/{uid}`:**
| Campo | Tipo | Exemplo |
|---|---|---|
| `nome` | string | "Lucas" |
| `nivel` | string | "Intermediário" |
| `notificacoes` | boolean | true |
| `criadoEm` | timestamp | serverTimestamp() |

**Coleção `treinos_customizados/{autoId}`:**
| Campo | Tipo |
|---|---|
| `userId` | string (uid) |
| `esporte` | string |
| `foco` | string |
| `dias` | array |
| `descanso` | number |
| `notificacoes` | boolean |

**Coleção `historico_treinos/{autoId}` (opcional):**
| Campo | Tipo |
|---|---|
| `userId` | string |
| `esporte` | string |
| `data` | timestamp |

### Etapa 5.5 — Salvar treino customizado (CriarTreino.js)

- [ ] Importar `addDoc, collection` do Firestore
- [ ] No botão Salvar: montar objeto e `addDoc(collection(db, 'treinos_customizados'), { ...dados, userId: auth.currentUser.uid })`
- [ ] Loading no botão durante salvamento
- [ ] Após sucesso: `handleClose()` (animação + goBack)

### Etapa 5.6 — Carregar treinos no Dashboard

- [ ] `useEffect` + `getDocs` com query `where('userId', '==', uid)` (ou `onSnapshot` para tempo real)
- [ ] Estados: `treinosCustomizados`, `carregandoTreinos`
- [ ] Exibir cards extras abaixo dos esportes fixos via `FlatList` ou `.map()`
- [ ] Loading: `ActivityIndicator` enquanto `carregandoTreinos`

### Etapa 5.7 — Alimentar Perfil com Firestore

- [ ] Ao montar `PerfilScreen`: `getDoc(doc(db, 'usuarios', uid))`
- [ ] Preencher campos com dados do documento
- [ ] Salvar: `updateDoc(doc(db, 'usuarios', uid), { nome, nivel, notificacoes })`

### Etapa 5.8 — Logout no Drawer

- [ ] Botão Sair chama `signOut(auth)`
- [ ] `onAuthStateChanged` redireciona automaticamente para Auth Stack

### Etapa 5.9 — Regras de segurança Firestore (mínimo para demo)

- [ ] No Console Firebase, configurar regras básicas:
  ```
  match /usuarios/{uid} { allow read, write: if request.auth.uid == uid; }
  match /treinos_customizados/{id} { allow read, write: if request.auth.uid == resource.data.userId; }
  ```

**Critério de conclusão:** criar conta, logar, salvar treino, ver treinos no Dashboard, editar perfil, sair.

---

## Fase 6 — Integração com API Wger (Biblioteca de Exercícios)

**Objetivo:** consumir API pública com lista, filtro e detalhes.
**Requisitos atendidos:** API pública, lista, interação (filtro + detalhes), segundo custom hook.

### Etapa 6.1 — Entender endpoints da Wger

A API separa metadados de descrições. Planejar **duas chamadas**:

| Endpoint | Retorna | Campos úteis |
|---|---|---|
| `GET /api/v2/exercise/?language=2&limit=50` | Lista de exercícios | `id`, `name`, `category` |
| `GET /api/v2/exerciseinfo/?exercise={id}&language=2` | Descrição detalhada | `description` (HTML) |
| `GET /api/v2/exercisecategory/` | Categorias | `id`, `name` (para filtro) |

> `language=2` = português. Ajustar `limit` conforme necessidade.

### Etapa 6.2 — Criar utilitários de API

- [ ] Criar `src/utils/wgerApi.js` com funções:
  - `fetchExercises(limit)` → lista de exercícios
  - `fetchExerciseInfo(exerciseId)` → descrição
  - `fetchCategories()` → mapa id → nome
- [ ] Criar `src/utils/stripHtml.js` → remove tags `<p>`, `<ul>`, `<li>`, etc.

### Etapa 6.3 — Custom Hook `useWgerExercises`

- [ ] Criar `src/hooks/useWgerExercises.js`
- [ ] Estados (`useState`):
  - `exercicios` (array, inicia `[]`)
  - `categorias` (objeto id→nome)
  - `carregando` (boolean, inicia `true`)
  - `erro` (string | null)
- [ ] `useEffect` ao montar:
  1. `setCarregando(true)`
  2. `fetchExercises()` + `fetchCategories()` em paralelo (`Promise.all`)
  3. Salvar resultados nos estados
  4. `setCarregando(false)` no bloco `finally`
- [ ] Retornar `{ exercicios, categorias, carregando, erro }`

### Etapa 6.4 — Criar Biblioteca Stack

- [ ] Criar `src/navigation/BibliotecaStack.js`:
  - `ListaExercicios` → `BibliotecaScreen.js`
  - `DetalheExercicio` → `DetalheExercicioScreen.js`
- [ ] Registrar `Biblioteca` no `AppDrawer` apontando para este Stack
- [ ] `headerShown: false` em ambas

### Etapa 6.5 — Tela de listagem (BibliotecaScreen)

- [ ] Consumir `useWgerExercises()`
- [ ] Se `carregando` → `<ActivityIndicator size="large" color="#005CEE" />` centralizado
- [ ] Se `erro` → mensagem amigável + botão "Tentar novamente"
- [ ] `<FlatList>` com cards: nome do exercício + categoria
- [ ] `<TextInput>` no topo para filtro por texto (`useState` local `busca`)
- [ ] Array derivado: `exercicios.filter(e => e.name.toLowerCase().includes(busca.toLowerCase()))`
- [ ] Filtro por categoria: botões horizontais ou Picker com IDs da Wger
- [ ] `onPress` do card → `navigation.navigate('DetalheExercicio', { exercicio })`

### Etapa 6.6 — Tela de detalhes (DetalheExercicioScreen)

- [ ] Ler `route.params.exercicio`
- [ ] `useEffect` → `fetchExerciseInfo(exercicio.id)` para buscar descrição
- [ ] Estado local `descricao` + `carregandoDescricao`
- [ ] Exibir nome, categoria e descrição limpa (`stripHtml`)
- [ ] Loading próprio enquanto busca descrição

**Critério de conclusão:** abrir Biblioteca pelo Drawer, ver lista da Wger, filtrar por texto, abrir detalhes com descrição em português.

---

## Fase 7 — Estados de loading consolidados

**Objetivo:** garantir que todo carregamento assíncrono usa `useState` + `ActivityIndicator`.
**Requisitos atendidos:** loading controlado por `useState` em operações de API/Firebase.

### Checklist de loadings no app

| Local | Estado | Gatilho |
|---|---|---|
| `App.js` | `authCarregando` | `onAuthStateChanged` |
| `App.js` | `!fontsLoaded` | `useFonts` (já existe) |
| `Dashboard.js` | `carregandoTreinos` | fetch Firestore |
| `LoginScreen.js` | `carregando` | signIn / createUser |
| `PerfilScreen.js` | `salvando` | updateDoc |
| `CriarTreino.js` | `salvando` | addDoc |
| `BibliotecaScreen.js` | `carregando` | via `useWgerExercises` |
| `DetalheExercicioScreen.js` | `carregandoDescricao` | fetchExerciseInfo |

### Etapa 7.1 — Padronizar componente de loading (opcional)

- [ ] Criar `src/components/LoadingOverlay.js`:
  ```js
  // View centralizada + ActivityIndicator color="#005CEE"
  ```
- [ ] Reutilizar em todas as telas acima

### Etapa 7.2 — Garantir padrão try/catch/finally

- [ ] Toda operação assíncrona segue:
  1. `setCarregando(true)`
  2. `try { await operacao() }`
  3. `catch { Alert.alert('Erro', mensagem) }`
  4. `finally { setCarregando(false) }`

**Critério de conclusão:** nenhuma tela trava sem feedback visual durante operações de rede.

---

## Fase 8 — Polimento final

**Objetivo:** refinamentos de UX e limpeza.

### Etapa 8.1 — Custom Drawer com dados reais

- [ ] Exibir nome e email do `auth.currentUser` no cabeçalho do Drawer
- [ ] Destacar rota ativa com cor `#005CEE`

### Etapa 8.2 — Histórico de treinos (opcional, enriquece o projeto)

- [ ] Botão "Concluir Treino" em `DetalhesTreino.js`
- [ ] Salvar em `historico_treinos` com `serverTimestamp()`
- [ ] Exibir últimos treinos no Dashboard ou em seção do Perfil

### Etapa 8.3 — Limpeza geral

- [ ] Remover flag temporária `isLoggedIn` se ainda existir
- [ ] Remover imports e arquivos mortos
- [ ] Verificar que não há `Modal` residual no projeto
- [ ] Testar fluxo completo: Login → Dashboard → Treino → Voltar → Biblioteca → Detalhe → Perfil → Sair

### Etapa 8.4 — Login com Google (opcional, baixa prioridade)

- [ ] Requer `expo-auth-session` + configuração OAuth no Firebase Console
- [ ] Só implementar se email/senha já estiver 100% funcional e houver tempo

**Critério de conclusão:** app entregável, sem código morto, fluxo completo testado em Android/iOS.

---

## Referência rápida — Hooks no projeto

| Hook | Arquivo | Usa `useState` | Usa `useEffect` | Tipo |
|---|---|---|---|---|
| `useScreenAnimation` | `src/hooks/useScreenAnimation.js` | não | sim (slide-in) | custom |
| `useWgerExercises` | `src/hooks/useWgerExercises.js` | sim (3+) | sim (fetch) | custom |

> O requisito pede `useState` + `useEffect` + custom hook no projeto. Eles podem estar distribuídos entre hooks e telas — não precisam estar no mesmo arquivo.

---

## Referência rápida — Animação custom + React Navigation

```js
// HomeStack.js — desativa animação nativa do Stack
<Stack.Screen
  name="DetalhesTreino"
  component={DetalhesTreino}
  options={{ headerShown: false, animationEnabled: false }}
/>

// DetalhesTreino.js — animação fica no hook
const { slideAnim, handleClose } = useScreenAnimation(() => navigation.goBack());

return (
  <Animated.View style={{ flex: 1, transform: [{ translateX: slideAnim }] }}>
    {/* conteúdo */}
  </Animated.View>
);
```

---

## Estimativa de esforço

| Fase | Esforço | Dependências |
|---|---|---|
| 0 — Infraestrutura | 2–3h | — |
| 1 — Navegação | 4–6h | Fase 0 |
| 2 — Detalhes unificada | 2–3h | Fase 1 |
| 3 — useScreenAnimation | 1–2h | Fase 2 |
| 4 — Login + Perfil | 3–4h | Fase 1 |
| 5 — Firebase | 4–6h | Fases 0, 4 |
| 6 — API Wger | 3–4h | Fases 0, 1 |
| 7 — Loading consolidado | 1–2h | Fases 5, 6 |
| 8 — Polimento | 2–3h | Todas |
| **Total** | **~22–33h** | |
