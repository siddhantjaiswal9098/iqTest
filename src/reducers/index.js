import ReducerSignup from '../reducers/ReducerSignup';
import { combineReducers } from 'redux';
import ReducerMenu from './ReducerMenu'
const reducer = combineReducers({
    ReducerSignup,
    ReducerMenu,
})
export default reducer;