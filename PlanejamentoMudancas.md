
## Implementação do Custom Hook

Para cumprir a exigência sem inflar o projeto com códigos desnecessários, o melhor caminho é **isolar a lógica de animação de transição das telas** (o *Slide-in* e *Slide-out* presente em todas as modalidades) em um Hook Customizado.

Como essa animação se repete em pelo menos 6 telas (`TreinoMusculacao`, `TreinoCiclismo`, etc.), centralizá-la em um hook vai limpar o código e garantir padronização.

### Passo 1: Planejamento Estrutural de Pastas

* Criar um diretório dedicado chamado `src/hooks/` ou apenas `hooks/` na raiz do projeto para manter a arquitetura limpa e escalável.
* Planejar a criação de um arquivo específico para o gerenciamento da animação, por exemplo, `useScreenAnimation.js`.

### Passo 2: Definição da Lógica do Hook (`useScreenAnimation`)

Este hook customizado será responsável por encapsular toda a mecânica da API `Animated`. Ele deve funcionar da seguinte forma:

* **Parâmetros de Entrada (Inputs):** Receber a função de callback `fechar` (que desmonta a tela no componente pai).
* **Processamento Interno:**
* Inicializar a referência do valor animado de deslocamento horizontal (baseado na largura da tela).
* Executar um `useEffect` interno que dispara automaticamente a animação de entrada (*Slide-in*) com a duração padrão de 320ms assim que a tela for carregada.
* Criar uma função interna de saída (*Slide-out*) que roda a animação reversa (260ms) e, apenas ao final dela, executa o callback `fechar`.


* **Valores de Saída (Outputs):** Retornar um objeto contendo o **valor da animação** (para ser aplicado no estilo do container) e a **função de saída** (para ser acionada no botão de voltar).

### Passo 3: Planejamento da Refatoração nas Telas de Treino

Com o hook planejado, as telas de modalidades (`TreinoCorrida.js`, `TreinoMusculacao.js`, etc.) passarão por uma simplificação:

1. Remover as declarações individuais de `Animated.Value` e os blocos de `useEffect` que controlam o início da animação em cada uma das telas.
2. Chamar o novo hook customizado logo no início do componente, passando a prop `fechar` como argumento.
3. Vincular o valor animado retornado pelo hook diretamente ao estilo do container principal (`Animated.View`).
4. Substituir a chamada direta da prop `fechar()` no botão de retorno pela função de saída tratada pelo hook.

> 💡 **Ganho Arquitetural:** Com essa mudança, você elimina cerca de 20 a 30 linhas de código repetido de cada uma das 6 telas de treino, centraliza o controle de tempo das transições em um único lugar e cumpre o requisito de forma elegante e performática.

Com base na análise do arquivo `App.js` e na arquitetura atual do projeto **Kinetic**, fiz a avaliação técnica em relação ao requisito de **Navegação**.

Atualmente, o projeto gerencia a alternância de telas e a exibição dos treinos utilizando o componente nativo `<Modal>` do React Native e renderização condicional por estados (`useState`). Portanto, para uma avaliação que exige estritamente a biblioteca oficial de navegação, o cenário atual e o plano de reestruturação são os seguintes:

---

## Reestruturação da Navegação

Para cumprir a exigência, o ecossistema do **React Navigation** deve ser integrado, combinando o menu lateral (*Drawer*) com o fluxo de empilhamento (*Stack*) para a abertura dos treinos.

### Passo 1: Planejamento e Instalação do Ambiente

* **Mapeamento de Dependências:** Planejar a instalação do núcleo do React Navigation (`@react-navigation/native`).
* **Suporte a Gestos e Animações:** Adicionar os pacotes nativos necessários para o funcionamento do menu lateral e das transições de tela (como `react-native-gesture-handler`, `react-native-reanimated`, `react-native-screens` e `react-native-safe-area-context`).
* **Navegadores Específicos:** Mapear os pacotes das estratégias de navegação cobradas: `@react-navigation/stack` (ou `native-stack`) e `@react-navigation/drawer`.

### Passo 2: Desenho da Hierarquia de Rotas (Arquitetura)

Para combinar as duas navegações de forma profissional, a estrutura do projeto deve ser aninhada:

