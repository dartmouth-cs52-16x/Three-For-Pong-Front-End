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

const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

var Person = t.struct({
  fullName: t.String,
  phoneNumber: t.Number,
  email: t.String,  // an optional string
  password: t.String,               // a required number
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
      autoCapitalize: 'words',
      placeholderTextColor: 'white',
      clearButtonMode: 'while-editing',
      keyboardAppearance: 'dark',
      selectionColor: '#88C425',
      returnKeyType: 'next',
      autoCapitalize: 'none',
      stylesheet: stylesheet,
      error: 'Please input your first and last name'
    },
    phoneNumber: {
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
      error: 'Please input a valid phone number'
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
      error: 'Please input a valid Dartmouth email'
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
      error:'Please input a valid password'
    },
    LocationToHost: {
      selectionColor: '#f7f7f7',
      error:'Please select a valid location',
      nullOption: {value: '', text: 'Choose your location'}
    }
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
    this.pushPinAuth = this.pushPinAuth.bind(this);
    //this.createForm = this.createForm.bind(this);
 }

 componentWillMount() {
   this.buildLocations();
 }

 onChange(value) {

   if (value.canHost) {
     var location_dict = this.state.dict;
     var LocationList = t.enums(location_dict, 'LocationList');
     this.refs.scrollView.scrollTo(100);

     var temp = t.struct({
       fullName: t.String,
       phoneNumber: t.Number,
       email: t.String,  // an optional string
       password: t.String,               // a required number
       canHost: t.Boolean, // Boolean
       LocationToHost: LocationList
     });

     this.setState({type: temp, value: value});
   } else {
      var temp = t.struct({
        fullName: t.String,
        phoneNumber: t.Number,
        email: t.String,  // an optional string
        password: t.String,               // a required number
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
    })

  }

  getType(location_dict){
    var LocationList = t.enums(location_dict, 'LocationList');

    var foo = t.struct({
      fullName: t.String,
      phoneNumber: t.Number,
      email: t.String,  // an optional string
      password: t.String,               // a required number
      canHost: t.Boolean // Boolean

    });
    this.setState({type:foo, dict:location_dict});

  }

  pushPinAuth(user_id) {
    this.props.navigator.replace({
     component: PinAuth,
     title: 'Pin Entry',
     passProps: {user_id: user_id}
   });
  }
  onPress() {

    var value = this.refs.form.getValue();
    if (!value) {
      return null;
    }
    var user_ID = null;
    var user_full_name = value.fullName;
    var user_phone = value.phoneNumber;
    var user_email = value.email;
    var user_password = value.password;
    var user_canHost = value.canHost;
    var user_LocationID = null;

    if(user_canHost) {
      user_LocationID = value.LocationToHost;
      console.log(`${user_full_name}, ${user_phone}, ${user_email}, ${user_password}, ${user_canHost}, ${user_LocationID}`);
      fetch('https://threeforpong.herokuapp.com/api/signup/', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({
           email: `${user_email}`,
           full_name: `${user_full_name}`,
           phone: `${user_phone}`,
           can_host: user_canHost,
           password: `${user_password}`,
           default_location_id: `${user_LocationID}`
         })
       })
       .then((response) => response.json())
       .then((responseData) => {
          user_ID = responseData.user_id;
          console.log(`the first user ID is ${user_ID}`);
          this.pushPinAuth(user_ID);

       })
       .catch((error) =>{
         console.log('woahh');
         console.log(error);
       })
       .done();
    }

    else {

    console.log(`${user_full_name}, ${user_phone}, ${user_email}, ${user_password}, ${user_canHost}, ${user_LocationID}`);
    fetch('https://threeforpong.herokuapp.com/api/signup/', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
         email: `${user_email}`,
         full_name: `${user_full_name}`,
         phone: `${user_phone}`,
         can_host: user_canHost,
         password: `${user_password}`
       })
     })
     .then((response) => response.json())
     .then((responseData) => {
        user_ID = responseData.user_id;
        console.log(`the first user ID is ${user_ID}`);
        this.pushPinAuth(user_ID);

     })
     .catch((error) =>{
       console.log('woahh');
       console.log(error);
     })
     .done();
   }

   }

   render() {
     return (
       <View style={styles.container}>
        <ScrollView style={styles.scroll} ref="scrollView">

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
     marginBottom: 20,
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
