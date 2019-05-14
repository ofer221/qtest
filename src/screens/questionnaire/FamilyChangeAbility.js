import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { MenuButton } from '../../components'



export default class FamilyChangeAbility extends Component<Props> {

goto=()=>{
  this.props.navigation.push('Question')
}

  render() {
    return (
      <View style={styles.container}>
        <MenuButton buttonText={'יחס הורה לילד'}
                    color={'#1194f6'}
                    TextColor={'black'}
                    fontSize={20}
                    onPress={this.goToInfo}/>
        <MenuButton buttonText={'דפוסי התקשרות במערכת יחסים בין הורה לילד'}
                    color={'#1194f6'}
                    TextColor={'black'}
                    fontSize={20}
                    onPress={this.goToInstructions}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});