1. **Navegador Raiz (Drawer):** O menu lateral será o ponto principal do aplicativo. Ele conterá pelo menos 3 opções (cumprindo as 3 telas principais):
* *Opção 1:* **Home** (Fluxo de Treinos — que será um Stack)
* *Opção 2:* **Perfil** (Uma tela nova ou adaptada com dados do usuário)
* *Opção 3:* **Histórico** ou **Configurações** (Uma terceira tela de suporte)


2. **Navegador Interno (Stack):** A opção "Home" do Drawer não apontará para uma tela simples, mas sim para um *Stack Navigator*. Esse Stack controlará o fluxo detalhado:
* *Tela Inicial da Pilha:* O Dashboard principal (com o resumo semanal e os botões dos esportes).
* *Telas Secundárias da Pilha:* A tela de `CriarTreino` e cada uma das telas de modalidades específicas (`TreinoMusculacao`, `TreinoCorrida`, etc.).

### Passo 3: Planejamento do Drawer Navigation (Menu Lateral)

* Configurar o ponto de entrada no `App.js` para renderizar o container de navegação e o Drawer.
* Definir visualmente o Drawer para que ele apareça deslizando a partir do canto esquerdo da tela (padrão de usabilidade).
* Mapear os nomes das rotas e os ícones correspondentes para cada item do menu lateral.

### Passo 4: Planejamento do Stack Navigation (Fluxo de Telas)

* Criar o gerenciador da pilha de telas dentro da rota "Home".
* Configurar o cabeçalho (*Header*) padrão do Stack: o professor avaliará se você sabe esconder o cabeçalho nativo (`headerShown: false`) para manter o seu design customizado do Kinetic ou se usará os títulos automáticos da biblioteca.
* Garantir que, ao clicar em um esporte no Dashboard, a rota correspondente seja empilhada na tela, gerando a transição fluida.

### Passo 5: Migração de Modals para Rotas Nativas

* **Remoção de Estados Locais:** No `App.js` e nos cards de modalidades, eliminar todos os estados que controlam a visibilidade de modais (`modalVisible`, etc.).
* **Substituição de Callbacks de Fechamento:** Nas telas de treino (`TreinoCiclismo.js`, por exemplo), a propriedade `fechar` (que antes forçava o fechamento do modal no componente pai) deve ser substituída pelo comando nativo de navegação para retornar na pilha histórica (o método de desempilhamento/retorno).
* **Passagem de Parâmetros (Opcional, mas técnico):** Planejar a substituição de telas fixas de esporte por rotas que aceitam parâmetros, permitindo que uma única tela de treino mude sua cor e conteúdo dinamicamente baseando-se nas propriedades enviadas pela rota (ex: passar o esporte clicado como parâmetro da navegação).

Com base na análise do arquivo `App.js` e na estrutura de dados atual do projeto **Kinetic**, fiz a avaliação técnica em relação ao requisito de **Loading (Estado de Carregamento)**.

Atualmente, o projeto importa o componente `ActivityIndicator` no `App.js` (geralmente associado ao carregamento inicial das fontes customizadas do Google Fonts), mas como o aplicativo consome dados estáticos (arrays locais fixados dentro de cada arquivo de treino), ele ainda não realiza requisições assíncronas para servidores externos.

Aqui está a avaliação detalhada e o planejamento estrutural para adequar o projeto.

---

## Estruturação do Fluxo de Carregamento

Para atender integralmente ao critério do professor sem precisar configurar um servidor backend real de última hora, o ideal é **simular uma chamada de API assíncrona com atraso de rede (Network Latency)** dentro do ciclo de vida do componente.

Se o professor exigir Firebase ou uma API real, a lógica estrutural permanece exatamente a mesma.

### Passo 1: Planejamento do Estado e Variáveis

* Determinar em qual tela o carregamento fará mais sentido visual (recomenda-se o Dashboard principal no `App.js` ou a abertura de uma modalidade específica).
* Planejar a criação de um estado booleano dedicado a monitorar se o processo de busca de dados terminou ou está em andamento.
* Planejar um segundo estado para armazenar os dados que virão da "API", iniciando-o como um array vazio antes da conclusão da busca.

### Passo 2: Orquestração no Ciclo de Vida (`useEffect`)

