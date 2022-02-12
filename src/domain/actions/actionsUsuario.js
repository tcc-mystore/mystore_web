import axios from 'axios';
import { BUSCAR_USUARIO, LIMPAR_USUARIO, LISTAR_USUARIOS, LIMPAR_USUARIOS, LOGIN_USUARIO, LOGOUT_USUARIO, PESQUISAR_USUARIOS } from '../../core/store/types';
import { url } from '../../core/config';
import { salvarToken, buscarToken, headers, removerToken } from '../../core/store/localStorage';
import errorHandler from '../../core/store/errorHandler';
import { api, authorizationServerLogin, authorizationServerRecuperarSenha } from '../../core/api';

export const alterarFotoPerfil = (dadosUsuario, callback) => {
    return (dispatch) => {
        axios.put(`${url}/v1/usuarios/perfil-imagem`, dadosUsuario, headers())
            .then((response) => {
                callback({ erro: response.data });
            })
            .catch((err) => callback(errorHandler(err)));
    }
}

export const alterarPerfil = (dadosUsuario, callback) => {
    return (dispatch) => {
        axios.put(`${url}/v1/usuarios/perfil`, dadosUsuario, headers())
            .then((response) => {
                callback({ erro: response.data });
            })
            .catch((err) => callback(errorHandler(err)));
    }
}

export const alterarSenha = (dadosUsuario, callback) => {
    return (dispatch) => {
        axios.put(`${url}/v1/usuarios/nova-senha`, dadosUsuario)
            .then((response) => {
                removerToken();
                dispatch({ type: LOGOUT_USUARIO });
                callback({ erro: response.data });
            })
            .catch((err) => callback(errorHandler(err)));
    }
}

export const alterarUsuario = (dadosUsuario, callback) => {
    return (dispatch) => {
        axios.put(`${url}/v1/usuarios/${dadosUsuario._id}`, dadosUsuario, headers())
            .then((response) => {
                callback({ erro: response.data });
            })
            .catch((err) => callback(errorHandler(err)));
    }
}

export const criarConta = (dadosUsuario, callback) => {
    return (dispatch) => {
        axios.post(`${url}/v1/usuarios/criar-conta`, dadosUsuario)
            .then((response) => {
                callback({ erro: response.data });
            })
            .catch((err) => callback(errorHandler(err)));
    }
}

export const ativarUsuario = (dadosUsuario, callback) => {
    return (dispatch) => {
        axios.put(`${url}/v1/usuarios/ativar/${dadosUsuario.id}`, { ativo: dadosUsuario.ativo }, headers())
            .then((response) => {
                callback({ erro: response.data });
            })
            .catch((err) => callback(errorHandler(err)));
    }
}

export const getPerfil = (callback) => {
    return (dispatch) => {
        if (buscarToken()) {
            api(buscarToken())
                .get(`${url}/v1/usuarios/perfil`)
                .then((response) => {
                    //salvarToken(response.data);
                    dispatch({ type: LOGIN_USUARIO, payload: response.data })
                })
                .catch((callbackError) => {
                    removerToken();
                    dispatch({ type: LOGOUT_USUARIO });
                    callback(errorHandler(callbackError))
                });
        } else {
            removerToken();
            dispatch({ type: LOGOUT_USUARIO });
        }
    }
}

export const getUsuario = (id) => {
    return (dispatch) => {
        axios.get(`${url}/v1/usuarios/${id}`, headers())
            .then((response) => {
                dispatch({ type: BUSCAR_USUARIO, payload: response.data });
            })
            .catch(errorHandler);
    }
}

export const getUsuarios = () => {
    return (dispatch) => {
        axios.get(`${url}/v1/usuarios`, headers())
            .then((response) => {
                dispatch({ type: LISTAR_USUARIOS, payload: response.data });
            })
            .catch(errorHandler);
    }
}

export const handleLogin = ({ email, senha }, callback) => {
    return (dispatch) => {
        authorizationServerLogin()
            .post(
                '/oauth/token',
                `username=${email}&password=${senha}&grant_type=password`,
            )
            .then((response) => {
                salvarToken(response.data.access_token);
                dispatch({ type: LOGIN_USUARIO, payload: { usuarioLogado: response.data } })
            })
            .catch((callbackError) => callback(errorHandler(callbackError)));
    }
}

export const handleLogout = () => {
    removerToken();
    return { type: LOGOUT_USUARIO };
}

export const limparUsuario = () => {
    return (dispatch) => {
        dispatch({ type: LIMPAR_USUARIO });
    }
}

export const limparUsuarios = () => {
    return (dispatch) => {
        dispatch({ type: LIMPAR_USUARIOS });
    }
}

export const pesquisarUsuarios = (nome, email) => {
    return (dispatch) => {
        axios.get(`${url}/v1/usuarios/pesquisar?nome=${nome}&email=${email}`, headers())
            .then((response) => {
                dispatch({ type: PESQUISAR_USUARIOS, payload: response.data });
            })
            .catch(errorHandler);
    }
}

export const recarregaPerfil = (callback) => {
    return function (dispatch) {
        axios.get(`${url}/v1/usuarios/perfil`, headers())
            .then((response) => {
                dispatch({ type: LOGIN_USUARIO, payload: response.data });
                callback({ erro: response.data });
            })
            .catch((erro) => {
                dispatch({ type: LOGOUT_USUARIO });
                callback(errorHandler(erro));
            })
    }
}

export const recuperarSenha = (dadosUsuario, callback) => {
    return (dispatch) => {
        authorizationServerRecuperarSenha()
            .post(
                '/oauth/token',
                `grant_type=client_credentials`,
            )
            .then((response) => {
                api(response.data.access_token)
                    .get(`/v1/usuarios/${dadosUsuario.email}/codigo-acesso`)
                    .then(
                        (response) => dispatch(response.data))
                    .catch(
                        (error) => callback(errorHandler(error))
                    );
            })
            .catch((callbackError) => callback(errorHandler(callbackError)));
    }
}

export const removerUsuario = (id, callback) => {
    return (dispatch) => {
        axios.delete(`${url}/v1/usuarios/${id}`, headers())
            .then((response) => {
                callback({ erro: response.data });
            });
    }
}

export const salvarUsuario = (dadosUsuario, callback) => {
    return (dispatch) => {
        axios.post(`${url}/v1/usuarios`, dadosUsuario, headers())
            .then((response) => {
                callback({ erro: response.data });
            })
            .catch((err) => callback(errorHandler(err)));
    }
}

export const validacaoRecuperarSenha = (dadosUsuario, callback) => {
    return (dispatch) => {
        authorizationServerRecuperarSenha()
            .post(
                '/oauth/token',
                `grant_type=client_credentials`,
            )
            .then((response) => {
                api(response.data.access_token)
                    .put(`/v1/usuarios/cadastrar-senha`, dadosUsuario)
                    .then((response) => {
                        callback({ usuarioRecuperado: response.data });
                    })
                    .catch((err) => callback(errorHandler(err)));
            })
            .catch((callbackError) => callback(errorHandler(callbackError)));
    }
}
