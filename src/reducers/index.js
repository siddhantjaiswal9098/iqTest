import ReducerSignup from '../reducers/ReducerSignup';
import { combineReducers } from 'redux';
import ReducerMenu from './ReducerMenu'
import ReducerSpinner from './ReducerSpinner'
const reducer = combineReducers({
    ReducerSignup,
    ReducerMenu,
    ReducerSpinner
})
export default reducer;