require('dotenv').config({ quiet: true })
const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(cors())
app.use(express.json())

const tmdbClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: { Authorization: `Bearer ${process.env.TMDB_TOKEN}` },
  params: { language: 'pt-BR' }
})

const URL_IMAGENS = 'https://image.tmdb.org/t/p'

const simplificarFilme = (filme) => ({
  id: filme.id,
  titulo: filme.title,
  ano: filme.release_date ? filme.release_date.substring(0, 4) : null,
  nota: Math.round(filme.vote_average * 10) / 10,
  poster: filme.poster_path ? `${URL_IMAGENS}/w342${filme.poster_path}` : null
})

const simplificarProvedores = (lista) =>
  (lista || []).map((provedor) => ({
    nome: provedor.provider_name,
    logo: provedor.logo_path ? `${URL_IMAGENS}/w92${provedor.logo_path}` : null
  }))

const erro502 = (res, e) => {
  console.log(e)
  res.status(502).json({ mensagem: 'Não foi possível consultar o catálogo de filmes.' })
}

app.get('/', (req, res) => {
  res.json({ app: 'OndePassa', status: 'online' })
})

app.get('/em-alta', async (req, res) => {
  try {
    const resultado = await tmdbClient.get('/trending/movie/week')
    res.json(resultado.data.results.map(simplificarFilme))
  } catch (e) {
    erro502(res, e)
  }
})


const port = 3000
app.listen(port, () => console.log(`Backend do OndePassa no ar. Porta: ${port}.`))