* Estruturar uma função assíncrona dentro de um bloco `useEffect` que será disparado apenas uma vez, assim que a tela for montada pelo React Native.
* Configurar essa função para realizar a chamada externa (seja uma requisição `fetch`/`axios` para uma URL de API, uma consulta ao banco do Firebase, ou uma simulação usando um temporizador para atrasar a resposta em 2 segundos).
* Garantir a seguinte ordem cronológica na função:
1. Ativar o estado de carregamento para verdadeiro antes de iniciar a busca.
2. Aguardar a resolução da promessa assíncrona (espera da rede).
3. Salvar o resultado recebido no estado de dados do aplicativo.
4. Desativar o estado de carregamento para falso imediatamente após o recebimento dos dados (garantindo o encerramento do loading mesmo se ocorrer um erro na requisição).

### Passo 3: Planejamento do Layout e Renderização Condicional

* Mapear a árvore de renderização do componente para que ela reaja ao estado booleano criado.
* Se o estado indicar que o app está carregando: o fluxo visual deve ser interrompido, ocultando temporariamente o `ScrollView` e os cartões de treino, exibindo em vez disso um container centralizado em tela cheia.
* Dentro deste container de bloqueio, posicionar o componente `ActivityIndicator` nativo.
* **Ajuste de Design:** Definir os atributos estéticos do indicador (como a propriedade de tamanho e a propriedade de cor) para que combinem com a paleta de cores do Kinetic (usando o azul royal padrão do app).
* Se o estado indicar que o carregamento terminou: liberar a renderização da interface completa do usuário, injetando os dados recém-baixados nos componentes visuais correspondentes.

Com base na análise atual da árvore de arquivos e das interfaces do projeto **Kinetic**, fiz a avaliação técnica sobre o requisito de **Telas de Navegação obrigatórias**.

Como o aplicativo atualmente foca na experiência direta do treino a partir do Dashboard, algumas telas cruciais exigidas pelo professor ainda precisam ser concebidas e estruturadas.

---

## Estruturação das Quatro Telas

Para cumprir a exigência criando um fluxo lógico que conecte todas as telas exigidas, devemos estruturar a arquitetura da informação dividindo o aplicativo em duas grandes fases de navegação: **Fluxo Deslogado (Autenticação)** e **Fluxo Logado (Aplicação)**.

### Passo 1: Planejamento Arquitetural das Novas Telas

A primeira etapa consiste em idealizar a UI/UX funcional dessas novas interfaces sem escrever código:

* **Nova Tela de Login/Registro:** Planejar uma interface com campos de entrada para Email e Senha, botões de ação para "Entrar" e um link alternativo para "Criar Conta". Visualmente, ela deve seguir a identidade forte do Kinetic (fundo limpo, tipografia *Lexend* marcante e botões com o azul royal característico).
* **Nova Tela de Perfil/Configurações:** Criar uma interface dedicada a exibir a foto do usuário, nome, nível de treino e campos para atualizar dados pessoais ou alterar preferências de privacidade (como as opções que hoje estão isoladas no modal de criação de treino).

### Passo 2: Integração de Fluxos no React Navigation (Arquitetura de Rotas)

Para interligar as quatro telas de forma profissional e segura, a engenharia de navegação deve ser organizada da seguinte forma:

1. **Fluxo de Autenticação (Auth Stack - Deslogado):**
* A **Tela de Login/Registro** será o ponto de entrada absoluto do aplicativo se o usuário não estiver autenticado.
* Ao clicar com sucesso em "Entrar", o aplicativo altera o estado global de autenticação, desmonta este fluxo e monta o fluxo interno.

2. **Fluxo Principal (App Drawer/Stack - Logado):**
* **Dashboard (Tela Principal):** Será o ponto de partida do usuário logado.
* **Navegação para Detalhes:** A partir do Dashboard, ao clicar em qualquer card de esporte (Musculação, Corrida, etc.), o aplicativo empilha a **Tela de Detalhes** correspondente, enviando os dados do treino como parâmetro de rota.
* **Acesso ao Perfil:** A **Tela de Perfil/Configurações** será disponibilizada como uma aba fixa no menu inferior ou como uma opção de fácil acesso dentro do menu lateral (*Drawer*).

### Passo 3: Transição dos Modals de Treino para Telas de Detalhes Legítimas

* **Padronização dos Componentes:** Atualmente, existem arquivos separados para cada modalidade (`TreinoCorrida`, `TreinoVolei`, etc.). O planejamento ideal para a prova é criar uma única rota genérica chamada `DetalhesTreino`.
* **Passagem Dinâmica de Parâmetros:** Ao invés de abrir um modal fixo, o Dashboard usará a navegação nativa para direcionar o usuário à tela `DetalhesTreino`, passando um objeto (ex: `{ esporte: 'Ciclismo', cor: '#FF6B22' }`). A tela de detalhes lerá esses parâmetros e mudará sua cor, ícones e a lista de exercícios dinamicamente.

