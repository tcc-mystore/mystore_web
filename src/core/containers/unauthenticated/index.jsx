import React from 'react';
import UnauthenticatedChildren from './children';
import { connect } from 'react-redux';
import * as actionsUsuario from '../../../domain/actions/actionsUsuario';


const ContainerAuthenticated = Component => {
    class ComponenteAuthenticated extends React.Component {
        render() {
            return (
                <UnauthenticatedChildren>
                    <Component {...this.props} />
                </UnauthenticatedChildren>
            );
        }
    }

    return connect(null, actionsUsuario)(ComponenteAuthenticated);
}

export default ContainerAuthenticated;