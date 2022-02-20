import React from 'react';
import UnauthenticatedChildren from './children';
import { connect } from 'react-redux';
import * as actionsUsuario from '../../../domain/actions/actionsUsuario';
import { Redirect } from 'react-router-dom';

const ContainerAuthenticated = Component => {

    class ComponentAuthenticated extends React.Component {

        state = { erro: false }

        componentDidMount() {
            const { authorized } = this.props;
            if (authorized) this.setState({ erro: true });
        }

        componentDidUpdate(nextProps) {
            const { history, authorized } = this.props;
            if (authorized) return history.replace("/mystore/pagina-inicial");
        }

        render() {
            return (
                <>
                    {
                        this.state.erro
                            ?
                            <Redirect to={{
                                pathname: "/mystore/"
                            }} />
                            :
                            <UnauthenticatedChildren>
                                <Component {...this.props} />
                            </UnauthenticatedChildren>
                    }
                </>
            );
        }
    }

    const mapStateToProps = state => ({
        authorized: state.usuario.authorized,
        usuarioLogado: state.usuario.usuarioLogado
    });

    return connect(mapStateToProps, actionsUsuario)(ComponentAuthenticated);
}

export default ContainerAuthenticated;