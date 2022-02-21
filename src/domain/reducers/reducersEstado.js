import { TODOS_ESTADOS, LIMPAR_ESTADOS } from '../types/estado';

const reducersEstado = (state = {}, action) => {
    switch (action.type) {
        case TODOS_ESTADOS:
            return {
                ...state,
                todosEstados: action.payload,
            }
        case LIMPAR_ESTADOS:
            return {
                ...state,
                todosEstados: null,
            }
        default:
            return state;
    }
}
export default reducersEstado;