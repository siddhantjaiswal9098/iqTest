
const initialstate = {
  sideMenuToggle: false,
  navigateToChat: false,
  navigateScreen: ''
};
// eslint-disable-next-line no-undef
export default ReducerMenu = (state = initialstate, action) => {
  switch (action.type) {
    case 'SIDE_MENU':
      return {
        ...state,
        sideMenuToggle: !state.sideMenuToggle
      };
    case 'SIDE_MENU_CLOSE':
      return {
        ...state,
        sideMenuToggle: false
      };
    case 'NAVIGATE_TO_CHAT':
      console.log('in reducer--->>>', action.action.data);
      return {
        ...state,
        navigateScreen: action.action.data,
        navigateToChat: !state.navigateToChat
      };
    default:
      return {
        ...state
      };
  }
};
