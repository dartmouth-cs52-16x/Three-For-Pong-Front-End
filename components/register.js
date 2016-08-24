import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  View,
  TouchableHighlight,
  AlertIOS,
  Dimensions,
} from 'react-native';
import PinAuth from './pin_auth';
import t from 'tcomb-form-native';
import _ from 'lodash';


let Form = t.form.Form;

// here we are: define your domain model

const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

var Person = t.struct({
  fullName: t.String,
  phoneNumber: t.String,
  email: t.String,  // an optional string
  password: t.String,               // a required number
  confirmPassword: t.String,        // check if password is correct
  canHost: t.Boolean // Boolean

});

// overriding the text color
stylesheet.textbox.normal.color = '#FFFFFF';
stylesheet.textbox.normal.borderRadius = 0;
stylesheet.textbox.normal.borderLeftColor = '#1B676B';
stylesheet.textbox.normal.borderRightColor = '#1B676B';
stylesheet.textbox.normal.borderTopColor = '#1B676B';

let options = {
  auto: 'placeholders',
  fields: {
    fullName: {
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
    },
    phoneNumber: {
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
    },
    password: {
      password: true,
      secureTextEntry: true,
      placeholderTextColor: 'white',
      clearButtonMode: 'while-editing',
      keyboardAppearance: 'dark',
      selectionColor: '#88C425',
      returnKeyType: 'go',
      stylesheet: stylesheet,
    },
    confirmPassword: {
      password: true,
      secureTextEntry: true,
      placeholderTextColor: 'white',
      clearButtonMode: 'while-editing',
      keyboardAppearance: 'dark',
      selectionColor: '#88C425',
      returnKeyType: 'go',
      stylesheet: stylesheet,
    },
    Locations: {}
  }


}; // optional rendering options (see documentation)


class Register extends Component {
  constructor(props){
   super(props);
   this.state = {
      options: options,
      dict: {},
      value: {},
      type: Person,
      navigator: this.props.navigator
    };

    this.onChange = this.onChange.bind(this);
    this.getType = this.getType.bind(this);
    this.buildLocations = this.buildLocations.bind(this);
    this.onPress = this.onPress.bind(this);
    //this.createForm = this.createForm.bind(this);
 }

 componentWillMount() {
   this.buildLocations();
 }

 onChange(value) {

   if (value.canHost) {
     var location_dict = this.state.dict;
     var LocationList = t.enums(location_dict, 'LocationList');

     var temp = t.struct({
       fullName: t.String,
       phoneNumber: t.String,
       email: t.String,  // an optional string
       password: t.String,               // a required number
       confirmPassword: t.String,        // check if password is correct
       canHost: t.Boolean, // Boolean
       LocationToHost: LocationList

     });

     this.setState({type: temp, value: value});
   } else {
      var temp = t.struct({
        fullName: t.String,
        phoneNumber: t.String,
        email: t.String,  // an optional string
        password: t.String,               // a required number
        confirmPassword: t.String,        // check if password is correct
        canHost: t.Boolean // Boolean
      });

      this.setState({type: temp, value: value});
   }

   }

  buildLocations() {
    var dict = {};
    fetch('https://threeforpong.herokuapp.com/api/locations/', {
      method: 'GET'
    })

    .then((response) => response.json())
    .then((responseData) => {

      for(var i = 0; i < responseData.length; i++) {
        dict[responseData[i].location_id] = responseData[i].location_name
      }

      this.getType(dict);

      //const LocationList = t.enums.of([data_string], 'LocationList');

    })

  }

  getType(location_dict){
    var LocationList = t.enums(location_dict, 'LocationList');

    var foo = t.struct({
      fullName: t.String,
      phoneNumber: t.String,
      email: t.String,  // an optional string
      password: t.String,               // a required number
      confirmPassword: t.String,        // check if password is correct
      canHost: t.Boolean // Boolean

    });
    this.setState({type:foo, dict:location_dict});


  }
  onPress() {
    var user_ID = null;
    var value = this.refs.form.getValue();
    var space = " ";
    var user_full_name = value.fullName;
    var user_phone = value.phoneNumber;
    var user_email = value.email;
    var user_password = value.password;
    var user_canHost = value.canHost;
    var user_LocationID = null;

    if(user_canHost) {
      user_LocationID = value.LocationToHost;
    }
    /*
    fetch('https://threeforpong.herokuapp.com/api/signup/', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
         email: `${user_email}`,
         full_name: `${user_full_name}`,
         phone: `${user_phone}`,
         can_host: `${user_canHost}`,
         password: `${user_password}`,
         default_location_id: `${user_LocationID}`
       })
     })
     .then((response) => response.json())
     .then((responseData) => {
        user_ID = responseData.user_id;

     })
     .done();
     */

     this.props.navigator.push({
      component: PinAuth,
      title: 'Pin Authorization',
      passProps: {user_id: user_ID}
    });
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
           options={this.state.options}
           value={this.state.value}
           style={styles.title}
           onChange={this.onChange}
         />

         </ScrollView>
         <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
           <Text style={styles.buttonText}>REGISTER</Text>
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
   scroll: {
     flex: 1,
     marginBottom: -370,
   },
   logo: {
     maxWidth: 100,
     maxHeight: 100,
     marginBottom: 10,
     alignSelf: 'center',
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
   button: {
     justifyContent: 'center',
     alignSelf: 'stretch',
     backgroundColor: '#88C425',
     paddingTop: 25,
     paddingBottom: 25,
     width: Dimensions.get('window').width,
     marginLeft: -20,
     marginTop: 30,
     marginBottom: -20,
   }
 });

export default Register;
