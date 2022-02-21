
import React, { useEffect, useState } from 'react';
import ModalCarregando from '../../../components/ModalCarregando';
import { connect, useSelector } from 'react-redux';
import * as  actionsEmpresa from '../../../../domain/actions/actionsEmpresa';
import { Label, FormGroup, Input, UncontrolledButtonDropdown, DropdownMenu, DropdownToggle, Button } from 'reactstrap';
import BotaoPesquisar from '../../../components/BotaoPesquisar';
import BotaoVisualizar from '../../../components/BotaoVisualizar';
import BotaoEditar from '../../../components/BotaoEditar';
import BotaoAtivar from '../../../components/BotaoAtivar';
import BotaoDesativar from '../../../components/BotaoDesativar';
import BotaoExcluir from '../../../components/BotaoExcluir';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Alerta from '../../../components/Alerta';
import ModalApagar from '../../../components/ModalApagar';
import ModalAtivar from '../../../components/ModalAtivar';
import ModalDesativar from '../../../components/ModalDesativar';

const Listar = (props) => {

    const [empresas, setEmpresas] = useState([]);
    const [pesquisando, setPesquisando] = useState(false);
    const { empresa } = useSelector((state) => state);
    //
    const [alerta, setAlerta] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [aguardando, setAguardando] = useState(false);
    const [confirmarExclusao, setConfirmarExclusao] = useState(false);
    const [idParaExcluir, setIdParaExcluir] = useState(null);
    const [idParaAtivar, setIdParaAtivar] = useState(null);
    const [idParaDesativar, setIdParaDesativar] = useState(null);
    const [confirmarAtivacao, setConfirmarAtivacao] = useState(false);
    const [confirmarDesativacao, setConfirmarDesativacao] = useState(false);

    const listarEmpresas = async () => {
        setPesquisando(true);
        props.getEmpresas((retorno) => {
            if (retorno.erro) {
                setAlerta("warning");
                setMensagem(retorno.erro.mensagem);
            }
            setAguardando(false);
        });
    }

    // eslint-disable-next-line
    useEffect(() => {
        if (empresa.empresas) {
            setEmpresas(empresa.empresas._embedded.empresas)
            setPesquisando(false);
        }
    });

    const limparEmpresas = async () => {
        setEmpresas([]);
        await props.limparEmpresas();
    }

    const abrirConfirmarExclusao = (id) => {
        setConfirmarExclusao(true);
        setIdParaExcluir(id);
    }

    const fecharConfirmarExclusao = () => {
        setConfirmarExclusao(false);
    }

    const apagarEmpresa = () => {
        setAlerta("");
        setAguardando(true);
        this.props.removerEmpresa(idParaExcluir, (retorno) => {
            if (retorno.erro.erro) {
                setAlerta("warning");
                setMensagem(retorno.erro.mensagem);
                setAguardando(false);
            } else {
                setAlerta("success");
                setMensagem(retorno.erro.mensagem);
                setAguardando(false);
                fecharConfirmarAtivacao();
                limparEmpresas();
                listarEmpresas();
            }
        })
    }

    //Início rotina de ativação
    const ativarEmpresa = () => {
        setAlerta("");
        setAguardando(true);
        props.ativarEmpresa({ id: idParaAtivar, ativo: true }, (retorno) => {
            if (retorno.erro.erro) {
                setAlerta("warning");
                setMensagem(retorno.erro.mensagem);
                setAguardando(false);
            } else {
                setAlerta("success");
                setMensagem(retorno.erro.mensagem);
                setAguardando(false);
                fecharConfirmarAtivacao();
                limparEmpresas();
                listarEmpresas();
            }
        });
    }

    const abrirConfirmarAtivacao = (id) => {
        setConfirmarAtivacao(true);
        setIdParaAtivar(id);
    }

    const fecharConfirmarAtivacao = () => {
        setConfirmarAtivacao(false);
    }
    //Fim rotina de ativação

    //Início rotina de desativação
    const desativarEmpresa = () => {
        setAlerta("");
        setAguardando(true);
        props.ativarEmpresa({ id: idParaDesativar, ativo: false }, (retorno) => {
            console.log('entrei')
            if (retorno.erro) {
                setAlerta("warning");
                setMensagem(retorno.erro.userMessage);
                setAguardando(false);
                setConfirmarDesativacao(false);
            } else {
                setAlerta("success");
                setMensagem(retorno.erro.userMensagem);
                setAguardando(false);
                fecharConfirmarAtivacao();
                limparEmpresas();
                listarEmpresas();
            }
        });
    }

    const abrirConfirmarDesativacao = (id) => {
        setConfirmarDesativacao(true);
        setIdParaDesativar(id);
    }

    const fecharConfirmarDesativacao = () => {
        setConfirmarDesativacao(false);
    }
    //Fim rotina de desativação

    const opcoes = (dado) => {
        if (dado._links) {
            return (
                <>
                    <span className="d-none d-md-block">
                        <BotaoVisualizar uri={`/mystore/visualizar-empresa/${dado.id}`} />
                        <BotaoEditar uri={`/mystore/alterar-empresa/${dado.id}`} />
                        {dado.ativo ? <BotaoDesativar onClick={() => {
                            abrirConfirmarDesativacao(dado.id)
                        }} /> : <BotaoAtivar onClick={() => {
                            abrirConfirmarAtivacao(dado.id)
                        }} />}
                        {dado.ativo === false ? <BotaoExcluir onClick={() => {
                            abrirConfirmarExclusao(dado.id)
                        }} /> : null}
                    </span>
                    <div className="dropdown d-block d-md-none">
                        <UncontrolledButtonDropdown>
                            <DropdownToggle outline size="sm">
                                <MoreVertIcon />
                            </DropdownToggle>
                            <DropdownMenu>
                                <BotaoVisualizar uri={`/mystore/visualizar-empresa/${dado.id}`} />
                                <BotaoEditar uri={`/mystore/alterar-empresa/${dado.id}`} />
                                {dado.ativo ? <BotaoDesativar onClick={() => {
                                    abrirConfirmarDesativacao(dado.id)
                                }} /> : <BotaoAtivar onClick={() => {
                                    abrirConfirmarAtivacao(dado.id)
                                }} />}
                                {dado.ativo === false ? <BotaoExcluir onClick={() => {
                                    // abrirConfirmarExclusao(dado.id)
                                }} /> : null}
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
            {/* Component modal apagar */}
            <ModalApagar isOpen={confirmarExclusao} toogle={fecharConfirmarExclusao} apagar='Empresa' aguardando={aguardando} apagarObjeto={apagarEmpresa} />
            {/* Component modal ativar */}
            <ModalAtivar isOpen={confirmarAtivacao} toogle={fecharConfirmarAtivacao} ativar='Empresa' aguardando={aguardando} ativarObjeto={ativarEmpresa} />
            {/* Component modal desativar */}
            <ModalDesativar isOpen={confirmarDesativacao} toogle={fecharConfirmarDesativacao} desativar='Empresa' aguardando={aguardando} desativarObjeto={desativarEmpresa} />
            <div className="form-group row">
                {mensagem ? <Alerta tipoAlerta={alerta} mensagem={mensagem} /> : null}
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
                            placeholder="Filtar pelo código" disabled />
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
                            placeholder="Filtrar por descrição" disabled />
                    </FormGroup>
                </div>
                <div className="col-sm-5">
                    <FormGroup>
                        <Label for="nome">Nome Técnico</Label>
                        <Input type="text" name="nome" id="nome" placeholder="Nome técnico"
                            //value={this.state.dataInicial} 
                            //onChange={(ev) => this.ajustaDataInicio(ev.target.value)}
                            disabled />
                    </FormGroup>
                </div>
            </div>
            <div className="form-group row">
                <div className="col-sm-2">
                    <FormGroup>
                        <BotaoPesquisar onClickPesquisar={() => {
                            limparEmpresas();
                            listarEmpresas();
                        }} />
                    </FormGroup>
                </div>
                <div className="col-sm-1">
                    <FormGroup>
                        <Button onClick={limparEmpresas} >Limpar</Button>
                    </FormGroup>
                </div>
            </div>
            <div className="table-responsive">
                {pesquisando && <ModalCarregando aguardando={true} pagina="Listando as empresas." />}
                <table className="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th className="d-none d-sm-table-cell">Código</th>
                            <th>Nome</th>
                            <th className="d-none d-sm-table-cell">CPF/CNPJ</th>
                            <th className="text-center">Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            empresas.map(
                                (dado) => (
                                    <tr key={dado.id} >
                                        <th className="d-none d-sm-table-cell">{dado.id}</th>
                                        <th>{dado.nome}</th>
                                        <td className="d-none d-sm-table-cell">{dado.cpfCnpj}</td>
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

export default connect(null, actionsEmpresa)(Listar);