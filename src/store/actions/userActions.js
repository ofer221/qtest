import * as actionTypes from './actionTypes'

export const saveQuestionnaire = () => {
  return {
    type: actionTypes.CREATE_QUESTIONNAIRE,
    details: "details"
  }
}
export const updateQuestionnaire = questionnaire => {
  return {
    type: actionTypes.UPDATE_QUESTIONNAIRE,
    updatedQuestionnaire: questionnaire
  }
}
