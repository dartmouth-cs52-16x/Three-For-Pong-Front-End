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
import storage from 'react-native-simple-store';
import changePassword from './change_password';
import changePhone from './change_phone';
import changeHost from './change_host';

// var serverURL = require('./env');
let token = storage.get('token');

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
      user_id: this.props.user_id,
      user_info: this.props.user_info,
      location_dict: {},
      value: {},
      type: Person
    };

    this._onChangeHostButton = this._onChangeHostButton.bind(this);
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
      this.updateSettingsPage(temp_dict);

    })

  }



    updateSettingsPage(dict) {
      if (this.state.user_info.canHost) {
        var LocationList = t.enums(dict, 'LocationList');
        var foo = t.struct({
          phoneNumber: t.Number,
          canHost: t.Boolean, // Boolean
          LocationToHost: LocationList

        });
        console.log(this.state.user_info.canHost);
        var temp_val = {
          phoneNumber: this.state.user_info.phone,
          canHost: this.state.user_info.canHost,
          LocationToHost: this.state.user_info.default_location._id
        };

        this.setState({type: foo, value:temp_val});
      }

      else {
        var temp_val = {
          phoneNumber: this.state.user_info.phone,
          canHost: this.state.user_info.canHost
        };

        this.setState({value: temp_val});

      }
      this.setState({location_dict: dict});
    }

    _onChangePasswordButton() {
      this.props.navigator.push({
        title: 'Change Password',
        component: changePassword,
        passProps: {user_id: this.state.user_id, user_info: this.state.user_info}
      });
    }

    _onChangePhoneButton() {
      this.props.navigator.push({
        title: 'Change Phone Number',
        component: changePhone,
        passProps: {user_id: this.state.user_id, user_info: this.state.user_info}
      });
    }

    _onChangeHostButton() {
      this.props.navigator.push({
        title: 'Change Hosting',
        component: changeHost,
        passProps: {user_id: this.state.user_id, user_info: this.state.user_info, location_dict: this.state.location_dict}
      });
    }
    render() {
      return (

        <View style={styles.container}>

          <Image source={require('../3forponglogo.png')} style={styles.logo} />

          <Text style={styles.titletext}>Settings</Text>
          {/* display */}

          <TouchableHighlight style={styles.joinButton} onPress={this._onChangePhoneButton} underlayColor='#99d9f4'>
          <Text style={styles.rowtextleft}>Change Phone Number > </Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.joinButton} onPress={this._onChangePasswordButton} underlayColor='#99d9f4'>
          <Text style={styles.rowtextleft}>Change Password > </Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.joinButton} onPress={this._onChangeHostButton} underlayColor='#99d9f4'>
          <Text style={styles.rowtextleft}>Edit Hosting Information > </Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.logOutButton} underlayColor='#99d9f4'>
          <Text style={styles.rowtextlogout}>Log Out</Text>
          </TouchableHighlight>

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
    maxWidth: 120,
    maxHeight: 120,
    marginBottom: 20,
    marginTop: 70,
    alignSelf: 'center',
  },
  scroll: {
    flex: 1,
    marginBottom: -370,
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 30,
    color: 'white',
    marginLeft: 40,
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
  },
  rowtextleft: {
    fontSize: 14,
    color: '#363636',
    borderWidth: .5,
    borderColor: '#1B676B',
    width: Dimensions.get('window').width,
    padding: 15,
    marginLeft: -40,
  },
  rowtextlogout: {
    fontSize: 14,
    color: '#363636',
    borderWidth: .5,
    borderColor: '#1B676B',
    width: Dimensions.get('window').width,
    padding: 15,
    marginLeft: -40,
  },
  logOutButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: Dimensions.get('window').width,
    marginTop: 50,
  },
  titletext: {
    fontSize: 30,
    color: 'white',
    marginBottom: 30,
    alignSelf: 'center',
  },
  joinButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: Dimensions.get('window').width,
  },
  joinButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B676B',
    alignSelf: 'center',
    backgroundColor: 'white',
  }
});

export default Settings;
