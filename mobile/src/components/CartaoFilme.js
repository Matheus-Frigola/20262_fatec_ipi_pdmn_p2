import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { formatarNota } from '../utils/formatacao'

export default function CartaoFilme({ titulo, ano, nota, poster, onSelecionar }) {
  return (
    <Pressable style={styles.cartao} onPress={onSelecionar}>
      {poster ? (
        <Image source={{ uri: poster }} style={styles.poster} />
      ) : (
        <View style={[styles.poster, styles.semPoster]}>
          <Text style={styles.textoSemPoster}>Sem pôster</Text>
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.titulo} numberOfLines={2}>
          {titulo}
        </Text>
        {ano !== null && <Text style={styles.ano}>{ano}</Text>}
        <Text style={styles.nota}>{formatarNota(nota)}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  cartao: {
    flexDirection: 'row',
    backgroundColor: '#22223A',
    borderRadius: 10,
    padding: 8,
    marginBottom: 10
  },
  poster: {
    width: 70,
    height: 105,
    borderRadius: 6
  },
  semPoster: {
    backgroundColor: '#777777',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textoSemPoster: {
    fontSize: 11,
    color: '#FFFFFF',
    textAlign: 'center'
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center'
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  ano: {
    fontSize: 14,
    color: '#9A9AB5',
    marginTop: 4
  },
  nota: {
    fontSize: 14,
    color: '#F5B433',
    marginTop: 4
  }
})
