'use strict';

import React, { Component } from 'react';
import { AppRegistry, View, Text, StyleSheet, NavigatorIOS, TouchableHighlight } from 'react-native';
import t from 'tcomb-form-native';

var Form = t.form.Form;

var LoginForm = t.struct({

  email: t.String,  // an optional string
  password: t.String              // a required number

});

var options = {
  auto: 'placeholders',
  fields: {
    password: {
      password: true,
      secureTextEntry: true
    },
    email: {
      keyboardType: 'email-address',
      autoCorrect: false,
    },
  },
}

class Login extends Component {

  constructor(props){
   super(props);
   this._onPress = this._onPress.bind(this);
 }

  _onPress() {
    var value = this.refs.form.getValue();
    var user_email = value.email;
    var user_password = value.password;
    console.log(value);

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

       console.log(responseData.token);
       console.log("Devina");
       console.log(responseData.user_id);
    })
    .done();
  }

  render() {
    return (
      <View style={styles.container}>
        {/* display */}
        <Form
          ref="form"
          type={LoginForm}
          options={options}
          style={styles.title}

        />
        <TouchableHighlight style={styles.button} onPress={this._onPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
      </View>
    );
  }
  }

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: 'darkgreen',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30,
    color: 'white',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
  });

export default Login;
