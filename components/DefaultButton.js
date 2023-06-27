import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

export default function DefaultButton(props, styles) {
  const { onPress, title = 'Save' } = props;
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}
