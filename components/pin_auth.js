import React, { Component } from 'react';
import Login from './login.js';
import Register from './register.js';
// import storage from 'react-native-simple-store';

import {
  AppRegistry,
  StyleSheet,
  Text,
  Dimensions,
  View,
  NavigatorIOS,
  TouchableHighlight,
  AlertIOS,
} from 'react-native';
import _ from 'lodash';
import Dashboard from './dashboard.js';
import t from 'tcomb-form-native';
import storage from 'react-native-simple-store';


// clone the default stylesheet
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

stylesheet.textbox.normal.color = '#FFFFFF';
stylesheet.textbox.normal.borderRadius = 0;
stylesheet.textbox.normal.borderLeftColor = '#1B676B';
stylesheet.textbox.normal.borderRightColor = '#1B676B';
stylesheet.textbox.normal.borderTopColor = '#1B676B';
stylesheet.textbox.normal.width = 300;
stylesheet.textbox.normal.height = 70;
stylesheet.textbox.normal.fontSize = 36;
stylesheet.textbox.normal.marginTop = 100;

var Form = t.form.Form;

var PinForm = t.struct({

  Pin: t.Number
});

var options = {
  auto: 'placeholders',
  fields: {
    Pin: {
      keyboardType: 'phone-pad',
      autoCorrect: false,
      autoCapitalize: 'none',
      placeholderTextColor: 'white',
      clearButtonMode: 'while-editing',
      keyboardAppearance: 'dark',
      selectionColor: '#88C425',
      returnKeyType: 'next',
      autoCapitalize: 'none',
      stylesheet: stylesheet,
      error: 'Please input the authentication pin'
    }
  }
};

class PinAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: this.props.user_id
    };

    this._onPress = this._onPress.bind(this);
    this.authUser = this.authUser.bind(this);
    }

    authUser(token, user_id) {
      storage.save('token', `${token}`);
      var token = storage.get('token');
      console.log(`the token is now ${token}`);
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
        title: 'Login',
        component: Login
      });
    }

  _onPress() {
    var value = this.refs.form.getValue();
    if (!value) {
      return null;
    }
    var pin = value.Pin;
    var user_id = this.state.user_id;
    var token = null;
    fetch(`https://threeforpong.herokuapp.com/api/verify/${user_id}`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
         verify_token: `${pin}`
       })
     })
     .then((response) => response.json())
     .then((responseData) => {
       user_id = responseData.user_id;
       token = responseData.token;
       storage.save('token', token);
       console.log(`the registration token is ${token}`);
       console.log(token);

       if ((!user_id) || (!token)) {
         AlertIOS.alert(
           "Please input the correct authentication pin"
         );
         return;
       }

      this.authUser(token, user_id);

     })
     .catch((error) =>{
       AlertIOS.alert(
         "Please input the correct authentication pin"
       );
     })
     .done();
  }

  render() {

    return (
      <View style={styles.container}>

      <Text style={styles.infoText}>Check your email for a {'\n'} pin and enter it here:</Text>

      <Text style={styles.hint}>Hint: it may take a few minutes</Text>

      <Form
        ref="form"
        type={PinForm}
        options={options}
        style={styles.title}
      />
       <TouchableHighlight onPress={this._onPress} style={styles.Registerbutton}>
          <Text style={styles.buttonText}>SUBMIT</Text>
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
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30,
    color: 'white',
  },
  hint: {
    color: 'white',
    fontSize: 14,
    marginTop: 10,
    alignSelf: 'center',
    fontStyle: 'italic',
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  },
  Registerbutton: {
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#88C425',
    paddingTop: 25,
    paddingBottom: 25,
    width: Dimensions.get('window').width,
    marginTop: 175,
    marginBottom: -95,
  },
  infoText: {
    marginTop: 50,
    color: 'white',
    fontSize: 24,
  }
});

export default PinAuth
