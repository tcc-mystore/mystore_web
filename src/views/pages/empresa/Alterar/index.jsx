import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import * as actionsEmpresa from '../../../../domain/actions/actionsEmpresa';
import { Form, FormGroup, Label, Input, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import BotaoConfirmar from '../../../components/BotaoConfirmar';
import Alerta from '../../../components/Alerta';
import ModalCarregando from '../../../components/ModalCarregando';
import { cnpjMask, cpfMask, cepMask, telefoneMask } from '../../../../core/helpers/masks';
import { cpfValidatorMask, cnpjValidatorMask, telefoneValidator } from '../../../../core/helpers/validators';

const EmpresaAlterar = (props) => {
    const { empresa } = useSelector((state) => state.empresa);
    const [id, setId] = useState("");
    const [cpfCnpj, setCpfCnpj] = useState("");
    const [telefone, setTelefone] = useState("");
    const [nome, setNome] = useState("");
    const [ativo, setAtivo] = useState(false);
    const [logradouro, setLogradouro] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");
    const [bairro, setBairro] = useState("");
    const [cep, setCep] = useState("");
    const [idCidade, setIdCidade] = useState("");
    const [idEstado, setIdEstado] = useState("");
    const [alerta, setAlerta] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [aguardando, setAguardando] = useState(false);
    const [tipoPessoa, setTipoPessoa] = useState(null);
    const [tabAtiva, setTabAtiva] = useState(0);

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
        if (empresa) {
            setId(empresa.id);
            setNome(empresa.nome);
            setCpfCnpj(empresa.cpfCnpj);
            setTelefone(empresa.telefone);
            setAtivo(empresa.ativo);
            setTipoPessoa(empresa.cpfCnpj && (Object.keys(empresa.cpfCnpj).length <= 14 ? "CPF" : "CNPJ"));
            setLogradouro(empresa.endereco.logradouro);
            setNumero(empresa.endereco.numero);
            setBairro(empresa.endereco.bairro);
            setCep(empresa.endereco.cep);
            setComplemento(empresa.endereco.complemento);
            setIdCidade(empresa.endereco.cidade.id);
            setIdEstado(empresa.endereco.cidade.estado.id)
        }
    }

    const alterarEmpresa = async () => {
        setMensagem("");

        if (!criticas()) {
            setAlerta("warning");
            return;
        }

        setAguardando(true);
        let dadosEmpresa = {
            nome,
            cpfCnpj,
            telefone,
            endereco: {
                logradouro,
                numero,
                complemento,
                bairro,
                cep,
                cidade: {
                    id: idCidade
                }
            }
        }
        props.alterarEmpresa({ empresa: dadosEmpresa, id }, (retorno) => {
            if (retorno.erro) {
                setAlerta("warning");
                setMensagem(retorno.erro.detail);
                setAguardando(false);
            } else {
                setAlerta("success");
                setMensagem("Dados alterados com sucesso!.")
                setAguardando(false);
            }
        });
    }

    const criticas = () => {
        /* eslint-disable */
        if (!nome) {
            setTabAtiva(0);
            return setMensagem("Preencha o campo nome!");
        } else if (!cpfCnpj) {
            setTabAtiva(0);
            return setMensagem("Preencha o campo CPF/CNPJ!");
        } else if (tipoPessoa == "CPF" && !cpfValidatorMask(cpfCnpj)) {
            setTabAtiva(0);
            return setMensagem("CPF inválido!")
        } else if (tipoPessoa == "CNPJ" && !cnpjValidatorMask(cpfCnpj)) {
            setTabAtiva(0);
            return setMensagem("CNPJ inválido!")
        } else if (!telefoneValidator(telefone)) {
            setTabAtiva(0);
            return setMensagem("Telefone inválido!")
        } else if (!bairro) {
            setTabAtiva(1);
            return setMensagem("Preencha o campo bairro!");
        } else if (!cep) {
            setTabAtiva(1);
            return setMensagem("Preencha o campo CEP!");
        } else {
            return true;
        }
        /* eslint-enable */
    }

    const ativaTabBar = (id) => {
        let componentes = document.getElementsByClassName('dados-cadastrais');
        let indiceComponente = null;
        for (let i = 0; i < componentes.length; i++) {
            componentes[i].classList.remove('active');
            if (componentes[i].id == id) {
                indiceComponente = i;
            }
        }
        document.getElementById(id).classList.add('active');
        setTabAtiva(indiceComponente);
    }

    return (
        <>
            {!empresa && <ModalCarregando aguardando={true} pagina="Buscando informações da empresa." />}
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
            <div>
                <Form>
                    <Input type="hidden" value={id} name="id" id="id" />
                    <Nav tabs>
                        <NavItem>
                            <NavLink id="empresa" className="active cursor dados-cadastrais" onClick={ev => ativaTabBar(ev.target.id)}>
                                Dados Empresa
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink id="endereco" className="cursor dados-cadastrais" onClick={ev => ativaTabBar(ev.target.id)}>
                                Endereço
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={tabAtiva}>
                        <TabPane tabId={0}>
                            <FormGroup>
                                <Label for="nome">Nome</Label>
                                <Input
                                    type="text"
                                    value={nome}
                                    name="nome"
                                    id="nome"
                                    className="form-control"
                                    autoComplete="nome"
                                    onChange={ev => setNome(ev.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <span className='p-2'>
                                    <Input name="cpf_cnpj" type="radio" onChange={() => setTipoPessoa("CPF")} checked={tipoPessoa == "CPF"} />
                                    <Label className='ms-1' for='cpf_cnpj' check>CPF</Label>
                                </span>
                                <span className='p-2'>
                                    <Input name="cpf_cnpj" type="radio" onChange={() => setTipoPessoa("CNPJ")} checked={tipoPessoa == "CNPJ"} />
                                    <Label className='ms-1' for='cpf_cnpj' check>CNPJ</Label>
                                </span>
                                <Input
                                    type="text"
                                    value={cpfCnpj}
                                    name="cpfCnpj"
                                    id="cpfCnpj"
                                    className="form-control"
                                    autoComplete="cpfCnpj"
                                    onChange={ev => {
                                        if (tipoPessoa == "CPF") {
                                            setCpfCnpj(cpfMask(ev.target.value));
                                        } else {
                                            setCpfCnpj(cnpjMask(ev.target.value));
                                        }
                                    }}
                                    disabled={tipoPessoa}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label className='ms-1' for='cpf_cnpj' check>Telefone</Label>
                                <Input
                                    type="text"
                                    value={telefone}
                                    name="telefone"
                                    id="telefone"
                                    className="form-control"
                                    autoComplete="telefone"
                                    onChange={ev => {
                                        setTelefone(telefoneMask(ev.target.value));
                                    }}
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
                                        autoComplete="ativo"
                                        onClick={() => (ativo ? setAtivo(false) : setAtivo(true))}
                                    /> Ativo
                                </Label>
                            </FormGroup>
                        </TabPane>
                        <TabPane tabId={1}>
                            <FormGroup>
                                <Label for="logradouro">Rua/Av</Label>
                                <Input
                                    type="text"
                                    value={logradouro}
                                    name="logradouro"
                                    id="logradouro"
                                    className="form-control"
                                    autoComplete="logradouro"
                                    onChange={ev => setLogradouro(ev.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="numero">Número</Label>
                                <Input
                                    type="text"
                                    value={numero}
                                    name="numero"
                                    id="numero"
                                    className="form-control"
                                    autoComplete="numero"
                                    onChange={ev => setNumero(ev.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="complemento">Complemento</Label>
                                <Input
                                    type="text"
                                    value={complemento}
                                    name="complemento"
                                    id="complemento"
                                    className="form-control"
                                    autoComplete="complemento"
                                    onChange={ev => setComplemento(ev.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="bairro">Bairro</Label>
                                <Input
                                    type="text"
                                    value={bairro}
                                    name="bairro"
                                    id="bairro"
                                    className="form-control"
                                    autoComplete="bairro"
                                    onChange={ev => setBairro(ev.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="cep">CEP</Label>
                                <Input
                                    type="text"
                                    value={cep}
                                    name="cep"
                                    id="cep"
                                    className="form-control"
                                    autoComplete="cep"
                                    onChange={ev => setCep(cepMask(ev.target.value))} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="bairro">Cidade</Label>
                                <Input
                                    bsSize="lg"
                                    className="mb-3"
                                    type="select"
                                    value={idCidade}
                                    onChange={ev => setIdCidade(ev.target.value)}>
                                    <option value={1}>
                                        cidade1
                                    </option>
                                    <option value={2}>
                                        cidade2
                                    </option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="bairro">Estado</Label>
                                <Input
                                    bsSize="lg"
                                    className="mb-3"
                                    type="select"
                                    value={idEstado}
                                    onChange={ev => setIdEstado(ev.target.value)}>
                                    <option value={1}>
                                        estado1
                                    </option>
                                    <option value={2}>
                                        estado2
                                    </option>
                                </Input>
                            </FormGroup>
                        </TabPane>
                    </TabContent>
                    <div>
                        <Link onClick={alterarEmpresa} to="#">
                            <BotaoConfirmar aguardando={aguardando} />
                        </Link>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default connect(null, actionsEmpresa)(EmpresaAlterar);