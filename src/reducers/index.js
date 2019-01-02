import ReducerSignup from '../reducers/ReducerSignup';
import { combineReducers } from 'redux';
import ReducerMenu from './ReducerMenu'
import ReducerSpinner from './ReducerSpinner'
import ReducerSettings from './ReducerSettings.js'
const reducer = combineReducers({
    ReducerSignup,
    ReducerMenu,
    ReducerSpinner,
    ReducerSettings
})
export default reducer;