import React, { Component } from 'react'
import { TouchableNativeFeedback, View, StyleSheet, Dimensions, PixelRatio, ScrollView } from 'react-native'
import * as NativComponent from 'react-native'
// import PropTypes from 'prop-types'
// import MenuButton from '../menuButton/MenuButton'
// import { Button,Icon } from 'react-native-elements'
//import Icon from 'react-native-vector-icons/FontAwesome'
import { Icon } from 'react-native-elements'
import { BarChart, Grid, YAxis } from 'react-native-svg-charts'
import { Text, Svg, Defs, LinearGradient, Stop, TSpan, G } from 'react-native-svg'
import * as scale from 'd3-scale'
import * as structure from '../../assets/structure'
import { QuestionnaireFooter } from '../../components'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'

class GraphResults extends Component<Props> {

  state = {
    data: {},
    mainTitle: {name: '', result: ''},
    loadingFinished: false,
    dataStack: [],
    titleStack: [],
    sectionStack: []
  }
  componentDidMount = () => {
    this.loadData(structure.sections[this.props.sectionNumber - 1])
  }
  goBack = () => {
    let tempStack = this.state.sectionStack
    if (tempStack.length === 1) {
      this.props.toggleList()
    }
    else {
      tempStack.pop()
      let lastSection = tempStack.pop()
      this.setState({
        ...this.state,
        sectionStack:tempStack
      },()=>{
        this.loadData(lastSection)
      })


    }
  }
  loadData = (section) => {
    let tempSectionStack = this.state.sectionStack
    tempSectionStack.push(section)
    this.setState({
      ...this.state,
      mainTitle: {name: section.name, result: this.props.results[section.index].sum},
      loadingFinished: false,
      sectionStack: tempSectionStack
    })
    let loadedData = []
    if (section.sections) {

      loadedData = section.sections.map((subSection, index) => {
        return (
          {
            value: Number(this.props.mainResults[subSection.index].sum),
            label: subSection.shortName,
            svg: {
              fill: subSection.level === '2' ? subSection.ColorScheme[0] : section.ColorScheme[0],
              onPress: () => this.loadData(subSection),
            },
          }
        )
      })
    }
    else if (section.questions) {
      loadedData = section.questions.map((question, index) => {
        let sectionIndex = section.index
        if (section.index.length < 3) {
          sectionIndex = section.index + '1'
        }
        return (
          {
            value: this.props.mainResults[sectionIndex].results[question.questionNumber].show,
            label: question.shortName,
            svg: {
              fill: 'red',
              //onPress: () => this.loadData(subSection),
            },
          }
        )
      })
    }

    loadedData.push({
      value: 100,
      svg: {
        fill: 'transparent',
      }
    })
    loadedData.unshift({
      value: 0,
      svg: {
        fill: 'transparent',
      }
    })
    // let tempStack = this.state.dataStack
    // tempStack.concat(loadedData)
    this.setState({
      ...this.state,
      data: loadedData,
      loadingFinished: true,
    })
  }
  chooseColor = (score) => {
    switch (score) {

    }
  }

  redColorScheme = [
    'rgba(255,102,51,0.7)',
    'rgba(255,51,0,0.7)',
    'rgba(255,0,0,0.7)',
    'rgba(204,51,51,0.7)',
    'rgba(204,0,0,0.7)']
  greenColorScheme = [
    'rgba(0,255,102,0.7)',
    'rgba(0,255,51,0.7)',
    'rgba(0,255,0,0.7)',
    'rgba(0,204,0,0.7)',
    'rgba(0,153,0,0.7)']

