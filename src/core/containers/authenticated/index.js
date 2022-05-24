import React from 'react';
import AuthenticatedChildren from './children';
import { connect } from 'react-redux';
import * as actionsUsuario from '../../../domain/actions/actionsUsuario';
import { Redirect } from 'react-router-dom';

const ContainerAuthenticated = Component => {

    class ComponentAuthenticated extends React.Component {

        state = { erro: false }

        componentDidMount() {
            const { authorized, getPerfil } = this.props;

            getPerfil(() => {
                if (!authorized)
                    this.setState({ erro: true });
            });
        }

        componentDidUpdate(nextProps) {
            const { authorized } = this.props;

            if (!nextProps.authorized || !authorized)
                this.setState({ erro: true });
        }

        render() {
            return (
                <>
                    {
                        this.state.erro
                            ?
                            <Redirect to={{
                                pathname: "/mystore/",
                                state: { alerta: "warning", mensagem: "Usuário não possui permissão para essa solicitação!" }
                            }} />
                            :
                            <AuthenticatedChildren>
                                <Component {...this.props} />
                            </AuthenticatedChildren>
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