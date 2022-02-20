import { TODAS_EMPRESAS, LIMPAR_EMPRESAS, UMA_EMPRESA, LIMPAR_EMPRESA, ALTERA_EMPRESA } from '../types/empresa';
import { api } from '../../core/api';
import { buscarToken } from '../../core/storage';
import { erro } from '../../core/handler';

export const alterarEmpresa = ({ empresa, id }, callback) => {
    return () => {
        api(buscarToken())
            .put(`/v1/empresas/${id}`, empresa)
            .then((response) => {
                callback({ type: ALTERA_EMPRESA, payload: response.data });
            })
            .catch(
                (callbackError) => callback(erro(callbackError))
            );
    }
}

export const getEmpresas = (callback) => {
    return () => {
        api(buscarToken())
            .get(`/v1/empresas`)
            .then((response) => {
                callback({ type: TODAS_EMPRESAS, payload: response.data });
            })
            .catch((callbackError) => {
                callback(erro(callbackError));
            }
            );
    }
}

export const getEmpresa = ({ id }, callback) => {
    return () => {
        api(buscarToken())
            .get(`/v1/empresas/${id}`)
            .then((response) => {
                callback({ type: UMA_EMPRESA, payload: response.data });
            })
            .catch((callbackError) => {
                callback(erro(callbackError));
            }
            );
    }
}

export const limparEmpresas = () => {
    return (dispatch) => dispatch({ type: LIMPAR_EMPRESAS });
}

export const limparEmpresa = () => {
    return (dispatch) => dispatch({ type: LIMPAR_EMPRESA });
}