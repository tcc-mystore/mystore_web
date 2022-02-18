import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import * as actionsEmpresa from '../../../../domain/actions/actionsEmpresa';
import { Form, FormGroup, Label, Input, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import BotaoConfirmar from '../../../components/BotaoConfirmar';
import Alerta from '../../../components/Alerta';
import ModalCarregando from '../../../components/ModalCarregando';
import { cnpjMask, cpfMask, cepMask } from '../../../../core/helpers/masks';
import { cpfValidatorMask, cnpjValidatorMask } from '../../../../core/helpers/validators';

const EmpresaAlterar = (props) => {
    const {empresa} = useSelector((state) => state.empresa);
    const [id, setId] = useState("");
    const [cpfCnpj, setCpfCnpj] = useState("");
    const [nome, setNome] = useState("");
    const [ativo, setAtivo] = useState(false);
    const [logradouro, setLogradouro] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");
    const [bairro, setBairro] = useState("");
    const [cep, setCep] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
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
            setAtivo(empresa.ativo);
            setTipoPessoa(empresa.cpfCnpj && (Object.keys(empresa.cpfCnpj).length <= 11 ? "CPF" : "CNPJ"));
            setLogradouro(empresa.endereco.logradouro);
            setNumero(empresa.endereco.numero);
            setBairro(empresa.endereco.bairro);
            setCep(empresa.endereco.cep);
            setComplemento(empresa.endereco.complemento);
            setCidade(empresa.endereco.cidade.id);
            setEstado(empresa.endereco.cidade.estado.id)
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
            id, 
            nome,
            cpfCnpj, 
            telefone: null, 
            endereco: {
                logradouro, 
                numero, 
                complemento, 
                bairro, 
                cidade: { 
                    id: cidade 
                }
            }
        }
        // props.alterarEmpresa({ id, nome, cpfCnpj, ativo }, (retorno) => {
        //     if (retorno.erro) {
        //         setAlerta("warning");
        //         setMensagem(retorno.erro.detail);
        //         setAguardando(false);
        //     } else {
        //         setAlerta("success");
        //         setMensagem("Dados alterados com sucesso!.")
        //         setAguardando(false);
        //         //this.setState({ formularioPronto: true });
        //     }
        // })

        console.log(`${id},${nome},${cpfCnpj},${ativo}`)
        setAguardando(false);
    }

    const criticas = () => {
        /* eslint-disable */
        if (!nome) {
            return setMensagem("Preencha o campo nome!");
        } else if (!cpfCnpj) {
            return setMensagem("Preencha o campo CPF/CNPJ!");
        } else if (tipoPessoa == "CPF" && !cpfValidatorMask(cpfCnpj)) {
            return setMensagem("CPF inválido!")
        } else if (tipoPessoa == "CNPJ" && !cnpjValidatorMask(cpfCnpj)) {
            return setMensagem("CNPJ inválido!")
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
        {/* {console.log(empresa)} */}
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
                                    disabled={!tipoPessoa}
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
                                    onChange={ev => setLogradouro(ev.target.value)}
                                />
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
                                    onChange={ev => setNumero(ev.target.value)}
                                />
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
                                    onChange={ev => setComplemento(ev.target.value)}
                                />
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
                                    onChange={ev => setBairro(ev.target.value)}
                                />
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
                                    onChange={ev => setCep(cepMask(ev.target.value))}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="bairro">Cidade</Label>
                                <Input
                                    bsSize="lg"
                                    className="mb-3"
                                    type="select"
                                    value={cidade}
                                    onChange={ev=>setCidade(ev.target.value)}
                                >
                                    <option value={0}>
                                       
                                    </option>   
                                    
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
                                    value={estado}
                                    onChange={ev=>setEstado(ev.target.value)}
                                >
                                    <option value={0}>
                                       
                                    </option>   
                                    
                                       <option value={1}>
                                       estado1
                                    </option>
                                    <option value={1}>
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