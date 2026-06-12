import React, { useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

export default function CustomPicker({ visible, tipo, opcoes, onClose, onSelect }) {
  const slideAnim = useRef(new Animated.Value(600)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 600,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity activeOpacity={1} style={styles.modalOverlay} onPress={onClose}>
        <Animated.View 
          style={[styles.modalContent, { transform: [{ translateY: slideAnim }] }]}
        >
          {/* Previne fechar quando clica dentro do conteúdo */}
          <TouchableOpacity activeOpacity={1} style={{ width: '100%' }}>
            <Text style={styles.modalTitle}>Selecione: {tipo}</Text>
            {opcoes.map((op) => (
              <TouchableOpacity 
                key={op} 
                style={styles.modalOption}
                onPress={() => onSelect(op)}
              >
                <Text style={styles.modalOptionText}>{op}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity 
              style={styles.modalCancelButton}
              onPress={onClose}
            >
              <Text style={styles.modalCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.5)', 
    justifyContent: 'flex-end' 
  },
  modalContent: { 
    backgroundColor: '#FFFFFF', 
    borderTopLeftRadius: 24, 
    borderTopRightRadius: 24, 
    padding: 20, 
    paddingBottom: 40 
  },
  modalTitle: { 
    fontFamily: 'Lexend_700Bold', 
    fontSize: 18, 
    color: '#1A1C29', 
    marginBottom: 20, 
    textAlign: 'center' 
  },
  modalOption: { 
    paddingVertical: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#F3F4F6', 
    alignItems: 'center' 
  },
  modalOptionText: { 
    fontFamily: 'Lexend_400Regular', 
    fontSize: 16, 
    color: '#005CEE' 
  },
  modalCancelButton: { 
    marginTop: 20, 
    alignItems: 'center' 
  },
  modalCancelText: { 
    fontFamily: 'Lexend_700Bold', 
    fontSize: 16, 
    color: '#EF4444' 
  },
});
