import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

export default function GoogleSignInButton(props) {
  const { onPress, title = 'Save' } = props;
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
		width: "80%",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: '#2B2B45',
    marginTop: 164
  },
  text: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});