import React, { Component } from 'react'
import { TouchableNativeFeedback, Text, View, StyleSheet, Dimensions } from 'react-native'

import PropTypes from 'prop-types'
export default class MenuButton extends Component<Props> {

  constructor (props) {
    super(props)
    this.state = {
      btnWidth: 0,
statusLine:[]
    }
  }

  measureBtnView (event) {
    console.log('event properties: ', event)
    console.log('width: ', event.nativeEvent.layout.width)
    //this.props.btnWidth=event.nativeEvent.layout.width
  }

  renderStatus=(sum,done)=>{
let status = []
    for(let i =sum;i>=0;i--){
    if(i>done){
      status.push(0)
    } else if(i<done){
      status.push(1)    }
    }

return status

}

  render () {

    let statusLine =[]
    {if(this.props.btnWidth || this.props.subBtnWidth){
      statusLine = this.renderStatus(this.props.numOfQuestions,this.props.questionsDone)
    }}

    return (<TouchableNativeFeedback onPress={this.props.onPress}>
        <View

          style={[styles.buttonContainer,
            {backgroundColor: this.props.color, height: this.props.btnHeight, padding: this.props.btnPadding || 8}]}>

          <Text style={[styles.text, {color: this.props.TextColor, fontSize: this.props.fontSize}]}>
            {this.props.buttonText}
          </Text>

          {this.props.btnWidth || this.props.subBtnWidth ? <View
            style={[styles.statusBox, {width: (this.props.btnWidth || this.props.subBtnWidth) - 50}]}>
            {statusLine.map((status,index)=>{
              return(
                <View key={index} style={[styles.statusBoxItem,{backgroundColor: status===1?'green':null,width:((this.props.btnWidth || this.props.subBtnWidth) - 50)/statusLine.length}]}></View>
              )
            })}
          </View> : null}
        </View>
      </TouchableNativeFeedback>
    )
  }
}

MenuButton.propTypes = {
  onPress: PropTypes.func,
  color: PropTypes.string,
  TextColor: PropTypes.string,
  buttonText: PropTypes.string,
  fontSize: PropTypes.number,
  btnHeight: PropTypes.number,
  btnPadding: PropTypes.number,
  btnWidth: PropTypes.number,
  subBtnWidth: PropTypes.number,
  numOfQuestions:PropTypes.number,
  questionsDone:PropTypes.number,
}

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 8,
    margin: 5,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',

    flexDirection: 'column-reverse',

  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
    direction: 'rtl',
  },
  statusBox: {
    borderWidth: 0.2,
    borderColor: 'black',
    height: 4,
    flexDirection: 'row',
    alignSelf: 'center',
    // marginRight: 5,
    // marginLeft: 5,
    // width:Dimensions.get('window').width -30,
    // width:ww.width,
    position: 'absolute'
  },
  statusBoxItem: {
    borderWidth: 0.4,
    borderColor: 'black',
//width: ww.width/6
  }
})

//export default MenuButton
