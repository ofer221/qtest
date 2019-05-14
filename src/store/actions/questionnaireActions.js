import * as actionTypes from './actionTypes'

export const setResult = (details) => {
  return {
    type: actionTypes.SET_RESULTS,
    details: details
  }
}
export const loadResults = (results) => {
  let cloneQ = JSON.parse(JSON.stringify(results));
  return {
    type: actionTypes.LOAD_QUESTIONAIRE,
    questionnaireResults: cloneQ
  }
}
