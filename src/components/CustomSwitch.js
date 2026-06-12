import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, Animated, StyleSheet } from 'react-native';

export default function CustomSwitch({ value, onValueChange, activeColor = '#34D399' }) {
  const slideAnim = useRef(new Animated.Value(value ? 22 : 0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: value ? 22 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [value, slideAnim]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onValueChange(!value)}
      style={[
        styles.switchTrack,
        { backgroundColor: value ? activeColor : '#E5E7EB' }
      ]}
    >
      <Animated.View style={[styles.switchThumb, { transform: [{ translateX: slideAnim }] }]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  switchTrack: { 
    width: 52, 
    height: 30, 
    borderRadius: 15, 
    padding: 3, 
    justifyContent: 'center' 
  },
  switchThumb: { 
    width: 24, 
    height: 24, 
    borderRadius: 12, 
    backgroundColor: '#FFFFFF', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 2, 
    elevation: 2 
  },
});
