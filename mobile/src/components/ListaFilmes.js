import { FlatList, StyleSheet, Text, View } from 'react-native'
import CartaoFilme from './CartaoFilme'

export default function ListaFilmes({ titulo, filmes, onSelecionar }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>
      <FlatList
        data={filmes}
        keyExtractor={(filme) => String(filme.id)}
        renderItem={({ item }) => (
          <CartaoFilme
            titulo={item.titulo}
            ano={item.ano}
            nota={item.nota}
            poster={item.poster}
            onSelecionar={() => onSelecionar(item.id)}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginVertical: 12
  }
})
