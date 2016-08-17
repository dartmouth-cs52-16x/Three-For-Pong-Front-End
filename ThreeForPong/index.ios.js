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
  ListView,
} from 'react-native';


class ThreeForPong extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        })
    };
  }
  componentDidMount(){
    this._fetchListings();
  }
  _fetchListings() {
    fetch('https://threeforpong.herokuapp.com/api/listings/')
    .then((response) => response.json())
    .then((responseData) => {
      var data = [];
      for(var i = 0; i < responseData.length; i++) {
        data.push(responseData[i]);
      }
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data)
      })
      console.log('new one');
      console.log(this.state.dataSource);
    })
  }
  _onPressButtonGet() {
    fetch('https://threeforpong.herokuapp.com/api/listings/')
    .then((response) => response.json())
    .then((responseData) => {
       AlertIOS.alert(
         "hi " + `${responseData.length}`
       )
    })
    .done();
  }
  renderRow(data) {
    return (
      <View style={styles.row}>
        <Text>
        Need: {data.listing_id}{'\n'}
        Location: at {data.location_id}{'\n'}
        Time: {data.start_time}
        </Text>
      </View>
    )
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
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
      />
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
        marginBottom: 5,
    },
  row: {
    backgroundColor: 'white',
    color: 'black',
    borderColor: 'black',
    borderWidth: 1,
  }
});

AppRegistry.registerComponent('ThreeForPong', () => ThreeForPong);
