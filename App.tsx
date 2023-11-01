import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';

export default function App() {
  const [email, setEmail] = useState("")
  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
      <TextInput
      label="Email"
      value={email}
      onChangeText={email => setEmail(email)}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
