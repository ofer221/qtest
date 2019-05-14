import * as React from 'react'
import { View, StyleSheet, Text, Dimensions, ScrollView,TouchableOpacity } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'
import * as questionarie from '../../assets/theQuestionnaire'
import * as structure from '../../assets/structure'
import { connect } from 'react-redux'
import ResultsListItem from './ResultsListItem'
import GraphResults from './GraphResults'
import NavigationService from '../../navigationSetup/navigationService'
import { QuestionnaireFooter } from '../../components'

class ListResults extends React.Component {
  state = {
    showSectionOne: false,
    showSectionTow: false,
    loadedQuestionnaire: Object.values(questionarie),
    subSectionsOne: Object.values(questionarie[1]),
    subSectionsTow: Object.values(questionarie[2]),
    showGraph: false,
    loadedResults: [1, 11, 111, 112, 113, 114, 12, 121, 13, 131, 14, 141, 142, 15, 151, 152, 153, 154, 2, 21, 211, 22, 221],
    sections: [
      {sectionName: 'ff', sectionResult: '34', sectionIndex: 'dd'}
    ]
  }

  buildResults = (data) => {
    let results = {
      sectionName: '',
      sectionResult: '',
      sectionIndex: '',
      sectionLevel: '',
      subSections: [],
      questions: []
    }
  }
  // sections = [
  //   {
  //
  //     sectionName: 'ff',
  //     sectionResult: '34',
  //     sectionIndex: 'dd',
  //     subSections: [{sectionName: 'ff', sectionResult: '34', sectionIndex: 'dd'}]
  //   }
  // ]
  // componentDidMount = () => {
  //   this.loadResults()
  // }
  // loadResults = () => {
  //   const resultsLength = this.state.loadedResults.length
  //   let sectionOne = {
  //     name: '',
  //     items: []
  //   }
  //   let sectionTow = {
  //     name: '',
  //     items: []
  //   }
  //   for (let i = 0; i < resultsLength; i++) {
  //     let currentSection = this.getRefByStringIndex(this.state.loadedResults[i], questionarie)
  //
  //     console.log(currentSection.name)
  //     if (currentSection.name !== 'noname') {
  //       let resultItem = {
  //         sectionName: currentSection.name,
  //         sectionResult: this.state.loadedResults[i].sum,
  //         questionStack: this.state.loadedResults[i].questionStack || null
  //       }
  //     }
  //
  //     // this.sections.push()
  //   }
  //
  // }
  // getRefByStringIndex = (index, obj) => {
  //
  //   let arrIndex = index.toString(10).split('').map(Number)
  //   //console.log(arrIndex)
  //   let ref = obj
  //   for (let i = 0; i < arrIndex.length; i++) {
  //     ref = ref[arrIndex[i]]
  //   }
  //   return ref
  // }
//
  toggleSection = () => {
    this.setState({...this.state, showSectionOne: !this.state.showSectionOne})
  }
  toggleGraph = () => {
    this.setState({...this.state, showGraph: !this.state.showGraph})
  }
  backToQuestionnaire = () => {
    NavigationService.navigate('MainResults',null)
  }

