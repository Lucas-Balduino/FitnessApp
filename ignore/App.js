import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput, Switch, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

const treinos = [
  {
    id: 1,
    nome: 'Musculação',
    subtitulo: 'Treino de Força e Hipertrofia',
    imagem: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=200&auto=format&fit=crop',
    descricao: 'O treino de musculação foca no ganho de força e hipertrofia muscular. Através do levantamento de pesos e uso de máquinas, você estimula as fibras musculares, promovendo o crescimento e a resistência. É fundamental manter a postura correta e progredir a carga gradativamente para evitar lesões e garantir resultados consistentes a longo prazo.',
    duracao: '60 min',
    intensidade: 'Alta'
  },
  {
    id: 2,
    nome: 'Corrida',
    subtitulo: 'Treino Cardiovascular',
    imagem: 'https://images.unsplash.com/photo-1526508426152-6b74737c35f0?q=80&w=200&auto=format&fit=crop',
    descricao: 'A corrida é um excelente exercício cardiovascular que melhora a capacidade respiratória, fortalece o coração e ajuda na queima de calorias. Iniciar com caminhadas intercaladas e aumentar o ritmo progressivamente é ideal para iniciantes. Além dos benefícios físicos, a corrida ao ar livre também contribui significativamente para a redução do estresse e bem-estar mental.',
    duracao: '45 min',
    intensidade: 'Média/Alta'
  },
  {
    id: 3,
    nome: 'Ciclismo',
    subtitulo: 'Resistência e Baixo Impacto',
    imagem: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=200&auto=format&fit=crop',
    descricao: 'O ciclismo é uma atividade de baixo impacto para as articulações, perfeita para construir resistência nas pernas e melhorar a saúde do sistema cardiovascular. Pode ser praticado em estradas, trilhas ou até mesmo em bicicletas ergométricas indoor. É uma forma divertida e sustentável de se exercitar, permitindo explorar novos lugares enquanto melhora o condicionamento físico.',
    duracao: '90 min',
    intensidade: 'Média'
  },
  {
    id: 4,
    nome: 'Vôlei',
    subtitulo: 'Agilidade e Explosão',
    imagem: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=200&auto=format&fit=crop',
    descricao: 'O vôlei é um esporte coletivo dinâmico que exige agilidade, coordenação motora e trabalho em equipe. Os constantes saltos, cortes e bloqueios fortalecem os membros inferiores e superiores, além de melhorar consideravelmente o tempo de reação. É uma ótima opção para quem busca uma atividade física interativa, estimulante e que desenvolve tanto o corpo quanto a socialização.',
    duracao: '120 min',
    intensidade: 'Alta'
  },
  {
    id: 5,
    nome: 'Futebol',
    subtitulo: 'Treino HIIT Natural',
    imagem: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=200&auto=format&fit=crop',
    descricao: 'O futebol é um esporte de alta intensidade que intercala piques de corrida com momentos de recuperação. Essa dinâmica melhora o condicionamento aeróbico e anaeróbico, além de fortalecer os músculos das pernas e do core. A prática regular também aprimora a visão de jogo, a tomada de decisão rápida e promove uma grande integração social entre os participantes.',
    duracao: '90 min',
    intensidade: 'Muito Alta'
  }
];

