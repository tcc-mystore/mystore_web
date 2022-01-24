import axios from 'axios';
import { encode } from 'base-64';
import { pass, pass_manager, url, user, user_manager } from '.././config';
import errorHandler from '../../core/store/errorHandler';

const api = (token) => {
    return axios.create({
        baseURL: url,
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });
}

const authorizationServerLogin = ({ email, senha }, callback) => {
    return (dispatch) => {
        axios.create({
            baseURL: url,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Basic ${encode(`${user}:${pass}`)}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).post(
            '/oauth/token',
            `username=${email}&password=${senha}&grant_type=password`,
        ).then((response) => {
            callback({ payload: response.data });
        }).catch(
            (error) => callback(errorHandler(error))
        );
    }
}

const authorizationServerRecuperarSenha = () => {
    return axios.create({
        baseURL: url,
        headers: {
            'Authorization': `Basic ${encode(`${user_manager}:${pass_manager}`)}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    });
}

export { authorizationServerLogin, authorizationServerRecuperarSenha, api };