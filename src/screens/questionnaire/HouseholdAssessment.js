import React, { Component } from 'react'
import { StyleSheet, Text, View ,ScrollView} from 'react-native'
import { MenuButton, MenuButtonWithSubBtns } from '../../components'

export default class HouseholdAssessment extends Component<Props> {

  pushScreen = (screenName,params) => {
    this.props.navigation.push(screenName,params)
  }
  buttons = {
    physicsNeglect: [
      {text: 'תזונה', click:()=> this.pushScreen('Question',{questionStack:[1,1,1]}),padding:12},
      {text: 'היגיינה', click:()=> this.pushScreen('Question'),padding:12},
      {text: 'בית', click:()=> this.pushScreen('Question'),padding:12},
      {text: 'ביגוד', click:()=> this.pushScreen('Question'),padding:12}],
    superviseNeglect: [
      {text: 'בנוכחות הורים', click:()=> this.pushScreen('Question'),padding:12},
      {text: 'בהיעדר הורים', click:()=> this.pushScreen('Question'),padding:12}],
    emotionalNeglect: [
      {text: 'גירויים     התפתחותיים', click:()=> this.pushScreen('Question'),padding:2},
      {text: 'קבלה של הילדים', click:()=> this.pushScreen('Question'),padding:12},
      {text: 'יחס הורה לילד', click:()=> this.pushScreen('Question'),padding:12},
      {text: 'דפוסי התקשורת במשפחה', click:()=> this.pushScreen('Question'),padding:2}]
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <MenuButtonWithSubBtns buttonText={'הזנחה בצרכים פיסיים'} subButtons={this.buttons.physicsNeglect}/>
        <MenuButtonWithSubBtns buttonText={'הזנחה בצרכים רפואיים'} onPress={()=> this.pushScreen('Question',{questionStack:[1,1,1]})} />
        <MenuButtonWithSubBtns buttonText={'הזנחה בצרכים חינוכיים'} onPress={()=> this.pushScreen('Question',{questionStack:[1,1,1]})} />
        <MenuButtonWithSubBtns buttonText={'הזנחה בצרכי השגחה ופיקוח'} subButtons={this.buttons.superviseNeglect}/>
        <MenuButtonWithSubBtns buttonText={'הזנחה בצרכים רגשיים'} subButtons={this.buttons.emotionalNeglect}/>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
})
