import { BUSCAR_EMPRESAS, LIMPAR_EMPRESAS } from '../types/empresa';

const reducersPermissao = (state = {}, action) => {
    switch (action.type) {
        case BUSCAR_EMPRESAS:
            return {
                ...state,
                empresas: action.payload,
            }
        case LIMPAR_EMPRESAS:
            return {
                ...state,
                empresas: null,
            }
        default:
            return state;
    }
}
export default reducersPermissao;