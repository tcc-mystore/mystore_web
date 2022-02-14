import { BUSCAR_PERMISSOES, LIMPAR_PERMISSOES } from '../types/permissao';

const reducersPermissao = (state = {}, action) => {
    switch (action.type) {
        case BUSCAR_PERMISSOES:
            return {
                ...state,
                permissoes: action.payload,
            }
        case LIMPAR_PERMISSOES:
            console.log('limpar reducer')
            return {
                ...state,
                permissoes: null,
            }
        default:
            return state;
    }
}
export default reducersPermissao;