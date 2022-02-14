import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useSelector } from 'react-redux';
import iconeUsuario from '../../../assets/images/icone_usuario.png';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import './index.css';

const BarraDeFerramentas = ({ handleLogout, alternarMenu }) => {
    const {perfilUsuario} = useSelector((state)=>state.usuario)
    const [primeiroNome, setPrimeiroNome] = useState('Usuário');
    const [icone, setIcone] = useState(iconeUsuario);
    
    useEffect(()=>{
        if(perfilUsuario){
            setPrimeiroNome(perfilUsuario.nome);
            if(perfilUsuario.url){
                setIcone(perfilUsuario.url);
            }
        }
        // eslint-disable-next-line 
    },[]);

    return (
        <>
            <Navbar color="success navbar-dark" light expand="md">
                <span className="navbar-toggler-icon cursor mr-1" onClick={() => alternarMenu()}></span>
                <Link className="navbar-brand" to="/mystore/pagina-inicial">MyStore</Link>
                <Nav className="ml-auto logo-barra-de-ferramentas" navbar>
                    <NavItem className="mr-1">
                        <img
                            className="rounded-circle mt-2"
                            src={icone}
                            width="20" height="20" alt="Usuario" />
                    </NavItem>
                    <UncontrolledDropdown setActiveFromChild>
                        <DropdownToggle tag="a" className="nav-link menu-header cursor" caret>
                            {primeiroNome}
                        </DropdownToggle>
                        <DropdownMenu end>
                            <DropdownItem onClick={() => handleLogout()}><MeetingRoomIcon /> Sair</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </Navbar>
        </>
    );
}

export default BarraDeFerramentas;