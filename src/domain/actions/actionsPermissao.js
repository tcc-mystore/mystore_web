import { BUSCAR_PERMISSOES, LIMPAR_PERMISSOES } from '../types/permissao';
import { api } from '../../core/api';
import { buscarToken } from '../../core/storage';

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
