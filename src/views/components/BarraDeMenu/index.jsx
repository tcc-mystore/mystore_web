import React, { useRef } from 'react';
import { Menu } from 'primereact/menu';
import { Toast } from 'primereact/toast';

const BarraDeMenu = () => {
    const toast = useRef(null);
    const items = [
        {
            label: 'Painel de Controle',
            items: [
                {
                    label: 'Usuário',
                    icon: 'pi pi-users',
                    command: () => {
                        toast.current.show({ severity: 'success', summary: 'Usuários', detail: 'Tela de gerenciamento de usuários!', life: 3000 });
                    }
                },
                {
                    label: 'Permissões',
                    icon: 'pi pi-lock',
                    command: () => {
                        toast.current.show({ severity: 'warn', summary: 'Permissões', detail: 'Visualizar as permissões disponíveis no sistema!', life: 3000 });
                    }
                }
            ]
        },
    ];

    return (
        <div>
            <Toast ref={toast}></Toast>
            <div className="card">
                <Menu model={items} />
            </div>
        </div>
    );
}

export default BarraDeMenu;