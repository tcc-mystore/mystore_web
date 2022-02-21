import { ALTERA_EMPRESA, EMPRESA_POR_ID, LIMPAR_EMPRESA_POR_ID, LIMPAR_EMPRESAS, TODAS_EMPRESAS } from '../types/empresa';

const reducersEmpresa = (state = {}, action) => {
    switch (action.type) {
        case ALTERA_EMPRESA:
            return {
                ...state,
                empresa: action.payload,
            }
        case EMPRESA_POR_ID:
            return {
                ...state,
                empresaPorId: action.payload,
            }
        case LIMPAR_EMPRESAS:
            return {
                ...state,
                empresas: null,
            }
        case LIMPAR_EMPRESA_POR_ID:
            return {
                ...state,
                empresaPorId: null,
            }
        case TODAS_EMPRESAS:
            return {
                ...state,
                empresas: action.payload,
            }
        default:
            return state;
    }
}
export default reducersEmpresa;