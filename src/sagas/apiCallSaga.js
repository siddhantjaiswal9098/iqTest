/* eslint-disable quote-props */
import { put, call } from 'redux-saga/effects';
// import Toast from 'react-native-simple-toast';
import Toast from 'react-native-root-toast';
import { stopSpinner, startSpinner } from '../actions/commonAction';
import FinRealmService from '../realm/realm';

const _frealm = new FinRealmService();

export function* ApiCallForTest2(action) {
  try {
    yield put(startSpinner());
    const URL2 = `https://nameless-plateau-14252.herokuapp.com/tests/${action.id}/questions`;
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
  try {
    yield put(startSpinner());
    const dataUser = {
      'user': {
        'email': action.data.email,
        'password': action.data.password,
        'name': action.data.name,
        'lname': action.data.lname
      }
    };
    const url = 'https://nameless-plateau-14252.herokuapp.com/users';
    const postRequest = yield call(fetch, url, {
      method: 'POST',
      body: JSON.stringify(dataUser),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let AllTestDetail = postRequest;
    if (postRequest.status === 200) {
      AllTestDetail = yield postRequest.json();
    }
    console.log('signUp res:', AllTestDetail);
    console.log('inside SignUpSaveAPI^^^^^^^', JSON.stringify(action.data));
    const data = action.data;
    if (AllTestDetail && AllTestDetail.status === 'ok') {
      yield put({ type: 'SAVE_SIGNUP', data });
      Toast.show('Account created successfully');
    } else {
      Toast.show(AllTestDetail.status);
      console.log('Something went wrong.', AllTestDetail.status);
    }
    yield put(stopSpinner());
  } catch (err) {
    console.log('ERROR', err);
  }
}

export function* apiCallForSignIn(action) {
  try {
    yield put(startSpinner());
    console.log('inside loginAPI^^^^^^^', action.data);
    const dataSignIn = {
      'session': {
        'email': action.data.email,
        'password': action.data.password
      }
    };
    const UrlForSignUp = 'https://nameless-plateau-14252.herokuapp.com/login';
    const postRequest = yield call(fetch, UrlForSignUp, {
      method: 'POST',
      body: JSON.stringify(dataSignIn),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const AllTestDetail = yield postRequest.json();
    console.log('signIn res:', postRequest, AllTestDetail);
    console.log('inside SignInSaveAPI^^^^^^^', JSON.stringify(action.data));
    // const data = action.data;
    if (AllTestDetail && AllTestDetail.status === 'ok') {
      const data = AllTestDetail.user;
      console.log('klklklkl', data, action.data);
      yield put({ type: 'SAVE', data });
    } else {
      Toast.show(AllTestDetail.message);
      console.log('Something went wrong.', AllTestDetail.message);
    }
    yield put(stopSpinner());
  } catch (err) {
    console.log('ERROR', err);
  }
}

export function* signOutClick(action) {
  try {
    yield put(startSpinner());
    const UrlForSignUp = `https://nameless-plateau-14252.herokuapp.com/logout/${action.Uid}`;
    const postRequest = yield call(fetch, UrlForSignUp, {
      method: 'DELETE'
    });
    const AllTestDetail = yield postRequest.json();
    console.log('signOut res:', AllTestDetail);
    if (AllTestDetail && AllTestDetail.status === 'ok') {
      yield put({ type: 'SIGN_OUT' });
    } else {
      Toast.show(AllTestDetail.message);
      console.log('Something went wrong.', AllTestDetail.message);
    }
    yield put(stopSpinner());
  } catch (err) {
    console.log('ERROR', err);
  }
}

export function* resultSaveApiCall(action) {
  try {
    // yield put(startSpinner());
    console.log('inside resultasdasdasdasd^^^^^^^', action.data);
    const result = action.data.testRes;
    const UrlForSignUp = `https://nameless-plateau-14252.herokuapp.com/users/${action.data.id}/results`;
    console.log('action', result, action.data);
    const postRequest = yield call(fetch, UrlForSignUp, {
      method: 'POST',
      body: JSON.stringify(result),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const AllTestDetail = yield postRequest.json();
    console.log('RESULT RESdasdasd:-', AllTestDetail);
    console.log('inside RESULT RES APIdasdasdas^^^^^^^', JSON.stringify(action.data));
    if (AllTestDetail && AllTestDetail.status === 'ok') {
      const PassedResultVal2 = {
        percentage: AllTestDetail.result.percentage,
        TestId: AllTestDetail.result.test_id,
        date: AllTestDetail.result.date,
        TestUniqueId: AllTestDetail.result.id
      };
      _frealm.Createrealm(PassedResultVal2);
    } else {
      Toast.show(AllTestDetail.message);
      console.log('Something went wrong.', AllTestDetail.message);
    }
    // yield put(stopSpinner());
  } catch (err) {
    console.log('ERROR', err);
  }
}

export function* resultApiCallAll(action) {
  try {
    console.log('inside All result Call^^^^^^^', action.data);
    const UrlForSignUp = `https://nameless-plateau-14252.herokuapp.com/users/${action.data}/results`;
    const postRequest = yield call(fetch, UrlForSignUp);
    const AllTestDetail = yield postRequest.json();
    console.log('ALLRESULT RES:-', AllTestDetail);
    // console.log('inside ALLRESULT RES API^^^^^^^', JSON.stringify(action.data));
    if (AllTestDetail && AllTestDetail.status === 'ok') {
      _frealm.deleteAll();
      _frealm.CreaterealmAllResult(AllTestDetail);
    } else {
      Toast.show(AllTestDetail.message);
      console.log('Something went wrong.', AllTestDetail.message);
    }
  } catch (err) {
    console.log('ERROR', err);
  }
}

export function* ApiCallDeleteResult(action) {
  console.log('this is the value at', action.data);
  try {
    console.log('inside result Delete Call^^^^^^^', action.data.UserId, action.data.testId);
    const UrlForSignUp = `https://nameless-plateau-14252.herokuapp.com/users/${action.data.UserId}/results/${action.data.testId}`;
    const postRequest = yield call(fetch, UrlForSignUp, {
      method: 'DELETE'
    });
    const AllTestDetail = yield postRequest.json();
    console.log('RESULT DEL RES:-', postRequest, AllTestDetail);
    console.log('inside RESULT DEL RES API^^^^^^^', JSON.stringify(action.data));
    if (AllTestDetail && AllTestDetail.status === 'ok') {
      // _frealm.deleteById(action.data.testId);
      // _frealm.CreaterealmAllResult(AllTestDetail);
      const data = action.data.UserId;
      console.log('Data ki value', data);
      yield put({ type: 'SAVE_RESULT_API_ALL', data });
      console.log('Hell yeahh');
    } else {
      Toast.show(AllTestDetail.message);
      console.log('Something went wrong.', AllTestDetail.message);
    }
  } catch (err) {
    console.log('ERROR', err);
  }
}
