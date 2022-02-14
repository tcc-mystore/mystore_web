import React from 'react';
import { Link } from 'react-router-dom';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

const BarraDeMenu = ({ handleLogout, ativo }) => {
    return (
        <>
            <nav className={ativo ? "sidebar bg-secondary" : "sidebar bg-secondary toggled"}>
                <ul className="list-unstyled">
                    <li><Link to="/mystore/listar-permissoes"><SupervisedUserCircleIcon /> Permissões</Link></li>
                    <li><Link to="#" onClick={() => handleLogout()}><MeetingRoomIcon /> Sair</Link></li>
                </ul>
            </nav>

        </>
    );
}

export default BarraDeMenu;