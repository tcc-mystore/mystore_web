import { BUSCAR_USUARIO, LIMPAR_USUARIO, LIMPAR_USUARIOS, LISTAR_USUARIOS, LOGIN_USUARIO, LOGOUT_USUARIO, PESQUISAR_USUARIOS } from '../../core/store/types';

const reducersUsuario = (state = {}, action) => {
    switch (action.type) {
        case BUSCAR_USUARIO:
            return {
                ...state,
                usuario: action.payload.usuario,
            }
        case LIMPAR_USUARIO:
            return {
                ...state,
                usuario: null,
            }
        case LIMPAR_USUARIOS:
            return {
                ...state,
                usuarios: null,
                usuariosPesquisados: null
            }
        case LISTAR_USUARIOS:
            return {
                ...state,
                usuarios: action.payload.usuarios,
            }
        case LOGIN_USUARIO:
            return {
                ...state,
                usuarioLogado: action.payload.usuario,
                authorized: true
            }
        case LOGOUT_USUARIO:
            return {
                ...state,
                usuarioLogado: null,
                authorized: false
            }
        case PESQUISAR_USUARIOS:
            return {
                ...state,
                usuariosPesquisados: action.payload.usuarios,
            }
        default:
            return state;
    }
}
export default reducersUsuario;