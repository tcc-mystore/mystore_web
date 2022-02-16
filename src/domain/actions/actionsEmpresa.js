import { TODAS_EMPRESAS, LIMPAR_EMPRESAS, UMA_EMPRESA, LIMPAR_EMPRESA } from '../types/empresa';
import { api } from '../../core/api';
import { buscarToken } from '../../core/storage';
import { erro } from '../../core/handler';

export const getEmpresas = (callback) => {
    return (dispatch) => {
        let token = buscarToken();
        api(token)
            .get(`/v1/empresas`)
            .then((response) => {
                dispatch({ type: TODAS_EMPRESAS, payload: response.data });
            })
            .catch(
                (callbackError) => callback(erro(callbackError))
            );
    }
}

export const getEmpresa = ({id}) => {
    return (dispatch) => {
        let token = buscarToken();
        api(token)
            .get(`/v1/empresas/${id}`)
            .then((response) => {
                dispatch({ type: UMA_EMPRESA, payload: response.data });
            });
    }
}

export const limparEmpresas = () => {
    return (dispatch) => {
        dispatch({ type: LIMPAR_EMPRESAS });
    }
}

export const limparEmpresa = () => {
    return (dispatch) => {
        dispatch({ type: LIMPAR_EMPRESA });
    }
}