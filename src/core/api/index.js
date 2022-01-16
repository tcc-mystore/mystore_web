import axios from 'axios';
import { encode } from 'base-64';

const api = (token) => {
    try {
        return axios.create({
            baseURL: url,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });
    } catch (error) {
        console.log(`Erro ao conectar na API -> ${new Date()} -> erro: ${error}`);
    }
}

const authorizationServerLogin = async (email, senha) => {
    try {
        return await axios.create({
            baseURL: úrl,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Basic ${encode(`${user}:${pass}`)}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).post(
            '/oauth/token',
            `username=${email}&password=${senha}&grant_type=password`,
        ).then((response) => {
            console.log(`Token de acesso gerado com sucesso!`);
            return response.data;
        }).catch((error) => {
            console.log(`Não foi possível gerar o token de acesso!`);
            console.log(JSON.stringify(úrl))
            if (error.response) {
                return {
                    codigo: error.response.status,
                    erro: error.response.data.error,
                    mensagem: error.response.data.error_description,
                }
            }else{
                return {
                    codigo: 503,
                    erro: error.name,
                    mensagem: error.message,
                }
            }
        });
    } catch (error) {
        console.log(`Erro ao gerar o token de acesso -> ${new Date()} -> erro: ${error}`);
    }
}

const authorizationServerRecuperarSenha = async () => {
    try {
        return await axios.create({
            baseURL: Config.MY_URL,
            headers: { 
                'Authorization': `Basic ${encode(`${user_manager}:${pass_manager}`)}`, 
                'Content-Type': 'application/x-www-form-urlencoded' 
            },
        }).post(
            '/oauth/token',
            `grant_type=client_credentials`
        ).then((response) => {
            console.log(`Token de recuperação de senha gerado com sucesso!${response.data}`);
            return response.data;
        }).catch((error) => {
            console.log(`Erro ao gerar token de recuperação de senha!`);
            if (error.response) {
                return {
                    codigo: error.response.status,
                    erro: error.response.data.error,
                    mensagem: error.response.data.error_description,
                }
            } else {
                throw error;
            }
        });
    } catch (error) {
        console.log(`Erro ao gerar token de recuperação de senha -> ${new Date()} -> erro: ${error.response}`);
    }
}

export { authorizationServerLogin, authorizationServerRecuperarSenha, api };