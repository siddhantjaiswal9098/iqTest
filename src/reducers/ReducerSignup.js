/* eslint-disable no-undef */

const initialstate = {
  data: [],
  dataApiTest: {},
  resultData: {},
  userAnswer: {},
  AllTestDetail: [],
};
export default ReducerSignup = (state = initialstate, action) => {
  switch (action.type) {
    case 'SAVE':
      return {
        ...state,
        data: action.data,
      };
    case 'API_RES':
      return {
        ...state,
        dataApiTest: action.dataApiTest,
      };
    case 'SAVE_RESULT':
      return {
        ...state,
        answerKey: action.answerKey,
        userAnswer: action.userAnswer
      };
    case 'API_RES_ALL_TEST':
      return {
        ...state,
        AllTestDetail: action.AllTestDetail
      };
    case 'persist/REHYDRATE':
      if (action && action.payload && action.payload.ReducerSignup) {
        // console.log('action payload::::', action.payload.ReducerSignup);

        state = action.payload.ReducerSignup;
      }
      return {
        ...state,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        data: [],
        dataApiTest: {},
        resultData: {},
        userAnswer: {},
        AllTestDetail: []
      };
    case 'LOGIN':
      return {
        ...state,
      };
    default:
      return {
        ...state
      };
  }
};
