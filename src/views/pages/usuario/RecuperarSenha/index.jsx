import React, { useEffect, useState } from 'react';
import ModalCarregando from '../../../components/ModalCarregando';
import Alerta from '../../../components/Alerta';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../domain/actions';

const RecuperarSenha = (props) => {

    const [irPara, setIrPara] = useState(null);
    const [aguardando, setAguardando] = useState(false);
    const [email, setEmail] = useState("");
    const [alerta, setAlerta] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [pagina, setPagina] = useState("Solicitando recuperação de senha.");

    const trocarSenha = () => {
        setAguardando(true);
        props.recuperarSenha({ email }, (retorno) => {
            // eslint-disable-next-line 
            var erro = new String(retorno.erro.detalhes);
            if (retorno.erro && !erro.includes("Error: Actions must be plain objects.")) {
                setPagina("Erro na conexão do sistema com o servidor.");
                if (retorno.erro.mensagem) {
                    setAlerta("error");
                    setMensagem(retorno.erro.mensagem);
                    setAguardando(false);
                }
            } else {
                setAlerta("success");
                setMensagem("Você receberá um email com o código de validação da nova senha!");
                setAguardando(false);
                setIrPara('/mystore/validar-conta');
            }
        }
        );
    }

    const cancelar = () => {
        setAguardando(true);
        setAlerta("warn");
        setMensagem("Recuperação de senha. Operação cancelada!");
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
        return <ModalCarregando aguardando={aguardando} pagina={pagina} />
    else
        return (
            <>
                {mensagem ? <Alerta tipoAlerta={alerta} mensagem={mensagem} /> : null}
                <h3 className="p-text-center">Solicitar Nova Senha</h3>
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
                    <Button label="Recuperar" icon="pi pi-send" className='p-mr-1' iconPos="left" onClick={() => trocarSenha()} disabled={!email} />
                    <Button label="Cancelar" icon="pi pi-ban" className='p-ml-1 p-button-danger' iconPos="left" onClick={() => cancelar()} />
                </div>
            </>
        );
}

const mapStateToProps = state => ({
    aplicacao: state.aplicacao
});

export default connect(mapStateToProps, actions)(RecuperarSenha);