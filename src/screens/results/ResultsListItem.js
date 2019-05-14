import * as React from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'
import { ListItem ,Icon} from 'react-native-elements'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class ResultsListItem extends React.Component {
  state = {
    loadedResults: Object.values(this.props.mainResults),
    showSubSections: false,
    showQuestions: [],
    subSections: this.props.subSections
  }

  toggleSubSections = () => {
    this.setState({
      showSubSections: !this.state.showSubSections
    })
  }
  toggleQuestions = sectionIndex => {
    let questionIndexes = this.state.showQuestions
    let index = questionIndexes.indexOf(sectionIndex)
    if (index !== -1) {
      questionIndexes.splice(index, 1)
    }
    else {
      questionIndexes.push(sectionIndex)
    }
    this.setState({
      showQuestions: questionIndexes
    })
  }

  renderSubSections = mainSection => {
    return (mainSection.map((section, index) => {
      if (section.name) {
        return (<View key={index * 20}><ListItem
          onPress={section.questions ? () => this.toggleQuestions(section.index) : null}
          containerStyle={{flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 0, paddingTop: 0}}
          leftIcon={section.questions ? {
            name: this.state.showQuestions.indexOf(section.index) !== -1 ? 'chevron-up' : 'chevron-down',
            type: 'evilicon'
          } : null}
          rightElement={<View style={styles.itemTextContainer}>
            <View
              style={[styles.itemTitleContainer, {backgroundColor: '#cbcbcb'}]}><Text>{section.shortName}</Text></View>
            <View
              style={[styles.itemScoreContainer, {backgroundColor: '#cbcbcb'}]}><Text>{this.props.mainResults[section.index].sum}</Text></View>
          </View>}
        />
          {
            this.state.showQuestions.indexOf(section.index) !== -1 ?
              this.renderQuestions(section.questions, section.index) : null}
        </View>)
      }
    }))
  }

  renderQuestions = (questions, sectionIndex) => {
    let questionsIndex = sectionIndex
    if (sectionIndex.length < 3) {
      questionsIndex = sectionIndex + '1'
    }

    return (questions.map((question, index) => {
      if (question.name) {
        return (<ListItem
          key={index * 20}
          containerStyle={{flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 0, paddingTop: 0}}
          rightElement={<View style={styles.itemTextContainer}>
            <Icon
              size={20}
              name='dot-single'
              type='entypo'
              iconStyle={{paddingTop:4}}
            />
            <View
              style={[styles.itemTitleContainer, {backgroundColor: '#f3f3f3'}]}>
              <Text>{question.shortName}</Text>
            </View>
            <View
              style={[styles.itemScoreContainer, {backgroundColor: '#f3f3f3'}]}>
              <Text>{this.props.mainResults[questionsIndex].results[question.questionNumber].show}</Text>
            </View>
          </View>}
        />)
      }
    }))
  }

  render () {
    return (
      <View style={styles.container} key={this.props.key}>
        <ListItem
          onPress={this.props.subSections || this.props.subQuestions ? this.toggleSubSections : null}
          containerStyle={{flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 0, paddingTop: 0}}
          leftIcon={this.props.subSections || this.props.subQuestions ? {
            name: this.state.showSubSections ? 'chevron-up' : 'chevron-down',
            type: 'evilicon'
          } : null}
          rightElement={<View style={styles.itemTextContainer}>
            <View
              style={[styles.itemTitleContainer, {backgroundColor: '#99b2ff'}]}><Text>{this.props.name}</Text></View>
            <View
              style={[styles.itemScoreContainer, {backgroundColor: '#99b2ff'}]}><Text>{this.props.score}</Text></View>
          </View>}
        />
        {this.state.showSubSections ?
          this.props.subQuestions ?
            this.renderQuestions(this.props.subQuestions, this.props.sectionIndex) :
            this.renderSubSections(this.props.subSections) :
          null}

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

export default connect(mapStateToProps, mapDispatchToProps)(ResultsListItem)

ResultsListItem.propTypes = {
  subSections: PropTypes.array,
  subQuestions: PropTypes.array,
  sectionIndex: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
  key: PropTypes.string

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemTextContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
    width: Dimensions.get('window').width * 0.70,

  },
  itemTitleContainer: {
    width: Dimensions.get('window').width * 0.50,
    borderWidth: 1,
    borderRadius: 1,
    borderStyle: 'dotted',
    borderColor: 'black',
    borderLeftColor: 'white'
  },
  itemScoreContainer: {
    width: Dimensions.get('window').width * 0.20,
    borderWidth: 1,
    borderRadius: 1,
    borderStyle: 'dotted',
    borderColor: 'black',
    alignItems: 'center'
  },
})
//   <View style={styles.container} key={this.props.key}>
// <ListItem
// onPress={this.props.subSections?this.toggleSubSections:null}
// containerStyle={{flexDirection: 'row', justifyContent: 'space-between',paddingBottom:0,paddingTop:0}}
// leftIcon={this.props.subSections?{name:this.state.showSubSections?'chevron-up':'chevron-down', type: 'evilicon'}:null}
// rightElement={<View style={styles.itemTextContainer}>
//   <View style={[styles.itemTitleContainer,{backgroundColor: '#99b2ff'}]}><Text>{this.props.name}</Text></View>
//   <View style={[styles.itemScoreContainer,{backgroundColor: '#99b2ff'}]}><Text>{this.props.score}</Text></View>
// </View>}
// />
// {this.state.showSubSections ?
//   this.state.subSections.map((section, index) => {
//     if (section.name){
//       return (<ListItem
//         key={index*20}
//         containerStyle={{flexDirection: 'row', justifyContent: 'space-between',paddingBottom:0,paddingTop:0}}
//
//         rightElement={<View style={styles.itemTextContainer}>
//           <View style={[styles.itemTitleContainer,{backgroundColor: '#cbcbcb'}]}><Text>{section.name}</Text></View>
//           <View style={[styles.itemScoreContainer,{backgroundColor: '#cbcbcb'}]}><Text>{this.props.mainResults[section.index].sum}</Text></View>
//         </View>}
//       />)}
//   }) : null}
// </View>
