import { combineReducers } from 'redux';
import ReducerSignup from './ReducerSignup';
import ReducerMenu from './ReducerMenu';
import ReducerSpinner from './ReducerSpinner';
import ReducerSettings from './ReducerSettings';
import ReducerResult from './ReducerResult';

const reducer = combineReducers({
  ReducerSignup,
  ReducerMenu,
  ReducerSpinner,
  ReducerSettings,
  ReducerResult
});
export default reducer;
