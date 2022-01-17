import React, { useState } from 'react';
import ModalCarregando from '../../../components/ModalCarregando';
import Alerta from '../../../components/Alerta';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Login = (props) => {

    const [aguardando, setAguardando] = useState(false);
    const [email, setEmail] = useState("paulistensetecnologia@gmail.com");
    const [senha, setSenha] = useState("123456");
    const [alerta, setAlerta] = useState("");
    const [mensagem, setMensagem] = useState("");

    const logar = (e) => {
        e.preventDefault();
        setAguardando(true);
        props.handleLogin({ email, senha }, (retorno) => {
            if (retorno.erro) {
                if (retorno.erro.mensagem) {
                    setAlerta("error");
                    setMensagem(retorno.erro.mensagem);
                }
                if (retorno.erro.status === 401) {
                    setAlerta("warn");
                    setMensagem("Acesso negado ou dados incorretos!");
                }
                setAguardando(false);
            } else {
                setAlerta("");
                setMensagem("");
                setAguardando(false);
            }
        });
    }

    useEffect(() => {
        const { location } = props;

        if (location.state) {
            setAlerta(location.state.alerta);
            setMensagem(location.state.mensagem);
        }// eslint-disable-next-line
    }, [alerta, mensagem])

    return (
        <>
            {mensagem ? <Alerta tipoAlerta={alerta} mensagem={mensagem} /> : null}
            <ModalCarregando aguardando={aguardando} pagina="Entrando no sistema" />
            <h3 className="p-text-center">Login</h3>
            <form noValidate onSubmit={logar} className="p-fluid">
                <div className="p-d-flex p-jc-center">
                    <div className="card">
                        <div className="p-field p-mt-1">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <InputText
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(ev) => setEmail(ev.target.value)}
                                    className='email'
                                />
                                <label htmlFor="email" className='rmail'>Email*</label>
                            </span>
                        </div>
                        <br />
                        <div className="p-field">
                            <span className="p-float-label">
                                <Password
                                    id="password"
                                    name="password"
                                    value={senha}
                                    onChange={(ev) => setSenha(ev.target.value)}
                                    className='password'
                                    toggleMask
                                />
                                <label htmlFor="password" className='password'>Password*</label>
                            </span>
                        </div>
                        <div className='p-mt-1'>
                            <Button type="submit" label="Entrar" icon="pi pi-unlock" className='p-mt-2' iconPos="left" />
                        </div>
                        <div className='p-d-flex p-jc-between p-mt-1'>
                            <Link to="/mystore/recuperar-senha" className="p-mb-2">Recuperar senha</Link>
                            <Link to="/mystore/criar-conta" className="p-mb-2">Criar conta</Link>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

export default Login;