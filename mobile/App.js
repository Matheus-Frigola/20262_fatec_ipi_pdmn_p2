import { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Cabecalho from './src/components/Cabecalho'
import Creditos from './src/components/Creditos'
import backendClient from './src/utils/backendClient'

export default function App() {
  const [emAlta, setEmAlta] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [termo, setTermo] = useState('')
  const [termoBuscado, setTermoBuscado] = useState('')
  const [resultados, setResultados] = useState(null)
  const [buscando, setBuscando] = useState(false)
  const [filmeSelecionado, setFilmeSelecionado] = useState(null)

  useEffect(() => {
    backendClient
      .get('/em-alta')
      .then((resposta) => {
        setEmAlta(resposta.data)
        setCarregando(false)
      })
      .catch((e) => {
        console.log(e)
        setCarregando(false)
        setErro('Não foi possível carregar os filmes. Verifique se o backend está no ar.')
      })
  }, [])

  useEffect(() => {
    const termoLimpo = termo.trim()

    if (termoLimpo === '') {
      setResultados(null)
      setErro(null)
      setBuscando(false)
      return
    }

    if (termoLimpo.length < 3) {
      setBuscando(false)
      return
    }

    let ativo = true
    const agendamento = setTimeout(() => {
      setBuscando(true)
      backendClient
        .get('/filmes', { params: { busca: termoLimpo } })
        .then((resposta) => {
          if (!ativo) return
          setResultados(resposta.data)
          setTermoBuscado(termoLimpo)
          setErro(null)
          setBuscando(false)
        })
        .catch((e) => {
          if (!ativo) return
          console.log(e)
          setErro(e.response?.data?.mensagem || 'Não foi possível buscar os filmes.')
          setBuscando(false)
        })
    }, 600)

    return () => {
      ativo = false
      clearTimeout(agendamento)
    }
  }, [termo])

  const renderConteudo = () => {
    if (carregando) return <Carregando mensagem="Buscando os filmes em alta..." />
    if (erro) return <Text style={styles.mensagem}>{erro}</Text>
    if (resultados === null) {
      return (
        <ListaFilmes
          titulo="Em alta nesta semana"
          filmes={emAlta}
          onSelecionar={setFilmeSelecionado}
        />
      )
    }
    if (resultados.length === 0) {
      return <Text style={styles.mensagem}>Nenhum filme encontrado para “{termoBuscado}”.</Text>
    }
    return (
      <ListaFilmes
        titulo={`Resultados para “${termoBuscado}”`}
        filmes={resultados}
        onSelecionar={setFilmeSelecionado}
      />
    )
  }

  const renderTelaInicial = () => (
    <>
      <Busca
        termo={termo}
        onTermoAlterado={setTermo}
        onLimpar={() => setTermo('')}
        buscando={buscando}
      />
      {termo.trim() !== '' && termo.trim().length < 3 && (
        <Text style={styles.dica}>Digite pelo menos 3 letras.</Text>
      )}
      {renderConteudo()}
    </>
  )

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <Cabecalho />
        {filmeSelecionado === null ? (
          renderTelaInicial()
        ) : (
          <DetalhesFilme id={filmeSelecionado} onVoltar={() => setFilmeSelecionado(null)} />
        )}
        <Creditos />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12121F'
  },
  dica: {
    color: '#9A9AB5',
    fontSize: 12,
    marginHorizontal: 16,
    marginTop: 6
  },
  mensagem: {
    flex: 1,
    color: '#C8C8DC',
    fontSize: 16,
    textAlign: 'center',
    padding: 24
  }
})
