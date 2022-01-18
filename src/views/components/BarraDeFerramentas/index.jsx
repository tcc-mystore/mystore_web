
import React, { useRef } from 'react';
import { Menubar } from 'primereact/menubar';
import logo from '../../../assets/images/logo.png'
import { Button } from 'primereact/button';
import { TieredMenu } from 'primereact/tieredmenu';
import { Avatar } from 'primereact/avatar';
import { Link } from 'react-router-dom';

const BarraDeFerramentas = ({ handleLogout, dadosUsuario }) => {
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

    return (
        <>
            {console.log('dadosUsuario')}
            {console.log(dadosUsuario)}
            <div>
                <div className="card">
                    <TieredMenu model={items} popup ref={menu} id="overlay_tmenu" />
                    <Menubar
                        start={
                            <Link to='/mystore/pagina-inicial' ><Avatar className="p-overlay-badge" image={logo} size="xlarge" /></Link>
                        }
                        end={<Button label={dadosUsuario ? dadosUsuario.nome_completo : "Usuário"} icon="pi pi-bars" onClick={(event) => menu.current.toggle(event)}
                            aria-haspopup aria-controls="overlay_tmenu" />}
                    />
                </div>
            </div>
        </>
    );
}

export default BarraDeFerramentas;