export default function App() {
  const [telaAtual, setTelaAtual] = useState('home'); // 'home', 'detalhes', 'formulario'
  const [treinoSelecionado, setTreinoSelecionado] = useState(null);

  // Estados do Formulário (Parte 3)
  const [nomeTreino, setNomeTreino] = useState('');
  const [autor, setAutor] = useState('');
  const [foco, setFoco] = useState('');
  const [equipamentos, setEquipamentos] = useState('');
  const [esporteSelecionado, setEsporteSelecionado] = useState('Musculação');
  const [nivelSelecionado, setNivelSelecionado] = useState('Iniciante');
  const [duracaoSlide, setDuracaoSlide] = useState(30);
  const [intensidadeSlide, setIntensidadeSlide] = useState(5);
  const [isPublico, setIsPublico] = useState(true);
  const [requerEquipamento, setRequerEquipamento] = useState(true);

  const abrirDetalhes = (treino) => {
    setTreinoSelecionado(treino);
    setTelaAtual('detalhes');
  };

  const salvarFormulario = () => {
    Alert.alert('Sucesso!', 'Seu treino foi salvo com sucesso.');
    setTelaAtual('home');
  };

  // --- TELA 1: LISTA (Parte 1) ---
  if (telaAtual === 'home') {
    return (
      <ScrollView style={styles.container}>
        {/* Imagem 1: Banner Principal */}
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600&auto=format&fit=crop' }} 
          style={styles.banner} 
        />
        <View style={styles.headerContainer}>
          <Text style={styles.tituloApp}>FitShare</Text>
          <Text style={styles.descricaoApp}>Descubra e compartilhe as melhores estruturas de treino.</Text>
          <TouchableOpacity style={styles.btnPrimarioLargo} onPress={() => setTelaAtual('formulario')}>
            <Text style={styles.txtBtnPrimario}>Criar Novo Treino</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Categorias de Treino</Text>
        
        {/* Imagens 2 a 6: Lista de Itens */}
        {treinos.map((treino) => (
          <TouchableOpacity key={treino.id} style={styles.cardLista} onPress={() => abrirDetalhes(treino)}>
            <Image source={{ uri: treino.imagem }} style={styles.imagemLista} />
            <View style={styles.infoLista}>
              <Text style={styles.nomeLista}>{treino.nome}</Text>
              <Text style={styles.subtituloLista}>{treino.subtitulo}</Text>
            </View>
            <Text style={styles.seta}>{'>'}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }

  // --- TELA 2: DETALHES (Parte 2) ---
  if (telaAtual === 'detalhes' && treinoSelecionado) {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.btnVoltar} onPress={() => setTelaAtual('home')}>
          <Text style={styles.txtVoltar}>{'< Voltar'}</Text>
        </TouchableOpacity>
        
        <Image source={{ uri: treinoSelecionado.imagem }} style={styles.imagemDetalhe} />
        
        <View style={styles.cardDetalhe}>
          <Text style={styles.tituloDetalhe}>{treinoSelecionado.nome}</Text>
          <Text style={styles.textoDetalhe}>{treinoSelecionado.descricao}</Text>
        </View>

        <View style={styles.cardInfoExtras}>
          <Text style={styles.txtExtra}>Duração Estimada: {treinoSelecionado.duracao}</Text>
          <Text style={styles.txtExtra}>Intensidade: {treinoSelecionado.intensidade}</Text>
        </View>
      </ScrollView>
    );
  }

  // --- TELA 3: FORMULÁRIO (Parte 3) ---
  if (telaAtual === 'formulario') {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.btnVoltar} onPress={() => setTelaAtual('home')}>
          <Text style={styles.txtVoltar}>{'< Voltar para Home'}</Text>
        </TouchableOpacity>

        <Text style={styles.tituloApp}>Criar Novo Treino</Text>

        {/* 4 Inputs de Texto */}
        <TextInput style={styles.input} placeholder="Nome do Treino" value={nomeTreino} onChangeText={setNomeTreino} />
        <TextInput style={styles.input} placeholder="Nome do Autor" value={autor} onChangeText={setAutor} />
        <TextInput style={styles.input} placeholder="Foco Principal (ex: Pernas)" value={foco} onChangeText={setFoco} />
        <TextInput style={styles.input} placeholder="Equipamentos Necessários" value={equipamentos} onChangeText={setEquipamentos} />

        {/* 2 Pickers */}
        <Text style={styles.label}>Esporte:</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={esporteSelecionado} onValueChange={(itemValue) => setEsporteSelecionado(itemValue)}>
            <Picker.Item label="Musculação" value="Musculação" />
            <Picker.Item label="Corrida" value="Corrida" />
            <Picker.Item label="Ciclismo" value="Ciclismo" />
          </Picker>
        </View>

        <Text style={styles.label}>Nível de Dificuldade:</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={nivelSelecionado} onValueChange={(itemValue) => setNivelSelecionado(itemValue)}>
            <Picker.Item label="Iniciante" value="Iniciante" />
            <Picker.Item label="Intermediário" value="Intermediário" />
            <Picker.Item label="Avançado" value="Avançado" />
          </Picker>
        </View>

        {/* 2 Sliders */}
        <Text style={styles.label}>Duração: {duracaoSlide} minutos</Text>
        <Slider
          style={{width: '100%', height: 40}}
          minimumValue={10} maximumValue={120} step={5}
          value={duracaoSlide} onValueChange={setDuracaoSlide}
          minimumTrackTintColor="#E50914"
        />

        <Text style={styles.label}>Intensidade: {intensidadeSlide}</Text>
        <Slider
          style={{width: '100%', height: 40}}
          minimumValue={1} maximumValue={10} step={1}
          value={intensidadeSlide} onValueChange={setIntensidadeSlide}
          minimumTrackTintColor="#E50914"
        />

        {/* 2 Switches */}
        <View style={styles.switchRow}>
          <Text style={styles.labelSwitch}>Tornar Treino Público?</Text>
          <Switch 
          trackColor={{ false: '#E2E8F0', true: '#FF724C' }} // Cinza quando inativo, Laranja quando ativo
          thumbColor={'#FFFFFF'}
          ios_backgroundColor="#E2E8F0"
          value={isPublico} 
          onValueChange={setIsPublico} 
          />
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.labelSwitch}>Requer Equipamento?</Text>
          <Switch 
            trackColor={{ false: '#E2E8F0', true: '#2A78E4' }} // Este usa o Azul Elétrico para variar
            thumbColor={'#FFFFFF'}
            ios_backgroundColor="#E2E8F0"
            value={requerEquipamento} 
            onValueChange={setRequerEquipamento} 
          />
        </View>

        {/* 2 Botões com Interação */}
        <View style={styles.botoesRow}>
          <TouchableOpacity style={styles.btnSecundario} onPress={() => setNomeTreino('')}>
           <Text style={styles.txtBtnSecundario}>Limpar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnPrimario} onPress={salvarFormulario}>
            <Text style={styles.txtBtnPrimario}>Salvar Treino</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  // Fundo off-white bem suave para destacar os cartões brancos flutuantes
  container: { 
    flex: 1, 
    backgroundColor: '#F8F9FE' 
  },
  
  // --- Estilos do Cabeçalho e Home ---
  banner: { 
    width: '100%', 
    height: 220,
    borderBottomLeftRadius: 40, // Arredondamento inferior (estilo moderno)
    borderBottomRightRadius: 40,
    overflow: 'hidden'
  },
  headerContainer: { 
    padding: 20, 
    backgroundColor: 'transparent', 
    marginBottom: 5,
    marginTop: -20, // Faz o texto "subir" um pouco no espaço
  },
  tituloApp: { 
    fontSize: 34, 
    fontWeight: '800', 
    color: '#1E2022', // Quase preto para alto contraste
    marginBottom: 8,
    letterSpacing: -0.5
  },
  descricaoApp: { 
    fontSize: 16, 
    color: '#77838F', 
    marginBottom: 20,
    lineHeight: 22
  },
  sectionTitle: { 
    fontSize: 22, 
    fontWeight: '700', 
    marginHorizontal: 20, 
    marginBottom: 15, 
    color: '#1E2022' 
  },
  
  // --- Estilos da Lista (Parte 1) - Efeito Neumórfico Suave ---
  cardLista: { 
    flexDirection: 'row', 
    backgroundColor: '#FFFFFF', 
    marginHorizontal: 20, 
    marginBottom: 16, 
    padding: 16, 
    borderRadius: 24, // Bordas bem arredondadas como nas referências
    alignItems: 'center', 
    // Sombras suaves (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    // Sombras suaves (Android)
    elevation: 3,
  },
  imagemLista: { 
    width: 66, 
    height: 66, 
    borderRadius: 33, 
    marginRight: 16,
    backgroundColor: '#F0F4F8' 
  },
  infoLista: { flex: 1 },
  nomeLista: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#1E2022',
    marginBottom: 4
  },
  subtituloLista: { 
    fontSize: 14, 
    color: '#77838F',
    fontWeight: '500'
  },
  seta: { 
    fontSize: 20, 
    color: '#FF724C', // Laranja vibrante
    fontWeight: 'bold',
    paddingHorizontal: 10 
  },

  // --- Estilos de Detalhes (Parte 2) ---
  btnVoltar: { 
    padding: 20, 
    marginTop: 40,
    flexDirection: 'row',
  },
  txtVoltar: { 
    fontSize: 16, 
    color: '#FF724C', 
    fontWeight: '800' 
  },
  imagemDetalhe: { 
    width: '100%', 
    height: 320,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  cardDetalhe: { 
    backgroundColor: '#FFFFFF', 
    marginHorizontal: 20, 
    padding: 25, 
    borderRadius: 24, 
    // Efeito flutuante de sobreposição
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 6, 
    marginTop: -60 
  },
  tituloDetalhe: { 
    fontSize: 28, 
    fontWeight: '800', 
    marginBottom: 12, 
    color: '#1E2022' 
  },
  textoDetalhe: { 
    fontSize: 16, 
    lineHeight: 26, 
    color: '#555', 
    textAlign: 'left' 
  },
  cardInfoExtras: { 
    backgroundColor: '#EAF2FB', // Fundo azul bem claro
    marginHorizontal: 20, 
    marginTop: 20,
    marginBottom: 40,
    padding: 20, 
    borderRadius: 16, 
  },
  txtExtra: { 
    fontSize: 15, 
    fontWeight: '700', 
    color: '#2A78E4', // Azul elétrico
    marginBottom: 5
  },

  // --- Estilos do Formulário (Parte 3) ---
  input: { 
    backgroundColor: '#FFFFFF', 
    marginHorizontal: 20, 
    marginBottom: 16, 
    paddingHorizontal: 20,
    paddingVertical: 16, 
    borderRadius: 16, 
    fontSize: 16,
    color: '#1E2022',
    // Usando sombra em vez de borda dura (borderWidth: 1 foi removido)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2, 
  },
  label: { 
    marginHorizontal: 20, 
    marginTop: 15, 
    marginBottom: 8,
    fontSize: 15, 
    fontWeight: '700', 
    color: '#77838F' 
  },
  pickerContainer: { 
    backgroundColor: '#FFFFFF', 
    marginHorizontal: 20, 
    marginBottom: 16, 
    borderRadius: 16, 
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  switchRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginHorizontal: 20, 
    marginVertical: 10,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  botoesRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    marginTop: 30, 
    marginHorizontal: 20 
  },
  // --- Estilos de Botões Customizados ---
  btnPrimarioLargo: {
    backgroundColor: '#FF724C',
    paddingVertical: 16,
    borderRadius: 30, // Bordas de pílula
    alignItems: 'center',
    marginTop: 15,
    // Sombra colorida para dar aquele brilho de app moderno!
    shadowColor: '#FF724C',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  btnPrimario: {
    backgroundColor: '#FF724C',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    flex: 1, // Faz o botão crescer para preencher o espaço
    marginLeft: 10, // Espaço entre os dois botões
    shadowColor: '#FF724C',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  btnSecundario: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  txtBtnPrimario: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  txtBtnSecundario: {
    color: '#77838F',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  // Ajuste fino para o texto do Switch ficar alinhado com o novo padding
  labelSwitch: {
    fontSize: 15, 
    fontWeight: '600', 
    color: '#1E2022'
  }
});