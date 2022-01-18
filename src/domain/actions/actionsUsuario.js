import axios from 'axios';
import {
    BUSCAR_USUARIO,
    LIMPAR_USUARIO,
    LIMPAR_USUARIOS,
    LISTAR_USUARIOS,
    LOGIN_USUARIO,
    LOGOUT_USUARIO,
    PESQUISAR_USUARIOS
} from '../../core/store/types';
import { pass, pass_manager, url, user, user_manager } from '../../core/config';
import { salvarToken, buscarToken, headers, removerToken } from '../../core/store/localStorage';
import errorHandler from '../../core/store/errorHandler';
import { encode } from 'base-64';
import { authorizationServerLogin } from '../../core/api';

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
            axios.get(`${url}/v1/usuarios/perfil`, headers())
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
        axios.create({
            baseURL: url,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Basic ${encode(`${user}:${pass}`)}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).post(
            '/oauth/token',
            `username=${email}&password=${senha}&grant_type=password`,
        )
            .then((response) => {
                salvarToken(response.data.access_token);
                dispatch({ type: LOGIN_USUARIO, payload: { usuario: response.data } })
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
        axios.put(`${url}/v1/usuarios/recuperar-senha`, dadosUsuario)
            .then((response) => {
                callback({ erro: response.data });
            })
            .catch((err) => callback(errorHandler(err)));
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

export const validacaoRecuperarSenha = (recuperarSenha, callback) => {
    return (dispatch) => {
        axios.get(`${url}/v1/usuarios/recuperar-senha/${recuperarSenha}`,)
            .then((response) => {
                callback({ erro: response.data });
            })
            .catch((err) => callback(errorHandler(err)));
    }
}

export const tokenCadastrarOuRecuperar = (callback) => {
    console.log('tokenCadastrarOuRecuperar');
    return (dispatch) => {
        axios.create({
            baseURL: url,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Basic ${encode(`${user_manager}:${pass_manager}`)}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).post(
            '/oauth/token',
            `grant_type=client_credentials`,
        ).then((response) => {
            callback({ payload: response.data });
        })
            .catch((err) => callback(errorHandler(err)));
    }
}
