import { LIMPAR_USUARIO, LOGIN_USUARIO, LOGOUT_USUARIO, PERFIL_USUARIO } from '../types/usuario';
import { salvarToken, buscarToken, removerToken } from '../../core/storage';
import { erro } from '../../core/handler';
import { api, authorizationServerLogin, authorizationServerRecuperarSenha } from '../../core/api';

export const getPerfil = (callback) => {
    return (dispatch) => {
        if (buscarToken()) {
            api(buscarToken())
                .get(`/v1/usuarios/perfil`)
                .then((response) => {
                    dispatch({ type: PERFIL_USUARIO, payload: response.data })
                })
                .catch((callbackError) => {
                    removerToken();
                    dispatch({ type: LOGOUT_USUARIO });
                    callback(erro(callbackError))
                });
        } else {
            removerToken();
            dispatch({ type: LOGOUT_USUARIO });
        }
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
                dispatch({ type: LOGIN_USUARIO, payload: response.data })
            })
            .catch((callbackError) => callback(erro(callbackError)));
    }
}

export const handleLogout = () => {
    removerToken();
    return { type: LOGOUT_USUARIO };
}

export const limparUsuario = () => {
    return (dispatch) => dispatch({ type: LIMPAR_USUARIO });
}

export const recuperarSenha = (dadosUsuario, callback) => {
    return () => {
        authorizationServerRecuperarSenha()
            .post(
                '/oauth/token',
                `grant_type=client_credentials`,
            )
            .then((response) => {
                api(response.data.access_token)
                    .get(`/v1/usuarios/${dadosUsuario.email}/codigo-acesso`)
                    .then((response) => {
                        callback(response.data);
                    })
                    .catch(
                        (error) => callback(erro(error))
                    );
            })
            .catch((callbackError) => {
                callback(erro(callbackError))
            });
    }
}

export const validacaoRecuperarSenha = (dadosUsuario, callback) => {
    return () => {
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
                    .catch((err) => callback(erro(err)));
            })
            .catch((callbackError) => {
                callback(erro(callbackError))
            });
    }
}
