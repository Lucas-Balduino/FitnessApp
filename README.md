# Kinetic - Fitness App

Este projeto é um aplicativo mobile focado na gestão e execução de treinos personalizados, desenvolvido como parte da disciplina de **Programação para Dispositivos Móveis**. O principal objetivo deste projeto é o aprendizado e a aplicação prática do **React Native**.

## 📖 Sobre o Projeto

O **Kinetic** permite que os usuários criem contas, personalizem seus perfis e selecionem treinos focados em diversas modalidades esportivas. A aplicação apresenta uma interface moderna e fluida, com autenticação, persistência de dados na nuvem e integração com API externa de exercícios. As modalidades disponíveis incluem:

- Musculação
- Ciclismo
- Corrida
- Futebol
- Voleibol
- Natação
- Treinos Customizados (criados pelo usuário)

O design foi cuidadosamente construído para garantir a consistência visual em todo o app, com paleta de cores adaptável por modalidade.

## 🛠 Tecnologias Utilizadas

- **React Native** (Interface do aplicativo)
- **Expo** (Workflow de desenvolvimento)
- **React Navigation** (Navegação via Stack e Drawer)
- **Firebase Authentication** (Autenticação por email/senha com persistência de sessão)
- **Cloud Firestore** (Banco de dados NoSQL — perfil do usuário e treinos customizados)
- **API Wger** (Biblioteca de exercícios públicos — [wger.de](https://wger.de/api/v2/))
- **React Native Reanimated** e **Animated API** (Transições e micro-interações)
- **React Native SVG** (Renderização e manipulação de ícones vetoriais)
- **@expo-google-fonts/lexend** (Tipografia moderna)

## 📁 Estrutura de Arquivos

```text
FitnessApp/
├── assets/                  # Imagens estáticas e recursos visuais padrão do Expo
├── src/                     # Código fonte da aplicação
│   ├── components/          # Componentes reutilizáveis (CustomSwitch, CustomPicker, CustomDrawerContent, LoadingOverlay)
│   ├── data/                # Informações estáticas (treinos e estatísticas)
│   ├── hooks/               # Custom hooks React (useScreenAnimation, useWgerExercises)
│   ├── Icons/               # Ícones em formato SVG transformados em componentes
│   ├── navigation/          # Stacks, Drawer e navegação principal (AuthStack, HomeStack, BibliotecaStack, AppDrawer)
│   ├── screens/             # Telas da aplicação (Login, Dashboard, Perfil, Biblioteca, DetalheExercicio, CriarTreino, DetalhesTreino)
│   └── utils/               # Funções auxiliares (wgerApi, stripHtml)
│
├── App.js                   # Componente raiz (controle de auth e fontes)
├── firebaseConfig.js        # Inicialização do Firebase (Auth + Firestore)
├── app.json                 # Configurações do ambiente Expo
├── babel.config.js          # Configuração do compilador Babel e presets
├── metro.config.js          # Configuração do Bundler (ex: Suporte local a SVG)
├── package.json             # Dependências e scripts de inicialização
├── .env                     # Variáveis de ambiente (Firebase API keys — não versionado)
├── .env.example             # Template das variáveis de ambiente necessárias
├── .gitignore               # Regras de ignorar arquivos do Git
├── CLAUDE.md                # Documentação técnica do projeto
├── DESIGN.md                # Guia de design (cores, tipografia, componentes)
├── PlanejamentoMudancas.md  # Cronograma de implementação (fases 0-8)
└── README.md                # Este documento
```

## 🔧 Configuração do Firebase

O projeto utiliza variáveis de ambiente para configuração do Firebase. Para configurar:

1. Copie o arquivo `.env.example` para `.env`:
   ```bash
   cp .env.example .env
   ```
2. Preencha as variáveis com os dados do seu projeto Firebase:
   ```
   EXPO_PUBLIC_FIREBASE_API_KEY=sua_api_key
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=seu_projeto
   ```
3. Configure as **Regras do Firestore** no console Firebase:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /usuarios/{uid} {
         allow read, write: if request.auth != null && request.auth.uid == uid;
       }
       match /treinos_customizados/{id} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

## 🚀 Como Executar o Projeto

1. Certifique-se de ter o **Node.js** instalado na sua máquina.
2. Clone este repositório para o seu ambiente local.
3. No terminal, acesse a pasta do projeto:
   ```bash
   cd FitnessApp
   ```
4. Instale as dependências executando:
   ```bash
   npm install
   ```
5. Configure o `.env` conforme a seção acima.
6. Inicie o servidor do Expo:
   ```bash
   npx expo start
   ```
7. Utilize o aplicativo **Expo Go** em seu dispositivo móvel Android/iOS para escanear o QR Code exibido no terminal, ou execute com um emulador configurado.

## 📝 Propósito Educacional

Este aplicativo foi construído puramente com fins educacionais, demonstrando conceitos fundamentais e intermediários de React Native. Foram aplicados na prática conceitos como:

- **Autenticação de usuários** com Firebase Auth (registro, login, persistência de sessão)
- **Banco de dados na nuvem** com Cloud Firestore (CRUD de perfil e treinos)
- **Consumo de API REST** com a API pública Wger (listagem, filtros e detalhes de exercícios)
- **Gerenciamento de Estado** com `useState` e `useEffect`
- **Custom Hooks** para abstração de lógica reutilizável
- **Navegação complexa** com Stack Navigator, Drawer Navigator e nested navigators
- Listagem dinâmica com `FlatList` e `ScrollView`
- **Componentes reutilizáveis** (LoadingOverlay, CustomPicker, CustomSwitch)
- Uso extensivo do `StyleSheet` combinando Flexbox e Absolute Positioning
- Animações fluidas customizadas através da API `Animated`