### Passo 4: Conexão das Preferências do Usuário

* O formulário atual de `CriarTreino.js` possui seletores de preferências (como "Notificações de Treino"). A lógica dessas configurações pode ser conceitualmente espelhada para alimentar a nova **Tela de Perfil ou Configurações**, dando um propósito prático a ela e amarrando os dados do aplicativo em um ecossistema unificado.

## Estruturação das Quatro Telas

### Fase 1: Mapeamento da API e Endpoints

Criaremos uma nova seção chamada **"Biblioteca de Exercícios"**. O usuário poderá navegar por ela através do menu, ver uma lista de exercícios reais vindos da internet, filtrar por grupo muscular (Peito, Pernas, etc.) e clicar em um exercício para ver as instruções detalhadas de execução.
Antes de mexer na interface, é preciso entender como os dados da Wger se estruturam:

1. **Endpoint de Listagem:** Planejar a requisição para o endpoint principal de exercícios (`/api/v2/exercise/`). É importante configurar o parâmetro de idioma na requisição para que os resultados retornem em português (a Wger suporta o parâmetro `language=2` para pt-br).
2. **Mapeamento de Dados:** Identificar quais campos do objeto retornado pela API serão usados na interface: `name` (nome do exercício), `description` (texto explicativo de como fazer) e `category` (ID do grupo muscular).

### Fase 2: Ajuste na Estrutura de Navegação (Stack/Drawer)

Para que o usuário acesse essa funcionalidade, ela precisa estar mapeada nas rotas:

1. **Inclusão no Drawer (Menu Lateral):** Adicionar uma nova rota chamada "Biblioteca" no menu lateral. Ela será o ponto de entrada.
2. **Criação do Sub-Stack:** Ao clicar em "Biblioteca", o app entra em um fluxo de pilhas contendo duas telas:
* **Tela A (Lista de Exercícios):** Onde a mágica da API acontece.
* **Tela B (Detalhes do Exercício):** Para onde o usuário vai ao clicar em um item da lista.

### Fase 3: Centralização da Lógica em um Custom Hook (O Requisito Mais Técnico!)

Para cumprir a exigência de **Hooks customizados**, vamos criar um hook chamado `useWgerExercises.js`. Ele isolará toda a complexidade da API e fornecerá apenas o necessário para a tela.

1. **Gerenciamento de Estados Locais (`useState`):** Dentro desse hook, planejar três estados:
* `dados`: Array que guardará a lista de exercícios vindos da API.
* `carregando`: Booleano (iniciando em `true`) para controlar o estado de loading.
* `erro`: String ou booleano para tratar falhas de conexão.

2. **Ciclo de Vida (`useEffect`):** Criar uma função assíncrona com `async/await` dentro do `useEffect` para disparar o `fetch` assim que o hook for invocado pela tela.
3. **Controle do Fluxo Assíncrono:** A função deve mudar o estado `carregando` para verdadeiro, aguardar a resposta da API, salvar a lista no estado `dados` e, finalmente, mudar `carregando` para falso.
4. **Retorno do Hook:** O hook deve exportar um objeto com `{ dados, carregando, erro }`.

### Fase 4: Construção da Tela de Listagem e Filtros

Na tela principal da Biblioteca, utilizaremos os retornos do nosso Custom Hook para montar a interface:

1. **Renderização Condicional do Loading:** * Se o estado `carregando` for verdadeiro, a interface deve exibir apenas o componente nativo `<ActivityIndicator>` centralizado na tela (cumprindo o requisito de loading).
* Se for falso, a tela esconde o indicador e renderiza o conteúdo principal.


2. **Exibição em Lista de Alta Performance:** Usar o componente `<FlatList>` para listar os exercícios. Mapear a propriedade `data` para receber os exercícios da API e o `renderItem` para desenhar um cartão visual clean para cada exercício.
3. **Mecanismo de Filtro por Texto/Categoria:**
* Inserir um componente `<TextInput>` no topo da lista com o atributo `onChangeText`.
* Criar um estado local na tela para capturar o que o usuário digita.
* Criar uma lógica de filtragem em tempo de execução: a `FlatList` não lerá mais os dados brutos da API, mas sim um array filtrado onde o nome do exercício contém as letras digitadas pelo usuário no input.

