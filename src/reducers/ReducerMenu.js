
const initialstate = {
    sideMenuToggle: false
   }
export default ReducerMenu = (state =initialstate,action) => {
    switch (action.type) {
 case 'SIDE_MENU':
        return{
            ...state,
            sideMenuToggle: !state.sideMenuToggle
        }
        case 'SIDE_MENU_CLOSE':
        return{
            ...state,
            sideMenuToggle: false
        }
        default : 
        return{
           ...state
        }
}
}