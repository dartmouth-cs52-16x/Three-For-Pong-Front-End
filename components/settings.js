import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  View,
  TouchableHighlight,
  AlertIOS,
  Dimensions,
} from 'react-native';
import PinAuth from './pin_auth';
import t from 'tcomb-form-native';
import _ from 'lodash';
// import storage from 'react-native-simple-store';

// var serverURL = require('./env');
// let token = storage.get('token');

let Form = t.form.Form;

// here we are: define your domain model

const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

// Potential items a user can edit
var Person = t.struct({

  phoneNumber: t.Number,
  password: t.String,               // a required number
  canHost: t.Boolean // Boolean

});

class Settings extends Component {
  constructor(props){
   super(props);
   this.state = {
      dict: {},
      value: {},
      type: Person,
      //user_id: this.props.user_id,
      phone: 555,
      password: null,
      location: null,
      can_host:null
      //navigator: this.props.navigator
    };
  }

  componentWillMount() {
    this.loadUserData();
  }


  loadUserData() {

    /*
    var user_id = this.state.user_id;
    fetch(`https://threeforpong.herokuapp.com/api/users/${user_id}`, {
      method: 'GET'
    })

    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        phone: responseData.phone,
        can_host: responseData.can_host,
        location_name: responseData.default_location.location_name
      });

    )}
    */
    console.log('what');
    }

    render() {
      return (

        <View style={styles.container}>

          <Image source={require('../3forponglogo.png')} style={styles.logo} />

          <Text style={styles.titletext}>Settings</Text>
          {/* display */}
          <TouchableHighlight style={styles.joinButton}>
          <Text style={styles.rowtextleft}>Phone Number</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.joinButton}>
          <Text style={styles.rowtextleft}>Password</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.joinButton}>
          <Text style={styles.rowtextleft}>Host Location</Text>
          </TouchableHighlight>

        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1B676B',
  },
  logo: {
    maxWidth: 100,
    maxHeight: 100,
    marginBottom: 20,
    marginTop: 20,
    alignSelf: 'center',
  },
  rowtextleft: {
    fontSize: 14,
    color: '#363636',
    borderWidth: 1,
    borderColor: '#cccccc',
    width: Dimensions.get('window').width,
    padding: 8,
  },
  titletext: {
    fontSize: 30,
    color: 'white',
    marginBottom: 20,
  },
  joinButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  }
});

export default Settings;
