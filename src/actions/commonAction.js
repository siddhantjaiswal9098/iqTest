export function SignUpSave(data) {
  return ({ type: 'SAVE_DATA', data });
}
export function ApiCallForTest(id) {
  return ({ type: 'API_REST', id });
}
export function ApiCallForAllTestAction() {
  return ({ type: 'API_RES_ALL' });
}
export function SaveResult(answerKey, userAnswer) {
  return ({ type: 'SAVE_RESULT_ACTION', answerKey, userAnswer });
}
export function startSpinner() {
  return ({ type: 'START_SPINNER' });
}
export function stopSpinner() {
  return ({ type: 'STOP_SPINNER' });
}
export function toggleMenu() {
  return ({ type: 'SIDE_MENU' });
}
export function closeMenu() {
  return ({ type: 'SIDE_MENU_CLOSE' });
}
export function signOutClicked(Uid) {
  return ({ type: 'SIGN_OUT_SAGA', Uid });
}
export function navigateToChatting(data) {
  return ({ type: 'NAVIGATE_TO_CHAT_SAGA', data });
}
export function loginClickAction(data) {
  return ({ type: 'LOGIN', data });
}
export function ChangeAppColorAction(data) {
  return ({ type: 'APP_COLOR', data });
}
export function TestResultPass(data) {
  return ({ type: 'PASSED', data });
}
export function signOutClickRemoveResult(data) {
  return ({ type: 'SIGN_OUT_REMOVE_RESULT', data });
}
export function apiCallForDataSaveResult(data) {
  return ({ type: 'SAVE_RESULT_API', data });
}
export function apiCallForDataAllResult(data) {
  return ({ type: 'SAVE_RESULT_API_ALL', data });
}
export function apiCallForResultDeleteByID(data) {
  return ({ type: 'DELETE_SINGLE_RESULT_API', data });
}
