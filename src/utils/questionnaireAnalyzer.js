//import * as questionarie from '../assets/theQuestionnaire'

function Section (sectionName) {
  this.sectionName = ''
  this.sectionResult = ''
  this.sectionIndex = ''
  this.sectionLevel = ''
  this.subSections = []
  this.questions = []
}

function Question (questionText) {
  this.questionText = questionText
  this.answersText = []
  this.results = []
}

Question.prototype.addAnswer = function (answerText,answerResult) {
  this.answersText.push(answerText)
  this.results.push(answerResult)
}

function Questionnaire () {
  this.writer = ''
  this.target = ''
  this.date=''
  this.sectionOne=[]
  this.sectionTow=[]
}

function Analyzer (questionnaires,isMultiYear,isMultiFamily) {
  this.isMultiYear=isMultiYear
  this.isMultiFamily=isMultiFamily
  this.questionnaires=[]

  let init=()=>{
    for (let i = 0;i<questionnaires.length;i++){

    }
  }

  let analyze =(questionnaire)=>{
    let loadedQuestionnaire = Object.values(questionnaire)
    this.questionnaires.push(new Questionnaire())
    let currentQuestionnaire = this.questionnaires[this.questionnaires.length-1]
  }
}
