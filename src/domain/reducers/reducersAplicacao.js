import { TOKEN_MANAGER } from '../../core/store/types';

const reducersAplicacao = (state = {}, action) => {
    switch (action.type) {
        case TOKEN_MANAGER:
            return {
                ...state,
                aplicacao: action.payload.aplicacap,
            }
        default:
            return state;
    }
}
export default reducersAplicacao;