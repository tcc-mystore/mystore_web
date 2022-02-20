import { ENDPOINS_DISPONIVEIS, HOST_CHECK, LIMPAR_ENDPOINS, LIMPAR_HOST } from '../types/mystore';

const reducersMyStore = (state = {}, action) => {
    switch (action.type) {
        case ENDPOINS_DISPONIVEIS:
            return {
                ...state,
                empresa: action.payload,
            }
        case HOST_CHECK:
            return {
                ...state,
                empresas: action.payload,
            }
        case LIMPAR_ENDPOINS:
            return {
                ...state,
                empresa: action.payload,
            }
        case LIMPAR_HOST:
            return {
                ...state,
                empresas: null,
            }
        default:
            return state;
    }
}
export default reducersMyStore;