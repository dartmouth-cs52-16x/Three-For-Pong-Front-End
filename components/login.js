import React, { Component } from 'react';
import { AppRegistry, View, Text, StyleSheet, NavigatorIOS, TouchableHighlight } from 'react-native';
import t from 'tcomb-form-native';

let Form = t.form.Form;

let LoginForm = t.struct({

  email: t.String,  // an optional string
  password: t.String              // a required number

});

let options = {}; // optional rendering options (see documentation)


class Login extends Component {

  _onPress() {
   // call getValue() to get the values of the form
   var value = this.refs.form.getValue();
   if (value) { // if validation fails, value will be null
     console.log(value); // value here is an instance of Person
   }
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
