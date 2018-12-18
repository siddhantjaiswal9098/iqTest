
const initialstate = {
     data : [],
     dataApiTest : {},
     resultData : {},
     userAnswer: {},
     spinnerData : false,
     AllTestDetail : [],
    }
export default ReducerSignup = (state =initialstate,action) => {
    // console.log("State",state)
    switch (action.type) {
        case  "SAVE" : 
            return {
                ...state,
                data : action.data,
            }
        case 'API_RES' :
            return {
                ...state,
                dataApiTest : action.dataApiTest,
            }
        case 'SAVE_RESULT' : 
        return {
            ...state,
            answerKey : action.answerKey,
            userAnswer : action.userAnswer
        }
        case 'START_SPINNER':
        return {
            ...state,
            spinnerData : true
        }
        case 'STOP_SPINNER':
        return {
            ...state,
            spinnerData : false
        }
        case 'API_RES_ALL_TEST':
        return{
            ...state,
            AllTestDetail : action.AllTestDetail
        }
        case 'persist/REHYDRATE':
        if(action && action.payload && action.payload.ReducerSignup){
            console.log('action payload::::', action.payload.ReducerSignup );
            state = action.payload.ReducerSignup
        }
            return {
                ...state,
            }
        case 'SIGN_OUT':
            return{
               ...state,
               data : [],
               dataApiTest : {},
               resultData : {},
               userAnswer: {},
               spinnerData : false,
               AllTestDetail : [],
                
            }
        default : 
            return{
               ...state
            }
    }
}