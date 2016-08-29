'use strict';

import React, { Component } from 'react';
import { Navigator, Dimensions, AppRegistry, View, Text, StyleSheet, ScrollView, Image, TouchableHighlight } from 'react-native';
import t from 'tcomb-form-native';
import _ from 'lodash';
import Register from './register.js';
import Dashboard from './dashboard.js';
import storage from 'react-native-simple-store';

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
      error: 'Please insert a valid password',
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
      error: 'Please insert a valid Dartmouth email address'
    },
  },
}

class Login extends Component {

  constructor(props){
   super(props);

   this.state = {
     user_id: null,
     navigator: this.props.navigator
   };

   this._onPress = this._onPress.bind(this);
   this.authUser = this.authUser.bind(this);
 }

authUser(user_id) {
  console.log(user_id);
  if (user_id == null) {
    console.log('lost');
    return null;
  }

  this.setState({
    user_id:user_id
  });
  // this._onForward();
  this.props.navigator.push({
    title: 'Games',
    component: Dashboard,
    passProps: { user_id: user_id}
  });
}

  _onPress() {
    var value = this.refs.form.getValue();

    if (!value) {
      return null;
    }
    var user_email = value.email;
    var user_password = value.password;
    var user_id = null;
    var token = null;

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
      user_id = responseData.user_id;
      token = responseData.token;
      storage.save('token', token);
      this.authUser(user_id);
    })
    .catch((error) =>{
      this.authUser(user_id);
    })




  }

  render() {
    return (
      <View style={styles.container}>

      <ScrollView style={styles.scroll}>

      <Image source={require('../3forponglogo.png')} style={styles.logo} />

        {/* display */}
        <Form
          ref="form"
          type={LoginForm}
          options={options}
          style={styles.title}
        />

      </ScrollView>
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
    marginTop: 100,
    marginBottom: 60,
    alignSelf: 'center',
  },
  scroll: {
    flex: 1,
    marginBottom: -370,
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
    marginBottom: -20,
  }
  });

export default Login;
