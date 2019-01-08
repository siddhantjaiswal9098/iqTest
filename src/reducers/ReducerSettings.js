/* eslint-disable no-param-reassign */

const initialstate = {
  appColor: '#61abea',
};
export default ReducerSettings = (state = initialstate, action) => {
  // console.log("State",state)
  switch (action.type) {
    case 'APP_COLOR':
      return {
        ...state,
        appColor: action.data
      };
    case 'persist/REHYDRATE':
      // console.log("Inside Reducer++++++",action.payload.ReducerSettings.appColor)
      if (action && action.payload && action.payload.ReducerSettings) {
        state = action.payload.ReducerSettings;
      }
      return {
        ...state,
      };
    default:
      return {
        ...state
      };
  }
};
