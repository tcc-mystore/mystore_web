import React from 'react';
import AuthenticatedChildren from './children';
import { connect } from 'react-redux';
import * as actionsSpc from '../../../domain/actions/actionsSpc';


const ContainerAuthenticated = Component => {
    class ComponenteAuthenticated extends React.Component {
        render() {
            return (
                <AuthenticatedChildren>
                    <Component {...this.props} />
                </AuthenticatedChildren>
            );
        }
    }

    return connect(null, actionsSpc)(ComponenteAuthenticated);
}

export default ContainerAuthenticated;