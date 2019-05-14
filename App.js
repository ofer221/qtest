/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import NavigationService from './src/navigationSetup/navigationService'

import {
  Login,
  AuthLoading,
  Signup,
  Main,
  QuestionnaireSignin,
  QuestionnaireMain,
  Question,
  History,
  Info,
  Directions,
  FamilyDetails,
  FamilyChangeAbility,
  HouseholdAssessment,
} from './src/screens'
import  MainResults from './src/screens/results/MainResults'
import ResultsPage from './src/screens/results/ResultsPage'
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator
} from 'react-navigation'

const AuthStack = createStackNavigator({SignIn: Login, Signup: Signup})

const mainStack = createStackNavigator({Main: Main, Info: Info, Instructions: Directions})
const resultsStack = createStackNavigator({MainResults: MainResults, ResultsPage: ResultsPage})
const testStack = createStackNavigator({
  QuestionnaireMain: QuestionnaireMain,
  FamilyDetails:FamilyDetails,
  FamilyChangeAbility:FamilyChangeAbility,
  HouseholdAssessment:HouseholdAssessment,
  Question: Question})



const AppNav = createDrawerNavigator({
  Main: {screen: mainStack},
  Questionnaire: {screen: QuestionnaireSignin},
  History: {screen: History},
  testStack:testStack,
  Results:resultsStack
}, {drawerType: 'slide'})

const MainNav = createAppContainer(createSwitchNavigator(
  {
    InitApp: AuthLoading,
    AppNav: AppNav,
    Auth: AuthStack,
    questionnaire:QuestionnaireSignin,
    //testStack:testStack
  },
  {
    initialRouteName: 'InitApp',
  }
))

export default class App extends React.Component {
  // ...

  render () {
    return (
      <MainNav
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef)
        }}
      />
    )
  }
}
