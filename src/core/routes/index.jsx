import React from 'react';
import { BrowserRouter, Redirect, Route, Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import store from '../../domain/reducers';
import Unauthenticated from '../containers/unauthenticated';
import Authenticated from '../containers/authenticated';
import Login from '../../views/pages/usuario/Login';
import ValidarConta from '../../views/pages/usuario/ValidarConta';
import RecuperarSenha from '../../views/pages/usuario/RecuperarSenha';
import PaginaInexistente from '../../views/pages/mystore/PaginaInexistente';
import PaginaInicial from '../../views/pages/mystore/PaginaInicial';
import ListarPermissoes from '../../views/pages/permissao/Listar';
import ListarEmpresas from '../../views/pages/empresa/Listar';
import VisualizarEmpresas from '../../views/pages/empresa/Visualizar';
import AlterarEmpresas from '../../views/pages/empresa/Alterar';

const history = createBrowserHistory();

const Routes = () => {
    return (
        <Provider store={store}>
            <Router history={history}>
                <BrowserRouter>
                    <Switch>
                         {/* Páginas sem autenticação */}
                        <Route path="/mystore/" exact component={Unauthenticated(Login)} />
                        <Route path="/mystore/validar-conta" exact component={Unauthenticated(ValidarConta)} />
                        <Route path="/mystore/recuperar-senha" exact component={Unauthenticated(RecuperarSenha)} />
                        {/* Páginas com autenticação */}
                        <Route path="/mystore/pagina-inicial" exact component={Authenticated(PaginaInicial)} />
                        <Route path="/mystore/listar-permissoes" exact component={Authenticated(ListarPermissoes)} />
                        <Route path="/mystore/listar-empresas" exact component={Authenticated(ListarEmpresas)} />
                        <Route path="/mystore/visualizar-empresa/:id" exact component={Authenticated(VisualizarEmpresas)} />
                        <Route path="/mystore/alterar-empresa/:id" exact component={Authenticated(AlterarEmpresas)} />
                        {/* Qualquer página que não esteja dentro das rotas especificadas */}
                        <Route path="/mystore/pagina-inexistente" exact component={PaginaInexistente} />
                        <Redirect from="*" to="/mystore/pagina-inexistente" />
                    </Switch>
                </BrowserRouter>
            </Router>
        </Provider>
    );
}

export default Routes;