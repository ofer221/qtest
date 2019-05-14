import React, {Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import { connect } from 'react-redux'
import * as actions from '../../store/actions'

 class Login extends Component<Props> {

  static navigationOptions = {
    title: 'Login',
  };
  loginHandler= ()=>{
    this.props.navigation.navigate('AppNav')
  }
  goToSignupHandler=()=>{
    this.props.navigation.push('Signup')
  }
  render() {
    return (
      <View style={styles.container}>

        <TouchableOpacity onPress={this.loginHandler}>
          <View style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.goToSignupHandler}>
          <View style={styles.goToSignupButton}>
            <Text style={styles.goToSignupText}>Go to Signup</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.authentication.userDetails,
    isLoading:state.ui.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (loginMode) => dispatch(actions.tryLogin(loginMode)),
    logout: (loginMethod) => dispatch(actions.logOut(loginMethod))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  loginButton: {
  borderColor: 'orange',
    borderWidth: 3,
    borderRadius: 20,
    padding: 10
},
  loginButtonText: {
  color: 'orange',
    fontWeight: 'bold',
    fontSize: 26
},
  goToSignupButton: {
    padding: 10
  },
  goToSignupText: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 18
  }
});
