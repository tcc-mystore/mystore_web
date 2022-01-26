import React, { useEffect, useState } from 'react';
import ModalCarregando from '../../../components/ModalCarregando';
import Alerta from '../../../components/Alerta';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Redirect } from 'react-router-dom';

const CriarConta = (props) => {

    const [voltar, setVoltar] = useState(false);
    const [aguardando, setAguardando] = useState(false);
    const [email, setEmail] = useState("paulistensetecnologia@gmail.com");
    const [senha, setSenha] = useState("");
    const [confirmaSenha, setConfirmarSenha] = useState("");
    const [codigo, setCodigo] = useState("");
    const [alerta, setAlerta] = useState("");
    const [mensagem, setMensagem] = useState("");

    const criarConta = () => {
        setAguardando(true);
        props.handleLogin({ email }, (retorno) => {
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

    const cancelar = () => {
        setAguardando(true);
        setAlerta("warn");
        setMensagem("Operação cancelada!");
        setVoltar(true);
        setAguardando(false);
    }

    useEffect(() => { }, [alerta, mensagem])

    if (voltar) {
        return <Redirect to={{
            pathname: '/mystore/',
            state: { alerta, mensagem }
        }} />
    }

    if (aguardando)
        return <ModalCarregando aguardando={aguardando} pagina="Validando conta de acesso." />
    else
        return (
            <>
                {mensagem ? <Alerta tipoAlerta={alerta} mensagem={mensagem} /> : null}
                <h3 className="p-text-center">Validando Conta de Acesso</h3>
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
                <div className="p-field">
                    <span className="p-float-label">
                        <InputNumber
                            id="codigo"
                            name="codigo"
                            value={codigo}
                            onChange={(ev) => setCodigo(ev.target.value)}
                        />
                        <label htmlFor="codigo">Código de Acesso*</label>
                    </span>
                </div>
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
                        <label htmlFor="password" className='password'>Senha*</label>
                    </span>
                </div>
                <div className="p-field">
                    <span className="p-float-label">
                        <Password
                            id="password"
                            name="password"
                            value={confirmaSenha}
                            onChange={(ev) => setConfirmarSenha(ev.target.value)}
                            className='password'
                            toggleMask
                        />
                        <label htmlFor="password" className='password'>Confirma senha*</label>
                    </span>
                </div>
                <div className='p-d-flex p-jc-between p-mt-1'>
                    <Button label="Cadastrar" icon="pi pi-check" className='p-mr-1' iconPos="left" onClick={() => criarConta()} />
                    <Button label="Cancelar" icon="pi pi-ban" className='p-ml-1 p-button-danger' iconPos="left" onClick={() => cancelar()} />
                </div>
            </>
        );
}
export default CriarConta;