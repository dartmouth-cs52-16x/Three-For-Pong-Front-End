/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  AlertIOS,
} from 'react-native';


class ThreeForPong extends Component {
  _onPressButtonGet() {
    fetch('https://threeforpong.herokuapp.com/api/locations/')
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
      AlertIOS.alert(
        "Response " + responseData[0].location_name
      )
    })
    .done();
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Three For Pong!
        </Text>
        <Text style={styles.instructions}>
          Click here to see available games!
        </Text>
        <TouchableHighlight onPress={this._onPressButtonGet} style={styles.button}>
          <Text>GET</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkgreen',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    color: 'white',
  },
  button: {
        backgroundColor: '#eeeeee',
        padding: 10,
        marginRight: 5,
        marginLeft: 5,
    }
});

AppRegistry.registerComponent('ThreeForPong', () => ThreeForPong);
