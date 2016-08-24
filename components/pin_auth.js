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
import t from 'tcomb-form-native';

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
      <Form
        ref="form"
        type={PinForm}
        options={options}
        style={styles.title}
      />
       <TouchableHighlight onPress={this._onPress} style={styles.Registerbutton}>
          <Text>SUBMIT</Text>
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
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30,
    color: 'white',
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

export default PinAuth
