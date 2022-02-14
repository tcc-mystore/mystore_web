export const erro = (erro) => {
    if (!erro.response || !erro.response.data)
        return { erro: { status: 500, mensagem: "Ocorreu um erro interno no servidor, contate o administrador do sistema.", detalhes:erro } }
    else
        return { erro: erro.response.data };
}