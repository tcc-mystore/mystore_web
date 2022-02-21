import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducersCidade from './reducersCidade';
import reducersEmpresa from './reducersEmpresa';
import reducersEstado from './reducersEstado';
import reducersMyStore from './reducersMyStore';
import reducersPermissao from './reducersPermissao';
import reducersUsuario from './reducersUsuario';

const reducer = combineReducers({
    cidade: reducersCidade,
    empresa: reducersEmpresa,
    estado: reducersEstado,
    mystore: reducersMyStore,
    permissao: reducersPermissao,
    usuario: reducersUsuario
});

const reducers = createStore(reducer, applyMiddleware(thunk));

export default reducers;