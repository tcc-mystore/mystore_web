import { TODAS_EMPRESAS, LIMPAR_EMPRESAS, UMA_EMPRESA, LIMPAR_EMPRESA, ALTERA_EMPRESA } from '../types/empresa';

const reducersPermissao = (state = {}, action) => {
    switch (action.type) {
        case ALTERA_EMPRESA:
            return {
                ...state,
                empresa: action.payload,
            }
        case TODAS_EMPRESAS:
            return {
                ...state,
                empresas: action.payload,
            }
        case UMA_EMPRESA:
            return {
                ...state,
                empresa: action.payload,
            }
        case LIMPAR_EMPRESAS:
            return {
                ...state,
                empresas: null,
            }
        case LIMPAR_EMPRESA:
            return {
                ...state,
                empresa: null,
            }
        default:
            return state;
    }
}
export default reducersPermissao;