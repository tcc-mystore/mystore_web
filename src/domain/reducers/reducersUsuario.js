import { LIMPAR_USUARIO, LIMPAR_USUARIOS, LOGIN_USUARIO, LOGOUT_USUARIO, PERFIL_USUARIO } from '../../core/store/types/usuario';

const reducersUsuario = (state = {}, action) => {
    switch (action.type) {
        case LIMPAR_USUARIO:
            return {
                ...state,
                usuario: null,
            }
        case LIMPAR_USUARIOS:
            return {
                ...state,
                usuarios: null
            }
        case LOGIN_USUARIO:
            return {
                ...state,
                usuarioLogado: action.payload,
                authorized: true
            }
        case LOGOUT_USUARIO:
            return {
                ...state,
                usuarioLogado: null,
                authorized: false
            }
            case PERFIL_USUARIO:
                return {
                    ...state,
                    perfilUsuario: action.payload,
                    authorized: true
                }
        default:
            return state;
    }
}
export default reducersUsuario;