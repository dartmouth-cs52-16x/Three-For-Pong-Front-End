import React, { Component } from 'react';
import Login from './login.js';
import Register from './register.js';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TouchableHighlight,
  AlertIOS,
} from 'react-native';


import _ from 'lodash';
import Dashboard from './dashboard.js';

// clone the default stylesheet
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

var Form = t.form.Form;

var PinForm = t.struct({

  Pin: t.Number
});

var options = {};

class PinAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigator: this.props.navigator
    };

    this._onPress = this._onPress.bind(this);
    }

  _onPress() {
    var value = this.refs.form.getValue();
    var pin = value.Pin;
    console.log(value);
    this.props.navigator.push({
     title: 'Login',
     component: Login
   });
  }

  render() {

    return (
      <View style={styles.container}>

       <TouchableHighlight onPress={this._onPress} style={styles.Registerbutton}>
          <Text>NEXT</Text>
       </TouchableHighlight>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'darkgreen',
  },
  welcome: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
  instructions: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    color: 'white',
  },
  Loginbutton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
    padding: 10,
    marginRight: 5,
    marginLeft: 5,
  },
  Registerbutton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
    paddingTop:5,
    padding: 10,
    marginRight: 5,
    marginLeft: 5,
    }
});

export default Startup
