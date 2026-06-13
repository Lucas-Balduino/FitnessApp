import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

/**
 * Componente padronizado de loading para uso em todas as telas.
 * Exibe um ActivityIndicator centralizado com mensagem opcional.
 * 
 * @param {string} [mensagem] - Texto exibido abaixo do indicador
 * @param {string} [cor] - Cor do indicador (padrão: #005CEE)
 * @param {string} [tamanho] - Tamanho do indicador: 'small' ou 'large' (padrão: 'large')
 */
export default function LoadingOverlay({ mensagem, cor = '#005CEE', tamanho = 'large' }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={tamanho} color={cor} />
      {mensagem && <Text style={styles.mensagem}>{mensagem}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FE',
  },
  mensagem: {
    fontFamily: 'Lexend_400Regular',
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 12,
  },
});
