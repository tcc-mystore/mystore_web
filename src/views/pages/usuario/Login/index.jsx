import React, { useState } from 'react';
import ModalCarregando from '../../../components/ModalCarregando';
import Alerta from '../../../components/Alerta';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

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
                    setAlerta("warning");
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

    return (
        <>
            <Alerta tipoAlerta={alerta} mensagem={mensagem} />
            <ModalCarregando aguardando={aguardando} pagina="Entrando no sistema" />
            <h5 className="p-text-center">Login</h5>
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
                        <Button type="submit" label="Entrar" icon="pi pi-unlock" className='p-mt-2' iconPos="left" />
                    </div>
                </div>
            </form>
        </>
    );
}

export default Login;