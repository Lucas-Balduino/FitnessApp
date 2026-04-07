import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView, 
  TextInput,
  Modal
} from 'react-native';

// ==========================================
// COMPONENTES CUSTOMIZADOS (DESIGN SYSTEM)
// ==========================================

// 1. SWITCH CUSTOMIZADO
const CustomSwitch = ({ value, onValueChange, activeColor = '#84CC16' }) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={() => onValueChange(!value)}
    style={[
      styles.switchTrack,
      { 
        backgroundColor: value ? activeColor : '#E5E7EB',
        alignItems: value ? 'flex-end' : 'flex-start'
      }
    ]}
  >
    <View style={styles.switchThumb} />
  </TouchableOpacity>
);

// 2. SLIDER CUSTOMIZADO (Arrastável)
const CustomSlider = ({ value, min, max, onValueChange, activeColor }) => {
  const [trackWidth, setTrackWidth] = useState(0);

  const handleTouch = (evt) => {
    // Calcula a porcentagem do toque em relação à largura total da barra
    const touchX = evt.nativeEvent.locationX;
    let percent = touchX / trackWidth;
    if (percent < 0) percent = 0;
    if (percent > 1) percent = 1;
    
    // Converte a porcentagem para o valor real entre min e max
    const newValue = Math.round(min + (max - min) * percent);
    onValueChange(newValue);
  };

  // Calcula a posição atual da bolinha (0% a 100%)
  const positionPercent = ((value - min) / (max - min)) * 100;

  return (
    <View 
      style={styles.sliderTouchArea}
      onLayout={(e) => setTrackWidth(e.nativeEvent.layout.width)}
      onStartShouldSetResponder={() => true}
      onResponderGrant={handleTouch} // Quando toca na barra
      onResponderMove={handleTouch}  // Quando arrasta o dedo
    >
      <View style={styles.sliderTrack}>
        <View style={[styles.sliderFill, { width: `${positionPercent}%`, backgroundColor: activeColor }]} />
        <View style={[styles.sliderThumb, { left: `${positionPercent}%`, borderColor: activeColor }]} />
      </View>
    </View>
  );
};

// ==========================================
// TELA PRINCIPAL
// ==========================================

