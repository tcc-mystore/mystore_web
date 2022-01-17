import React, { useEffect, useState } from 'react';
import ModalCarregando from '../../../components/ModalCarregando';
import Alerta from '../../../components/Alerta';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Redirect } from 'react-router-dom';

const RecuperarSenha = (props) => {

    const [voltar, setVoltar] = useState(false);
    const [aguardando, setAguardando] = useState(false);
    const [email, setEmail] = useState("paulistensetecnologia@gmail.com");
    const [alerta, setAlerta] = useState("");
    const [mensagem, setMensagem] = useState("");

    const trocarSenha = () => {
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
        return <ModalCarregando aguardando={aguardando} pagina="Solicitando recuperação de senha." />
    else
        return (
            <>
                {mensagem ? <Alerta tipoAlerta={alerta} mensagem={mensagem} /> : null}
                <h3 className="p-text-center">Solicitar Nova Senha</h3>
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
                        <div className='p-d-flex p-jc-between p-mt-1'>
                            <Button label="Recuperar" icon="pi pi-send" className='p-mr-1' iconPos="left" onClick={() => trocarSenha()} />
                            <Button label="Cancelar" icon="pi pi-ban" className='p-ml-1 p-button-danger' iconPos="left" onClick={() => cancelar()} />
                        </div>
                    </div>
                </div>
            </>
        );
}
export default RecuperarSenha;