  render () {
    return (
      <View style={styles.container}>
        {this.state.showGraph ? <GraphResults  sectionNumber={1} results={this.props.mainResults}
                                              toggleList={this.toggleGraph}/> :
          <View style={styles.container}>

          <ScrollView>


            <ListItem
              containerStyle={{flexDirection: 'row', justifyContent: 'space-between'}}
              leftElement={<View><Icon
                onPress={this.toggleGraph}
                size={20}
                raised
                name='graph-trend'
                type='foundation'
                color={'#ff9214'}
              /></View>}
              rightElement={<View style={styles.itemTextContainer}>
                <View style={styles.itemTitleContainer}><Text
                  style={styles.titleText}>{structure.sections[0].name}</Text></View>
                <View style={styles.itemScoreContainer}><Text style={[styles.titleText, {
                  textDecorationLine: 'none',
                  fontSize: 18,
                  color: 'black'
                }]}>{this.props.mainResults[1].sum}</Text></View>
              </View>}
            />
            {
              structure.sections[0].sections.map((section, index) => {
                if (section.name) {
                  return (<ResultsListItem
                    key={index}
                    name={section.shortName}
                    score={this.props.mainResults[section.index].sum}
                    subSections={section.sections ? section.sections : null}
                    subQuestions={section.questions ? section.questions : null}
                    sectionIndex={section.index}/>)
                }
              })
            }
            {/*{*/}
            {/*this.state.subSectionsOne.map((section, index) => {*/}
            {/*if (section.name) {*/}
            {/*return (<ResultsListItem*/}
            {/*key={index}*/}
            {/*name={section.name}*/}
            {/*score={this.props.mainResults[section.index].sum}*/}
            {/*subSections={section.hasSubSections === 'yes' ? Object.values(section) : null}/>)*/}
            {/*}*/}
            {/*})*/}
            {/*}*/}
            <ListItem
              containerStyle={{flexDirection: 'row', justifyContent: 'space-between'}}
              leftElement={<View><Icon
                size={20}
                raised
                name='graph-trend'
                type='foundation'
                color={'#ff9214'}
              /></View>}
              rightElement={<View style={styles.itemTextContainer}>
                <View style={styles.itemTitleContainer}><Text style={styles.titleText}>יכולת המשפחה לחולל
                  שינוי</Text></View>
                <View style={styles.itemScoreContainer}><Text style={[styles.titleText, {
                  textDecorationLine: 'none',
                  fontSize: 18,
                  color: 'black'
                }]}>{this.props.mainResults[2].sum}</Text></View>
              </View>}
            />
            {
              structure.sections[1].sections.map((section, index) => {
                if (section.name) {
                  return (<ResultsListItem
                    key={index}
                    name={section.shortName}
                    score={this.props.mainResults[section.index].sum}
                    subSections={section.sections ? section.sections : null}
                    subQuestions={section.questions ? section.questions : null}
                    sectionIndex={section.index}/>)
                }
              })
            }
            {/*{*/}
            {/*this.state.subSectionsTow.map((section, index) => {*/}
            {/*if (section.name) {*/}
            {/*return (<ResultsListItem*/}
            {/*key={index}*/}
            {/*name={section.name}*/}
            {/*score={this.props.mainResults[section.index].sum}*/}
            {/*subSections={section.hasSubSections === 'yes' ? Object.values(section) : null}/>)*/}
            {/*}*/}
            {/*})*/}
            {/*}*/}

          </ScrollView>
            <QuestionnaireFooter rightBtnText={'חזור'}
                                 rightBtnPress={this.backToQuestionnaire}
                                 hideMiddle={true}
                                 hideLeft={true}
                                 rightBtnIcon={'arrow-right'}
                                 leftBtnText={'???'}
                                 iconTypeLeft={'foundation'}
                                 leftBtnIcon={'graph-bar'}
            />
          </View>}

        {/*<TouchableOpacity onPress={this.backToQuestionnaire}><Text style={{*/}
          {/*textDecorationLine: 'none',*/}
          {/*fontWeight: 'bold',*/}
          {/*fontSize: 18,*/}
          {/*color: 'blue'*/}
        {/*}}>{"<< חזרה לשאלון"}</Text></TouchableOpacity>*/}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    mainResults: state.questionnaire.mainResults,
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ListResults)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'space-between',
    backgroundColor: 'white'
  },
  itemTextContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
    width: Dimensions.get('window').width * 0.70,

  },
  itemTitleContainer: {
    width: Dimensions.get('window').width * 0.50,
    // borderWidth: 1,
    // borderRadius: 1,
    // borderStyle: 'dotted',
    // borderColor: 'black',
    // borderLeftColor: 'white'
  },
  itemScoreContainer: {
    width: Dimensions.get('window').width * 0.20,
    // borderWidth: 1,
    // borderRadius: 1,
    // borderStyle: 'dotted',
    // borderColor: 'black',
    // alignItems: 'center'
  },
  titleText: {
    color: '#03009c',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontSize: 14
  }
})
