import { combineReducers } from 'redux';
import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducersPermissao from './reducersPermissao';
import reducersUsuario from './reducersUsuario';

const reducer = combineReducers({
    permissao: reducersPermissao,
    usuario: reducersUsuario
});

const reducers = createStore( reducer, applyMiddleware(thunk));

export default reducers;