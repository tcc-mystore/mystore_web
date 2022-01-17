import React, { useRef, useState } from 'react';
import { Menu } from 'primereact/menu';
import { Toast } from 'primereact/toast';
import { Redirect } from 'react-router-dom';

const BarraDeMenu = () => {
    const toast = useRef(null);
    const [irPara, setIrPara] = useState(null);
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
                        setIrPara(`listar-permissoes`);
                    }
                }
            ]
        },
    ];

    if (irPara) {
        return <Redirect to={{ pathname: `/mystore/${irPara}` }} />
    } else {
        return (
            <>
                <div>
                    <Toast ref={toast}></Toast>
                    <div className="card">
                        <Menu model={items} />
                    </div>
                </div>
            </>
        );
    }

}

export default BarraDeMenu;