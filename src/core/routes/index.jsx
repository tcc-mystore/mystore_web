import React from 'react';
import { BrowserRouter, Redirect, Route, Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store';
import { history } from '../history';
import Unauthenticated from '../containers/unauthenticated';
import Authenticated from '../containers/authenticated';
import Login from '../../views/pages/usuario/Login';
import CriarConta from '../../views/pages/usuario/CriarConta';
import RecuperarSenha from '../../views/pages/usuario/RecuperarSenha';
import PaginaInexistente from '../../views/pages/mystore/PaginaInexistente';
import PaginaInicial from '../../views/pages/mystore/PaginaInicial';

const Routes = () => {
    return (
        <Provider store={store}>
            <Router history={history}>
                <BrowserRouter>
                    <Switch>
                         {/* Páginas sem autenticação */}
                        <Route path="/mystore/" exact component={Unauthenticated(Login)} />
                        <Route path="/mystore/criar-conta" exact component={Unauthenticated(CriarConta)} />
                        <Route path="/mystore/recuperar-senha" exact component={Unauthenticated(RecuperarSenha)} />
                        {/* Páginas com autenticação */}
                        <Route path="/mystore/pagina-inicial" exact component={Authenticated(PaginaInicial)} />
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