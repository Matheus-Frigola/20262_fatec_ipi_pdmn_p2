export function formatarNota(nota) {
  if (!nota) return 'Sem nota'
  return `★ ${nota.toFixed(1).replace('.', ',')}`
}

export function formatarDuracao(minutos) {
  if (!minutos) return null
  const horas = Math.floor(minutos / 60)
  const resto = minutos % 60
  if (horas === 0) return `${resto}min`
  if (resto === 0) return `${horas}h`
  return `${horas}h ${resto}min`
}
