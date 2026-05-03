import { View, Text, StyleSheet, StatusBar } from 'react-native';
// import { StatusBar } from 'expo-status-bar'; // Removed

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>GlowUp Hub</Text>
      <Text style={styles.subtitle}>Mobile App v1.0</Text>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFBF9" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBF9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#E8B4B8',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7A7A7A',
  },
});
