import * as actionTypes from './actionTypes'
import { uiStartLoading, uiStopLoading } from './uiActions'


export const tryLogin = (loginMode) => {
  return dispatch => {
    console.log(loginMode)
  //   dispatch(uiStartLoading())
  //   if (loginMode === 'fbLogin') {
  //     dispatch(facebookLogin())
  //   }
  //   else if (loginMode === 'googleLogin') {
  //     dispatch(googleLogin())
  //   }
  //   dispatch(uiStopLoading())
   }
}

const updateUserDetails = (loginData) => {
  // return {
  //   type: actionTypes.UPDATE_DETAILS,
  //   userData: loginData
  // }
}

export const logOut = (loginMethod) => {
  return async dispatch => {
    // dispatch(uiStartLoading())
    // try {
    //   if (loginMethod === 'fbLogin') {
    //     await LoginManager.logOut()
    //   }
    //   else if (loginMethod === 'googleLogin') {
    //     await GoogleSignin.revokeAccess()
    //     await GoogleSignin.signOut()
    //   }
    //   dispatch({type: actionTypes.LOG_OUT})
    //   dispatch(uiStopLoading())
    // }
    // catch (e) {
    //   alert('Logout error, \n error -' + e.message)
    //   dispatch(uiStopLoading())
    // }
  }
}

