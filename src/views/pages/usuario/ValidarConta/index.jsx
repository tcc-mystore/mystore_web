import React, { useEffect, useState } from 'react';
import ModalCarregando from '../../../components/ModalCarregando';
import Alerta from '../../../components/Alerta';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Redirect } from 'react-router-dom';

const ValidarConta = (props) => {

    const [irPara, setIrPara] = useState(null);
    const [aguardando, setAguardando] = useState(false);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("123456");
    const [confirmaSenha, setConfirmarSenha] = useState("123456");
    const [codigo, setCodigo] = useState(516718);
    const [alerta, setAlerta] = useState("");
    const [mensagem, setMensagem] = useState("");

    const validarConta = () => {
        setAguardando(true);
        props.validacaoRecuperarSenha({ email, codigoAcesso: codigo, senha }, (retorno) => {
            if (retorno.erro) {
                // eslint-disable-next-line 
                var erro = new String(retorno.erro.detalhes);
                if(!erro.includes("Error: Actions must be plain objects.")){
                    if (retorno.erro.mensagem) {
                        setAlerta("error");
                        setMensagem(retorno.erro.mensagem);
                        setAguardando(false);
                    } else if (retorno.erro.status === 400) {
                        setAlerta("warn");
                        setMensagem(retorno.erro.title + '. ' + retorno.erro.detail);
                        setAguardando(false);
                    }
                }
            } else {
                setAlerta("success");
                setMensagem("Senha recuperada com sucesso!");
                setAguardando(false);
                setIrPara('/mystore/');
            }
        });
    }

    const cancelar = () => {
        setAguardando(true);
        setAlerta("warn");
        setMensagem("Validar conta. Operação cancelada!");
        setIrPara('/mystore/');
        setAguardando(false);
    }

    useEffect(() => {
        const { location } = props;
        if (location.state) {
            setAlerta(location.state.alerta);
            setMensagem(location.state.mensagem);
            setEmail(location.state.email);
        }// eslint-disable-next-line
    }, [])

    if (irPara !== null) {
        return <Redirect to={{
            pathname: irPara,
            state: { alerta, mensagem, email }
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
                            onValueChange={(ev) => setCodigo(ev.target.value)}
                            inputId="withoutgrouping"
                            mode="decimal"
                            useGrouping={false}
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
                    <Button label="Cadastrar" icon="pi pi-check" className='p-mr-1' iconPos="left" onClick={() => validarConta()} disabled={!email || !senha || !codigo} />
                    <Button label="Cancelar" icon="pi pi-ban" className='p-ml-1 p-button-danger' iconPos="left" onClick={() => cancelar()} />
                </div>
            </>
        );
}
export default ValidarConta;