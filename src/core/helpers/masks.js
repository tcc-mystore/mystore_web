export const cnpjMask = (value) => {
    return value
      .replace(/\D+/g, '') // não deixa ser digitado nenhuma letra
      .replace(/(\d{2})(\d)/, '$1.$2') //04 captura 2 grupos de número o primeiro com 2 digitos e o segundo de com 3 digitos, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de número
      .replace(/(\d{3})(\d)/, '$1.$2') //253
      .replace(/(\d{3})(\d)/, '$1/$2') //011 captura 2 grupos de número o primeiro e o segundo com 3 digitos, separados por /
      .replace(/(\d{4})(\d)/, '$1-$2')//0001
      .replace(/(-\d{2})\d+?$/, '$1') //34 captura os dois últimos 2 números, com um - antes dos dois números
  }

  export const cpfMask = (value) => {
    return value
      .replace(/\D+/g, '') // não deixa ser digitado nenhuma letra
      .replace(/(\d{3})(\d)/, '$1.$2') //606
      .replace(/(\d{3})(\d)/, '$1.$2') //717 captura 2 grupos de número o primeiro e o segundo com 3 digitos, separados por /
      .replace(/(\d{3})(\d)/, '$1-$2')//623
      .replace(/(-\d{2})\d+?$/, '$1') //89 captura os dois últimos 2 números, com um - antes dos dois números
  }