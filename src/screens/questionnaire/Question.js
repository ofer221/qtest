import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native'
// import { MKRadioButton } from 'react-native-material-kit'
import { Button, CheckBox ,Divider,Icon,Overlay } from 'react-native-elements'
//import Icon from 'react-native-vector-icons/FontAwesome'
import * as questionarie from '../../assets/theQuestionnaire'
import {QuestionnaireFooter} from '../../components'
import { connect } from 'react-redux'
import * as actions from '../../../src/store/actions'

//const question = {questionText: 'זאת שאלה', answers: ['answer 1', 'answer tow', 'answer three', 'answer four', 'answer four', 'answer four', 'answer four', 'answer four', 'answer four', 'answer four', 'answer four', 'answer four']}

class Question extends Component<Props> {
  constructor () {
    super()
    //  this.radioGroup = new MKRadioButton.Group()
    this.state = {
      checkedAnswer: null,
      questions: null,
      currentQuestionIndex: 0,
      questionStackString:'',
      showOverlay:false
    }
  }
  toggleOverlay=()=>{
    this.setState({
      ...this.state,
      showOverlay:!this.state.showOverlay
    })
  }

  componentWillMount = () => {
    // let bb = this.props.navigation.getParam('questionStack', 'NO-ID')
    // alert(bb)
    this.getParams()
  }
  getQuestionResults=()=>{
    this.setState({
      ...this.state,
      checkedAnswer:this.props.mainResults[this.state.questionStackString].results[this.state.currentQuestionIndex]
    })
  }
  getParams = () => {
    let questionStack = this.props.navigation.getParam('questionStack', 'NO-ID')
    let questionStackString = questionStack.join('')
    console.log(this.props.mainResults[questionStackString].results[1])
    let mainSuctionNum = questionStack[0]
    let sectionNum = questionStack[1]
    let subSectionNum = questionStack[2]
    this.setState({
      ...this.state,
      questions: questionarie[mainSuctionNum][sectionNum][subSectionNum].questions,
      questionStackString:questionStackString,
      checkedAnswer:(this.props.mainResults[questionStackString].results[this.state.currentQuestionIndex+1].checkedAnswer)||null

    })
  }

  handleBackClick = () => {
    if (this.state.currentQuestionIndex !== 0) {
      this.setState({
        ...this.state,
        currentQuestionIndex: this.state.currentQuestionIndex - 1,
        checkedAnswer:(this.props.mainResults[this.state.questionStackString].results[this.state.currentQuestionIndex].checkedAnswer)

      })
    } else {
      this.handleHomeClick()
    }
  }
  handleSkipClick = () => {
    if (this.state.currentQuestionIndex < this.state.questions.length - 1) {
      this.setState({
        ...this.state,
        currentQuestionIndex: this.state.currentQuestionIndex + 1,
        checkedAnswer:(this.props.mainResults[this.state.questionStackString].results[this.state.currentQuestionIndex+2].checkedAnswer)

      })
    } else {
      this.handleHomeClick()
    }

  }
  handleNextClick = (questionIndex,questionScore) => {
   // alert(this.state.checkedAnswer)
    let resultsData = {indexArr: questionIndex, result: this.state.checkedAnswer,scoreArr:questionScore}
     this.props.setResults(resultsData)
    if (this.state.currentQuestionIndex < this.state.questions.length - 1) {
      this.setState({
        ...this.state,
        currentQuestionIndex: this.state.currentQuestionIndex + 1,
        checkedAnswer:(this.props.mainResults[this.state.questionStackString].results[this.state.currentQuestionIndex+ 2].checkedAnswer)
      })
    } else {
      this.handleHomeClick()
    }
  }
  handleHomeClick = () => {
    this.props.navigation.goBack()
  }
//               <MKRadioButton checked={false} group={this.radioGroup}/>
  //<Text style={styles.answerText}>{answer}</Text>
  render () {
    const question = this.state.questions[this.state.currentQuestionIndex]

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.questionContainer}>
          <Text style={styles.questionHeaderText}>{question.questionText}</Text>
          <Divider style={{ backgroundColor: 'black' }} />
          <View style={{padding:3}}>
          <Text style={styles.questionText}>{question.questionInfoText}</Text></View>
        </View>
        <ScrollView>
          {question.answers.map((answer, index) => {
            return (<View style={styles.singleAnswersContainer} key={index}>
              <CheckBox
                iconRight
                center
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                title={answer}
                checked={this.state.checkedAnswer-1 === index}
                onPress={() => this.setState({checkedAnswer: index+1})}
                containerStyle={styles.checkBoxContainer}
                textStyle={styles.answerTextStyle}
              />
            </View>)
          })}
        </ScrollView>
        {question.additionalInfo?
          <View style={{backgroundColor:"transparent"}}>
        <Icon
          name='info-circle'
          size={20}
          color='blue'
          type={'font-awesome'}
          raised={true}
          onPress={this.toggleOverlay}
        /></View>:null}
        <Overlay
          isVisible={this.state.showOverlay}
          windowBackgroundColor="rgba(255, 255, 255, .5)"
          overlayBackgroundColor="rgba(102,204,255,0.8)"
          width="auto"
          height="auto"
          onBackdropPress={this.toggleOverlay}
        >
          <Text>{question.additionalInfo}</Text>
        </Overlay>
        {this.state.checkedAnswer ?
          <Button
            icon={
              <Icon
                name='check'
                size={15}
                color='white'
                type={'font-awesome'}
              />
            }
            title='אשר ועבור לשאלה הבאה'
            iconRight
            buttonStyle={{backgroundColor: 'green', margin: 5}}
            onPress={()=>this.handleNextClick(question.questionIndex,question.questionScore)}
          /> : null}
<QuestionnaireFooter rightBtnText="חזור"
                     rightBtnIcon='arrow-right'
                     rightBtnPress={this.handleBackClick}
                     leftBtnText="דלג"
                     leftBtnIcon='arrow-left'
                     leftBtnPress={this.handleSkipClick}
                     middleBtnText="תוכן עניינים"
                     middleBtnIcon='list'
                     middleBtnPress={this.handleHomeClick}/>
      </ScrollView>
    )
  }
}


const mapStateToProps = state => {
  return {
    mainResults: state.questionnaire.mainResults,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setResults:(resultData)=>dispatch(actions.setResult(resultData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Question)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#F5FCFF',
  },
  questionContainer: {
    margin: 10,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  questionHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  }
  ,  questionText: {
    fontSize: 12,
    textAlign: 'right',

  },
  checkBoxContainer: {
    flexDirection: 'row-reverse',
    width: Dimensions.get('window').width - 20,
    padding: 10,
  },
  singleAnswersContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
    direction: 'rtl',

  },
  answerTextStyle: {
    fontSize: 14,
    direction: 'rtl'
  },
  bottomButtons: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row-reverse',
    margin: 3,
  },
  bottomButtonsStyle: {
    backgroundColor: 'rgba(92, 99,216, 1)',
    margin: 10,
    padding: 3,
    borderRadius: 0,
    borderColor: 'black',
    borderWidth: 1,
  },
  footer: {
    backgroundColor: '#ff3b63',
    width: Dimensions.get('window').width
  },
})
