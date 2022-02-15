import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducersEmpresa from './reducersEmpresa';
import reducersPermissao from './reducersPermissao';
import reducersUsuario from './reducersUsuario';

const reducer = combineReducers({
    empresa: reducersEmpresa,
    permissao: reducersPermissao,
    usuario: reducersUsuario
});

const reducers = createStore(reducer, applyMiddleware(thunk));

export default reducers;