import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { MenuButton,MenuButtonWithSubBtns } from '../../components'
import { QuestionnaireFooter } from '../../components'

export default class MainResults extends Component<Props> {

  static navigationOptions = {
    headerTitle: 'תוצאות'
  }
  goToResults = () => {
    this.props.navigation.push('ResultsPage')
  }
  backToQuestionnaire=()=>{
    this.props.navigation.navigate('testStack')
  }


  render () {
    return (
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <Text style={styles.cardText}>תוצאות ראשי</Text>
        </View>
        <View>
        <MenuButton buttonText={'דוח משפחה'}
                    color={'#1194f6'}
                    TextColor={'black'}
                    fontSize={20}
                    onPress={this.goToResults}/>
        <MenuButton buttonText={'דוח משפחות'}
                    color={'#1194f6'}
                    TextColor={'black'}
                    fontSize={20}
                    onPress={this.goToResults}/>
        </View>
        <QuestionnaireFooter rightBtnText={'חזור'}
                             rightBtnPress={this.backToQuestionnaire}
                             hideMiddle={true}
                             hideLeft={true}
                             rightBtnIcon={'arrow-right'}
                             leftBtnText={'???'}
                             iconTypeLeft={'foundation'}
                             leftBtnIcon={'graph-bar'}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'space-between',
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
