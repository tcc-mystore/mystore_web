import { BUSCAR_EMPRESAS, LIMPAR_EMPRESAS } from '../types/empresa';
import { api } from '../../core/api';
import { buscarToken } from '../../core/storage';
import { erro } from '../../core/handler';

export const getEmpresas = (callback) => {
    return (dispatch) => {
        let token = buscarToken();
        api(token)
            .get(`/v1/empresas`)
            .then((response) => {
                dispatch({ type: BUSCAR_EMPRESAS, payload: response.data });
            })
            .catch(
                (callbackError) => callback(erro(callbackError))
            );
    }
}

export const limparEmpresas = () => {
    return (dispatch) => {
        dispatch({ type: LIMPAR_EMPRESAS });
    }
}
