import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { MenuButton,MenuButtonWithSubBtns } from '../../components'

export default class Main extends Component<Props> {

  static navigationOptions = {
    drawerLabel: 'Main',
    headerTitle: 'main'
  }
  goToInfo = () => {
    this.props.navigation.push('Info')
  }
  goToInstructions = () => {
    this.props.navigation.push('Instructions')
  }
  goToQuestions = () => {
    this.props.navigation.navigate('questionnaire')
  }
  goToReports = () => {
    this.props.navigation.navigate('AppNav')
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <Text style={styles.cardText}>אבחון והערכה של מצבי הזנחה במשפחה</Text>
        </View>
        <MenuButton buttonText={'הזנחת ילדים ונוער על ידי משפחותיהם'}
                    color={'#1194f6'}
                    TextColor={'black'}
                    fontSize={20}
                    onPress={this.goToInfo}/>
        <MenuButton buttonText={'הנחיות למילוי כלי האבחון'}
                    color={'#1194f6'}
                    TextColor={'black'}
                    fontSize={20}
                    onPress={this.goToInstructions}/>
        <MenuButton buttonText={'כניסה לכלי האבחון'}
                    color={'#1194f6'}
                    TextColor={'black'}
                    fontSize={20}
                    onPress={this.goToQuestions}/>
        <MenuButton buttonText={'דוחות מסכמים'}
                    color={'#1194f6'}
                    TextColor={'black'}
                    fontSize={20}/>
      </View>
    )
  }
}

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
  cardContainer: {
    margin: 10,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  }
})
