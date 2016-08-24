import React, { Component } from 'react';
import NavigationBar from 'react-native-navbar';
// import storage from 'react-native-simple-store';
//import Startup from './components/startup';
import Dashboard from './components/dashboard';
import Login from './components/login.js';
import Register from './components/register.js';

// import dartUser from './components/user-auth.js';

import serverInfo from './env.js';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  NavigatorIOS,
  TouchableHighlight,
  AlertIOS,
} from 'react-native';

// var serverURL = require('./env');
// let token = storage.get('token');
const token = null;
class ThreeForPong extends Component {

  /*
  _onPressButtonGet() {
    fetch(serverInfo.serverURL)
    .then((response) => response.json())
    .then((responseData) => {
      AlertIOS.alert(
        'Response ' + responseData[0].location_name
      );
    })
    .done();
  }
  */

  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: Startup,
          title: '',
        }}
        style={{flex: 1}}
      navigationBarHidden={false} />
    );
  }
}

class Startup extends Component {
  constructor(props) {
      super(props);
      this.state = {
        navigator: this.props.navigator
      };

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
     component: Register,
     passProps: { navigator: this.props.navigator }
   });
  }


  render() {

    return (
      <View style={styles.container}>

      <Image source={require('./3forponglogo.png')} style={styles.logo} />

       <TouchableHighlight onPress={this._onLoginForward} style={styles.Loginbutton}>
          <Text style={styles.buttonText}>LOGIN</Text>
       </TouchableHighlight>

       <TouchableHighlight onPress={this._onRegisterForward} style={styles.Registerbutton}>
          <Text style={styles.buttonText}>REGISTER</Text>
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
    backgroundColor: '#1B676B',
  },
  logo: {
    maxWidth: 300,
    maxHeight: 300,
    marginTop: 315,
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
    backgroundColor: '#519548',
    paddingTop: 25,
    paddingBottom: 25,
    marginTop: 110,
    width: 400,
  },
  Registerbutton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#88C425',
    paddingTop: 25,
    paddingBottom: 25,
    width: 400,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
    padding: 10,
    marginRight: 5,
    marginLeft: 5,
  },
  buttonText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
});

AppRegistry.registerComponent('ThreeForPong', () => ThreeForPong);
