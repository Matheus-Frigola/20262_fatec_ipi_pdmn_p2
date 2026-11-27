import { StyleSheet, Text, View } from 'react-native'

export default function Creditos() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>
        Este produto usa a API do TMDB, mas não é endossado nem certificado pelo TMDB.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 10
  },
  texto: {
    fontSize: 11,
    color: '#7A7A95',
    textAlign: 'center'
  }
})
