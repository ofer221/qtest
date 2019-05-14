import * as actionTypes from '../actions/actionTypes'
import * as resultsPattern from '../../assets/results'
import produce from 'immer'

const exampleQ = {
  data:{familyId:'YT64',id:'EX33',writerId:'MD88R',date:'22/3/2018'},
  0: {progress: 0, done: 0, numberOfSections: 0, numberOfQuestions: 0, sum: 0,writer:'',target:'',date:''},
  1: {progress: 0, done: 28, numberOfSections: 5, numberOfQuestions: 33, sum: 70.97,qSum:0},
  11: {progress: 0, done: 10, numberOfSubSections: 4, numberOfQuestions: 10, sum: 68.65,qSum:0},
  111: {progress: 0, done: 3, numberOfQuestions: 3, results: {1: {show:1,calc:0,checkedAnswer:3}, 2: {show:20,calc:0,checkedAnswer:2}, 3: {show:50,calc:0,checkedAnswer:3}}, sum: 80,qSum:0},
  112: {progress: 0, done: 4, numberOfQuestions: 4, results: {1: {show:60,calc:0,checkedAnswer:2}, 2: {show:80,calc:0,checkedAnswer:2}, 3: {show:20.6,calc:0,checkedAnswer:2}, 4: {show:45.87,calc:0,checkedAnswer:1}}, sum: 30,qSum:0},
  113: {progress: 0, done: 1, numberOfQuestions: 1, results: {1: {show:80.05,calc:0,checkedAnswer:1}}, sum: 88,qSum:0},
  114: {progress: 0, done: 2, numberOfQuestions: 2, results: {1: {show:40,calc:0,checkedAnswer:2}, 2: {show:70,calc:0,checkedAnswer:1}}, sum: 20,qSum:0},
  12: {progress: 0, done: 3, numberOfSubSections: 1, numberOfQuestions: 3, sum: 72,qSum:0},
  121: {progress: 0, done: 3, numberOfQuestions: 3, results: {1: {show:50,calc:0,checkedAnswer:2}, 2: {show:29,calc:0,checkedAnswer:3}, 3: {show:75,calc:0,checkedAnswer:4}}, sum: 30,qSum:0},
  13: {progress: 0, done: 4, numberOfSubSections: 1, numberOfQuestions: 4, sum: 66.75,qSum:0},
  131: {progress: 0, done: 4, numberOfQuestions: 4, results: {1: {show:55,calc:0,checkedAnswer:1}, 2: {show:47,calc:0,checkedAnswer:3}, 3: {show:72,calc:0,checkedAnswer:3}, 4: {show:91.3,calc:0,checkedAnswer:4}}, sum: 66.75,qSum:0},
  14: {progress: 0, done: 6, numberOfSubSections: 2, numberOfQuestions: 6, sum: 76,qSum:0},
  141: {progress: 0, done: 4, numberOfQuestions: 4, results: {1: {show:100,calc:0,checkedAnswer:2}, 2: {show:80,calc:0,checkedAnswer:2}, 3: {show:44,calc:0,checkedAnswer:2}, 4: {show:38,calc:0,checkedAnswer:1}}, sum: 88,qSum:0},
  142: {progress: 0, done: 2, numberOfQuestions: 2, results: {1: {show:71,calc:0,checkedAnswer:1}, 2: {show:78,calc:0,checkedAnswer:1}}, sum: 55,qSum:0},
  15: {progress: 0, done: 10, numberOfSubSections: 4, numberOfQuestions: 10, sum: 71.5,qSum:0},
  151: {progress: 0, done: 2, numberOfQuestions: 2, results: {1: {show:47,calc:0,checkedAnswer:4}, 2: {show:83.05,calc:0,checkedAnswer:3}}, sum: 98,qSum:0},
  152: {progress: 0, done: 3, numberOfQuestions: 3, results: {1: {show:22.024,calc:0,checkedAnswer:2}, 2: {show:55.03,calc:0,checkedAnswer:4}, 3: {show:76,calc:0,checkedAnswer:3}}, sum: 36,qSum:0},
  153: {progress: 0, done: 2, numberOfQuestions: 2, results: {1: {show:11,calc:0,checkedAnswer:3}, 2: {show:30,calc:0,checkedAnswer:3}}, sum: 44,qSum:0},
  154: {progress: 0, done: 3, numberOfQuestions: 3, results: {1: {show:90,calc:0,checkedAnswer:3}, 2: {show:99.365,calc:0,checkedAnswer:4}, 3: {show:4,calc:0,checkedAnswer:3}}, sum: 55,qSum:0},
  2: {progress: 0, done: 7, numberOfSections: 2, numberOfQuestions: 7, sum: 46,qSum:0},
  21: {progress: 0, numberOfSubSections: 1, numberOfQuestions: 4, done: 4, sum: 38.75,qSum:0},
  211: {progress: 0, done: 0, numberOfQuestions: 4, results: {1: {show:10,calc:0}, 2: {show:60,calc:0,checkedAnswer:0}, 3: {show:90,calc:0,checkedAnswer:0}, 4: {show:70,calc:0,checkedAnswer:0}}, sum: 38.75,qSum:0},
  22: {progress: 0, done: 3, numberOfSubSections: 1, numberOfQuestions: 3, sum: 53.3,qSum:0},
  221: {progress: 0, done: 3, numberOfQuestions: 3, results: {1: {show:80,calc:0,checkedAnswer:0}, 2: {show:10,calc:0,checkedAnswer:0}, 3: {show:40,calc:0,checkedAnswer:0}}, sum: 53.3,qSum:0}
}

