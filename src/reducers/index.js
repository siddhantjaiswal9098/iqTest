import { combineReducers } from 'redux';
import ReducerSignup from './ReducerSignup';
import ReducerMenu from './ReducerMenu';
import ReducerSpinner from './ReducerSpinner';
import ReducerSettings from './ReducerSettings';

const reducer = combineReducers({
  ReducerSignup,
  ReducerMenu,
  ReducerSpinner,
  ReducerSettings
});
export default reducer;