### Fase 5: Tela de Detalhes com Parâmetros de Rota

Quando o usuário se interessar por um exercício da lista:

1. **Ação de Toque:** Envolver o cartão da lista em um `<TouchableOpacity>`. No evento `onPress`, acionar o navegador da rota Stack para avançar para a tela de detalhes.
2. **Passagem de Parâmetros:** Enviar o objeto completo do exercício (Nome, Descrição e Categoria) como parâmetro da navegação (`route.params`).
3. **Consumo na Tela de Destino:** A tela de detalhes lerá esses parâmetros e os injetará nos componentes visuais.
4. **Tratamento de Texto HTML (Dica de Ouro da Wger):** A API da Wger costuma retornar a descrição do exercício com tags HTML (como `<p>` ou `<ul>`). Planeje uma pequena lógica de limpeza de texto (usando expressões regulares ou substituição de strings simples) para remover essas tags antes de exibir o texto no componente `<Text>`, garantindo uma interface polida e profissional para a avaliação do professor.

---

## Arquitetura e Estruturação do Firebase

Para cumprir essa exigência de forma limpa e performática, o aplicativo deve ser estruturado seguindo as seguintes etapas de planejamento (sem escrita de código):

### Passo 1: Inicialização do Ecossistema e Configuração (SDK)

* **Instalação dos Módulos:** Planejar a inclusão do SDK do Firebase no projeto compatível com o Expo.
* **Centralização de Credenciais:** Criar um arquivo de inicialização isolado na raiz do projeto (ex: `firebaseConfig.js`). Este arquivo será responsável por ler as chaves públicas geradas no Console do Firebase e exportar as instâncias prontas do serviço de Autenticação e do Banco de Dados (Firestore) para todo o aplicativo.

### Passo 2: Estruturação do Fluxo de Autenticação (Firebase Auth)

A lógica de autenticação deve ser amarrada diretamente ao ciclo de vida global do aplicativo no `App.js`:

* **Mecanismo de Escuta Ativa:** Planejar o uso de um listener nativo do Firebase Authentication no carregamento inicial do app. Esse listener verifica em tempo real se o usuário já estava logado anteriormente no dispositivo.
* **Chaveamento de Telas Automatizado:** * Se o usuário *não estiver logado*, o estado global bloqueia a aplicação e exibe apenas a **Tela de Login/Registro** (requisito 4).
* Se o usuário *efetuar o login com sucesso*, o estado muda, a tela de login é desmontada da memória e o usuário é direcionado para o Dashboard.


* **Rotinas de Formulário:** Na tela de login, vincular os botões às promessas assíncronas do Firebase: o botão de registrar aciona a criação de conta por Email/Senha, e o de entrar realiza a validação das credenciais na nuvem.

### Passo 3: Modelagem do Banco de Dados NoSQL (Firestore)

Como o Firestore é um banco baseado em documentos e coleções, precisamos desenhar a árvore de dados para o Kinetic. O planejamento ideal para o seu tema de treinos é:

1. **Coleção Principal `usuarios`:**
* Cada documento dentro dessa coleção terá como ID único o próprio identificador gerado pelo Firebase Auth (`uid`).
* **Campos do documento:** Nome do usuário, foto de perfil, nível de experiência e configurações estéticas.


2. **Subcoleção ou Coleção `treinos_customizados`:**
* Documentos contendo a estrutura dos treinos criados no formulário de `CriarTreino.js`.
* **Campos do documento:** ID do usuário criador (para garantir a privacidade), nome do esporte, foco do treino, dias selecionados, tempo de descanso e se as notificações estão ativas.


3. **Coleção `historico_treinos` (Opcional para enriquecer o projeto):**
* Registros de quando o usuário clica em "Concluir Treino" nas telas de modalidades, salvando a data e o esporte finalizado.

### Passo 4: Integração dos Componentes Atuais com o Firestore

Com o banco modelado, as telas atuais do Kinetic deixarão de ser isoladas e passarão a salvar e ler dados da nuvem:

* **Persistência no `CriarTreino.js`:** Ao preencher o formulário (selecionar o Picker customizado de esporte, arrastar o slider de descanso e ativar o switch de notificações) e clicar em "Salvar", o aplicativo deve disparar uma função assíncrona que envia esse objeto estruturado diretamente para a coleção do Firestore, associando-o ao ID do usuário logado.
* **Leitura Dinâmica no Dashboard:** No Dashboard principal, planejar uma rotina que busca em tempo real (ou via carregamento único) os treinos customizados daquele usuário salvos no Firestore, listando-os dinamicamente na interface através da `FlatList`.
* **Alimentação da Tela de Perfil:** A nova Tela de Perfil deve fazer uma requisição ao documento do usuário na coleção `usuarios` para puxar os dados cadastrais e exibi-los nos campos de texto de forma dinâmica.

