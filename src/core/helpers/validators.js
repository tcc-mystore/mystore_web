/* eslint-disable */
export const cpfValidator = (value) => {
    var Soma;
    var Resto;
    Soma = 0;
    if (value == "00000000000000") return false;
    for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(value.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;
    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(value.substring(9, 10))) return false;

    Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(value.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(value.substring(10, 11))) return false;
    return true;
}

export const cpfValidatorMask = (value) => {
    var numeroCPF = value.replace('.', '').replace('.', '').replace('-', '');
    return cpfValidator(numeroCPF);
}

export const cnpjValidatorMask = (value) => {
    var numeroNCPJ = value.replace('.', '').replace('.', '').replace('.', '').replace('/', '').replace('-', '');
    if (value == '') return false;
    return cnpjValidator(numeroNCPJ);
}

export const cnpjValidator = (value) => {
    if (value.length != 14)
        return false;

    if (value == "00000000000000")
        return false;

    tamanho = value.length - 2
    numeros = value.substring(0, tamanho);
    var digitos = value.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;

    var tamanho = tamanho + 1;
    var numeros = value.substring(0, tamanho);
    var soma = 0;
    var pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
        return false;

    return true;
}

export const telefoneValidator = (value) => {
    return (/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/).test(value);
}