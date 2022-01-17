
import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ModalCarregando from '../../../components/ModalCarregando';

const Listar = () => {

    const [permissoes, setPermissoes] = useState([]);
    const [aguardando, setAguardando] = useState(false);

    const temporizador = async () => {
        await sleep(3000);

        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        }
        setAguardando(false);
    }

    useEffect(() => {
        setAguardando(true);
        //Teste
        temporizador();
        setPermissoes([
            {
                "id": 1,
                "nome": "CONSULTAR_USUARIOS_GRUPOS_PERMISSOES",
                "descricao": "Permite consultar usuários, grupos e permissões"
            },
            {
                "id": 2,
                "nome": "EDITAR_CIDADES",
                "descricao": "Permite criar ou editar cidades"
            },
            {
                "id": 3,
                "nome": "EDITAR_CLIENTES",
                "descricao": "Permite criar ou editar clientes"
            },
            {
                "id": 4,
                "nome": "EDITAR_EMPRESAS",
                "descricao": "Permite criar, editar ou gerenciar empresas"
            },
            {
                "id": 5,
                "nome": "EDITAR_ESTADOS",
                "descricao": "Permite criar ou editar estados"
            },
            {
                "id": 6,
                "nome": "EDITAR_FORMAS_PAGAMENTO",
                "descricao": "Permite criar ou editar formas de pagamento"
            },
            {
                "id": 7,
                "nome": "EDITAR_USUARIOS_GRUPOS_PERMISSOES",
                "descricao": "Permite criar ou editar usuários, grupos e permissões"
            },
            {
                "id": 8,
                "nome": "CONSULTAR_PEDIDOS",
                "descricao": "Permite consultar pedidos"
            },
            {
                "id": 9,
                "nome": "GERENCIAR_PEDIDOS",
                "descricao": "Permite gerenciar pedidos"
            },
            {
                "id": 10,
                "nome": "GERENCIAR_HOSTS",
                "descricao": "Permite gerenciar e configurar o servidor"
            }
        ]);

    }, [])

    if (aguardando)
        return <ModalCarregando aguardando={aguardando} pagina="Listando as permissões do sistema." />
    else
        return (
            <div>
                <div className="card">
                    <DataTable value={permissoes} responsiveLayout="scroll">
                        <Column field="id" header="Código"></Column>
                        <Column field="descricao" header="Descricao"></Column>
                        <Column field="nome" header="Nome Técnico"></Column>
                    </DataTable>
                </div>
            </div>
        );

}

export default Listar;