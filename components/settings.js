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

const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

// Potential items a user can edit
var Person = t.struct({
  // Boolean
  phoneNumber: t.Number,  // a required number
  canHost: t.Boolean
});

class Settings extends Component {
  constructor(props){
   super(props);
   this.state = {
      location_dict: {},
      value: {},
      type: Person,
      //user_id: this.props.user_id,
      phone: 555,
      password: null,
      location_name: null,
      location_id: null,
      can_host:null
      //navigator: this.props.navigator
    };
  }

  componentWillMount() {
    this.buildLocations();
  }

  buildLocations() {
    var temp_dict = {};
    fetch('https://threeforpong.herokuapp.com/api/locations/', {
      method: 'GET'
    })

    .then((response) => response.json())
    .then((responseData) => {

      for(var i = 0; i < responseData.length; i++) {
        temp_dict[responseData[i].location_id] = responseData[i].location_name
      }

    })

    this.setState({location_dict: temp_dict});
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

      });

      if (this.state.can_host){
        this.setState({
        location_name: responseData.default_location.location_name,
        location_id: responseData.default_location._id
       });

      }

    )}
    */
    console.log('what');

    this.updateSettingsPage();

    }

    updateSettingsPage() {
      if (this.state.canHost) {
        var LocationList = t.enums(location_dict, 'LocationList');
        var foo = t.struct({
          phoneNumber: t.Number,
          canHost: t.Boolean, // Boolean
          LocationToHost: LocationList

        });

        var temp_val = {
          phoneNumber: this.state.phone,
          canHost: this.state.canHost,
          LocationToHost: this.state.location_id
        };

        this.setState({type: foo, value:temp_val});
      }

      else {
        var temp_val = {
          phoneNumber: this.state.phone,
          canHost: this.state.canHost
        };

        this.setState({value: temp_val});

      }
    }

    render() {
      return (

        <View style={styles.container}>

          <Image source={require('../3forponglogo.png')} style={styles.logo} />

          <Text style={styles.titletext}>Settings</Text>
          {/* display */}
          <ScrollView style={styles.scroll}>
          <TouchableHighlight style={styles.joinButton}>

          <Text style={styles.rowtext}>
            Password     >
          </Text>
          <Text style={styles.rowtextleft}>Phone Number</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.joinButton}>
          <Text style={styles.rowtextleft}>Password</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.joinButton}>
          <Text style={styles.rowtextleft}>Host Location</Text>
          </TouchableHighlight>

          <Form
            ref="form"
            type={this.state.type}
            //options={this.state.options}
            value={this.state.value}
            style={styles.title}
            //onChange={this.onChange}
          />
          </ScrollView>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
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
  scroll: {
    flex: 1,
    marginBottom: -370,
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30,
    color: 'white',
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
    fontSize: 14,
    color: '#363636',
    marginLeft: -20,
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

    backgroundColor: 'white'
  },
  joinButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B676B',
    alignSelf: 'center',
    backgroundColor: 'white'
  }
});

export default Settings;
