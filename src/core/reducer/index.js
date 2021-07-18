import { combineReducers } from 'redux';
import reducersUsuario from '../../domain/reducers/reducersUsuario';

const reducer = combineReducers({
    usuario: reducersUsuario
});

export default reducer;