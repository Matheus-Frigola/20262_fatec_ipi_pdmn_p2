import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'

export default function Provedores({ titulo, provedores }) {
  if (provedores.length === 0) return null

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>
      <ScrollView horizontal>
        {provedores.map((provedor) => (
          <View key={provedor.nome} style={styles.item}>
            {provedor.logo ? (
              <Image source={{ uri: provedor.logo }} style={styles.logo} />
            ) : (
              <View style={[styles.logo, styles.semLogo]} />
            )}
            <Text style={styles.nome} numberOfLines={2}>
              {provedor.nome}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12
  },
  titulo: {
    fontSize: 14,
    color: '#9A9AB5',
    marginBottom: 6
  },
  item: {
    width: 64,
    alignItems: 'center',
    marginRight: 8
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 10
  },
  semLogo: {
    backgroundColor: '#777777'
  },
  nome: {
    fontSize: 11,
    color: '#C8C8DC',
    textAlign: 'center',
    marginTop: 4
  }
})
