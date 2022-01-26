import axios from 'axios';
import { encode } from 'base-64';
import { pass, pass_manager, url, user, user_manager } from '.././config';

const api = (token) => {
    return axios.create({
        baseURL: url,
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });
}

const authorizationServerLogin = () => {
    return axios.create({
        baseURL: url,
        headers: {
            'Accept': 'application/json',
            'Authorization': `Basic ${encode(`${user}:${pass}`)}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    });
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