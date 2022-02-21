import { TODAS_CIDADES, LIMPAR_CIDADES } from '../types/cidade';
import { api } from '../../core/api';
import { buscarToken } from '../../core/storage';
import { erro } from '../../core/handler';

export const getCidades = (callback) => {
    return (dispatch) => {
        api(buscarToken())
            .get(`/v1/cidades`)
            .then((response) => {
                dispatch({ type: TODAS_CIDADES, payload: response.data });
            })
            .catch((callbackError) => {
                callback(erro(callbackError));
            });
    }
}

export const limparCidades = () => {
    return (dispatch) => dispatch({ type: LIMPAR_CIDADES });
}