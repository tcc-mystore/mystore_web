import React from 'react';
import UnauthenticatedChildren from './children';
import { connect } from 'react-redux';
import * as actionsUsuario from '../../../domain/actions/actionsUsuario';
import { Redirect } from 'react-router-dom';

const ContainerAuthenticated = Component => {
    
    class ComponentAuthenticated extends React.Component {

        state = { erro: false }

        componentDidMount() {
            const { authorized, getPerfil } = this.props;
            getPerfil((err) => {
                this.setState({ erro: true })
            });
            if (authorized) return;
        }

        componentDidUpdate(nextProps) {
            const { history, authorized } = this.props;
            if (authorized)
                return history.replace("/mystore/pagina-inicial");
        }

        render() {
            return (
                <>
                    {
                        this.state.erro
                            ?
                            <Redirect to="/mystore/pagina-inexistente" />
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
        usuario: state.usuario.usuarioLogado
    });

    return connect(mapStateToProps, actionsUsuario)(ComponentAuthenticated);
}

export default ContainerAuthenticated;