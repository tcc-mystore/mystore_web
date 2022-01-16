import React from 'react';
import BarraDeFerramentas from '../../../views/components/BarraDeFerramentas';
import BarraDeMenu from '../../../views/components/BarraDeMenu';
import { connect } from 'react-redux';
import * as  actionsUsuario from '../../../domain/actions/actionsUsuario';

const AuthenticatedChildren = (props) => {

    return (
        <>
        {console.log(props)}
            <div className="p-grid">
                <div className="p-col-12">
                    <BarraDeFerramentas handleLogout={props.children.props.handleLogout} dadosUsuario={props.children.props.usuario}/>
                </div>
                <div className="p-col-3">
                    <BarraDeMenu />
                </div>
                <div className="p-col-9">
                    <main>
                        {props.children}
                    </main>
                </div>
                <div className="p-col-12">12</div>
            </div>
        </>
    );
}

export default connect(null, actionsUsuario)(AuthenticatedChildren);
