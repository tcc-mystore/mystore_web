import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import * as  actionsUsuario from '../../../domain/actions/actionsUsuario';
import BarraDeFerramentas from '../../../views/components/BarraDeFerramentas';
import BarraDeMenu from '../../../views/components/BarraDeMenu';
import './index.css';

const AuthenticatedChildren = (props) => {
    const [menuAberto, setMenuAberto] = useState(true);

    return (
        <>
            <BarraDeFerramentas handleLogout={props.handleLogout} dadosUsuario={props.children} alternarMenu={() => setMenuAberto(!menuAberto)} />
            <div className="d-flex">
                <BarraDeMenu handleLogout={props.handleLogout} ativo={menuAberto} />
                <div className="content p-1">
                    <div className="list-group-item">
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    );
}

export default connect(null, actionsUsuario)(AuthenticatedChildren);
