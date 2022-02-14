import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Input, InputGroup, InputGroupText } from 'reactstrap';
import Alerta from '../../../components/Alerta';
import { Link } from 'react-router-dom';
import logo from '../../../../assets/images/logo.png';
import BotaoLogin from '../../../components/BotaoLogin';

const Login = (props) => {

    const [aguardando, setAguardando] = useState(false);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("123456");
    const [alerta, setAlerta] = useState("");
    const [mensagem, setMensagem] = useState("");

    const logar = (e) => {
        e.preventDefault();
        setAlerta("");
        setMensagem("");
        setAguardando(true);
        props.handleLogin({ email, senha }, (retorno) => {
            if (retorno.erro) {
                if (retorno.erro.mensagem) {
                    setAlerta("error");
                    setMensagem(retorno.erro.mensagem);
                }
                if (retorno.erro.status === 401) {
                    setAlerta("warning");
                    setMensagem("Acesso negado!");
                }
                if (retorno.erro.error_description === 'Bad credentials') {
                    setAlerta("warning");
                    setMensagem("Email ou senha inválido!");
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
            setEmail(location.state.email);
        }// eslint-disable-next-line
    }, [])

    return (
        <>
            <Form onSubmit={logar} className="form-signin text-center">
                <img className="mb-4" src={logo} alt="Logo MyStore" width="200" height="200" />
                <h1 className="h3 mb-3 font-weight-normal">Login</h1>
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
                <FormGroup>
                    <InputGroup>
                        <InputGroupText style={{ height: 46 }}>Senha</InputGroupText>
                        <Input
                            type="password"
                            value={senha}
                            name="senha"
                            id="senha"
                            placeholder="Senha do usuário"
                            onChange={(ev) => setSenha(ev.target.value)} required />
                    </InputGroup>
                </FormGroup>
                <BotaoLogin aguardando={aguardando} desabilitado={!email || !senha}/>
                <div className='d-flex justify-content-between p-mt-1'>
                    <Link to={{ pathname: '/mystore/recuperar-senha', state: { email } }} className="p-mb-2" style={{ textDecoration: 'none' }}>Recuperar senha</Link>
                    <Link to={{ pathname: '/mystore/validar-conta', state: { email } }} className="p-mb-2" style={{ textDecoration: 'none' }}>Validar conta</Link>
                </div>
            </Form>
        </>
    );
}

export default Login;