  render () {

    const CUT_OFF = 20
    const Labels = ({x, y, bandwidth, data}) => {
      return (
        data.map((bar, index) => {
          if (bar.label) {
            let wordArr = bar.label.split(' ')
            return (
              <Text
                key={index}
                x={x(index) + (bandwidth / 2)}
                //y={ bar.value < CUT_OFF ? y(bar.value) - 10 : y(bar.value) + 15 }
                y={y(-2)}
                fontSize={12}
                //fill={ bar.value >= CUT_OFF ? 'white' : 'black' }
                fill={'black'}
                alignmentBaseline={'middle'}
                textAnchor={'middle'}
              >
                {wordArr.map((word, ind) => (
                  <TSpan key={ind} x={x(index) + (bandwidth / 2)} dy="15">{word.split('').reverse().join('')}</TSpan>
                ))}
              </Text>

            )
          }
        })
      )
    }
    const contentInset = {top: 30, bottom: 100}
    return (
      <View style={styles.container}>
        <Icon
          size={15}
          raised
          name='list-bullet'
          type='foundation'
          color={'#ff9214'}
          onPress={this.props.toggleList}
        />
        <View style={styles.titleContainer}>
          <NativComponent.Text style={styles.titleText}>{this.state.mainTitle.name}</NativComponent.Text>
          <NativComponent.Text style={styles.titleScoreText}>{this.state.mainTitle.result}</NativComponent.Text>
        </View>
        {this.state.loadingFinished ?
          <View style={{flexDirection: 'row', height: 300, paddingVertical: 16}}>

            <YAxis
              data={this.state.data}
              contentInset={contentInset}
              svg={{
                fill: 'grey',
                fontSize: 10,
              }}
              yMin={0}
              yAccessor={({item}) => item.value}
              numberOfTicks={10}
            />
            <BarChart
              style={{flex: 1, marginLeft: 16}}
              data={this.state.data}
              yAccessor={({item}) => item.value}
              contentInset={contentInset}
              spacingInner={0.4}
            >
              <Grid/>
              <Labels/>
            </BarChart>
          </View>
          : null}
        <QuestionnaireFooter rightBtnText={'חזור'}
                             rightBtnPress={this.goBack}
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
GraphResults.propTypes = {

  sectionNumber: PropTypes.number,
  results: PropTypes.object,
  toggleList: PropTypes.func,
  footerBackClick:PropTypes.func

}
const mapStateToProps = state => {
  return {
    mainResults: state.questionnaire.mainResults,
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(GraphResults)
const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  titleContainer: {

    alignSelf: 'center'
  },
  titleText: {
    color: 'black',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontSize: 20,
    textAlign: 'center'
  },
  titleScoreText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center'
  },
  GraphContainer: {
    flex: 1,
    flexDirection: 'row',
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'black'
  },
  sideIndicator: {},
  chartItem: {
    width: 15,
    height: 200,
    borderTopEndRadius: 50,
    backgroundColor: 'red',
    marginLeft: 15,

  },
  chartItemTitle: {
    transform: [{rotate: '90deg'}]
  },
  levelIndicator: {
    borderTopWidth: 2,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderColor: 'black',
    height: 70,
    width: 15
  }
})

//   <ScrollView style={styles.container}>
// <View style={styles.titleContainer}><Text>Section name</Text></View>
// <View style={styles.GraphContainer}>
// <View style={styles.sideIndicator}>
// <View style={styles.levelIndicator}/>
// <View style={styles.levelIndicator}/>
// <View style={styles.levelIndicator}/>
// <View style={styles.levelIndicator}/>
// <View style={styles.levelIndicator}/>
// </View>
// <View><View style={styles.chartItem}><Text>chartItemTitle</Text></View></View>
// </View>
// </ScrollView>

//
// const ppp = this.props.tableData.map((item,index)=>{
//   return (
//     {
//       value: item.value,
//       label: item.name,
//       svg: {
//         fill: item.color,
//         onPress:()=> alert(item.name),
//       },
//     }
//   )
// })
// const data = [
//   {
//     value: 0,
//     svg: {
//       fill: 'transparent',
//       onPress: () => alert('red'),
//     },
//   },
//   {
//     value: 10,
//     label: 'One',
//     svg: {
//       fill: 'rgba(255,0,255,0.2)',
//       onPress: () => alert('red'),
//     },
//   },
//   {
//     value: 20,
//     label: 'tow',
//     svg: {
//       fill: 'rgba(51,204,204,0.7)',
//       onPress: () => alert('blue'),
//     },
//   },
//   {
//     value: 30,
//     label: 'three',
//     svg: {
//       fill: 'rgba(255,153,51,0.7)',
//       onPress: () => alert('green'),
//     },
//   },
//   {
//     value: 28,
//     label: 'three',
//     svg: {
//       fill: 'rgba(255,51,102,0.7)',
//       onPress: () => alert('green'),
//     },
//   },
//   {
//     value: 80,
//     label: 'three',
//     svg: {
//       fill: 'rgba(51,204,102,0.7)',
//       onPress: () => alert('green'),
//     },
//   },
//   {
//     value: 100,
//     svg: {
//       fill: 'transparent',
//       onPress: () => alert('green'),
//     },
//   },
// ]
