import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  View,
  NavigatorIOS,
  TouchableHighlight,
  AlertIOS,
  Dimensions,
} from 'react-native';
import t from 'tcomb-form-native';
import _ from 'lodash';


let Form = t.form.Form;

// here we are: define your domain model

const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

var Person = t.struct({
  FirstName: t.String,
  LastName: t.String,            // a required string
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
    FirstName: {
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
    LastName: {
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
      type: Person
    };

    this.onChange = this.onChange.bind(this);
    //this.createForm = this.createForm.bind(this);
 }

 componentWillMount() {
   this.buildLocations();
 }

 onChange(value) {

   console.log(value);
   if (value.canHost) {
     var location_dict = this.state.dict;
     var LocationList = t.enums(location_dict, 'LocationList');

     var temp = t.struct({
       FirstName: t.String,
       LastName: t.String,            // a required string
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
        FirstName: t.String,
        LastName: t.String,            // a required string
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
        var loc_temp = responseData[i].location_name.replace(/"/g, "'")
        dict[responseData[i].location_id] = responseData[i].location_name
      }
      this.getType(dict);
      //const LocationList = t.enums.of([data_string], 'LocationList');

    })

  }

  getType(location_dict){
    var LocationList = t.enums(location_dict, 'LocationList');

    var foo = t.struct({
      FirstName: t.String,
      LastName: t.String,            // a required string
      phoneNumber: t.String,
      email: t.String,  // an optional string
      password: t.String,               // a required number
      confirmPassword: t.String,        // check if password is correct
      canHost: t.Boolean // Boolean

    });
    this.setState({type:foo, dict:location_dict});


  }
  onPress() {
    var value = this.refs.form.getValue();
    if (value) {
      console.log(value);
    }
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
