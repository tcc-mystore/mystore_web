import { BUSCAR_PERMISSOES, LIMPAR_PERMISSOES } from '../types/permissao';
import { api } from '../../core/api';
import { buscarToken } from '../../core/storage';
import { erro } from '../../core/handler';

export const getPermissoes = (callback) => {
    return (dispatch) => {
        let token = buscarToken();
        api(token)
            .get(`/v1/permissoes`)
            .then((response) => {
                dispatch({ type: BUSCAR_PERMISSOES, payload: response.data });
            })
            .catch(
                (callbackError) => callback(erro(callbackError))
            );
    }
}

export const limparPermissoes = () => {
    return (dispatch) => {
        dispatch({ type: LIMPAR_PERMISSOES });
    }
}