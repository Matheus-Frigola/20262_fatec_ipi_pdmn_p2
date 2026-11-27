import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'

export default function Busca({ termo, onTermoAlterado, onLimpar, buscando }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.campo}
        value={termo}
        onChangeText={onTermoAlterado}
        placeholder="Digite o título de um filme"
        placeholderTextColor="#7A7A95"
      />
      {termo !== '' && (
        <Pressable style={styles.limpar} onPress={onLimpar}>
          <Text style={styles.textoLimpar}>✕</Text>
        </Pressable>
      )}
      {buscando && <ActivityIndicator size="small" color="#E0473C" style={styles.indicador} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#22223A',
    borderRadius: 10,
    marginHorizontal: 16,
    marginTop: 8,
    paddingLeft: 12
  },
  campo: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    paddingVertical: 10
  },
  limpar: {
    paddingHorizontal: 8,
    paddingVertical: 10
  },
  textoLimpar: {
    color: '#C8C8DC',
    fontSize: 16
  },
  indicador: {
    marginRight: 12
  }
})