export default function CriarTreino({ fechar }) {
  // --- ESTADOS DO FORMULÁRIO ---
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [notas, setNotas] = useState('');
  
  // Estados dos Switches
  const [treinoParceiro, setTreinoParceiro] = useState(true);
  const [notificacoes, setNotificacoes] = useState(false);

  // Estados dos Sliders
  const [intensidade, setIntensidade] = useState(5); // 1 a 10
  const [duracao, setDuracao] = useState(30);        // 10 a 120 min

  // Estados dos Pickers
  const [modalidade, setModalidade] = useState('Corrida');
  const [dificuldade, setDificuldade] = useState('Avançado');
  
  // Controle do Modal de Seleção (Picker Customizado)
  const [pickerConfig, setPickerConfig] = useState({ visible: false, tipo: '', opcoes: [] });

  // Listas de Opções
  const opcoesModalidade = ['Musculação', 'Corrida', 'Ciclismo', 'Futebol', 'Voleibol', 'Natação', 'Customizado'];
  const opcoesDificuldade = ['Iniciante', 'Intermediário', 'Avançado', 'Expert'];

  const abrirPicker = (tipo) => {
    setPickerConfig({
      visible: true,
      tipo: tipo,
      opcoes: tipo === 'Modalidade' ? opcoesModalidade : opcoesDificuldade
    });
  };

  const selecionarOpcao = (opcao) => {
    if (pickerConfig.tipo === 'Modalidade') setModalidade(opcao);
    if (pickerConfig.tipo === 'Dificuldade') setDificuldade(opcao);
    setPickerConfig({ ...pickerConfig, visible: false });
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* CABEÇALHO */}
      <View style={styles.header}>
        <TouchableOpacity onPress={fechar} style={styles.closeButton}>
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.logoTitle}>KINETIC</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* CONTEÚDO */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle}>Crie{'\n'}Seu Treino</Text>
          <Text style={styles.subtitle}>Crie a base da sua performance</Text>
        </View>

        {/* 1. INFORMAÇÕES BÁSICAS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>INFORMAÇÕES BÁSICAS</Text>
          
          <View style={styles.inputCard}>
            <Text style={styles.inputLabel}>NOME DO TREINO</Text>
            <TextInput 
              style={styles.textInput} 
              placeholder="Ex: Treino de Pernas" 
              placeholderTextColor="#D1D5DB"
              value={nome}
              onChangeText={setNome}
            />
          </View>

          <View style={styles.inputCard}>
            <Text style={styles.inputLabel}>DESCRIÇÃO</Text>
            <TextInput 
              style={[styles.textInput, { height: 60 }]} 
              placeholder="Foco em hipertrofia..." 
              placeholderTextColor="#D1D5DB"
              multiline
              value={descricao}
              onChangeText={setDescricao}
            />
          </View>
        </View>

        {/* 2. CLASSIFICAÇÃO (Pickers Funcionais) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CLASSIFICAÇÃO</Text>
          
          <Text style={styles.subLabel}>MODALIDADE DE ESPORTE</Text>
          <TouchableOpacity style={styles.pickerCard} onPress={() => abrirPicker('Modalidade')}>
            <Text style={styles.pickerTextBlue}>{modalidade}</Text>
            <Text style={styles.chevron}>˅</Text>
          </TouchableOpacity>

          <Text style={styles.subLabel}>DIFICULDADE</Text>
          <TouchableOpacity style={styles.pickerCard} onPress={() => abrirPicker('Dificuldade')}>
            <View style={styles.rowAlign}>
              <Text style={styles.pickerTextOrange}>{dificuldade}</Text>
            </View>
            <Text style={styles.chevron}>˅</Text>
          </TouchableOpacity>
        </View>

        {/* 3. PARÂMETROS (Sliders Funcionais) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PARAMETROS</Text>
          
          {/* Slider Intensidade */}
          <View style={styles.sliderContainer}>
            <View style={styles.sliderHeader}>
              <Text style={styles.subLabel}>INTENSIDADE</Text>
              <Text style={styles.sliderValueBlue}>{intensidade}<Text style={styles.sliderValueMuted}>/10</Text></Text>
            </View>
            <CustomSlider 
              value={intensidade} min={1} max={10} 
              onValueChange={setIntensidade} activeColor="#005CEE" 
            />
          </View>

          {/* Slider Duração */}
          <View style={styles.sliderContainer}>
            <View style={styles.sliderHeader}>
              <Text style={styles.subLabel}>DURAÇÃO</Text>
              <Text style={styles.sliderValueDark}>{duracao}<Text style={styles.sliderValueMuted}>min</Text></Text>
            </View>
            <CustomSlider 
              value={duracao} min={10} max={120} 
              onValueChange={setDuracao} activeColor="#F26522" 
            />
          </View>
        </View>

        {/* 4. PREFERÊNCIAS (Switches Funcionais) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PREFERENCIAS</Text>
          
          <View style={styles.preferenceCard}>
            <View>
              <Text style={styles.preferenceTitle}>Treino com parceiro</Text>
              <Text style={styles.preferenceSubtitle}>Compartilhe métricas</Text>
            </View>
            <CustomSwitch value={treinoParceiro} onValueChange={setTreinoParceiro} activeColor="#82E53A" />
          </View>

          <View style={styles.preferenceCard}>
            <View>
              <Text style={styles.preferenceTitle}>Notificações de Treino</Text>
              <Text style={styles.preferenceSubtitle}>Me lembre de fazer esse treino</Text>
            </View>
            <CustomSwitch value={notificacoes} onValueChange={setNotificacoes} activeColor="#82E53A" />
          </View>
        </View>

        {/* BOTÃO SALVAR */}
        <TouchableOpacity style={styles.saveButton} onPress={fechar}>
          <Text style={styles.saveButtonText}>SALVAR</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* ==========================================
          MODAL DO PICKER CUSTOMIZADO (Bottom Sheet)
          ========================================== */}
      <Modal visible={pickerConfig.visible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione a {pickerConfig.tipo}</Text>
            
            {pickerConfig.opcoes.map((opcao, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.modalOption}
                onPress={() => selecionarOpcao(opcao)}
              >
                <Text style={styles.modalOptionText}>{opcao}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity 
              style={styles.modalCancelButton}
              onPress={() => setPickerConfig({ ...pickerConfig, visible: false })}
            >
              <Text style={styles.modalCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

// ==========================================
// ESTILOS
// ==========================================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FE' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15 },
  closeButton: { padding: 5 },
  closeIcon: { fontSize: 24, color: '#1A1C29', fontWeight: 'bold' },
  logoTitle: { fontSize: 20, color: '#005CEE', fontWeight: '900', letterSpacing: 1 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  titleContainer: { marginTop: 10, marginBottom: 30 },
  mainTitle: { fontSize: 42, color: '#1A1C29', fontWeight: '900', lineHeight: 45 },
  subtitle: { fontSize: 16, color: '#6B7280', marginTop: 10, fontWeight: '500' },
  
  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#9CA3AF', letterSpacing: 1, marginBottom: 15 },
  
  inputCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 15, marginBottom: 15, shadowColor: '#000', shadowOpacity: 0.02, shadowRadius: 8, elevation: 1 },
  inputLabel: { fontSize: 12, fontWeight: 'bold', color: '#9CA3AF', letterSpacing: 1, marginBottom: 5 },
  textInput: { fontSize: 18, color: '#1A1C29', fontWeight: 'bold' },
  
  subLabel: { fontSize: 12, fontWeight: 'bold', color: '#9CA3AF', letterSpacing: 1, marginBottom: 8, marginLeft: 5 },
  pickerCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 18, marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  pickerTextBlue: { fontSize: 20, fontWeight: 'bold', color: '#005CEE' },
  pickerTextOrange: { fontSize: 20, fontWeight: 'bold', color: '#F26522' },
  chevron: { fontSize: 18, color: '#9CA3AF', fontWeight: 'bold' },

  // Estilos do Slider Customizado
  sliderContainer: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, marginBottom: 15 },
  sliderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  sliderValueBlue: { fontSize: 24, fontWeight: 'bold', color: '#005CEE' },
  sliderValueDark: { fontSize: 24, fontWeight: 'bold', color: '#1A1C29' },
  sliderValueMuted: { fontSize: 16, color: '#D1D5DB' },
  sliderTouchArea: { height: 30, justifyContent: 'center' },
  sliderTrack: { height: 8, backgroundColor: '#F3F4F6', borderRadius: 4, width: '100%', position: 'relative', justifyContent: 'center' },
  sliderFill: { height: 8, borderRadius: 4, position: 'absolute', left: 0 },
  sliderThumb: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#FFFFFF', borderWidth: 4, position: 'absolute', marginLeft: -12 }, // marginLeft = metade do width para centralizar

  // Estilos do Switch Customizado
  preferenceCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, marginBottom: 15 },
  preferenceTitle: { fontSize: 16, fontWeight: 'bold', color: '#1A1C29', marginBottom: 4 },
  preferenceSubtitle: { fontSize: 12, color: '#9CA3AF' },
  switchTrack: { width: 52, height: 30, borderRadius: 15, padding: 3, justifyContent: 'center' },
  switchThumb: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#FFFFFF', shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.2, shadowRadius: 2, elevation: 2 },

  // Botão Salvar
  saveButton: { backgroundColor: '#005CEE', borderRadius: 16, paddingVertical: 18, alignItems: 'center', marginTop: 10, shadowColor: '#005CEE', shadowOpacity: 0.3, shadowRadius: 10, shadowOffset: { width: 0, height: 5 }, elevation: 5 },
  saveButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },

  // Estilos do Modal do Picker
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, paddingBottom: 40 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A1C29', marginBottom: 20, textAlign: 'center' },
  modalOption: { paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  modalOptionText: { fontSize: 18, color: '#005CEE', textAlign: 'center', fontWeight: '600' },
  modalCancelButton: { marginTop: 20, paddingVertical: 15, backgroundColor: '#F3F4F6', borderRadius: 12 },
  modalCancelText: { fontSize: 16, color: '#EF4444', textAlign: 'center', fontWeight: 'bold' }
});