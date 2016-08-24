'use strict';

import React, { Component } from 'react';
import { Navigator, Dimensions, AppRegistry, View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import t from 'tcomb-form-native';
import _ from 'lodash';
import Register from './register.js';
import Dashboard from './dashboard.js';

// clone the default stylesheet
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

var Form = t.form.Form;

var LoginForm = t.struct({

  email: t.String,  // an optional string
  password: t.String              // a required number

});

// overriding the text color
stylesheet.textbox.normal.color = '#FFFFFF';
stylesheet.textbox.normal.borderRadius = 0;
stylesheet.textbox.normal.borderLeftColor = '#1B676B';
stylesheet.textbox.normal.borderRightColor = '#1B676B';
stylesheet.textbox.normal.borderTopColor = '#1B676B';

var options = {
  auto: 'placeholders',
  fields: {
    password: {
      password: true,
      secureTextEntry: true,
      placeholderTextColor: 'white',
      clearButtonMode: 'while-editing',
      keyboardAppearance: 'dark',
      selectionColor: '#88C425',
      returnKeyType: 'go',
      stylesheet: stylesheet,
      error: 'The password was incorrect'

    },
    email: {
      keyboardType: 'email-address',
      autoCorrect: false,
      autoCapitalize: 'none',
      placeholderTextColor: 'white',
      clearButtonMode: 'while-editing',
      keyboardAppearance: 'dark',
      selectionColor: '#88C425',
      returnKeyType: 'next',
      autoCapitalize: 'none',
      stylesheet: stylesheet,
      error: 'Insert a valid Dartmouth email'
    },
  },
}

class Login extends Component {

  constructor(props){
   super(props);

   this.state = {
     navigator: this.props.navigator
   };

   this._onPress = this._onPress.bind(this);
  //  this._onForward = this._onForward.bind(this);
 }

 // _onForward() {
 //   this.props.navigator.push({
 //     title: 'Dash',
 //     component: Dashboard
 //   });
 // }

  _onPress() {
    var value = this.refs.form.getValue();

    if (!value) {
      console.log("Problems");
    }
    var user_email = value.email;
    var user_password = value.password;

    console.log(value);
    /*
   fetch('https://threeforpong.herokuapp.com/api/signin/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: `${user_email}`,
        password: `${user_password}`
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      var user_id = responseData.user_id;
      var token = responseData.token;
      console.log(user_id);
      console.log(token);
    })
    .done();
<<<<<<< HEAD

    this.props.navigator.push({
     component: Register,
     title: 'Genius'
   });
   */
    // this._onForward();
    this.props.navigator.push({
      title: 'Games',
      component: Dashboard,
      passProps: { navigator: this.props.navigator }
    });
  }

  render() {
    return (
      <View style={styles.container}>

      <Image source={require('../3forponglogo.png')} style={styles.logo} />

        {/* display */}
        <Form
          ref="form"
          type={LoginForm}
          options={options}
          style={styles.title}
        />
        <TouchableHighlight style={styles.button} onPress={this._onPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableHighlight>
      </View>
    );
  }
  }

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#1B676B',
  },
  logo: {
    maxWidth: 150,
    maxHeight: 150,
    marginTop: 300,
    marginBottom: 60,
    alignSelf: 'center',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: -200,
    marginTop: 200,
    color: 'white',
    backgroundColor: 'white',
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
    marginLeft: -20,
    marginTop: 200,
    marginBottom: -140,
  }
  });

export default Login;
