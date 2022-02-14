import { combineReducers } from 'redux';
import reducersPermissao from '../../domain/reducers/reducersPermissao';
import reducersUsuario from '../../domain/reducers/reducersUsuario';

const reducer = combineReducers({
    permissao: reducersPermissao,
    usuario: reducersUsuario
});

export default reducer;