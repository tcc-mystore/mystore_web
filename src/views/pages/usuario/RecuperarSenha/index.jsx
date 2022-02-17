import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, InputGroup, InputGroupText, FormGroup, Input } from 'reactstrap';
import Alerta from '../../../components/Alerta';
import * as actions from '../../../../domain/actions';
import logo from '../../../../assets/images/logo.png';
import BotaoEnviar from '../../../components/BotaoEnviar';
import BotaoCancelar from '../../../components/BotaoCancelar';


const RecuperarSenha = (props) => {

    const [irPara, setIrPara] = useState(null);
    const [aguardando, setAguardando] = useState(false);
    const [email, setEmail] = useState("");
    const [alerta, setAlerta] = useState("");
    const [mensagem, setMensagem] = useState("");

    const trocarSenha = () => {
        setAguardando(true);
        props.recuperarSenha({ email }, (retorno) => {
            // eslint-disable-next-line 
            var erro = new String(retorno.erro.detalhes);
            if (retorno.erro && !erro.includes("Error: Actions must be plain objects.")) {
                if (retorno.erro.mensagem) {
                    setAlerta("error");
                    setMensagem(retorno.erro.mensagem);
                    setAguardando(false);
                } else if (retorno.erro.status === 404) {
                    setAlerta("warning");
                    setMensagem(retorno.erro.detail);
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
        setAlerta("warning");
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
    return (
        <>
            <Form onSubmit={trocarSenha} className="form-signin text-center">
                <img className="mb-4" src={logo} alt="SAC" width="200" height="200" />
                <h1 className="h3 mb-3 font-weight-normal">Recuperar Senha</h1>
                {mensagem ? <Alerta tipoAlerta={alerta} mensagem={mensagem} /> : null}
                <FormGroup>
                    <InputGroup>
                        <InputGroupText>E-mail</InputGroupText>
                        <Input
                            type="email"
                            value={email}
                            name="email"
                            id="email"
                            placeholder="E-mail do usuário"
                            onChange={(ev) => setEmail(ev.target.value)} required />
                    </InputGroup>
                </FormGroup>
                <div className='d-flex justify-content-between p-mt-1'>
                    <BotaoEnviar onClickEnviar={trocarSenha} aguardando={aguardando} desabilitado={!email} />
                    <BotaoCancelar onClickCancelar={cancelar} />
                </div>
            </Form>
        </>
    );
}

export default connect(null, actions)(RecuperarSenha);