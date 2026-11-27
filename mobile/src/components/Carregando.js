import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

export default function Carregando({ mensagem = 'Carregando...' }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#E0473C" />
      <Text style={styles.mensagem}>{mensagem}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24
  },
  mensagem: {
    marginTop: 12,
    fontSize: 14,
    color: '#C8C8DC',
    textAlign: 'center'
  }
})
