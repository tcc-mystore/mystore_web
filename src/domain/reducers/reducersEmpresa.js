import { ALTERA_EMPRESA, LIMPAR_EMPRESA, LIMPAR_EMPRESAS, TODAS_EMPRESAS, UMA_EMPRESA } from '../types/empresa';

const reducersEmpresa = (state = {}, action) => {
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
export default reducersEmpresa;