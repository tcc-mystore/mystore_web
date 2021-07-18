import axios from 'axios';
import { USUARIO_ENTRAR } from '../../core/store/types';
import { api } from '../../core/config';
import { headers } from '../../core/store/localStorage';
import errorHandler from '../../core/store/errorHandler';

export const usuariosPesquisar = (usuarioFiltro, callback) => {
    return (dispatch) => {
        axios.get(`${api}/v1/usuarios/listar`, headers())
        .then((response) => {
            //Testes
            console.log(JSON.stringify(usuarioFiltro));
                dispatch({ type: USUARIO_ENTRAR, payload: response.data })
            })
            .catch((err) => {
                callback(errorHandler(err));
            });
    }
}