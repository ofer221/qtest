import * as React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import ListResults from './ListResults'
const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ff4081' }]}>
    <ListResults/>
  </View>
);
const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);

export default class ResultsPage extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'תמונת מצב נוכחית' },
      { key: 'second', title: 'תמונת מצב לאורך זמן' },
    ],
  };

  static navigationOptions = {
    header: null
  }


  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute,
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
