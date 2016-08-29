import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Dimensions,
  View,
  Image,
  Navigator,
  TouchableHighlight,
  AlertIOS,
  Alert,
  ListView,
} from 'react-native';
import moment from 'moment';
import CreateGame from './create_game';
import Settings from './settings';
import storage from 'react-native-simple-store';

let token = storage.get('token');

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      token: `${token._65}`,
      user_id: this.props.user_id,
      user_info: null,
      db: [],
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      in_game: 1
    };
    this._onCreateButtonPress = this._onCreateButtonPress.bind(this);
    this._renderRow=this._renderRow.bind(this);
    this._onSettingsButtonPress = this._onSettingsButtonPress.bind(this);
  }

  componentWillMount() {
    this._fetchListings();
    this.buildUserInfo();
  }

  buildUserInfo () {
    var user_info = {};
    var user_id = this.state.user_id;
    console.log(`token is ${token._65}`);
    console.log(`user id: ${user_id}`);
    fetch(`https://threeforpong.herokuapp.com/api/users/${user_id}`, {
      method:'GET',
      headers: {
        'Authorization': `${token._65}`
      }
    })
    .then((response) => response.json())
    .then((responseData) => {
      user_info = responseData;
      this.setState({
        user_info: user_info
      });
    })
    .catch((error) => {
      console.log('woah');
    })
}

  _fetchListings() {
    fetch('https://threeforpong.herokuapp.com/api/listings/', {
      method: 'GET',
      headers: {
        'Authorization': this.state.token
      }
    })
    .then((response) => response.json())
    .then((responseData) => {
      // var data = [];
      for(var i = 0; i < responseData.length; i++) {
        this.state.db.push(responseData[i]);
      }
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.state.db)
      })
    })
  }

  _onCreateButtonPress(){
    if (!this.state.user_info.can_host){
      AlertIOS.alert(
        "Please change your host settings in order to create a game"
      );
      return;
    }
    this.props.navigator.push({
      title: 'Create Game',
      component: CreateGame,
      passProps: {user_id: this.state.user_id, user_info: this.state.user_info}
    });
  }
_onSettingsButtonPress(){
  this.props.navigator.push({
    title: 'Settings',
    component: Settings
  });
}
  _renderRow(data, sectionID, rowID) {
    if (this.state.in_game === 1) {
    return (
      <View style={styles.row}>
        <Text style={styles.rowtext}>
        Need {data.num_still_needed_for_game} at {data.location.location_name} at {moment(data.start_time).format("h:mm a")}
        </Text>
        <TouchableHighlight style={styles.joinButton} underlayColor='#99d9f4' onPress={() => {
          var listing = data.listing_id;
          fetch(`https://threeforpong.herokuapp.com/api/listings/join/${listing}`, {
            method: 'POST',
            headers: {
              'Authorization': this.state.token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              user_id: this.state.user_id
            })
          })
          .then((response) => response.json())
          .then((responseData) => {
            console.log(responseData);
            var new_num_needed = (this.state.db[rowID].num_still_needed_for_game -1);
            var newDB = [...this.state.db];
            newDB[rowID] = {...newDB[rowID], num_still_needed_for_game: new_num_needed};
            console.log(newDB[rowID].num_still_needed_for_game);
            const newsource = this.state.dataSource.cloneWithRows(newDB);
            this.setState({
              db: newDB,
              dataSource: newsource,
              in_game: 0
            });
          })
          .done();
        }}>
          <Text style={styles.joinButtonText}>+</Text>
        </TouchableHighlight>
      </View>
    )
  } else {
    return (
      <View style={styles.row}>
        <Text style={styles.rowtext}>
        Need {data.num_still_needed_for_game} at {data.location.location_name} at {moment(data.start_time).format("h:mm a")}
        </Text>
        <TouchableHighlight style={styles.joinButton} underlayColor='#99d9f4' onPress={() => {
          var listing = data.listing_id;
          fetch(`https://threeforpong.herokuapp.com/api/listings/leave/${listing}`, {
            method: 'POST',
            headers: {
              'Authorization': this.state.token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              user_id: this.state.user_id
            })
          })
          .then((response) => response.json())
          .then((responseData) => {
            console.log(responseData);
            var new_num_needed = (this.state.db[rowID].num_still_needed_for_game +1);
            var newDB = [...this.state.db];
            newDB[rowID] = {...newDB[rowID], num_still_needed_for_game: new_num_needed};
            console.log(newDB[rowID].num_still_needed_for_game);
            const newsource = this.state.dataSource.cloneWithRows(newDB);
            this.setState({
              db: newDB,
              dataSource: newsource,
              in_game: 1
            });
          })
          .done();
        }}>
          <Text style={styles.joinButtonText}>Leave</Text>
        </TouchableHighlight>
      </View>
    )
  }
  }
  render() {
    return (
      <View style={styles.container}>
      <TouchableHighlight style={styles.header}>
        <Image source={require('../3forponglogo.png')} style={styles.headerLogo} />
      </TouchableHighlight>


      <TouchableHighlight style={styles.settingsButton} onPress={this._onSettingsButtonPress}>
        <Text style={styles.settingsButtonText}>settings</Text>
      </TouchableHighlight>

      <Text style={styles.nontext}>pong === life</Text>

      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
      />

      <TouchableHighlight onPress={this._onCreateButtonPress} style={styles.button} underlayColor='#99d9f4'>
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
    backgroundColor: '#f0f0f0',
    marginTop: 100,
  },
  row: {
    backgroundColor: 'white',
    borderColor: '#f0f0f0',
    borderWidth: 4,
    borderLeftColor: 'white',
    borderRightColor: 'white',
    paddingTop: 27,
    paddingBottom: 5,
    paddingLeft: 40,
    paddingRight: 40,
    marginRight: -5,
    marginLeft: -5,
  },
  rowtext: {
    fontSize: 20,
    color: '#363636',
    marginLeft: -20,
    marginBottom: -7,
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
  nontext: {
    marginBottom: -15,
    color: 'gray',
    fontSize: 16,
    fontFamily: 'Courier',
  },
  joinButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 20,
    width: 50,
    height: 30,
    marginTop: -20,
    marginLeft: 270,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  joinButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B676B',
    alignSelf: 'center'
  },
  header: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#1B676B',
    paddingTop: 35,
    paddingBottom: 25,
    width: Dimensions.get('window').width,
    marginTop: -40,
  },
  headerLogo: {
    maxWidth: 50,
    maxHeight: 50,
    marginTop: -15,
    marginBottom: -475,
    marginLeft: 15,
    alignSelf: 'flex-start',
  },
  settingsButton: {
    marginBottom: 25,
    marginTop: -50,
    marginLeft: 270,
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 1,
  },
  settingsButtonText: {
    fontSize: 14,
    color: 'white',
    padding: 5,
  }
});
export default Dashboard;
