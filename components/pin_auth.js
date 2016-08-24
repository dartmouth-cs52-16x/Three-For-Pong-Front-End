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
stylesheet.textbox.normal.marginTop = 245;

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
    marginTop: 240,
    marginBottom: -20,
  }
});

export default PinAuth
