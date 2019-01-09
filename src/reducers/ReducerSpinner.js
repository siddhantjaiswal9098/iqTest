/* eslint-disable no-undef */

const initialstate = {
  spinnerData: false,
};
export default ReducerSpinner = (state = initialstate, action) => {
  // console.log("State",state)
  switch (action.type) {
    case 'START_SPINNER':
    console.log("%%%%%%%%%%STARTReducer");
      return {
        ...state,
        spinnerData: true
      };
    case 'STOP_SPINNER':
      return {
        ...state,
        spinnerData: false
      };
    default:
      return {
        ...state
      };
  }
};
