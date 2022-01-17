
import React, { useRef, useState } from 'react';
import { Menubar } from 'primereact/menubar';
import logo from '../../../assets/images/logo.png'
import { Button } from 'primereact/button';
import { TieredMenu } from 'primereact/tieredmenu';
import { Avatar } from 'primereact/avatar';
import { Link, Redirect } from 'react-router-dom';

const BarraDeFerramentas = ({ handleLogout, dadosUsuario }) => {
    const [irPara, setIrPara] = useState(null);
    const menu = useRef(null);
    const items = [
        {
            label: 'Meus Dados',
            icon: 'pi pi-fw pi-book',
            command: () => perfil()
        },
        {
            label: 'Sair',
            icon: 'pi pi-fw pi-power-off',
            command: () => handleLogout()
        }
    ];

    const perfil = () => {
        return <Link to='/mystore/usuario/perfil' />
    }

    if (irPara) {
        return <Redirect to={{ pathname: `/mystore/${irPara}` }} />
    } else {
        return (
            <>
                {console.log('dadosUsuario')}
                {console.log(dadosUsuario)}
                <div>
                    <div className="card">
                        <TieredMenu model={items} popup ref={menu} id="overlay_tmenu" />
                        <Menubar
                            start={
                                <Avatar className="p-overlay-badge" image={logo} size="xlarge" onClick={() => setIrPara(`pagina-inicial`)} />
                            }
                            end={<Button label={dadosUsuario ? dadosUsuario.nome_completo : "Usuário"} icon="pi pi-bars" onClick={(event) => menu.current.toggle(event)}
                                aria-haspopup aria-controls="overlay_tmenu" />}
                        />
                    </div>
                </div>
            </>
        );
    }

}

export default BarraDeFerramentas;