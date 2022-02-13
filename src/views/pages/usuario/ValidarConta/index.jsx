import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, FormGroup, Input, InputGroup, InputGroupText } from 'reactstrap';
import logo from '../../../../assets/images/logo.png';
import BotaoConfirmar from '../../../components/BotaoConfirmar';
import BotaoCancelar from '../../../components/BotaoCancelar';

const ValidarConta = (props) => {

    const [irPara, setIrPara] = useState(null);
    const [aguardando, setAguardando] = useState(false);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("123456");
    const [confirmaSenha, setConfirmarSenha] = useState("123456");
    const [codigo, setCodigo] = useState(516718);
    const [alerta, setAlerta] = useState("");
    const [mensagem, setMensagem] = useState("");

    const validarConta = (e) => {
        e.preventDefault();
        setAguardando(true);
        props.validacaoRecuperarSenha({ email, codigoAcesso: codigo, senha }, (retorno) => {
            if (retorno.erro) {
                // eslint-disable-next-line 
                var erro = new String(retorno.erro.detalhes);
                if (!erro.includes("Error: Actions must be plain objects.")) {
                    if (retorno.erro.mensagem) {
                        setAlerta("error");
                        setMensagem(retorno.erro.mensagem);
                        setAguardando(false);
                    } else if (retorno.erro.status === 400) {
                        setAlerta("warning");
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
        setAlerta("warning");
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

    return (
        <>
            <Form onSubmit={validarConta} className="form-signin text-center">
                <img className="mb-4" src={logo} alt="Celke" width="200" height="200" />
                <h1 className="h3 mb-3 font-weight-normal">Alterar Senha</h1>
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
                <FormGroup>
                    <InputGroup>
                        <InputGroupText>Código</InputGroupText>
                        <Input
                            type="number"
                            value={codigo}
                            name="email"
                            id="codigo"
                            placeholder="Código recebido no email"
                            onChange={(ev) => setCodigo(ev.target.value)} required />
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <InputGroup>
                        <InputGroupText style={{ height: 46 }}>Senha</InputGroupText>
                        <Input
                            type="password"
                            value={senha}
                            name="senha"
                            id="senha"
                            placeholder="Nova senha do usuário"
                            onChange={(ev) => setSenha(ev.target.value)} required />
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <InputGroup>
                        <InputGroupText style={{ height: 46 }}>Confirmar Senha</InputGroupText>
                        <Input
                            type="password"
                            value={confirmaSenha}
                            name="confirmaSenha"
                            id="confirmaSenha"
                            placeholder="Confirme a senha anterior"
                            onChange={(ev) => setConfirmarSenha(ev.target.value)} required />
                    </InputGroup>
                </FormGroup>
                <div className='p-d-flex p-jc-between p-mt-1'>
                    <BotaoConfirmar aguardando={aguardando} />
                    <BotaoCancelar onClickCancelar={cancelar} desabilitado={aguardando} />
                </div>
            </Form>
        </>
    );
}
export default ValidarConta;