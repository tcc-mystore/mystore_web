import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { connect, useSelector } from 'react-redux';
import * as  actionsEmpresa from '../../../../domain/actions/actionsEmpresa';
import ModalCarregando from '../../../components/ModalCarregando';

const EmpresaVisualizar = (props) => {
    const state = useSelector((state) => state.empresa);

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

    return (
        <>
            <div className="d-flex">
                <div className="mr-auto p-2">
                    <h2 className="display-4 titulo">Detalhes da Empresa</h2>
                </div>
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
            <hr />
            {
                state.empresa ?
                    <dl className="row">
                        <dt className="col-sm-4">Código</dt>
                        <dd className="col-sm-8">{state.empresa.id}</dd>

                        <dt className="col-sm-4">Nome</dt>
                        <dd className="col-sm-8">{state.empresa.nome}</dd>

                        <dt className="col-sm-4">CPF/CNPJ</dt>
                        <dd className="col-sm-8">{state.empresa.cpfCnpj}</dd>

                        <dt className="col-sm-4">Data do Cadastrado</dt>
                        <dd className="col-sm-8">{state.empresa.dataCadastro && format(new Date(state.empresa.dataCadastro), 'dd/MM/yyyy hh:mm:ss', { locale: pt })}</dd>

                        <dt className="col-sm-4">Última Alteração</dt>
                        <dd className="col-sm-8">{state.empresa.dataAtualizacao && format(new Date(state.empresa.dataAtualizacao), 'dd/MM/yyyy hh:mm:ss', { locale: pt })}</dd>

                        <dt className="col-sm-4">Status</dt>
                        <dd className="col-sm-8">{state.empresa.ativo ? "Ativo" : "Inativo"}</dd>
                    </dl>
                    :
                    <ModalCarregando aguardando={true} pagina="Buscando informações da empresa." />
            }
        </>
    );
}

export default connect(null, actionsEmpresa)(EmpresaVisualizar);