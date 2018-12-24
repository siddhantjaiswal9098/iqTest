import { put, call } from 'redux-saga/effects'
import { stopSpinner, startSpinner } from './../actions/commonAction.js'
export function* ApiCallForTest2(action) {
  try {
    yield put(startSpinner());
    //var URL = `http://localhost:3000/data`
    //const response = yield call(fetch, URL);
    // dataApiTest = response._bodyText;
    //console.log("$$$$$$!!!!!",dataApiTest);
    //console.log("$$$$$$£££££",JSON.parse(response2._bodyText))
    var URL2 = `https://nameless-plateau-14252.herokuapp.com/tests/${action.id}/questions`
    //var URL2 =`http://0d8d8459.ngrok.io/tests/1/questions`
    const response2 = yield call(fetch, URL2);
    const dataApiTest = JSON.parse(response2._bodyText)
    yield put(stopSpinner());
    // console.log("$$$$$$£££££",dataApiTest);
    yield put({ type: 'API_RES', dataApiTest });
  }
  catch (e) {
    // yield put({type: 'API_REST'})
    yield put(stopSpinner());
    console.log("responseERR", e);
  }
}
export function* ApiCallForAllTests() {
  try {
   // yield put(startSpinner());
    var URL2 = `https://nameless-plateau-14252.herokuapp.com/tests`
    const response2 = yield call(fetch, URL2);
    var AllTestDetail = yield response2.json()
    console.log("API_RES_ALL_TEST_DETAIL",AllTestDetail)
   // yield put(stopSpinner());
    yield put({ type: 'API_RES_ALL_TEST', AllTestDetail});
  }
  catch (e) {
    ApiCallForAllTests()
    console.log("responseERR", e);
  }
}
export function* SaveResult2(action) {
  yield put({ type: 'SAVE_RESULT', answerKey: action.answerKey, userAnswer: action.userAnswer });
}
