import React, { Component } from 'react'
import { TouchableNativeFeedback, Text, View, StyleSheet, Dimensions, PixelRatio, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import MenuButton from '../menuButton/MenuButton'
import { Button,Icon } from 'react-native-elements'
//import Icon from 'react-native-vector-icons/FontAwesome'

export default class QuestionnaireFooter extends Component<Props> {

  constructor (props) {
    super(props)

  }

  toggle = () => {

  }

  render () {
    return (
      <View style={styles.footer}>
        <View style={styles.bottomButtons}>
          {this.props.hideRight?null:
          <Button
            icon={
              <Icon
                name={this.props.rightBtnIcon}
                size={15}
                color='white'
                type={this.props.iconTypeRight||'font-awesome'}
              />
            }
            title={this.props.rightBtnText}
            iconRight
            buttonStyle={[styles.bottomButtonsStyle, {borderBottomRightRadius: 20, borderTopRightRadius: 20}]}
            onPress={this.props.rightBtnPress}
          />}
          {this.props.hideMiddle?null:
          <Button
            icon={
              <Icon
                name={this.props.middleBtnIcon}
                size={15}
                color='white'
                type={this.props.iconTypeMiddle||'font-awesome'}
              />
            }
            title={this.props.middleBtnText}
            buttonStyle={styles.bottomButtonsStyle}
            onPress={this.props.middleBtnPress}
          />}
          {this.props.hideLeft?null:
          <Button
            icon={
              <Icon
                name={this.props.leftBtnIcon}
                size={15}
                color='white'
                type={this.props.iconTypeLeft||'font-awesome'}
              />
            }
            iconLeft
            title={this.props.leftBtnText}
            buttonStyle={[styles.bottomButtonsStyle, {borderBottomLeftRadius: 20, borderTopLeftRadius: 20}]}
            onPress={this.props.leftBtnPress}
          />}
        </View>
      </View>
    )
  }
}

QuestionnaireFooter.propTypes = {
  rightBtnText: PropTypes.string,
  rightBtnIcon: PropTypes.string,
  rightBtnPress: PropTypes.func,
  middleBtnText: PropTypes.string,
  middleBtnIcon: PropTypes.string,
  middleBtnPress: PropTypes.func,
  leftBtnText: PropTypes.string,
  leftBtnIcon: PropTypes.string,
  leftBtnPress: PropTypes.func,
  hideRight: PropTypes.bool,
  hideMiddle: PropTypes.bool,
  hideLeft: PropTypes.bool,
  iconTypeRight:PropTypes.string,
  iconTypeMiddle:PropTypes.string,
  iconTypeLeft:PropTypes.string
}

const styles = StyleSheet.create({
  bottomButtons: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row-reverse',
    margin: 3,
  },
  bottomButtonsStyle: {
    backgroundColor: 'rgba(0,153,255,0.7)',
    margin: 10,
    padding: 3,
    borderRadius: 0,
    borderColor: 'black',
    borderWidth: 1,
  },
  footer: {
    backgroundColor: 'rgba(255,204,51,0.7)',
    width: Dimensions.get('window').width,

  }
})

