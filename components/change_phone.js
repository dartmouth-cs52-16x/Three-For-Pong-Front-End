import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Dimensions,
  View,
  Image,
  ScrollView,
  Navigator,
  TouchableHighlight,
  AlertIOS,
  Alert,
  ListView,
} from 'react-native';
import moment from 'moment';
import CreateGame from './create_game';
import Settings from './settings';
import storage from 'react-native-simple-store';
import t from 'tcomb-form-native';

var Form = t.form.Form;

var token = storage.get('token');

var Person = t.struct({
  phoneNumber: t.Number
});

var options = {
  auto: 'placeholders',
  fields: {
    phoneNumber: {
      color: 'white',
    },
  }
}; // optional rendering options (see documentation)


var values = {};

class changePhone extends Component {

  constructor(props){
   super(props);
   this.state = {
      user_id: this.props.user_id,
      user_info: this.props.user_info,
      value: values,
      options: options,
      token:`${token._65}`,
      buttonText:"BACK TO SETTINGS",
      type: Person
    };

    this._onPress = this._onPress.bind(this);
    this.onChange = this.onChange.bind(this);

  }


  onChange(value) {
      this.setState({ value: value, buttonText:"SAVE AND RETURN", options: options});
  }


  _onPress() {
    var value = this.refs.form.getValue();
    if (!value) {
      return null;
    }
    var user_number = value.phoneNumber;
    console.log(user_number);
    var user_id = this.state.user_id;
      fetch(`https://threeforpong.herokuapp.com/api/users/${this.state.user_id}`, {
        method:'PUT',
        headers: {
          'Authorization': this.state.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phone: `${user_number}`
        })
      })
      .then((response) => {
        console.log('Error 27');
        console.log(response);
      })
      .catch((error) =>{
        console.log(error);
      })
  fetch(`https://threeforpong.herokuapp.com/api/users/${user_id}`, {
    method:'GET',
    headers: {
      'Authorization': `${token._65}`
    }
  })
  .then((response) => response.json())
  .then((responseData) => {
    user_info = responseData;
    console.log(user_info);
    this.props.navigator.push({
      title: 'Settings',
      component: Settings,
      passProps: {user_id: user_id, user_info: user_info}
    });
  })
  .catch((error) => {
    console.log('Error 2');
    console.log(error);
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
          type={this.state.type}
          value={this.state.value}
          option={options}
          style={styles.title}
          onChange={this.onChange}
        />

      </ScrollView>
      <TouchableHighlight style={styles.button} onPress={this._onPress} underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>{this.state.buttonText}</Text>
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
    marginTop: 50,
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

export default changePhone;
