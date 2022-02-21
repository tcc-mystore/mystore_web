import { TODAS_EMPRESAS, LIMPAR_EMPRESAS, EMPRESA_POR_ID, LIMPAR_EMPRESA_POR_ID, ALTERA_EMPRESA } from '../types/empresa';
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
    return (dispatch) => {
        api(buscarToken())
            .get(`/v1/empresas`)
            .then((response) => {
                dispatch({ type: TODAS_EMPRESAS, payload: response.data });
            })
            .catch((callbackError) => {
                callback(erro(callbackError));
            });
    }
}

export const ativarEmpresa = ({ id, ativo }, callback) => {
    return (dispatch) => {
        api(buscarToken())
            .put(`/v1/empresas/${id}/${ativo ? 'ativar' : 'desativar'}`)
            .then((response) => {
                dispatch({ type: EMPRESA_POR_ID, payload: response.data });
            })
            .catch((callbackError) => {
                callback(erro(callbackError));
            });
    }
}

export const limparEmpresa = () => {
    return (dispatch) => dispatch({ type: LIMPAR_EMPRESA_POR_ID });
}

export const limparEmpresas = () => {
    return (dispatch) => dispatch({ type: LIMPAR_EMPRESAS });
}