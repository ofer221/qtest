import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class AuthLoading extends Component<Props> {

  componentDidMount () {
    this.goToLogIn()
  }

  goToLogIn = () => {
    setTimeout(() => {
      this.props.navigation.navigate('Auth')
    }, 500)
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.screenName}>Auth Loading...</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  screenName: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
})
