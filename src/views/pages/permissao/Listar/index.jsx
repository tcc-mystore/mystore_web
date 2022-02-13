
import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ModalCarregando from '../../../components/ModalCarregando';
import { connect, useSelector } from 'react-redux';
import * as  actionsPermissao from '../../../../domain/actions/actionsPermissao';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';

const Listar = (props) => {

    const [permissoes, setPermissoes] = useState([]);
    const { permissao } = useSelector((state) => state);

    useEffect(() => {
        listarPermissoes();
        // eslint-disable-next-line
    }, [permissao.permissoes]);

    useEffect(() => {
        return () => limparPermissoes();
        // eslint-disable-next-line
    }, []);

    const listarPermissoes = async () => {
        await props.getPermissoes();
        if (permissao.permissoes) {
            setPermissoes(permissao.permissoes._embedded.permissoes)
        }
    }

    const limparPermissoes = async () => {
        console.log('limpando a tela');
        await props.limparPermissoes();
    }

    if (!permissao.permissoes)
        return <ModalCarregando aguardando={true} pagina="Listando as permissões do sistema." />
    else
        return (
            <div>
                <div className="card">
                    <div className="p-fluid grid">
                        <div className=" md:col-4">
                            <label htmlFor="basic">Basic</label>
                            <InputText />
                        </div>
                        <div className=" md:col-4">

                            <label htmlFor="basic">Basic</label>
                            <InputText />
                        </div>
                        <div className=" md:col-4">

                            <label htmlFor="basic">Basic</label>
                            <InputText />
                        </div>
                    </div>
                    <DataTable value={permissoes} responsiveLayout="scroll">
                        <Column field="id" header="Código"></Column>
                        <Column field="descricao" header="Descricao"></Column>
                        <Column field="nome" header="Nome Técnico"></Column>
                    </DataTable>
                </div>
                <div className="card">
                <h5>Popup</h5>
                <div className="p-fluid grid formgrid">
                    <div className="field col-12 md:col-4">
                        <label htmlFor="basic">Basic</label>
                        <Calendar id="basic" />
                    </div>
                    <div className="field col-12 md:col-4">
                        <label htmlFor="icon">Icon</label>
                        <Calendar id="icon" showIcon />
                    </div>
                    <div className="field col-12 md:col-4">
                        <label htmlFor="spanish">Spanish</label>
                        <Calendar id="spanish"  dateFormat="dd/mm/yy" />
                    </div>
                    </div> </div>
            </div>
        );
}

export default connect(null, actionsPermissao)(Listar);