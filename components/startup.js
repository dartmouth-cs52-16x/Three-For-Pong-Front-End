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

class Startup extends Component {
  constructor(props) {
      super(props);
      this._onLoginForward = this._onLoginForward.bind(this);
      this._onRegisterForward = this._onRegisterForward.bind(this);
    }

  _onLoginForward() {
    this.props.navigator.push({
     title: 'Login',
     component: Login
   });
  }

  _onRegisterForward() {
    this.props.navigator.push({
     title: 'Register',
     component: Register
   });
  }


  render() {

    return (
      <View style={styles.container}>

       <TouchableHighlight onPress={this._onLoginForward} style={styles.Loginbutton}>
          <Text>LOGIN</Text>
       </TouchableHighlight>

       <TouchableHighlight onPress={this._onRegisterForward} style={styles.Registerbutton}>
          <Text>REGISTER</Text>
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
    }
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
