const errorHandler = (erro) => {
    return (!erro.response || !erro.response.data) ? { erro: { status: 500, mensagem: "Ocorreu um erro interno no servidor, contate o administrador do sistema" } } : { erro: erro.response.data };
}
export default errorHandler;