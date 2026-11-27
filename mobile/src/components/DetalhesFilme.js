import { useEffect, useState } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import Carregando from './Carregando'
import Provedores from './Provedores'
import backendClient from '../utils/backendClient'
import { formatarDuracao, formatarNota } from '../utils/formatacao'

export default function DetalhesFilme({ id, onVoltar }) {
  const [filme, setFilme] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    setCarregando(true)
    setErro(null)
    backendClient
      .get('/filme', { params: { id } })
      .then((resposta) => {
        setFilme(resposta.data)
        setCarregando(false)
      })
      .catch((e) => {
        console.log(e)
        setErro(e.response?.data?.mensagem || 'Não foi possível carregar os detalhes.')
        setCarregando(false)
      })
  }, [id])

  const renderConteudo = () => {
    if (carregando) return <Carregando mensagem="Carregando os detalhes..." />
    if (erro) return <Text style={styles.erro}>{erro}</Text>

    const partes = []
    if (filme.ano) partes.push(filme.ano)
    if (filme.duracao) partes.push(formatarDuracao(filme.duracao))
    if (filme.generos.length > 0) partes.push(filme.generos.join(' · '))
    const informacoes = partes.join(' · ')

    const ondeAssistir = filme.ondeAssistir
    const semProvedores =
      ondeAssistir.assinatura.length === 0 &&
      ondeAssistir.aluguel.length === 0 &&
      ondeAssistir.compra.length === 0

    return (
      <ScrollView>
        {filme.fundo && <Image source={{ uri: filme.fundo }} style={styles.fundo} />}
        <View style={styles.cabecalho}>
          {filme.poster ? (
            <Image source={{ uri: filme.poster }} style={styles.poster} />
          ) : (
            <View style={[styles.poster, styles.semPoster]}>
              <Text style={styles.textoSemPoster}>Sem pôster</Text>
            </View>
          )}
          <View style={styles.info}>
            <Text style={styles.titulo}>{filme.titulo}</Text>
            {informacoes !== '' && <Text style={styles.informacoes}>{informacoes}</Text>}
            <Text style={styles.nota}>{formatarNota(filme.nota)}</Text>
          </View>
        </View>
        <View style={styles.secao}>
          <Text style={styles.tituloSecao}>Sinopse</Text>
          <Text style={styles.sinopse}>{filme.sinopse || 'Sinopse indisponível'}</Text>
        </View>
        <View style={styles.secao}>
          <Text style={styles.tituloSecao}>Onde assistir no Brasil</Text>
          {semProvedores ? (
            <Text style={styles.sinopse}>
              Este filme não está disponível em nenhum serviço no Brasil no momento.
            </Text>
          ) : (
            <>
              <Provedores titulo="Assinatura" provedores={ondeAssistir.assinatura} />
              <Provedores titulo="Aluguel" provedores={ondeAssistir.aluguel} />
              <Provedores titulo="Compra" provedores={ondeAssistir.compra} />
            </>
          )}
          <Text style={styles.fonte}>Dados de disponibilidade: JustWatch</Text>
        </View>
      </ScrollView>
    )
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.voltar} onPress={onVoltar}>
        <Text style={styles.textoVoltar}>‹ Voltar</Text>
      </Pressable>
      {renderConteudo()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  voltar: {
    paddingHorizontal: 16,
    paddingVertical: 10
  },
  textoVoltar: {
    color: '#E0473C',
    fontSize: 16,
    fontWeight: 'bold'
  },
  erro: {
    color: '#FF8A80',
    fontSize: 16,
    textAlign: 'center',
    padding: 24
  },
  fundo: {
    width: '100%',
    height: 180
  },
  cabecalho: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 12
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  informacoes: {
    fontSize: 14,
    color: '#9A9AB5',
    marginTop: 4
  },
  nota: {
    fontSize: 14,
    color: '#F5B433',
    marginTop: 4
  },
  secao: {
    paddingHorizontal: 16,
    paddingTop: 16
  },
  tituloSecao: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6
  },
  sinopse: {
    fontSize: 14,
    color: '#C8C8DC',
    lineHeight: 20
  },
  fonte: {
    fontSize: 11,
    fontStyle: 'italic',
    color: '#7A7A95',
    marginTop: 16,
    marginBottom: 16
  }
})
