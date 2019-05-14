import React, { Component } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { MenuButton } from '../../components'
import { ListItem, Icon } from 'react-native-elements'

import * as actions from '../../store/actions'
import { connect } from 'react-redux'

class QuestionnaireSignin extends Component<Props> {

  state= {
    toggleList:false,
    QuestionnaireCreated:false,
    newQuestionnaire:{}
  }
  toggleList =()=>{
    this.setState({
      toggleList:!this.state.toggleList
    })
  }
  createQuestionnaire = ()=>{
    this.props.createQuestionnaire()
    this.setState({
      ...this.state,
      QuestionnaireCreated:true,
    })
  }
startNew=()=>{
  this.loadResultsOf(this.props.savedQuestionnaires[this.props.savedQuestionnaires.length-1])
}
  startQuiz = () => {
    this.props.navigation.navigate('testStack')
  }
  cancelQuiz = () => {
    this.props.navigation.navigate('AppNav')
  }
loadResultsOf = (results)=>{
    this.props.loadQuestionnaire(results)
  this.startQuiz()
}
  render () {
    return (
      <View style={styles.container}>
        <View style={{alignSelf: "center"}}><Text style={{
          fontWeight: 'bold',
          textDecorationLine: 'underline',
          fontSize:20
        }}>כניסה לכלי האבחון</Text></View>
        <View style={styles.tableContainer}>
          <MenuButton buttonText={'בחר שאלון שמור'}
                      color={'#1194f6'}
                      TextColor={'black'}
                      fontSize={20}
                      onPress={this.toggleList}/>
          {this.state.toggleList?
          <View>
          <ListItem
            containerStyle={{flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 0, paddingTop: 0}}
            leftElement={<View style={styles.itemTableContainer}>
              <View
                style={[styles.itemTitleQid, {backgroundColor: '#99b2ff'}]}><Text style={{fontWeight: 'bold'}}>קוד
                שאלון</Text></View>
              <View
                style={[styles.itemTitleFid, {backgroundColor: '#99b2ff'}]}><Text style={{fontWeight: 'bold'}}>קוד
                משפחה</Text></View>
              <View
                style={[styles.itemTitleDate, {backgroundColor: '#99b2ff'}]}><Text style={{fontWeight: 'bold'}}>תאריך
                ביצוע</Text></View>
            </View>
            }
          />
          {this.props.savedQuestionnaires.map((questionnaire, index) => {
            return (
              <ListItem
                onPress={()=>this.loadResultsOf(questionnaire)}
                key={index}
                containerStyle={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingBottom: 0,
                  paddingTop: 0
                }}
                leftElement={<View style={styles.itemTableContainer}>
                  <View style={[styles.itemTitleQid, {backgroundColor: '#99b2ff'}]}>
                    <Text style={{
                    fontWeight: 'bold',
                    color: 'blue',
                    textDecorationLine: 'underline'
                  }}>{questionnaire.data.id}</Text></View>
                  <View
                    style={[styles.itemTitleFid, {backgroundColor: '#99b2ff'}]}><Text>{questionnaire.data.familyId}</Text></View>
                  <View
                    style={[styles.itemTitleDate, {backgroundColor: '#99b2ff'}]}><Text>{questionnaire.data.date}</Text></View>
                </View>
                }
              />
            )
          })}</View>:null}
          <MenuButton buttonText={'צור שאלון חדש'}
                      color={'#1194f6'}
                      TextColor={'black'}
                      fontSize={20}
                      onPress={this.createQuestionnaire}/>
          {this.state.QuestionnaireCreated?
            <View>
              <View style={{alignSelf: "center"}}><Text style={{
                fontWeight: 'bold',
                textDecorationLine: 'underline'
              }}>שאלון מוכן למילוי</Text></View>
              <ListItem
                onPress={()=>this.loadResultsOf(this.props.savedQuestionnaires[this.props.savedQuestionnaires.length-1])}
                containerStyle={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingBottom: 0,
                  paddingTop: 0
                }}
                leftElement={<View style={styles.itemTableContainer}>
                  <View style={[styles.itemTitleQid, {backgroundColor: '#99b2ff'}]}>
                    <Text style={{
                      fontWeight: 'bold',
                      color: 'blue',
                      textDecorationLine: 'underline'
                    }}>{this.props.savedQuestionnaires[this.props.savedQuestionnaires.length-1].data.id}</Text></View>
                  <View
                    style={[styles.itemTitleFid, {backgroundColor: '#99b2ff'}]}><Text>
                    {this.props.savedQuestionnaires[this.props.savedQuestionnaires.length-1].data.familyId}</Text></View>
                  <View
                    style={[styles.itemTitleDate, {backgroundColor: '#99b2ff'}]}><Text>
                    {this.props.savedQuestionnaires[this.props.savedQuestionnaires.length-1].data.date}</Text></View>
                </View>
                }
              />
            </View>:null}
        </View>
        <View style={styles.buttonsContainer}>
          <MenuButton buttonText={'התחל שאלון'}
                      color={this.state.QuestionnaireCreated?'#1194f6':'#b2b2b2'}
                      TextColor={this.state.QuestionnaireCreated?'black':'#5c5c5c'}
                      fontSize={20}
                      onPress={this.state.QuestionnaireCreated?this.startNew:null}/>
          <MenuButton buttonText={'חזור'}
                      color={'#f6504c'}
                      TextColor={'black'}
                      fontSize={20}
                      onPress={this.cancelQuiz}/>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    savedQuestionnaires: state.userData.savedQuestionnaires,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createQuestionnaire: () => dispatch(actions.saveQuestionnaire()),
    loadQuestionnaire: (questionnaire)=>dispatch(actions.loadResults(questionnaire))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireSignin)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttonsContainer: {

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection: 'row'
  },
  tableContainer: {},
  screenName: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  itemTableContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
    marginRight: 260,
    width: Dimensions.get('window').width * 0.75,

  },
  itemTitleQid: {
    width: Dimensions.get('window').width * 0.20,
    borderWidth: 1,
    borderRadius: 1,
    borderStyle: 'dotted',
    borderColor: 'black',
    borderLeftColor: 'white',
    alignItems: 'center'
  },
  itemTitleFid: {
    width: Dimensions.get('window').width * 0.25,
    borderWidth: 1,
    borderRadius: 1,
    borderStyle: 'dotted',
    borderColor: 'black',
    alignItems: 'center'
  },
  itemTitleDate: {
    width: Dimensions.get('window').width * 0.30,
    borderWidth: 1,
    borderRadius: 1,
    borderStyle: 'dotted',
    borderColor: 'black',
    alignItems: 'center'
  },

})
//<Text style={styles.screenName}>רישום נבחן</Text>
//<MKTextField
//tintColor={MKColor.Lime}
//textInputStyle={{color: MKColor.Orange}}
//placeholder={"שם פרטי"}
// />
//<MKTextField
// tintColor={MKColor.Lime}
// textInputStyle={{color: MKColor.Orange}}
// placeholder={"שם משפחה"}
// />
//<MKTextField
//tintColor={MKColor.Lime}
//textInputStyle={{color: MKColor.Orange}}
//placeholder={"גיל"}
//keyboardType={"number-pad"}
//  />
