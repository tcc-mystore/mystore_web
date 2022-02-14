import React from 'react';
import AuthenticatedChildren from './children';
import { connect } from 'react-redux';
import * as actionsUsuario from '../../../domain/actions/actionsUsuario';

const ContainerAuthenticated = Component => {

    class ComponentAuthenticated extends React.Component {

        componentDidMount() {
            const { authorized, getPerfil, history } = this.props;
            getPerfil((err)=>{});
            if (!authorized) {
                return history.replace("/mystore/");
            }
        }

        componentDidUpdate(nextProps) {
            const { authorized, history } = this.props;

            if (!nextProps.authorized || !authorized) {
                return history.replace("/mystore/");
            }
        }

        render() {
            return (
                <AuthenticatedChildren>
                    <Component {...this.props} />
                </AuthenticatedChildren>
            );
        }
    }

    const mapStateToProps = state => ({
        authorized: state.usuario.authorized,
        usuario: state.usuario.usuarioLogado
    });

    return connect(mapStateToProps, actionsUsuario)(ComponentAuthenticated);
}

export default ContainerAuthenticated;