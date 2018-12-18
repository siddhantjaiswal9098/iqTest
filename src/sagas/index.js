import { ApiCallForTest2, SaveResult2,ApiCallForAllTests} from './apiCallSaga';
import { put, takeLatest, all, takeEvery } from 'redux-saga/effects';
function* rootSaga() {
	yield takeLatest('API_REST',ApiCallForTest2)
	yield takeLatest('SAVE_RESULT_ACTION',SaveResult2)
	yield takeLatest('API_RES_ALL',ApiCallForAllTests)
	
}
export default rootSaga;