import React, { Component } from 'react'
import { TouchableNativeFeedback, Text, View, StyleSheet, Dimensions, PixelRatio } from 'react-native'
import PropTypes from 'prop-types'
import MenuButton from '../menuButton/MenuButton'
import { connect } from 'react-redux'

const right = [{text: 'btn1'}, {text: 'btn2'}, {text: 'btn3'}, {text: 'btn4'}]
const left = [{text: 'btn3'}, {text: 'btn4'}]
let btnState = 'hide'

class MenuButtonWithSubBtns extends Component<Props> {

  constructor () {
    super()
    this.state = {
      showContent: false,
      btnWidth: 0,
      subBtnWidth: 0

    }
  }

  toggle = () => {
    this.setState({
      showContent: !this.state.showContent
    })
  }

  measureBtnView (event) {
    // console.log('event properties: ', event);
    //console.log('width: ', event.nativeEvent.layout.width)
    this.setState({btnWidth: event.nativeEvent.layout.width})

  }

  measureSubBtnView (event) {
    // console.log('event properties: ', event);
    //console.log('width: ', event.nativeEvent.layout.width)
    this.setState({subBtnWidth: event.nativeEvent.layout.width})
  }

  render () {
    return (
      <View style={styles.buttonContainer}
            onLayout={(event) => this.measureBtnView(event)}>
        <MenuButton buttonText={this.props.buttonText}
                    btnWidth={this.state.btnWidth > 0 ? this.state.btnWidth : null}
                    color={'#1194f6'}
                    TextColor={'black'}
                    fontSize={20}
                    onPress={this.props.subButtons ? () => this.toggle() : this.props.onPress}
                    numOfQuestions={this.props.numOfQuestions || 0}
                    questionsDone={this.props.questionsDone || 0}

        />
        {this.state.showContent ? <View style={styles.subButtonsContainer}>
          {this.props.subButtons?this.props.subButtons.map((btn, index) => {
            if (btn.name) {
              return (<View onLayout={(event) => this.measureSubBtnView(event)}
                            style={styles.singleButtons}
                            key={index}><MenuButton buttonText={btn.btnText}
                                                    subBtnWidth={this.state.subBtnWidth > 0 ? this.state.subBtnWidth : null}
                                                    color={'#a2dafe'}
                                                    TextColor={'black'}
                                                    fontSize={16}
                                                    btnHeight={50}
                                                    btnPadding={btn.padding}
                                                    onPress={() => this.props.subBtnPressed(btn.questionStack)}
                                                    questionStack={[3]}
                                                    numOfQuestions={this.props.mainResults[btn.index].numberOfQuestions}
                                                    questionsDone={this.props.mainResults[btn.index].done}/></View>)
            }
          }):null}

        </View> : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuButtonWithSubBtns)

MenuButtonWithSubBtns.propTypes = {
  onPress: PropTypes.func,
  color: PropTypes.string,
  TextColor: PropTypes.string,
  buttonText: PropTypes.string,
  fontSize: PropTypes.number,
  subButtons: PropTypes.array,
  subBtnPressed: PropTypes.func,
  questionStack: PropTypes.array,
  numOfQuestions: PropTypes.number,
  questionsDone: PropTypes.number,
}

const styles = StyleSheet.create({
  buttonContainer: {},
  subButtonsContainer: {

    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'flex-start',
    flexDirection: 'row'
  },
  singleButtons: {
    minWidth: Dimensions.get('window').width / 2,
    maxWidth: Dimensions.get('window').width / 2,
    justifyContent: 'center'
  }
})

