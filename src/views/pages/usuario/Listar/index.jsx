
import React, { useEffect, useState } from 'react';
import ModalCarregando from '../../../components/ModalCarregando';
import { connect, useSelector } from 'react-redux';
import * as  actionsPermissao from '../../../../domain/actions/actionsPermissao';
import { Label, FormGroup, Input, UncontrolledButtonDropdown, DropdownMenu, DropdownToggle, Button } from 'reactstrap';
import BotaoPesquisar from '../../../components/BotaoPesquisar';
import BotaoVisualizar from '../../../components/BotaoVisualizar';
import BotaoEditar from '../../../components/BotaoEditar';
import BotaoAtivar from '../../../components/BotaoAtivar';
import BotaoDesativar from '../../../components/BotaoDesativar';
import BotaoExcluir from '../../../components/BotaoExcluir';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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
                        <BotaoVisualizar uri={`/permissao-visualizar/${dado.id}`} />
                        <BotaoEditar uri={`/permissao-alterar/${dado.id}`} />
                        {dado.ativo ? <BotaoDesativar onClick={() => abrirConfirmarDesativacao(dado.id)} /> : <BotaoAtivar onClick={() => abrirConfirmarAtivacao(dado.id)} />}
                        <BotaoExcluir onClick={() => abrirConfirmarExclusao(dado.id)} />
                    </span>
                    <div className="dropdown d-block d-md-none">
                        <UncontrolledButtonDropdown>
                            <DropdownToggle outline size="sm">
                                <MoreVertIcon />
                            </DropdownToggle>
                            <DropdownMenu>
                                <BotaoVisualizar uri={`/permissao-visualizar/${dado.id}`} />
                                <BotaoEditar uri={`/permissao-alterar/${dado.id}`} />
                                {dado.ativo ? <BotaoDesativar onClick={() => abrirConfirmarDesativacao(dado.id)} /> : <BotaoAtivar onClick={() => abrirConfirmarAtivacao(dado.id)} />}
                                <BotaoExcluir onClick={() => abrirConfirmarExclusao(dado.id)} />
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="acoesListar">
                        </div>
                    </div>
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
                        <Label for="nome">Código</Label>
                        <Input
                            type="number"
                            //value={nome}
                            name="codigo"
                            id="codigo"
                            autoComplete="codigo"
                            //onChange={(ev) => this.onChangeInput("codigo", ev)}
                            placeholder="Filtar pelo código" />
                    </FormGroup>
                </div>
                <div className="col-sm-5">
                    <FormGroup>
                        <Label for="usuarioEmail">Descrição</Label>
                        <Input
                            id="descricao"
                            name="text"
                            //onChange={(ev) => this.onChangeInput("email", ev)}
                            type="descricao"
                            //value={email}
                            autoComplete="descricao"
                            placeholder="Filtrar por descrição" />
                    </FormGroup>
                </div>
                <div className="col-sm-5">
                    <FormGroup>
                        <Label for="nome">Nome Técnico</Label>
                        <Input type="text" name="nome" id="nome" placeholder="Nome técnico"
                        //value={this.state.dataInicial} 
                        //onChange={(ev) => this.ajustaDataInicio(ev.target.value)}
                        />
                    </FormGroup>
                </div>
            </div>
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