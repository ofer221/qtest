import * as actionTypes from '../actions/actionTypes'
import produce from 'immer'

const initialState = {
  stateChanged:0,
  mainResults: {
    data:{familyId:'jk8',id:'54g',writerId:'33e',date:'22/3/2018'},
    0: {progress: 0, done: 0, numberOfSections: 0, numberOfQuestions: 0, sum: 0,writer:'',target:'',date:'',qSum:0},
    1: {progress: 0, done: 7, numberOfSections: 5, numberOfQuestions: 33, sum: 20,qSum:0},
    11: {progress: 0, done: 0, numberOfSubSections: 4, numberOfQuestions: 10, sum: 20,qSum:0},
    111: {progress: 0, done: 2, numberOfQuestions: 3, results: {1: {show:0,calc:0,checkedAnswer:0}, 2: {show:0,calc:0,checkedAnswer:0}, 3: {show:0,calc:0,checkedAnswer:0}}, sum: 40,qSum:0},
    112: {progress: 0, done: 0, numberOfQuestions: 4, results: {1: {show:0,calc:0,checkedAnswer:0}, 2: {show:0,calc:0,checkedAnswer:0}, 3: {show:0,calc:0,checkedAnswer:0}, 4: {show:0,calc:0,checkedAnswer:0}}, sum: 0,qSum:0},
    113: {progress: 0, done: 0, numberOfQuestions: 1, results: {1: {show:0,calc:0,checkedAnswer:0}}, sum: 30,qSum:0},
    114: {progress: 0, done: 0, numberOfQuestions: 2, results: {1: {show:0,calc:0,checkedAnswer:0}, 2: {show:0,calc:0}}, sum: 0,qSum:0},
    12: {progress: 0, done: 0, numberOfSubSections: 1, numberOfQuestions: 3, sum: 50,qSum:0},
    121: {progress: 0, done: 0, numberOfQuestions: 3, results: {1: {show:0,calc:0,checkedAnswer:0}, 2: {show:0,calc:0,checkedAnswer:0}, 3: {show:0,calc:0,checkedAnswer:0}}, sum: 0,qSum:0},
    13: {progress: 0, done: 0, numberOfSubSections: 1, numberOfQuestions: 4, sum: 20,qSum:0},
    131: {progress: 0, done: 0, numberOfQuestions: 4, results: {1: {show:0,calc:0,checkedAnswer:0}, 2: {show:0,calc:0,checkedAnswer:0}, 3: {show:0,calc:0,checkedAnswer:0}, 4: {show:0,calc:0,checkedAnswer:0}}, sum: 0,qSum:0},
    14: {progress: 0, done: 0, numberOfSubSections: 2, numberOfQuestions: 6, sum: 80,qSum:0},
    141: {progress: 0, done: 0, numberOfQuestions: 4, results: {1: {show:0,calc:0,checkedAnswer:0}, 2: {show:0,calc:0,checkedAnswer:0}, 3: {show:0,calc:0,checkedAnswer:0}, 4: {show:0,calc:0,checkedAnswer:0}}, sum: 0,qSum:0},
    142: {progress: 0, done: 0, numberOfQuestions: 2, results: {1: {show:0,calc:0,checkedAnswer:0}, 2: {show:0,calc:0,checkedAnswer:0}}, sum: 0,qSum:0},
    15: {progress: 0, done: 0, numberOfSubSections: 4, numberOfQuestions: 10, sum: 95,qSum:0},
    151: {progress: 0, done: 0, numberOfQuestions: 2, results: {1: {show:0,calc:0,checkedAnswer:0}, 2: {show:0,calc:0,checkedAnswer:0}}, sum: 0,qSum:0},
    152: {progress: 0, done: 0, numberOfQuestions: 3, results: {1: {show:0,calc:0,checkedAnswer:0}, 2: {show:0,calc:0,checkedAnswer:0}, 3: {show:0,calc:0,checkedAnswer:0}}, sum: 0,qSum:0},
    153: {progress: 0, done: 0, numberOfQuestions: 2, results: {1: {show:0,calc:0,checkedAnswer:0}, 2: {show:0,calc:0,checkedAnswer:0}}, sum: 0,qSum:0},
    154: {progress: 0, done: 0, numberOfQuestions: 3, results: {1:{show:0,calc:0,checkedAnswer:0}, 2: {show:0,calc:0,checkedAnswer:0}, 3: {show:0,calc:0,checkedAnswer:0}}, sum: 0,qSum:0},
    2: {progress: 0, done: 0, numberOfSections: 2, numberOfQuestions: 7, sum: 0,qSum:0},
    21: {progress: 0, numberOfSubSections: 1, numberOfQuestions: 1, done: 0, sum: 0,qSum:0},
    211: {progress: 0, done: 0, numberOfQuestions: 4, results: {1: {show:0,calc:0,checkedAnswer:0}, 2: {show:0,calc:0,checkedAnswer:0}, 3: {show:0,calc:0,checkedAnswer:0}, 4: {show:0,calc:0,checkedAnswer:0}}, sum: 0,qSum:0},
    22: {progress: 0, done: 0, numberOfSubSections: 1, numberOfQuestions: 3, sum: 0,qSum:0},
    221: {progress: 0, done: 0, numberOfQuestions: 3, results: {1: {show:0,calc:0,checkedAnswer:0}, 2: {show:0,calc:0,checkedAnswer:0}, 3: {show:0,calc:0,checkedAnswer:0}}, sum: 0,qSum:0}
  }
}

