import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';


export default class Info extends Component<Props> {



  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.screenName}>Info</Text>
      </View>
    );
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
});
