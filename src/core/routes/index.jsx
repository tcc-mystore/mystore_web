import React from 'react';
import { BrowserRouter, Switch, Route, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store';
import { history } from '../history';
import Unauthenticated from '../containers/unauthenticated';
import Login from '../../views/pages/usuario/Login';

const Routes = () => {
    return (
        <Provider store={store}>
            <Router history={history}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact component={Unauthenticated(Login)} />
                    </Switch>
                </BrowserRouter>
            </Router>
        </Provider>
    );
}

export default Routes;