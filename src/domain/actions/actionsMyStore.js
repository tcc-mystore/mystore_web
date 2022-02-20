import { HOST_CHECK, ENDPOINS_DISPONIVEIS, LIMPAR_HOST, LIMPAR_ENDPOINS } from '../types/mystore';
import { api } from '../../core/api';
import { buscarToken } from '../../core/storage';
import { erro } from '../../core/handler';

export const hostsCheck = (callback) => {
    return () => {
        api(buscarToken())
            .get(`/v1/hosts/check`)
            .then((response) => {
                callback({ type: HOST_CHECK, payload: response.data });
            })
            .catch((callbackError) => {
                callback(erro(callbackError));
            });
    }
}

export const rootEntryPoint = (callback) => {
    return () => {
        console.log(buscarToken());
        api(buscarToken())
            .get(`/v1`)
            .then((response) => {
                callback({ type: ENDPOINS_DISPONIVEIS, payload: response.data });
            })
            .catch((callbackError) => {
                console.log(callbackError)
                callback(erro(callbackError));
            });
    }
}

export const limparHostsCheck = () => {
    return (dispatch) => dispatch({ type: LIMPAR_HOST });
}

export const limparRootEntryPoint = () => {
    return (dispatch) => dispatch({ type: LIMPAR_ENDPOINS });
}