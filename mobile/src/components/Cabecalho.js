import { StyleSheet, Text, View } from 'react-native'

export default function Cabecalho() {
  return (
    <View style={styles.container}>
      <View style={styles.linha}>
        <Text style={styles.emoji}>🍿</Text>
        <Text style={styles.nome}>OndePassa</Text>
      </View>
      <Text style={styles.subtitulo}>Descubra onde assistir qualquer filme</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  emoji: {
    fontSize: 28,
    marginRight: 8
  },
  nome: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  subtitulo: {
    fontSize: 14,
    color: '#9A9AB5',
    marginTop: 4
  }
})
