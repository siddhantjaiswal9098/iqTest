export function SignUpSave(data){
        return  ({type : "SAVE",data})
 }

 export function ApiCallForTest(id){
        return  ({type : 'API_REST',id})
 }
 export function ApiCallForAllTestAction(){
       return  ({type : 'API_RES_ALL'})
}
 export function SaveResult(answerKey, userAnswer){
       return  ({type : 'SAVE_RESULT_ACTION',answerKey,userAnswer})
}
export function startSpinner(){
       return  ({type : 'START_SPINNER'})
}
export function stopSpinner(){
       return  ({type : 'STOP_SPINNER'})
}
export function toggleMenu(){
       return  ({type : 'SIDE_MENU'})
}
export function closeMenu(){
       return  ({type : 'SIDE_MENU_CLOSE'})
}
export function signOutClicked(){
       return  ({type : 'SIGN_OUT'})
}