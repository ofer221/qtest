import React, {Component} from 'react';
import { StyleSheet, Text, View,ScrollView} from 'react-native';
import { MenuButton,MenuButtonWithSubBtns} from '../../components'
import * as questionarie from '../../assets/theQuestionnaire'
import {QuestionnaireFooter} from '../../components'
import * as actions from '../../store/actions'
import { connect } from 'react-redux'



class QuestionnaireMain extends Component<Props> {

  state = {
    loadedSection:Object.values(questionarie),
    sectionName:"Main"
  }
  sectionsPath = {
    main:Object.values(questionarie),
    subZero:Object.values(questionarie)[0],
    subOne:Object.values(questionarie)[1],
    subTow:Object.values(questionarie)[2],
  }
  goto = (screenName) => {
    this.props.navigation.push(screenName)
  }

loadSection=(sectionNumber,sectionName)=>{
const loadedSection = Object.values(questionarie[sectionNumber])
    this.setState({
      loadedSection:loadedSection,
      sectionName:sectionName
    })
}
handleLeftClick=()=>{
  this.props.navigation.navigate("Results")
}
handleRightClick=()=>{
  if(this.state.sectionName==="Main") {
    this.props.updatedQuestionnaire(this.props.mainResults)
    this.props.navigation.navigate("Main")
  }
  else {
    this.setState({
      loadedSection:Object.values(questionarie),
      sectionName:"Main"
    })
  }

}

  gotoQuestion=(qstack)=>{
this.props.navigation.push('Question',{questionStack:qstack})}
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.screenName}>{this.state.sectionName}</Text>
        </View>
      <ScrollView >

        {this.state.loadedSection.map((section,index)=>{
          if (section.name){
          return(
            <MenuButtonWithSubBtns buttonText={section.name}
                                   key={index}
                                   onPress={section.hasSubSections==="no"?()=>this.gotoQuestion(section.questionStack):()=>this.loadSection(section.number,section.name)}
                                   subButtons={section.hasSubSections==="yes"?Object.values(section):null}
                                   subBtnPressed={this.gotoQuestion}
                                   numOfQuestions={this.props.mainResults[section.index].numberOfQuestions}
                                   questionsDone={this.props.mainResults[section.index].done}/>
          )}
        })}
      </ScrollView>
        <QuestionnaireFooter rightBtnText={this.state.sectionName==="Main"?"יציאה":"חזור"}
                             hideMiddle={true}
                             rightBtnIcon={this.state.sectionName==="Main"?"sign-out":'arrow-right'}
                             rightBtnPress={this.handleRightClick}
                             leftBtnText={"תוצאות"}
                             iconTypeLeft={'foundation'}
                             leftBtnIcon={'graph-bar'}
                             leftBtnPress={this.handleLeftClick}
                             middleBtnText={"תוכן עניינים"}
                             middleBtnIcon={'list'}
                             middleBtnPress={this.handleLeftClick}/>
      </View>
    );
  }
}


const mapStateToProps = state => {
  return {
    mainResults: state.questionnaire.mainResults,

  }
}

const mapDispatchToProps = dispatch => {
  return {
    updatedQuestionnaire:(questionnaire)=>dispatch(actions.updateQuestionnaire(questionnaire))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireMain)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  screenName: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});


//<MenuButton buttonText={'פרטים דמוגרפים על המשפחה'}
      //      color={'#1194f6'}
     //       TextColor={'black'}
        //    fontSize={20}
  //          onPress={()=>this.goto('FamilyDetails')}/>
//<MenuButton buttonText={'אבחון והערכת ההזנחה במשק הבית'}
//color={'#1194f6'}
//TextColor={'black'}
//fontSize={20}
//onPress={()=>this.goto('HouseholdAssessment')}/>
//<MenuButton buttonText={'אבחון יכולת המשפחה לחולל שינוי'}
 //           color={'#1194f6'}
 //           TextColor={'black'}
 //           fontSize={20}
//            onPress={()=>this.goto('FamilyChangeAbility')}/>