const initialState = {

  userDetails:{  userId: 'MD88R', userName: 'Ofer'},
  savedQuestionnaires: [exampleQ]
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_QUESTIONNAIRE:
      return saveQuestionnaire(state, action.details)
    case actionTypes.UPDATE_QUESTIONNAIRE:
      return updateQuestionnaire(state, action.updatedQuestionnaire)
    default:
      return state
  }
}

function updateQuestionnaire (state, updatedQuestionnaire) {
  const nextState = produce(state, draftState => {
   findAndUpdate(draftState, updatedQuestionnaire)
  })
  return {
    ...state,
    savedQuestionnaires: nextState.savedQuestionnaires
  }
}
function findAndUpdate (draftState, updatedQuestionnaire) {
  let cloneQ = JSON.parse(JSON.stringify(updatedQuestionnaire));
  let index = draftState.savedQuestionnaires.findIndex(item=>item.data.id === cloneQ.data.id)
if(index!==-1){
  draftState.savedQuestionnaires.splice(index,1,cloneQ)
}
}
function saveQuestionnaire (state, details) {
  const nextState = produce(state, draftState => {
    createQuestionnaire(draftState, details)
  })
  return {
    ...state,
    savedQuestionnaires: nextState.savedQuestionnaires
  }
}

function createQuestionnaire (draftState, details) {
  let newQuestionnaire = resultsPattern
  newQuestionnaire.data.writerId = draftState.userDetails.userId
  newQuestionnaire.data.familyId = 'TH35'
  newQuestionnaire.data.id = makeid();
  newQuestionnaire.data.date = getDate()
  draftState.savedQuestionnaires.push(newQuestionnaire)
}
function makeid() {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (let i = 0; i < 2; i++){
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  text = text+Math.floor(Math.random() * 100)
  return text
}
function getDate () {
  let today = new Date()
  let dd = today.getDate()
  let mm = today.getMonth() + 1 //January is 0!
  let yyyy = today.getFullYear()

  if (dd < 10) {
    dd = '0' + dd
  }

  if (mm < 10) {
    mm = '0' + mm
  }

  today = mm + '/' + dd + '/' + yyyy
  return today
}



export default reducer
