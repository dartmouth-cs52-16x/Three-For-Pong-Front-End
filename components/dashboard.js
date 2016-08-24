import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Dimensions,
  View,
  Navigator,
  TouchableHighlight,
  AlertIOS,
  Alert,
  ListView,
} from 'react-native';
import * as moment from 'moment';

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
        <Text style={styles.rowtext}>
        Need {data.num_still_needed_for_game} at {data.location.location_name}{'\n'}
        at {data.start_time}.
        </Text>
        <TouchableHighlight style={styles.joinButton}>
          <Text style={styles.joinButtonText}>></Text>
        </TouchableHighlight>
      </View>
    )
  }
  render() {
    return (

      <View style={styles.container}>
        <Text style={styles.welcome}>
          pong === life
        </Text>

      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
      />

      <TouchableHighlight style={styles.button}>
        <Text style={styles.buttonText}>CREATE GAME</Text>
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
    backgroundColor: '#1B676B',
    marginTop: 60,
  },
  welcome: {
    fontSize: 20,
    fontFamily: 'Courier',
    textAlign: 'center',
    margin: 10,
    color: 'white',
    marginBottom: -26,
  },
  row: {
    backgroundColor: 'white',
    borderColor: '#cccccc',
    borderWidth: .5,
    borderLeftColor: 'white',
    borderRightColor: 'white',
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40,
    marginRight: -5,
    marginLeft: -5,
  },
  rowtext: {
    fontSize: 22,
    color: '#363636',
    marginLeft: -20,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#88C425',
    paddingTop: 25,
    paddingBottom: 25,
    width: Dimensions.get('window').width,
  },
  joinButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: -10,
    width: 30,
    height: 80,
    marginTop: -63,
    marginLeft: 310,
  },
  joinButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B676B',
    alignSelf: 'center'
  }
});
export default Dashboard;