const reducer = (state = initialState, action) => {
  if (action.type === actionTypes.SET_RESULTS) {
    return updateResults(state, action.details)
  }
  if (action.type === actionTypes.LOAD_QUESTIONAIRE) {
    return loadQuestionnaire(state, action.questionnaireResults)
  }
  if (action.type === actionTypes.LOG_OUT) {
    return initialState
  }
  return state
}

function loadQuestionnaire (state, questionnaireResults) {
  return {
    mainResults: questionnaireResults
  }
}
function updateResults (state, details) {
  const nextState = produce(state, draftState => {
    calculateChanges(draftState,details)
  })
  return {
    stateChanged:nextState.stateChanged,
    mainResults: nextState.mainResults
  }
}
function calculateResults (state, details) {
  const nextState = produce(state, draftState => {
    calculateChanges(draftState,details)
  })
  return {
    mainResults: nextState.mainResults
  }
}
const details = {indexArr: [], result: 0,scoreArr:[]}

function calculateChanges (draftState, details) {
  const mainSection = details.indexArr[0]
  const section = [details.indexArr[0], details.indexArr[1]].join('')
  const subSection = [details.indexArr[0], details.indexArr[1], details.indexArr[2]].join('')
  const questionNum = details.indexArr[3]
  let subResults = draftState.mainResults[subSection].results
  if (subResults[questionNum].show === 0) {
    draftState.mainResults[subSection].done++
    draftState.mainResults[section].done++
    draftState.mainResults[mainSection].done++
    draftState.mainResults[subSection].progress = (draftState.mainResults[subSection].done / draftState.mainResults[subSection].numberOfQuestions) * 100
    draftState.mainResults[section].progress = (draftState.mainResults[section].done / draftState.mainResults[section].numberOfQuestions) * 100
    draftState.mainResults[mainSection].progress = (draftState.mainResults[mainSection].done / draftState.mainResults[mainSection].numberOfQuestions) * 100
  }
  subResults[questionNum] ={show:details.scoreArr[details.result-1].show,calc:details.scoreArr[details.result-1].calc,checkedAnswer:details.result}
  calculateSections(draftState,subSection,section,mainSection)
}
 function calculateSections (draftState,SubSectionIndex,sectionIndex,mainSectionIndex) {
  let currentSubSection = draftState.mainResults[SubSectionIndex]
   let currentSection = draftState.mainResults[sectionIndex]
   let currentMainSection = draftState.mainResults[mainSectionIndex]
   if (currentMainSection.done===currentMainSection.numberOfQuestions) {
     switch (mainSectionIndex) {
       case "1":
         currentSection.qSum = draftState.mainResults[11].qSum+draftState.mainResults[12].qSum+draftState.mainResults[13].qSum+draftState.mainResults[14].qSum+draftState.mainResults[15].qSum
         currentSection.sum = (currentSection.qSum*(100/192.292)).toFixed(2)
         break;
       case "2":
         currentSection.qSum = draftState.mainResults[21].qSum+draftState.mainResults[22].qSum
         currentSection.sum = (currentSection.qSum*(100/7)).toFixed(2)
     }
   }
   if (currentSection.done===currentSection.numberOfQuestions){
     switch (sectionIndex) {
       case "11":
         currentSection.qSum = draftState.mainResults[111].qSum+draftState.mainResults[112].qSum+draftState.mainResults[113].qSum+draftState.mainResults[114].qSum
         currentSection.sum =(currentSection.qSum*(100/56.575)).toFixed(2)
         break;
       case "14":
         currentSection.qSum = draftState.mainResults[141].qSum+draftState.mainResults[142].qSum
         currentSection.sum =(currentSection.qSum*(100/31.686)).toFixed(2)
         break;
       case "15":
         currentSection.qSum = draftState.mainResults[151].qSum+draftState.mainResults[152].qSum+draftState.mainResults[153].qSum+draftState.mainResults[154].qSum
         currentSection.sum =(currentSection.qSum*(100/63.418)).toFixed(2)
         break;
       default:
         break;
     }
   }
   if(currentSubSection.done===currentSubSection.numberOfQuestions){
     switch (SubSectionIndex) {
       case "111":
         currentSubSection.qSum =(currentSubSection.results[1].calc+currentSubSection.results[2].calc+currentSubSection.results[3].calc)
         currentSubSection.sum = (currentSubSection.qSum*(100/17.279)).toFixed(2)
         break;
       case "112":
         currentSubSection.qSum =(currentSubSection.results[1].calc+currentSubSection.results[2].calc+currentSubSection.results[3].calc+currentSubSection.results[4].calc)
         currentSubSection.sum = (currentSubSection.qSum*(100/22.808)).toFixed(2)
      break;
       case "113":
         currentSubSection.qSum =(currentSubSection.results[1].calc)
         currentSubSection.sum = (currentSubSection.qSum*(100/5.007)).toFixed(2)
         break;
       case "114":
         currentSubSection.qSum =(currentSubSection.results[1].calc+currentSubSection.results[2].calc)
         currentSubSection.sum = (currentSubSection.qSum*(100/10.071)).toFixed(2)
         break;
       case "121":
         currentSubSection.qSum =(currentSubSection.results[1].calc+currentSubSection.results[2].calc+currentSubSection.results[3].calc)
         currentSubSection.sum = (currentSubSection.qSum*(100/14.691)).toFixed(2)
         currentSection.sum = currentSubSection.sum
         break;
       case "131":
         currentSubSection.qSum =(currentSubSection.results[1].calc+currentSubSection.results[2].calc+currentSubSection.results[3].calc+currentSubSection.results[4].calc)
         currentSubSection.sum = (currentSubSection.qSum*(100/25.923)).toFixed(2)
         currentSection.sum = currentSubSection.sum
         break;
       case "141":
         currentSubSection.qSum =(currentSubSection.results[1].calc+currentSubSection.results[2].calc+currentSubSection.results[3].calc+currentSubSection.results[4].calc)
         currentSubSection.sum = (currentSubSection.qSum*(100/20.966)).toFixed(2)
         break;
       case "142":
         currentSubSection.qSum =(currentSubSection.results[1].calc+currentSubSection.results[2].calc)
         currentSubSection.sum = (currentSubSection.qSum*(100/10.720)).toFixed(2)
         break;
       case "151":
         currentSubSection.qSum =(currentSubSection.results[1].calc+currentSubSection.results[2].calc)
         currentSubSection.sum =(currentSubSection.qSum *(100/12.077)).toFixed(2)
         break;
       case "152":
         currentSubSection.qSum =(currentSubSection.results[1].calc+currentSubSection.results[2].calc+currentSubSection.results[3].calc)
         currentSubSection.sum =(currentSubSection.qSum *(100/17.512)).toFixed(2)
         break;
       case "153":
         currentSubSection.qSum =(currentSubSection.results[1].calc+currentSubSection.results[2].calc)
         currentSubSection.sum = (currentSubSection.qSum*(100/13.696)).toFixed(2)
         break;
       case "154":
         currentSubSection.qSum =(currentSubSection.results[1].calc+currentSubSection.results[2].calc+currentSubSection.results[3].calc)
         currentSubSection.sum = (currentSubSection.qSum*(100/20.132)).toFixed(2)
         break;
       case "211":
         currentSubSection.qSum =(currentSubSection.results[1].calc+currentSubSection.results[2].calc+currentSubSection.results[3].calc+currentSubSection.results[4].calc)
         currentSubSection.sum = (currentSubSection.qSum/4).toFixed(2)
         currentSection.sum = currentSubSection.sum
         break;
       case "221":
         currentSubSection.qSum =(currentSubSection.results[1].calc+currentSubSection.results[2].calc+currentSubSection.results[3].calc)
         currentSubSection.sum = (currentSubSection.qSum/3).toFixed(2)
         currentSection.sum = currentSubSection.sum
         break;
       default:
         break;
     }
   }
 }

export default reducer
