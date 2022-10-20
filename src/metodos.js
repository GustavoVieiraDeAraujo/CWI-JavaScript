export function filtarPorAnoERetornarNome(series, ano) {
  const temp = series.filter(filme => filme.anoEstreia >= ano)
  const retorno = []
  temp.forEach(filme => {
    retorno.push(filme.titulo)
  })
  return retorno
}

export function verificarSeAtorEstaEmSeriado(series, nomeAtor) {
  let flag = false
  series.forEach(filme => {
    filme.elenco.forEach(ator => {
      if (ator === nomeAtor){
        flag = true
      }
    })
  })
  return flag
}

export function calcularMediaTotalDeEpisodios(series) {
  const mediaDeEpisodiosPorTemporada = []
  series.forEach(filme => {
    const media = filme.numeroEpisodios / filme.temporadas |0
    mediaDeEpisodiosPorTemporada.push([filme.titulo, media])
  })
  return mediaDeEpisodiosPorTemporada
}

export function agruparTituloDasSeriesPorPropriedade(series, propriedade) {
  const dic = new Map()
  switch (propriedade) {
    case "distribuidora":
      series.forEach(filme => {
        if (!(dic.has(filme.distribuidora))){
          dic.set(filme.distribuidora, [filme.titulo])
        }else{
          let temp = dic.get(filme.distribuidora)
          temp.push(filme.titulo)
        }
      })
      return Object.fromEntries(dic)
    case "ano":
      series.forEach(filme => {
        if (!(dic.has(filme.anoEstreia))) {
          dic.set(filme.anoEstreia, [filme.titulo])
        } else {
          let temp = dic.get(filme.anoEstreia)
          temp.push(filme.titulo)
        }
      })
      return Object.fromEntries(dic)
  }
}