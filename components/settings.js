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


let Form = t.form.Form;

// here we are: define your domain model

const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

// Potential items a user can edit
var Person = t.struct({
  fullName: t.String,
  phoneNumber: t.Number,
  email: t.String,  // an optional string
  password: t.String,               // a required number
  canHost: t.Boolean // Boolean

});

let options = {};

class Settings extends Component {
  constructor(props){
   super(props);
   this.state = {
      options: options,
      dict: {},
      value: {},
      type: Person,
      navigator: this.props.navigator
    };

    render() {
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#1B676B',
  }
});

export default Settings;
