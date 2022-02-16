
import React, { useEffect, useState } from 'react';
import ModalCarregando from '../../../components/ModalCarregando';
import { connect, useSelector } from 'react-redux';
import * as  actionsPermissao from '../../../../domain/actions/actionsPermissao';
import { FormGroup, Button } from 'reactstrap';
import BotaoPesquisar from '../../../components/BotaoPesquisar';

const Listar = (props) => {

    const [permissoes, setPermissoes] = useState([]);
    const [pesquisando, setPesquisando] = useState(false);
    const { permissao } = useSelector((state) => state);

    const listarPermissoes = async () => {
        setPesquisando(true);
        await props.getPermissoes();
    }

    // eslint-disable-next-line
    useEffect(() => {
        if (permissao.permissoes) {
            setPermissoes(permissao.permissoes._embedded.permissoes)
            setPesquisando(false);
        }
    });

    const limparPermissoes = async () => {
        setPermissoes([]);
        await props.limparPermissoes();
    }

    const opcoes = (dado) => {
        if (dado._links) {
            return (
                <>
                    <span className="d-none d-md-block">
                    </span>
                </>
            )
        } else {
            return (
                <>
                    <span className="d-none d-md-block">
                        Não há opções!
                    </span>
                </>
            )
        }
    }

    return (
        <>
            <div className="form-group row">
                <div className="col-sm-2">
                    <FormGroup>
                        <BotaoPesquisar onClickPesquisar={() => {
                            limparPermissoes();
                            listarPermissoes();
                        }} />
                    </FormGroup>
                </div>
                <div className="col-sm-1">
                    <FormGroup>
                        <Button onClick={limparPermissoes} >Limpar</Button>
                    </FormGroup>
                </div>
            </div>
            <div className="table-responsive">
                {pesquisando && <ModalCarregando aguardando={true} pagina="Listando as permissões do sistema." />}
                <table className="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th className="d-none d-sm-table-cell">Código</th>
                            <th>Descrição</th>
                            <th className="d-none d-sm-table-cell">Nome Técnico</th>
                            <th className="text-center">Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            permissoes.map(
                                (dado) => (
                                    <tr key={dado.id} >
                                        <th className="d-none d-sm-table-cell">{dado.id}</th>
                                        <th>{dado.descricao}</th>
                                        <td className="d-none d-sm-table-cell">{dado.nome}</td>
                                        <td className="text-center">
                                            {opcoes(dado)}
                                        </td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default connect(null, actionsPermissao)(Listar);