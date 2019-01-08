import { put, call } from 'redux-saga/effects';
import { stopSpinner, startSpinner } from '../actions/commonAction.js';

export function* ApiCallForTest2(action) {
  try {
    yield put(startSpinner());
    // var URL = `http://localhost:3000/data`
    // const response = yield call(fetch, URL);
    // dataApiTest = response._bodyText;
    // console.log("$$$$$$!!!!!",dataApiTest);
    // console.log("$$$$$$£££££",JSON.parse(response2._bodyText))
    const URL2 = `https://nameless-plateau-14252.herokuapp.com/tests/${action.id}/questions`;
    // var URL2 =`http://0d8d8459.ngrok.io/tests/1/questions`
    const response2 = yield call(fetch, URL2);
    const dataApiTest = JSON.parse(response2._bodyText);
    yield put(stopSpinner());
    // console.log("$$$$$$£££££",dataApiTest);
    yield put({ type: 'API_RES', dataApiTest });
  } catch (e) {
    // yield put({type: 'API_REST'})
    yield put(stopSpinner());
    console.log('responseERR', e);
  }
}
export function* ApiCallForAllTests() {
  try {
    // yield put(startSpinner());
    const URL2 = 'https://nameless-plateau-14252.herokuapp.com/tests';
    const response2 = yield call(fetch, URL2);
    const AllTestDetail = yield response2.json();
    console.log('API_RES_ALL_TEST_DETAIL', AllTestDetail);
    // yield put(stopSpinner());
    yield put({ type: 'API_RES_ALL_TEST', AllTestDetail });
  } catch (e) {
    ApiCallForAllTests();
    console.log('responseERR', e);
  }
}
export function* SaveResult2(action) {
  yield put({ type: 'SAVE_RESULT', answerKey: action.answerKey, userAnswer: action.userAnswer });
}
export function* navigateSaga(action) {
  yield put({ type: 'NAVIGATE_TO_CHAT', action });
}


export function* apiCallForSignUp(action) {
//   data = {
//     'user':{
//     'email': action.data.email,
//     'password': action.data.password,
//    // name:  action.data.name,
//     'password_confirmation': action.data.password
//     }
//   }
//  console.log("inside SignUpSaveAPI^^^^^^^", data);

//   var UrlForSignUp = `https://6a8a3545.ngrok.io/users`
//   const response2 = fetch(UrlForSignUp, {
//     method: "POST",
//     headers: {
//      'Authorization': 'yeCdacz7t3yy9cyyXHaCdrbZDZJjAZfkLYJTWsfzO63P9QPPqOI6lOhZTSmlpl+MXvUfHYZmdHqU4+ZK07w4rA==',
//     },
//     body: JSON.stringify(data),
//   })
//     .then(
//       response => console.log('SUCCESS%%%',response)
//       ).catch((err)=>{
//       console.log("Error%%%",err)
//     });
//     console.log("%%%",response2)
}

export function* apiCallForSignIn(action) {

  // console.log("inside loginAPI^^^^^^^", action.data);
  // var dataSignIn = { email: 'twinkle@yopmail.com', password: 'pass123' }
  // var UrlForSignUp = `https://6ba45f8f.ngrok.io/users/sign_in`
  // const response2 = fetch(UrlForSignUp, {
  //   method: "POST",
  //   header: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(dataSignIn), // body data type must match "Content-Type" header
  // })
  //   .then(
  //     response => console.log('SUCCESS%%%',response.json())
  //     ).catch((err)=>{
  //     console.log("Error%%%",err)
  //   });
  //   console.log("%%%",response2)
}
