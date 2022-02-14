import { BUSCAR_PERMISSOES, LIMPAR_PERMISSOES } from '../../core/store/types/permissao';
import { api } from '../../core/api';
import { buscarToken } from '../../core/store/localStorage';

export const getPermissoes = () => {
    return (dispatch) => {
        let token = buscarToken();
        api(token)
            .get(`/v1/permissoes`)
            .then((response) => {
                dispatch({ type: BUSCAR_PERMISSOES, payload: response.data });
            });
    }
}

export const limparPermissoes = () => {
    return (dispatch) => {
        dispatch({ type: LIMPAR_PERMISSOES });
    }
}
