import { TODAS_CIDADES, LIMPAR_CIDADES } from '../types/cidade';

const reducersEstado = (state = {}, action) => {
    switch (action.type) {
        case TODAS_CIDADES:
            return {
                ...state,
                todasCidades: action.payload,
            }
        case LIMPAR_CIDADES:
            return {
                ...state,
                todasCidades: null,
            }
        default:
            return state;
    }
}
export default reducersEstado;