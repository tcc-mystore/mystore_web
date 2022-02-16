import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import * as actionsEmpresa from '../../../../domain/actions/actionsEmpresa';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import BotaoConfirmar from '../../../components/BotaoConfirmar';
import Alerta from '../../../components/Alerta';
import ModalCarregando from '../../../components/ModalCarregando';

const EmpresaAlterar = (props) => {
    const [irPara, setIrPara] = useState(null);
    const state = useSelector((state) => state.empresa);
    const [id, setId] = useState("");
    const [cpfCnpj, setCpfCnpj] = useState("");
    const [nome, setNome] = useState("");
    const [ativo, setAtivo] = useState(false);
    const [alerta, setAlerta] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [aguardando, setAguardando] = useState(false);

    useEffect(() => {
        const { id } = props.match.params;
        receberDadosEmpresa(id);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        return props.limparEmpresa();
        // eslint-disable-next-line
    }, []);

    const receberDadosEmpresa = async (id) => {
        await props.getEmpresa({ id });
        if (state.empresa) {
            setId(state.empresa.id);
            setNome(state.empresa.nome);
            setCpfCnpj(state.empresa.cpfCnpj);
            setAtivo(state.empresa.ativo);
        }
    }

    const alterarEmpresa = async () => {
        setMensagem("");

        if (!criticas()) {
            setAlerta("warning");
            return;
        }

        setAguardando(true);

        props.alterarEmpresa({ id, nome, cpfCnpj, ativo }, (retorno) => {
            if (retorno.erro) {
                setAlerta("warning");
                setMensagem(retorno.erro.detail);
                setAguardando(false);
            } else {
                setAlerta("success");
                setMensagem("Dados alterados com sucesso!.")
                setAguardando(false);
                //this.setState({ formularioPronto: true });
            }
        })
    }

    const criticas = () => {
        if (!nome) return setMensagem("Preencha o campo nome!");
        if (!cpfCnpj) return setMensagem("Preencha o campo CPF/CNPJ!");
        return true;
    }

    if (irPara !== null) {
        return <Redirect to={{
            pathname: irPara,
            state: { alerta, mensagem }
        }} />
    }

    return (
        <>
            {console.log(state.empresa)}

            {!state.empresa && <ModalCarregando aguardando={true} pagina="Buscando informações da empresa." />}
            <div className="d-flex justify-content-between">
                <div className="mr-auto p-2">
                    <h2 className="display-4 titulo">Alterar Empresa</h2>
                </div>
                <div className="mr-auto p-2">
                    <Link to={"/mystore/listar-empresas"}>
                        <button className="btn btn-outline-success btn-sm">
                            Listar
                        </button>
                    </Link>
                    <Link to={`/mystore/visualizar-empresa/${props.match.params.id}`}>
                        <button className="ml-1 btn btn-outline-info btn-sm">
                            Visualisar
                        </button>
                    </Link>
                </div>
            </div>
            <hr />
            {mensagem ? <Alerta tipoAlerta={alerta} mensagem={mensagem} /> : null}
            <Form>
                <Input type="hidden"
                    value={id}
                    name="id"
                    id="id" />
                <FormGroup>
                    <Label for="nome">Nome</Label>
                    <Input
                        type="text"
                        value={nome}
                        name="nome"
                        id="nome"
                        className="form-control"
                        //placeholder={dadosEmpresa ? "Nome do usuário" : "Carregado..."}
                        //disabled={dadosEmpresa ? false : true}
                        autoComplete="nome"
                        onChange={setNome}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="email">CPF/CNPJ</Label>
                    <Input
                        type="text"
                        value={cpfCnpj}
                        name="cpfCnpj"
                        id="cpfCnpj"
                        className="form-control"
                        //placeholder={dadosEmpresa ? "E-mail do usuário" : "Carregando.."}
                        // disabled={dadosEmpresa ? false : true}
                        autoComplete="cpfCnpj"
                        onChange={setCpfCnpj}
                    />
                </FormGroup>
                <FormGroup check inline>
                    <Label for="ativo" check>
                        <Input
                            type="checkbox"
                            checked={ativo ? true : false}
                            value={ativo}
                            name="ativo"
                            id="ativo"
                            //disabled={dadosEmpresa ? false : true}
                            autoComplete="ativo"
                            onClick={() => (ativo ? setAtivo(false) : setAtivo(true))}
                        /> Ativo
                    </Label>
                </FormGroup>
                <br /><br />
                <Link onClick={() => alterarEmpresa()} to="#">
                    <BotaoConfirmar aguardando={aguardando} />
                </Link>
            </Form>
        </>
    )
}

export default connect(null, actionsEmpresa)(EmpresaAlterar);