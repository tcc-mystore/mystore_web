import React from 'react';
import { BrowserRouter, Switch, Route, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store';
import { history } from '../history';
import Unauthenticated from '../containers/unauthenticated';
import Login from '../../views/pages/usuario/Login';
import CriarConta from '../../views/pages/usuario/CriarConta';
import RecuperarSenha from '../../views/pages/usuario/RecuperarSenha';

const Routes = () => {
    return (
        <Provider store={store}>
            <Router history={history}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact component={Unauthenticated(Login)} />
                        <Route path="/criar-conta" exact component={Unauthenticated(CriarConta)} />
                        <Route path="/recuperar-senha" exact component={Unauthenticated(RecuperarSenha)} />
                    </Switch>
                </BrowserRouter>
            </Router>
        </Provider>
    );
}

export default Routes;