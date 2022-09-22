export const OPERACAO_INVALIDA = 'OPERACAO_INVALIDA'

export const calculadora = (operacao, valores) => {
  let resultado
  switch(operacao){
    case 'soma':
      resultado = valores[0]
      valores = valores.slice(1)
      valores.forEach(element => {
        resultado+=element
      });
      return resultado
    case 'subtracao':
      resultado = valores[0]
      valores = valores.slice(1)
      valores.forEach(element => {
        resultado -= element
      });
      return resultado
    case 'divisao':
      resultado = valores[0]
      valores = valores.slice(1)
      valores.forEach(element => {
        resultado /= element
      });
      return resultado
    case 'multiplicacao':
      resultado = valores[0]
      valores = valores.slice(1)
      valores.forEach(element => {
        resultado *= element
      });
      return resultado
    default:
      return OPERACAO_INVALIDA
  }
}