### Passo 5: Gerenciamento de Estados de Espera e Feedback do Usuário

* Toda operação com o Firebase (autenticar, salvar treino, carregar perfil) leva tempo de rede. Portanto, todas essas ações devem ativar temporariamente o estado de **Loading** (requisito 3) disparando o `ActivityIndicator`, impedindo que o usuário clique duas vezes no botão de salvar enquanto os dados estão viajando para a nuvem.
* Tratar cenários de erro (como senha incorreta ou falta de internet) exibindo alertas informativos na tela para que o app nunca trave visualmente.

---

## Estruturação do Drawer Navigation

Para atender a este requisito mantendo a identidade visual fluida e moderna do Kinetic, a arquitetura de navegação lateral deve ser planejada conforme os passos abaixo:

### Passo 1: Preparação da Infraestrutura e Dependências

* **Configuração de Gestos e Animações:** Planejar a instalação do pacote `@react-navigation/drawer`, assegurando que as bibliotecas de suporte a gestos nativos (`react-native-gesture-handler`) e animações (`react-native-reanimated`) estejam devidamente vinculadas ao ecossistema do Expo para que o menu deslize suavemente a partir da lateral da tela.
* **Componente de Entrada:** O ponto de entrada do usuário logado no `App.js` passará a renderizar o container do `Drawer.Navigator`, que atuará como o mestre de cerimônias de todas as telas internas.

### Passo 2: Mapeamento de Rotas e Componentização do Drawer

Configurar o Drawer para gerenciar três destinos principais com propósitos muito claros:

1. **Rota "Início":** Direciona o usuário para o Dashboard principal (ou para a pilha de telas que gerencia os treinos e modalidades).
2. **Rota "Perfil":** Direciona para a nova tela de dados cadastrais e preferências do usuário.
3. **Ação "Sair":** Planejar este item de forma diferenciada. Em vez de apontar para uma tela comum, ele funcionará como um botão de ação em JavaScript que dispara a rotina de encerramento de sessão no Firebase Auth, limpando o estado e jogando o usuário de volta para a tela de Login.

### Passo 3: Customização Visual (Layout, Nomes e Ícones)

Para cumprir a exigência de nomes claros e ícones para cada rota, utilizaremos a estratégia de um **Custom Drawer Content** (Conteúdo Customizado do Drawer):

* **Cabeçalho do Menu (Header):** Planejar uma área no topo do menu lateral para exibir uma foto miniatura do usuário, seu nome e uma mensagem de saudação (ex: "Olá, Atleta!"). Isso eleva o nível profissional do design.
* **Vínculo de Ícones Vetoriais:** Associar um ícone SVG importado para cada linha do menu (um ícone de casa/painel para "Início", o `ProfileIcon` existente para "Perfil" e um ícone de logout para "Sair").
* **Tipografia e Cores:** Aplicar a fonte *Lexend* em todos os rótulos de texto e configurar uma cor de destaque (o azul royal do Kinetic) para pintar o fundo do item de menu que estiver ativo no momento, deixando os itens inativos em tons neutros de cinza.

### Passo 4: Integração com a Interface do Dashboard

* **Botão de Gatilho (Menu Hamburger):** Atualmente, o Dashboard do Kinetic ocupa o topo da tela com o resumo semanal. Deve-se planejar a inclusão de um botão discreto no canto superior esquerdo (ícone de três listras ou "hamburger").
* **Ação de Abertura:** Vincular o toque nesse botão à ação nativa de navegação para abrir o menu lateral de forma programática. O usuário poderá acessar o menu tanto arrastando o dedo a partir do canto esquerdo da tela quanto clicando neste botão.

### Passo 5: Limpeza de Elementos Redundantes

* **Remoção do BottomNav Manual:** Como o Drawer passará a centralizar os caminhos globais do aplicativo (Início e Perfil), a barra de navegação inferior estática feita de Views dentro do `App.js` e das telas de treino deve ser planejada para remoção ou adaptada para não confundir o usuário com duas navegações paralelas competindo pelo mesmo destino.
