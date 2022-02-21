import { ENDPOINS_DISPONIVEIS, HOST_CHECK, LIMPAR_ENDPOINS, LIMPAR_HOST } from '../types/mystore';

const reducersMyStore = (state = {}, action) => {
    switch (action.type) {
        case ENDPOINS_DISPONIVEIS:
            return {
                ...state,
                endpoints: action.payload,
            }
        case HOST_CHECK:
            return {
                ...state,
                host: action.payload,
            }
        case LIMPAR_ENDPOINS:
            return {
                ...state,
                endpoints: action.payload,
            }
        case LIMPAR_HOST:
            return {
                ...state,
                host: null,
            }
        default:
            return state;
    }
}
export default reducersMyStore;