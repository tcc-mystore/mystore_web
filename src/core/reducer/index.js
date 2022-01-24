import { combineReducers } from 'redux';
import reducersAplicacao from '../../domain/reducers/reducersAplicacao';
import reducersUsuario from '../../domain/reducers/reducersUsuario';

const reducer = combineReducers({
    usuario: reducersUsuario,
    aplicacao: reducersAplicacao
});

export default reducer;