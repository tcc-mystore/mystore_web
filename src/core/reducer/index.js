import { combineReducers } from 'redux';
import reducersAplicacao from '../../domain/reducers/reducersAplicacao';
import reducersPermissao from '../../domain/reducers/reducersPermissao';
import reducersUsuario from '../../domain/reducers/reducersUsuario';

const reducer = combineReducers({
    aplicacao: reducersAplicacao,
    permissao: reducersPermissao,
    usuario: reducersUsuario
});

export default reducer;