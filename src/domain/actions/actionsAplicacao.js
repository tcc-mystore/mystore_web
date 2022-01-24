import { api, authorizationServerRecuperarSenha } from '../../core/api';
import errorHandler from '../../core/store/errorHandler';

export const tokenRecuperarSenha = (dadosUsuario, callback) => {
    return (dispatch) => {
        authorizationServerRecuperarSenha()
            .post(
                '/oauth/token',
                `grant_type=client_credentials`,
            )
            .then((response) => {
                console.log(response.data);
                return api(response.data.access_token).get(`/v1/usuarios/${dadosUsuario.email}/codigo-acesso`)
                    .then(
                        (response) => dispatch(response.data))
                    .catch(
                        (error) => callback(errorHandler(error))
                    );
            })
            .catch((callbackError) => callback(errorHandler(callbackError)));
    }
}
