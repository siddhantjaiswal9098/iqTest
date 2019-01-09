/* eslint-disable no-fallthrough */
const initialstate = {
  TestResult: [],
};
// eslint-disable-next-line no-undef
export default ReducerResult = (state = initialstate, action) => {
  // console.log("State",state)
  switch (action.type) {
    case 'PASSED':
      return {
        ...state,
        TestResult: action.data
      };
    case 'SIGN_OUT_REMOVE_RESULT':
      return {
        ...state,
        TestResult: []
      };
    case 'persist/REHYDRATE':
      // console.log("Inside Reducer++++++",action.payload.ReducerSettings.appColor)
      if (action && action.payload && action.payload.ReducerResult) {
        state = action.payload.ReducerResult;
      }
    default:
      return {
        ...state
      };
  }
};
