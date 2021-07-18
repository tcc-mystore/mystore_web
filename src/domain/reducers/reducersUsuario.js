import { USUARIO_PESQUISAR } from '../../core/store/types';

const reducersUsuario = (state = {}, action) => {
    switch (action.type) {
        case USUARIO_PESQUISAR:
            return {
                ...state,
                usuariosPesquisa: action.payload,
            }
        default:
            return state;
    }
}
export default reducersUsuario;