import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  AlertIOS,
  Alert,
  ListView,
} from 'react-native';


class Dashboard extends Component {
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
    fetch('https://threeforpong.herokuapp.com/api/listings/', {
      method: 'GET',
      headers: {
        'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1N2JhMTRkNmU5ZGZkNTIyMDAxOWYzODEiLCJpYXQiOjE0NzE4MTI5MDc0MTF9.F0l31Wl4rBIfDtQrZq1gWuDE992kV6HUn3XJDIw89Sk'
      }
    })
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
    fetch('https://threeforpong.herokuapp.com/api/listings/', {
      method: 'POST',
      headers: {
        'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1N2JhMTRkNmU5ZGZkNTIyMDAxOWYzODEiLCJpYXQiOjE0NzE4MTI5MDc0MTF9.F0l31Wl4rBIfDtQrZq1gWuDE992kV6HUn3XJDIw89Sk',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        host_user_id: '57ba14d6e9dfd5220019f381',
        num_looking_for_game: '3',
        location_id: '57ba112be9dfd5220019f380',
        start_time: 'August 10, 2015 10:00 pm'
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData)
    })
    .done();
    fetch('https://threeforpong.herokuapp.com/api/listings/', {
      method: 'GET',
      headers: {
        'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1N2JhMTRkNmU5ZGZkNTIyMDAxOWYzODEiLCJpYXQiOjE0NzE4MTI5MDc0MTF9.F0l31Wl4rBIfDtQrZq1gWuDE992kV6HUn3XJDIw89Sk'
      }
    })
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
        Need {data.num_still_needed_for_game} at {data.location.location_name}{'\n'}
        at {data.start_time}
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
    backgroundColor: '#1B676B',
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
    // color: 'black',
    borderColor: '#88C425',
    borderWidth: 1,
    borderLeftColor: 'white',
    borderRightColor: 'white',
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40,
  }
});
export default Dashboard;
