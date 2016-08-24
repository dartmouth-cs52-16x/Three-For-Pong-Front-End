import React, { Component } from 'react';
import Login from './login.js';
import Register from './register.js';
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
    }

  _onPress() {
    var value = this.refs.form.getValue();
    var pin = value.Pin;
    var user_id = this.state.user_id;
    var token = null;
    /*
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
       console.log(user_id);
       console.log(token);
     })
     .done();
     */
    this.props.navigator.push({
     title: 'All Games',
     component: Dashboard
   });
  }

  render() {

    return (
      <View style={styles.container}>

      <Text style={styles.infoText}>Check your email for a {'\n'} pin and enter it here:</Text>

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
    marginTop: 200,
    marginBottom: -95,
  },
  infoText: {
    marginTop: 50,
    color: 'white',
    fontSize: 24,
  }
});

export default PinAuth
