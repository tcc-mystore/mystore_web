import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { connect, useSelector } from 'react-redux';
import * as  actionsEmpresa from '../../../../domain/actions/actionsEmpresa';
import ModalCarregando from '../../../components/ModalCarregando';

const EmpresaVisualizar = (props) => {
    const state = useSelector((state) => state.empresa);
    const [tabAtiva, setTabAtiva] = useState(0);

    useEffect(() => {
        getEmpresa(props.match.params.id);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        return props.limparEmpresa();
        // eslint-disable-next-line
    }, []);

    const getEmpresa = async (id) => {
        await props.getEmpresa({ id });
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
            <div className="d-flex justify-content-between">
                <div className="mr-auto p-2">
                    <h2 className="display-4 titulo">Detalhes da Empresa</h2>
                </div>
                <div className="mr-auto p-2">
                    <Link to={"/mystore/listar-empresas"}>
                        <button className="btn btn-outline-success btn-sm">
                            Listar
                        </button>
                    </Link>
                    <Link to={`/mystore/alterar-empresa/${props.match.params.id}`}>
                        <button className="ml-1 btn btn-outline-warning btn-sm">
                            Editar
                        </button>
                    </Link>
                </div>
            </div>
            <hr />
            {
                state.empresa ?
                    <div>
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
                                <dl className="row">
                                    <dt className="col-sm-4">Código</dt>
                                    <dd className="col-sm-8">{state.empresa.id}</dd>

                                    <dt className="col-sm-4">Nome</dt>
                                    <dd className="col-sm-8">{state.empresa.nome}</dd>

                                    <dt className="col-sm-4">CPF/CNPJ</dt>
                                    <dd className="col-sm-8">{state.empresa.cpfCnpj}</dd>

                                    <dt className="col-sm-4">Telefone</dt>
                                    <dd className="col-sm-8">{state.empresa.telefone}</dd>

                                    <dt className="col-sm-4">Data do Cadastrado</dt>
                                    <dd className="col-sm-8">{state.empresa.dataCadastro && format(new Date(state.empresa.dataCadastro), 'dd/MM/yyyy hh:mm:ss', { locale: pt })}</dd>

                                    <dt className="col-sm-4">Última Alteração</dt>
                                    <dd className="col-sm-8">{state.empresa.dataAtualizacao && format(new Date(state.empresa.dataAtualizacao), 'dd/MM/yyyy hh:mm:ss', { locale: pt })}</dd>

                                    <dt className="col-sm-4">Status</dt>
                                    <dd className="col-sm-8">{state.empresa.ativo ? "Ativo" : "Inativo"}</dd>
                                </dl>
                            </TabPane>
                            <TabPane tabId={1}>
                                <dl className="row">
                                    <dt className="col-sm-4">Endereço</dt>
                                    <dd className="col-sm-8">{`${state.empresa.endereco.logradouro} ${state.empresa.endereco.numero}, ${state.empresa.endereco.complemento ? state.empresa.endereco.complemento : ''}`}</dd>

                                    <dt className="col-sm-4">Bairro</dt>
                                    <dd className="col-sm-8">{state.empresa.endereco.bairro}</dd>

                                    <dt className="col-sm-4">CEP</dt>
                                    <dd className="col-sm-8">{state.empresa.endereco.cep}</dd>

                                    <dt className="col-sm-4">Cidade</dt>
                                    <dd className="col-sm-8">{state.empresa.endereco.cidade.nome}</dd>

                                    <dt className="col-sm-4">Estado</dt>
                                    <dd className="col-sm-8">{state.empresa.endereco.cidade.estado.nome}</dd>
                                </dl>
                            </TabPane>
                        </TabContent>
                    </div>
                    :
                    <ModalCarregando aguardando={true} pagina="Buscando informações da empresa." />
            }
        </>
    );
}

export default connect(null, actionsEmpresa)(EmpresaVisualizar);