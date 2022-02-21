import { TODOS_ESTADOS, LIMPAR_ESTADOS } from '../types/estado';
import { api } from '../../core/api';
import { buscarToken } from '../../core/storage';
import { erro } from '../../core/handler';

export const getEstados = (callback) => {
    return (dispatch) => {
        api(buscarToken())
            .get(`/v1/estados`)
            .then((response) => {
                dispatch({ type: TODOS_ESTADOS, payload: response.data });
            })
            .catch((callbackError) => {
                callback(erro(callbackError));
            });
    }
}

export const limparEstados = () => {
    return (dispatch) => dispatch({ type: LIMPAR_ESTADOS });
}