import {
  takeLatest,
} from 'redux-saga/effects';
import {
  ApiCallForTest2,
  SaveResult2,
  ApiCallForAllTests,
  apiCallForSignUp,
  apiCallForSignIn,
  navigateSaga,
  signOutClick,
  resultSaveApiCall,
  resultApiCallAll,
  ApiCallDeleteResult
} from './apiCallSaga';

function* rootSaga() {
  yield takeLatest('API_REST', ApiCallForTest2);
  yield takeLatest('SAVE_RESULT_ACTION', SaveResult2);
  yield takeLatest('API_RES_ALL', ApiCallForAllTests);
  yield takeLatest('SAVE_DATA', apiCallForSignUp);
  yield takeLatest('LOGIN', apiCallForSignIn);
  yield takeLatest('NAVIGATE_TO_CHAT_SAGA', navigateSaga);
  yield takeLatest('SIGN_OUT_SAGA', signOutClick);
  yield takeLatest('SAVE_RESULT_API', resultSaveApiCall);
  yield takeLatest('SAVE_RESULT_API_ALL', resultApiCallAll);
  yield takeLatest('DELETE_SINGLE_RESULT_API', ApiCallDeleteResult);
  
}
export default rootSaga;
