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