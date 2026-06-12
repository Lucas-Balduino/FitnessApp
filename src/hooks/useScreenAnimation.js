import { useRef, useEffect } from 'react';
import { Animated, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/**
 * Custom hook para gerenciar animações de slide-in de telas
 * Retorna o valor animado para o `transform` e uma função para animar a saída
 */
export function useScreenAnimation(durationIn = 320, durationOut = 260) {
  // O valor inicial é a largura da tela (fica fora da tela à direita)
  const slideAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;

  // Animação de entrada
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: durationIn,
      useNativeDriver: true,
    }).start();
  }, [slideAnim, durationIn]);

  // Função para saída, que recebe um callback (geralmente navigation.goBack())
  const animateOut = (callback) => {
    Animated.timing(slideAnim, {
      toValue: SCREEN_WIDTH,
      duration: durationOut,
      useNativeDriver: true,
    }).start(() => {
      if (callback) {
        callback();
      }
    });
  };

  return { slideAnim, animateOut };
}
