# Kinetic - Fitness App

Este projeto é um aplicativo mobile focado na gestão e execução de treinos personalizados, desenvolvido como parte da disciplina de **Programação para Dispositivos Móveis**. O principal objetivo deste projeto é o aprendizado e a aplicação prática do **React Native**.

## 📖 Sobre o Projeto

O **Kinetic** permite que os usuários selecionem treinos focados em diversas modalidades esportivas. A aplicação apresenta uma interface de usuário moderna e fluida, utilizando animações de transição, fontes customizadas e ícones vetoriais. As modalidades disponíveis incluem:

- Musculação
- Ciclismo
- Corrida
- Futebol
- Voleibol
- Natação
- Treinos Customizados

O design foi cuidadosamente construído para garantir a consistência visual em todo o app, mas com a flexibilidade de adaptar a paleta de cores secundária de acordo com o esporte específico em execução.

## 🛠 Tecnologias Utilizadas

- **React Native** (Interface do aplicativo)
- **Expo** (Workflow de desenvolvimento)
- **React Native SVG** (Renderização e manipulação de ícones vetoriais)
- **@expo-google-fonts/lexend** (Tipografia moderna e importação de fontes)

## 📁 Estrutura de Arquivos

Abaixo, apresentamos a árvore de diretórios principal do projeto. Diretórios e arquivos de compilação ou dependências (como a pasta `node_modules/` e `.expo/`) não integram o versionamento por estarem inclusos no `.gitignore`.

```text
FitnessApp/
├── assets/                  # Imagens estáticas e recursos visuais padrão do Expo
├── Icons/                   # Componentes SVG customizados utilizados na interface
│   ├── AddIcon.svg
│   ├── ArrowIcon.svg
│   ├── CiclismIcon.svg
│   ├── CustumizeIcon.svg
│   ├── DumbellIcon.svg
│   ├── DumbellIconNav.svg
│   ├── LightningIcon.svg
│   ├── ProfileIcon.svg
│   ├── RunningIcon.svg
│   ├── SoccerIcon.svg
│   ├── SwimmingIcon.svg
│   └── VolleyballIcon.svg
├── App.js                   # Ponto de entrada e tela principal de navegação do App
├── CriarTreino.js           # Formulário Modal para criação de treinos customizados
├── TreinoMusculacao.js      # Tela específica de modalidade esportiva
├── TreinoCiclismo.js        # Tela específica de modalidade esportiva
├── TreinoCorrida.js         # Tela específica de modalidade esportiva
├── TreinoFutebol.js         # Tela específica de modalidade esportiva
├── TreinoVolei.js           # Tela específica de modalidade esportiva
├── TreinoNatacao.js         # Tela específica de modalidade esportiva
├── app.json                 # Configurações do ambiente Expo
├── index.js                 # Ponto base de inicialização do React Native
├── metro.config.js          # Configuração do Bundler (ex: Suporte local a SVG)
├── package.json             # Dependências e scripts de inicialização
├── .gitignore               # Regras de ignorar arquivos do Git
└── README.md                # Este documento
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
5. Inicie o servidor do Expo:
   ```bash
   npx expo start
   ```
6. Utilize o aplicativo **Expo Go** em seu dispositivo móvel Android/iOS para escanear o QR Code exibido no terminal, ou execute com um emulador configurado.

## 📝 Propósito Educacional
Este aplicativo foi construído puramente com fins educacionais, demonstrando conceitos fundamentais e intermediários de React Native. Foram aplicados na prática conceitos como:
- Gerenciamento de Estado com `useState`.
- Navegação através de sobreposição e `Modals`.
- Listagem dinâmica e controle de Scroll (via `ScrollView`).
- Uso extensivo do `StyleSheet` combinando Flexbox e Absolute Positioning.
- Animações fluidas customizadas através da API `Animated`.
